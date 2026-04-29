import Navbar from "@/components/Navbar";
import FloatingDevis from "@/components/FloatingDevis";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import DevisForm from "@/components/DevisForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlobalReveal from "@/components/GlobalReveal";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Ensures data is always fresh from DB

export default async function Home() {
  const projects = await prisma.project.findMany({ orderBy: { id: 'asc' } });
  const testimonials = await prisma.testimonial.findMany({ orderBy: { id: 'asc' } });

  return (
    <>
      <Navbar />
      <FloatingDevis />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Services />
        <Testimonials testimonials={testimonials} />
        <DevisForm />
        <Contact />
      </main>
      <Footer />
      <GlobalReveal />
    </>
  );
}
