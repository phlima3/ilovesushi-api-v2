/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "margem_lucro" DOUBLE PRECISION,
    "ingredientes" JSONB NOT NULL,
    "total_ingredientes" DOUBLE PRECISION,
    "total_com_precos_fixos" DOUBLE PRECISION,
    "total_ifood" DOUBLE PRECISION,
    "total_goomer" DOUBLE PRECISION,
    "tipo" TEXT,
    "preco_final_ifood" DOUBLE PRECISION,
    "preco_final_goomer" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "quantidade_total" DOUBLE PRECISION NOT NULL,
    "custo_total" DOUBLE PRECISION NOT NULL,
    "custo_por_unidade" DOUBLE PRECISION NOT NULL,
    "fornecedor" TEXT,
    "data_compra" TEXT,
    "validade" TEXT,
    "descricao" TEXT,
    "custo_adicional" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixed_prices" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fixed_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_volume" (
    "id" TEXT NOT NULL DEFAULT 'current',
    "volume" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_volume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL DEFAULT 'current',
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);
