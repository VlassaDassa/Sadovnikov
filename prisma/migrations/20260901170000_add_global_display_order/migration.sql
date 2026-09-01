ALTER TABLE "Skill" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Stack" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "FooterItem" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "WorkExperience" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

WITH ordered AS (
    SELECT "id", ROW_NUMBER() OVER (ORDER BY "id") - 1 AS position
    FROM "Skill"
)
UPDATE "Skill"
SET "order" = ordered.position
FROM ordered
WHERE "Skill"."id" = ordered."id";

WITH ordered AS (
    SELECT "id", ROW_NUMBER() OVER (ORDER BY "id") - 1 AS position
    FROM "Stack"
)
UPDATE "Stack"
SET "order" = ordered.position
FROM ordered
WHERE "Stack"."id" = ordered."id";

WITH ordered AS (
    SELECT "id", ROW_NUMBER() OVER (ORDER BY "id") - 1 AS position
    FROM "FooterItem"
)
UPDATE "FooterItem"
SET "order" = ordered.position
FROM ordered
WHERE "FooterItem"."id" = ordered."id";

WITH ordered AS (
    SELECT
        "id",
        ROW_NUMBER() OVER (
            PARTITION BY "aboutMeId"
            ORDER BY "id"
        ) - 1 AS position
    FROM "WorkExperience"
)
UPDATE "WorkExperience"
SET "order" = ordered.position
FROM ordered
WHERE "WorkExperience"."id" = ordered."id";

CREATE INDEX "Skill_order_idx" ON "Skill"("order");
CREATE INDEX "Stack_order_idx" ON "Stack"("order");
CREATE INDEX "FooterItem_order_idx" ON "FooterItem"("order");
CREATE INDEX "WorkExperience_aboutMeId_order_idx"
ON "WorkExperience"("aboutMeId", "order");
