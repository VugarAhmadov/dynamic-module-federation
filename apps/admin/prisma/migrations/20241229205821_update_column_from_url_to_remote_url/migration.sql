/*
  Warnings:

  - You are about to drop the column `url` on the `Remote` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Remote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scope" TEXT NOT NULL DEFAULT '/',
    "moduleName" TEXT NOT NULL DEFAULT '/',
    "routePath" TEXT NOT NULL DEFAULT '/',
    "frontUrl" TEXT NOT NULL DEFAULT '/',
    "remoteUrl" TEXT NOT NULL DEFAULT '/',
    "label" TEXT NOT NULL DEFAULT 'test',
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_Remote" ("frontUrl", "id", "isActive", "label", "moduleName", "routePath", "scope") SELECT "frontUrl", "id", "isActive", "label", "moduleName", "routePath", "scope" FROM "Remote";
DROP TABLE "Remote";
ALTER TABLE "new_Remote" RENAME TO "Remote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
