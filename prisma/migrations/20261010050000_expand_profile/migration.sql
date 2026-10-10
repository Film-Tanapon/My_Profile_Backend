ALTER TABLE "profiles" ADD COLUMN "englishName" TEXT;
ALTER TABLE "profiles" ADD COLUMN "shortBio" TEXT;
ALTER TABLE "profiles" ADD COLUMN "currentRole" TEXT;
ALTER TABLE "profiles" ADD COLUMN "websiteURL" TEXT;
ALTER TABLE "profiles" ADD COLUMN "contactEmail" TEXT;
ALTER TABLE "profiles" ADD COLUMN "timezone" TEXT;
ALTER TABLE "profiles" ADD COLUMN "preferredRoles" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "profiles" ADD COLUMN "languages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "profiles" ADD COLUMN "interests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
