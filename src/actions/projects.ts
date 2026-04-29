"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";
import crypto from "crypto";
import { redirect } from "next/navigation";

async function saveImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .slice(0, 40);
  const filename = `${safeName}_${Date.now()}.${ext}`;

  // Cloudinary (production)
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    const timestamp = Math.round(Date.now() / 1000).toString();
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
      .digest("hex");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const blob = new Blob([buffer], { type: file.type });

    const form = new FormData();
    form.append("file", blob, filename);
    form.append("timestamp", timestamp);
    form.append("api_key", process.env.CLOUDINARY_API_KEY);
    form.append("signature", signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: form }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Cloudinary upload failed: ${data.error?.message}`);
    return data.secure_url as string;
  }

  // Fallback : filesystem local (développement / VPS)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(join(process.cwd(), "public", "projects", filename), buffer);
  return `/projects/${filename}`;
}

export async function addProject(formData: FormData) {
  const name = formData.get("name") as string;
  const cat = formData.get("cat") as string;
  const catFilter = formData.get("catFilter") as string;
  const year = formData.get("year") as string;
  const desc = formData.get("desc") as string;
  const client = formData.get("client") as string;
  const surface = formData.get("surface") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;
  const imageFile = formData.get("imageFile") as File;

  let image = "/projects/villa_cassini.png";
  if (imageFile && imageFile.size > 0) {
    image = await saveImage(imageFile);
  }

  await prisma.project.create({
    data: { name, cat, catFilter, year, desc, client, surface, location, status, image },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function updateProject(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const cat = formData.get("cat") as string;
  const catFilter = formData.get("catFilter") as string;
  const year = formData.get("year") as string;
  const desc = formData.get("desc") as string;
  const client = formData.get("client") as string;
  const surface = formData.get("surface") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;
  const imageFile = formData.get("imageFile") as File;

  let imageUpdate: { image: string } | Record<string, never> = {};
  if (imageFile && imageFile.size > 0) {
    imageUpdate = { image: await saveImage(imageFile) };
  }

  await prisma.project.update({
    where: { id },
    data: { name, cat, catFilter, year, desc, client, surface, location, status, ...imageUpdate },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: number, prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: "Mot de passe incorrect" };
  }

  await prisma.project.delete({ where: { id: Number(id) } });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}
