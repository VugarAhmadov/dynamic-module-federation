/*
  Warnings:

  - You are about to drop the column `routePath` on the `Remote` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Remote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scope" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL DEFAULT 'App',
    "frontUrl" TEXT NOT NULL,
    "remoteUrl" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Remote" ("frontUrl", "id", "isActive", "label", "moduleName", "remoteUrl", "scope") SELECT "frontUrl", "id", "isActive", "label", "moduleName", "remoteUrl", "scope" FROM "Remote";
DROP TABLE "Remote";
ALTER TABLE "new_Remote" RENAME TO "Remote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;