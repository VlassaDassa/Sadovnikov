-- AlterTable
CREATE SEQUENCE descriptionblock_order_seq;
ALTER TABLE "DescriptionBlock" ALTER COLUMN "order" SET DEFAULT nextval('descriptionblock_order_seq');
ALTER SEQUENCE descriptionblock_order_seq OWNED BY "DescriptionBlock"."order";
