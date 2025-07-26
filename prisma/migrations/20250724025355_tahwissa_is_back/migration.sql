-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "about" VARCHAR(130) NOT NULL,
    "description" VARCHAR(1100) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wilaya" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "nickname" VARCHAR(60) NOT NULL,
    "about" VARCHAR(130) NOT NULL,
    "description" VARCHAR(600) NOT NULL,
    "weather" VARCHAR(400) NOT NULL,
    "transportation" VARCHAR(270) NOT NULL,
    "special" BOOLEAN NOT NULL,
    "food" JSONB NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "Wilaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    "visit" INTEGER NOT NULL,
    "link" VARCHAR(1024) NOT NULL,
    "price" INTEGER NOT NULL,
    "position" JSONB NOT NULL,
    "wilayaId" INTEGER NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Wilaya_name_key" ON "Wilaya"("name");

-- AddForeignKey
ALTER TABLE "Wilaya" ADD CONSTRAINT "Wilaya_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_wilayaId_fkey" FOREIGN KEY ("wilayaId") REFERENCES "Wilaya"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
