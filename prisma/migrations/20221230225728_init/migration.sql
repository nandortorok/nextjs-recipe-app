-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "short" TEXT,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversion" (
    "imperialUnitId" INTEGER NOT NULL,
    "metricUnitId" INTEGER NOT NULL,
    "imperialAmount" INTEGER NOT NULL,
    "metricAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "conversion_pkey" PRIMARY KEY ("metricUnitId","imperialUnitId")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direction" (
    "step_number" SERIAL NOT NULL,
    "direction" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "section_recipe_id" INTEGER NOT NULL,

    CONSTRAINT "direction_pkey" PRIMARY KEY ("step_number")
);

-- CreateTable
CREATE TABLE "section_ingredient" (
    "section_id" INTEGER NOT NULL,
    "section_recipe_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "unit_id" INTEGER,
    "amount" INTEGER,

    CONSTRAINT "section_ingredient_pkey" PRIMARY KEY ("section_id","section_recipe_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "prep_time" INTEGER NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "recipe_id" INTEGER NOT NULL,
    "title" TEXT,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id","recipe_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "conversion_imperialUnitId_key" ON "conversion"("imperialUnitId");

-- AddForeignKey
ALTER TABLE "conversion" ADD CONSTRAINT "conversion_imperialUnitId_fkey" FOREIGN KEY ("imperialUnitId") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversion" ADD CONSTRAINT "conversion_metricUnitId_fkey" FOREIGN KEY ("metricUnitId") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direction" ADD CONSTRAINT "direction_section_id_section_recipe_id_fkey" FOREIGN KEY ("section_id", "section_recipe_id") REFERENCES "section"("id", "recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_ingredient" ADD CONSTRAINT "section_ingredient_section_id_section_recipe_id_fkey" FOREIGN KEY ("section_id", "section_recipe_id") REFERENCES "section"("id", "recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_ingredient" ADD CONSTRAINT "section_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_ingredient" ADD CONSTRAINT "section_ingredient_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
