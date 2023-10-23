-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderDetail" TEXT NOT NULL,
    "delivery" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
