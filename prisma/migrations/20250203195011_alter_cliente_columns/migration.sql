/*
  Warnings:

  - Changed the type of `telefone` on the `Cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cpf` on the `Cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "telefone",
ADD COLUMN     "telefone" INTEGER NOT NULL,
DROP COLUMN "cpf",
ADD COLUMN     "cpf" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
