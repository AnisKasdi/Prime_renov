-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "catFilter" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "client" TEXT NOT NULL DEFAULT 'Privé',
    "surface" TEXT NOT NULL DEFAULT 'Non spécifié',
    "location" TEXT NOT NULL DEFAULT 'France',
    "status" TEXT NOT NULL DEFAULT 'Livré',
    "desc" TEXT NOT NULL DEFAULT 'Une réalisation exemplaire de l''agence Prime Rénov, alliant respect du contexte et vision contemporaine. Chaque matériau a été soigneusement sélectionné pour répondre aux exigences esthétiques et environnementales du client.',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
