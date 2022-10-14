/*
  Warnings:

  - You are about to drop the column `expires_date` on the `accounts_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts_tokens" DROP COLUMN "expires_date";
