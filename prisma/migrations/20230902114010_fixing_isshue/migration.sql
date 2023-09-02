/*
  Warnings:

  - You are about to drop the `orderedBook` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `status` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orderedBook" DROP CONSTRAINT "orderedBook_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBooks" JSONB[],
ALTER COLUMN "status" SET NOT NULL;

-- DropTable
DROP TABLE "orderedBook";
