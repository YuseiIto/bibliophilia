/*
  Warnings:

  - Added the required column `isbn10` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isbn13` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isbn13" TEXT NOT NULL,
    "isbn10" TEXT NOT NULL
);
INSERT INTO "new_resources" ("id", "title") SELECT "id", "title" FROM "resources";
DROP TABLE "resources";
ALTER TABLE "new_resources" RENAME TO "resources";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
