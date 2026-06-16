-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Thread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "authorName" TEXT NOT NULL DEFAULT 'Anonymous',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "new_Thread" ("authorName", "content", "createdAt", "id", "title")
SELECT 'Anonymous', "content", "createdAt", "id", "title" FROM "Thread";

DROP TABLE "Thread";
ALTER TABLE "new_Thread" RENAME TO "Thread";

CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "authorName" TEXT NOT NULL DEFAULT 'Anonymous',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "threadId" INTEGER NOT NULL,
    CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Post" ("authorName", "content", "createdAt", "id", "threadId")
SELECT 'Anonymous', "content", "createdAt", "id", "threadId" FROM "Post";

DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
