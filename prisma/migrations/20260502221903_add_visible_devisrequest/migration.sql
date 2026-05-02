-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "DevisRequest" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Nouveau',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "desc" TEXT NOT NULL DEFAULT '',
    "surface" TEXT NOT NULL DEFAULT '',
    "lieu" TEXT NOT NULL DEFAULT '',
    "budget" TEXT NOT NULL DEFAULT '',
    "delai" TEXT NOT NULL DEFAULT '',
    "msg" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DevisRequest_pkey" PRIMARY KEY ("id")
);
