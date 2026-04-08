-- CreateEnum
CREATE TYPE "public"."PublishStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "public"."UserTemplatePublish" (
    "id" TEXT NOT NULL,
    "userTemplateId" TEXT NOT NULL,
    "domainType" TEXT NOT NULL,
    "domain" TEXT,
    "note" TEXT,
    "status" "public"."PublishStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTemplatePublish_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserTemplatePublish" ADD CONSTRAINT "UserTemplatePublish_userTemplateId_fkey" FOREIGN KEY ("userTemplateId") REFERENCES "public"."UserTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
