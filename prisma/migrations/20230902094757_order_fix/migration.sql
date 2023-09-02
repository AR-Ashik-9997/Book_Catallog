/*
  Warnings:

  - The `OrderedBook` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" DROP NOT NULL,
DROP COLUMN "OrderedBook",
ADD COLUMN     "OrderedBook" JSONB[];
