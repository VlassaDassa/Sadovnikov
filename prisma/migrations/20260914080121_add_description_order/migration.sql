-- AlterTable
ALTER TABLE "DescriptionBlock" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "DescriptionBlock_order_idx" ON "DescriptionBlock"("order");
