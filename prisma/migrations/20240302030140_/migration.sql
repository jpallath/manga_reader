-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "series_id" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "nextPageId" TEXT,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_nextPageId_key" ON "Page"("nextPageId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_nextPageId_fkey" FOREIGN KEY ("nextPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
