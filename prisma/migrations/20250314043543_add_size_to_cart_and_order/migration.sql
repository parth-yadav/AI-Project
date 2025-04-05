-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "size" TEXT NOT NULL DEFAULT 'M';

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "size" TEXT NOT NULL DEFAULT 'M';
