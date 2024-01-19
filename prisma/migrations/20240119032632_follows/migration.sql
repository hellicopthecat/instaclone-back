-- CreateTable
CREATE TABLE "_FolloerRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FolloerRelation_AB_unique" ON "_FolloerRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FolloerRelation_B_index" ON "_FolloerRelation"("B");

-- AddForeignKey
ALTER TABLE "_FolloerRelation" ADD CONSTRAINT "_FolloerRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolloerRelation" ADD CONSTRAINT "_FolloerRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
