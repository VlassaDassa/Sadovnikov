-- DropForeignKey
ALTER TABLE "Commit" DROP CONSTRAINT "Commit_projectId_fkey";

-- AlterTable
ALTER TABLE "Commit" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "evolutionDraft" JSONB,
ADD COLUMN     "evolutionGeneratedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Commit_projectId_order_idx" ON "Commit"("projectId", "order");

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
