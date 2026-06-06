/*
  Warnings:

  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'QUOTE_SENT', 'CONFIRMED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('REQUEST', 'SALE', 'CONTENT', 'STOCK');

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_vehicleId_fkey";

-- DropTable
DROP TABLE "Lead";

-- DropEnum
DROP TYPE "LeadStatus";

-- CreateTable
CREATE TABLE "customer_requests" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "message" TEXT NOT NULL,
    "vehicleId" TEXT,
    "desiredMake" TEXT,
    "desiredModel" TEXT,
    "budget" INTEGER,
    "preferredCountry" "Country",
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "assignedTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "source" TEXT,
    "referrer" TEXT,

    CONSTRAINT "customer_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "entityType" TEXT,
    "entityId" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "customer_requests_status_idx" ON "customer_requests"("status");

-- CreateIndex
CREATE INDEX "customer_requests_createdAt_idx" ON "customer_requests"("createdAt");

-- CreateIndex
CREATE INDEX "customer_requests_email_idx" ON "customer_requests"("email");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- AddForeignKey
ALTER TABLE "customer_requests" ADD CONSTRAINT "customer_requests_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_requests" ADD CONSTRAINT "customer_requests_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
