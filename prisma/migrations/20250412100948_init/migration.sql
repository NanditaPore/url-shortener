-- CreateTable
CREATE TABLE "ShortenedURL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedURL_shortURL_key" ON "ShortenedURL"("shortURL");
