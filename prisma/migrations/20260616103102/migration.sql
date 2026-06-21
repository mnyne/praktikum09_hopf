/*
  Warnings:

  - Added the required column `userId` to the `Pixel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pixel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Pixel" ("color", "id", "updatedAt", "x", "y") SELECT "color", "id", "updatedAt", "x", "y" FROM "Pixel";
DROP TABLE "Pixel";
ALTER TABLE "new_Pixel" RENAME TO "Pixel";
CREATE UNIQUE INDEX "Pixel_x_y_key" ON "Pixel"("x", "y");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
