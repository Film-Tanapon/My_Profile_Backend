-- CreateEnum
CREATE TYPE "TechCategory" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOL', 'LANGUAGE', 'OTHER');
CREATE TYPE "TechUsageType" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOL', 'GENERAL');
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ACTIVE', 'COMPLETED', 'ARCHIVED');
CREATE TYPE "EmploymentType" AS ENUM ('INTERNSHIP', 'COOP', 'PART_TIME');
CREATE TYPE "WorkMode" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');
CREATE TYPE "EventType" AS ENUM ('HACKATHON', 'WORKSHOP', 'COMPETITION', 'CONFERENCE', 'MEETUP', 'OTHER');
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'OPEN_TO_WORK', 'BUSY', 'UNAVAILABLE');
CREATE TYPE "EducationLevel" AS ENUM ('HIGH_SCHOOL', 'VOCATIONAL', 'DIPLOMA', 'BACHELOR', 'MASTER', 'DOCTORATE', 'CERTIFICATE', 'OTHER');

-- Extend existing projects without losing the three existing records.
ALTER TABLE "projects"
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "shortDescription" TEXT,
  ADD COLUMN "gallery" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "repositoryURL" TEXT,
  ADD COLUMN "end_date" TIMESTAMP(3),
  ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0;

UPDATE "projects"
SET "slug" = CASE
  WHEN trim(both '-' FROM regexp_replace(lower("title"), '[^a-z0-9]+', '-', 'g')) = ''
    THEN 'project-' || "project_id"
  ELSE trim(both '-' FROM regexp_replace(lower("title"), '[^a-z0-9]+', '-', 'g')) || '-' || "project_id"
END;

ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "projects" ALTER COLUMN "status" TYPE "ProjectStatus"
USING CASE upper("status")
  WHEN 'PLANNING' THEN 'PLANNING'::"ProjectStatus"
  WHEN 'COMPLETED' THEN 'COMPLETED'::"ProjectStatus"
  WHEN 'ARCHIVED' THEN 'ARCHIVED'::"ProjectStatus"
  ELSE 'ACTIVE'::"ProjectStatus"
END;
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- Extend existing events. Missing legacy dates fall back to their creation date.
UPDATE "events" SET "event_date" = "createdAt" WHERE "event_date" IS NULL;
ALTER TABLE "events"
  ALTER COLUMN "event_date" SET NOT NULL,
  ADD COLUMN "eventType" "EventType" NOT NULL DEFAULT 'OTHER',
  ADD COLUMN "organizer" TEXT,
  ADD COLUMN "workMode" "WorkMode",
  ADD COLUMN "eventURL" TEXT,
  ADD COLUMN "certificateURL" TEXT,
  ADD COLUMN "result" TEXT,
  ADD COLUMN "endDate" TIMESTAMP(3),
  ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "profiles" (
  "profile_id" SERIAL NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "headline" TEXT,
  "biography" TEXT,
  "profileImageURL" TEXT,
  "coverImageURL" TEXT,
  "resumeURL" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "location" TEXT,
  "availabilityStatus" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id")
);

CREATE TABLE "social_links" (
  "social_link_id" SERIAL NOT NULL,
  "profile_id" INTEGER NOT NULL,
  "platform" TEXT NOT NULL,
  "label" TEXT,
  "url" TEXT NOT NULL,
  "icon" TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "social_links_pkey" PRIMARY KEY ("social_link_id")
);

CREATE TABLE "educations" (
  "education_id" SERIAL NOT NULL,
  "profile_id" INTEGER NOT NULL,
  "institutionName" TEXT NOT NULL,
  "institutionLogoURL" TEXT,
  "educationLevel" "EducationLevel" NOT NULL DEFAULT 'OTHER',
  "degree" TEXT,
  "fieldOfStudy" TEXT,
  "description" TEXT,
  "grade" TEXT,
  "location" TEXT,
  "startDate" TIMESTAMP(3) NOT NULL,
  "endDate" TIMESTAMP(3),
  "isCurrent" BOOLEAN NOT NULL DEFAULT false,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "educations_pkey" PRIMARY KEY ("education_id")
);

