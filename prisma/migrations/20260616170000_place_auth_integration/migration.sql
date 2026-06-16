-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Pixel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Pixel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "new_Pixel" ("color", "id", "updatedAt", "visible", "x", "y")
SELECT "color", "id", "updatedAt", "visible", "x", "y" FROM "Pixel";

DROP TABLE "Pixel";
ALTER TABLE "new_Pixel" RENAME TO "Pixel";

CREATE INDEX "Pixel_x_y_visible_idx" ON "Pixel"("x", "y", "visible");
CREATE INDEX "Pixel_updatedAt_idx" ON "Pixel"("updatedAt");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
