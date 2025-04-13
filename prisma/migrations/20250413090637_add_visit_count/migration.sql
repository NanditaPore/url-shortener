-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShortenedURL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_ShortenedURL" ("createdAt", "id", "originalURL", "shortURL") SELECT "createdAt", "id", "originalURL", "shortURL" FROM "ShortenedURL";
DROP TABLE "ShortenedURL";
ALTER TABLE "new_ShortenedURL" RENAME TO "ShortenedURL";
CREATE UNIQUE INDEX "ShortenedURL_shortURL_key" ON "ShortenedURL"("shortURL");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
