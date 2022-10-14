-- CreateTable
CREATE TABLE "accounts_tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts_tokens" ADD CONSTRAINT "accounts_tokens_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
