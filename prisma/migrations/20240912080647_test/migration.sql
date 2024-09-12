-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "id" SERIAL NOT NULL,
    "money" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 160,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eat" (
    "id" SERIAL NOT NULL,
    "money" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 2000,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Eat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cash" (
    "id" SERIAL NOT NULL,
    "money" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 800,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Cash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "money" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Travel_walletId_key" ON "Travel"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "Eat_walletId_key" ON "Eat"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "Cash_walletId_key" ON "Cash"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_walletId_key" ON "Bank"("walletId");

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eat" ADD CONSTRAINT "Eat_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cash" ADD CONSTRAINT "Cash_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