CREATE TABLE "tech_stacks" (
  "techstack_id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" "TechCategory" NOT NULL,
  "iconURL" TEXT,
  "color" TEXT,
  "websiteURL" TEXT,
  "proficiency" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "tech_stacks_pkey" PRIMARY KEY ("techstack_id")
);

CREATE TABLE "internships" (
  "intern_id" SERIAL NOT NULL,
  "companyName" TEXT NOT NULL,
  "companyLogoURL" TEXT,
  "position" TEXT NOT NULL,
  "employmentType" "EmploymentType" NOT NULL DEFAULT 'INTERNSHIP',
  "description" TEXT,
  "responsibilities" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "achievements" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "location" TEXT,
  "workMode" "WorkMode" NOT NULL DEFAULT 'ONSITE',
  "companyURL" TEXT,
  "startDate" TIMESTAMP(3) NOT NULL,
  "endDate" TIMESTAMP(3),
  "certificateURL" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "internships_pkey" PRIMARY KEY ("intern_id")
);

CREATE TABLE "project_tech_stacks" (
  "project_id" INTEGER NOT NULL,
  "techstack_id" INTEGER NOT NULL,
  "usageType" "TechUsageType" NOT NULL DEFAULT 'GENERAL',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "project_tech_stacks_pkey" PRIMARY KEY ("project_id", "techstack_id")
);

CREATE TABLE "intern_tech_stacks" (
  "intern_id" INTEGER NOT NULL,
  "techstack_id" INTEGER NOT NULL,
  "usageType" "TechUsageType" NOT NULL DEFAULT 'GENERAL',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "intern_tech_stacks_pkey" PRIMARY KEY ("intern_id", "techstack_id")
);

CREATE TABLE "event_tech_stacks" (
  "event_id" INTEGER NOT NULL,
  "techstack_id" INTEGER NOT NULL,
  "usageType" "TechUsageType" NOT NULL DEFAULT 'GENERAL',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "event_tech_stacks_pkey" PRIMARY KEY ("event_id", "techstack_id")
);

CREATE TABLE "intern_projects" (
  "intern_id" INTEGER NOT NULL,
  "project_id" INTEGER NOT NULL,
  CONSTRAINT "intern_projects_pkey" PRIMARY KEY ("intern_id", "project_id")
);

CREATE TABLE "event_projects" (
  "event_id" INTEGER NOT NULL,
  "project_id" INTEGER NOT NULL,
  CONSTRAINT "event_projects_pkey" PRIMARY KEY ("event_id", "project_id")
);

