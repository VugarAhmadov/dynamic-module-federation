-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Remote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scope" TEXT NOT NULL DEFAULT '/',
    "moduleName" TEXT NOT NULL DEFAULT '/',
    "routePath" TEXT NOT NULL DEFAULT '/',
    "frontUrl" TEXT NOT NULL DEFAULT '/',
    "url" TEXT NOT NULL DEFAULT '/',
    "label" TEXT NOT NULL DEFAULT 'test',
    "isActive" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "UserRemotes" (
    "userId" INTEGER NOT NULL,
    "remoteId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "remoteId"),
    CONSTRAINT "UserRemotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserRemotes_remoteId_fkey" FOREIGN KEY ("remoteId") REFERENCES "Remote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
