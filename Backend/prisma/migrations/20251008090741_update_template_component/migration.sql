/*
  Warnings:

  - You are about to drop the column `html` on the `Template` table. All the data in the column will be lost.
  - Added the required column `componentCode` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Template" DROP COLUMN "html",
ADD COLUMN     "componentCode" TEXT NOT NULL;
