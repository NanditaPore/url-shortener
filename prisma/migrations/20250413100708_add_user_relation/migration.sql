/*
  Warnings:

  - Added the required column `userId` to the `ShortenedURL` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShortenedURL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ShortenedURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShortenedURL" ("createdAt", "id", "originalURL", "shortURL", "visitCount") SELECT "createdAt", "id", "originalURL", "shortURL", "visitCount" FROM "ShortenedURL";
DROP TABLE "ShortenedURL";
ALTER TABLE "new_ShortenedURL" RENAME TO "ShortenedURL";
CREATE UNIQUE INDEX "ShortenedURL_shortURL_key" ON "ShortenedURL"("shortURL");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