-- Preserve legacy comma-separated project technology values in normalized tables.
INSERT INTO "tech_stacks" ("name", "slug", "category", "updatedAt")
SELECT DISTINCT trim(value),
  trim(both '-' FROM regexp_replace(lower(trim(value)), '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(trim(value)), 1, 6),
  'FRONTEND'::"TechCategory", CURRENT_TIMESTAMP
FROM "projects", LATERAL unnest(string_to_array(COALESCE("frontendtechstack", ''), ',')) raw(value)
WHERE trim(value) <> '';

INSERT INTO "tech_stacks" ("name", "slug", "category", "updatedAt")
SELECT DISTINCT trim(value),
  trim(both '-' FROM regexp_replace(lower(trim(value)), '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(trim(value)), 1, 6),
  'BACKEND'::"TechCategory", CURRENT_TIMESTAMP
FROM "projects", LATERAL unnest(string_to_array(COALESCE("backendtechstack", ''), ',')) raw(value)
WHERE trim(value) <> ''
  AND NOT EXISTS (SELECT 1 FROM "tech_stacks" existing WHERE existing."name" = trim(value));

INSERT INTO "project_tech_stacks" ("project_id", "techstack_id", "usageType", "displayOrder")
SELECT p."project_id", t."techstack_id", 'FRONTEND'::"TechUsageType", (row_number() OVER (PARTITION BY p."project_id"))::integer
FROM "projects" p, LATERAL unnest(string_to_array(COALESCE(p."frontendtechstack", ''), ',')) raw(value)
JOIN "tech_stacks" t ON t."name" = trim(raw.value)
WHERE trim(raw.value) <> ''
ON CONFLICT DO NOTHING;

INSERT INTO "project_tech_stacks" ("project_id", "techstack_id", "usageType", "displayOrder")
SELECT p."project_id", t."techstack_id", 'BACKEND'::"TechUsageType", 100 + (row_number() OVER (PARTITION BY p."project_id"))::integer
FROM "projects" p, LATERAL unnest(string_to_array(COALESCE(p."backendtechstack", ''), ',')) raw(value)
JOIN "tech_stacks" t ON t."name" = trim(raw.value)
WHERE trim(raw.value) <> ''
ON CONFLICT DO NOTHING;

ALTER TABLE "projects" DROP COLUMN "frontendtechstack", DROP COLUMN "backendtechstack";

-- Indexes
CREATE UNIQUE INDEX "social_links_profile_id_platform_key" ON "social_links"("profile_id", "platform");
CREATE UNIQUE INDEX "tech_stacks_name_key" ON "tech_stacks"("name");
CREATE UNIQUE INDEX "tech_stacks_slug_key" ON "tech_stacks"("slug");
CREATE INDEX "social_links_profile_id_isVisible_displayOrder_idx" ON "social_links"("profile_id", "isVisible", "displayOrder");
CREATE INDEX "educations_profile_id_isPublished_displayOrder_idx" ON "educations"("profile_id", "isPublished", "displayOrder");
CREATE INDEX "educations_startDate_idx" ON "educations"("startDate");
CREATE INDEX "tech_stacks_category_idx" ON "tech_stacks"("category");
CREATE INDEX "projects_status_idx" ON "projects"("status");
CREATE INDEX "projects_featured_displayOrder_idx" ON "projects"("featured", "displayOrder");
CREATE INDEX "internships_startDate_idx" ON "internships"("startDate");
CREATE INDEX "events_eventType_idx" ON "events"("eventType");
CREATE INDEX "events_event_date_idx" ON "events"("event_date");
CREATE INDEX "project_tech_stacks_techstack_id_idx" ON "project_tech_stacks"("techstack_id");
CREATE INDEX "intern_tech_stacks_techstack_id_idx" ON "intern_tech_stacks"("techstack_id");
CREATE INDEX "event_tech_stacks_techstack_id_idx" ON "event_tech_stacks"("techstack_id");
CREATE INDEX "intern_projects_project_id_idx" ON "intern_projects"("project_id");
CREATE INDEX "event_projects_project_id_idx" ON "event_projects"("project_id");

-- Foreign keys
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "educations" ADD CONSTRAINT "educations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "project_tech_stacks" ADD CONSTRAINT "project_tech_stacks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "project_tech_stacks" ADD CONSTRAINT "project_tech_stacks_techstack_id_fkey" FOREIGN KEY ("techstack_id") REFERENCES "tech_stacks"("techstack_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "intern_tech_stacks" ADD CONSTRAINT "intern_tech_stacks_intern_id_fkey" FOREIGN KEY ("intern_id") REFERENCES "internships"("intern_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "intern_tech_stacks" ADD CONSTRAINT "intern_tech_stacks_techstack_id_fkey" FOREIGN KEY ("techstack_id") REFERENCES "tech_stacks"("techstack_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "event_tech_stacks" ADD CONSTRAINT "event_tech_stacks_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "event_tech_stacks" ADD CONSTRAINT "event_tech_stacks_techstack_id_fkey" FOREIGN KEY ("techstack_id") REFERENCES "tech_stacks"("techstack_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "intern_projects" ADD CONSTRAINT "intern_projects_intern_id_fkey" FOREIGN KEY ("intern_id") REFERENCES "internships"("intern_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "intern_projects" ADD CONSTRAINT "intern_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "event_projects" ADD CONSTRAINT "event_projects_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "event_projects" ADD CONSTRAINT "event_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
