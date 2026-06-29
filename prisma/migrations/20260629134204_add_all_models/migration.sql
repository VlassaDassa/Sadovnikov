/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `keyFeatures` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `metrics` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `stack` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developmentTime` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberTeam` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previewDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamType` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_slug_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "keyFeatures",
DROP COLUMN "metrics",
DROP COLUMN "slug",
DROP COLUMN "stack",
DROP COLUMN "title",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "demoLink" TEXT,
ADD COLUMN     "developmentTime" TEXT NOT NULL,
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "numberTeam" INTEGER NOT NULL,
ADD COLUMN     "previewDescription" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "teamType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StackItem" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "tooltip" JSONB,

    CONSTRAINT "StackItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyFeature" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "KeyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DescriptionBlock" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "DescriptionBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "current" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commit" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterItem" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT,
    "icon" TEXT NOT NULL,

    CONSTRAINT "FooterItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorStat" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "VisitorStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceStat" (
    "id" SERIAL NOT NULL,
    "device" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "color" TEXT,

    CONSTRAINT "DeviceStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficSource" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "TrafficSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutMe" (
    "id" SERIAL NOT NULL,
    "birth" INTEGER NOT NULL,
    "placeBirth" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "shortBio" TEXT NOT NULL,

    CONSTRAINT "AboutMe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "aboutMeId" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StackItem" ADD CONSTRAINT "StackItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyFeature" ADD CONSTRAINT "KeyFeature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescriptionBlock" ADD CONSTRAINT "DescriptionBlock_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
