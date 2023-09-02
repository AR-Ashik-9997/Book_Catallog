/*
  Warnings:

  - You are about to drop the column `OrderedBook` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "OrderedBook";

-- CreateTable
CREATE TABLE "orderedBook" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "orderedBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderedBook" ADD CONSTRAINT "orderedBook_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
