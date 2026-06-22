-- DropIndex
DROP INDEX "Pixel_x_y_key";

-- CreateIndex
CREATE INDEX "Pixel_x_y_visible_idx" ON "Pixel"("x", "y", "visible");

-- CreateIndex
CREATE INDEX "Pixel_updatedAt_idx" ON "Pixel"("updatedAt");
