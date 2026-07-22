-- AlterTable
ALTER TABLE "AboutMe" ADD COLUMN     "educationRu" TEXT,
ADD COLUMN     "locationRu" TEXT,
ADD COLUMN     "placeBirthRu" TEXT,
ADD COLUMN     "shortBioRu" TEXT;

-- AlterTable
ALTER TABLE "DescriptionBlock" ADD COLUMN     "contentRu" TEXT,
ADD COLUMN     "titleRu" TEXT;

-- AlterTable
ALTER TABLE "KeyFeature" ADD COLUMN     "textRu" TEXT,
ADD COLUMN     "titleRu" TEXT;

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "textRu" TEXT,
ADD COLUMN     "titleRu" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "dateRu" TEXT,
ADD COLUMN     "developmentTimeRu" TEXT,
ADD COLUMN     "previewDescriptionRu" TEXT,
ADD COLUMN     "shortDescriptionRu" TEXT;

-- AlterTable
ALTER TABLE "StackItem" ADD COLUMN     "tooltipRu" JSONB;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "descriptionRu" TEXT,
ADD COLUMN     "organizationRu" TEXT,
ADD COLUMN     "positionRu" TEXT;
