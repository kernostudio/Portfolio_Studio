-- DropForeignKey
ALTER TABLE "public"."UserTemplatePublish" DROP CONSTRAINT "UserTemplatePublish_userTemplateId_fkey";

-- AddForeignKey
ALTER TABLE "public"."UserTemplatePublish" ADD CONSTRAINT "UserTemplatePublish_userTemplateId_fkey" FOREIGN KEY ("userTemplateId") REFERENCES "public"."UserTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
