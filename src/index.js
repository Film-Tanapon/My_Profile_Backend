require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const eventsRouter = require("./routes/events");
const projectsRouter = require("./routes/projects");
const relationsRouter = require("./routes/relations");
const { profiles, socialLinks, educations, techStacks, interns } = require("./routes/resources");
const { uploadsRouter, uploadRoot } = require("./routes/uploads");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(require("./admin-auth")(process.env.ADMIN_PASSWORD));
app.use(express.static("public"));
app.use("/uploads", express.static(uploadRoot, { maxAge: "7d", immutable: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running 🚀",
    endpoints: {
      admin: "/admin",
      profiles: "/api/profiles",
      socialLinks: "/api/social-links",
      educations: "/api/educations",
      techStacks: "/api/tech-stacks",
      projects: "/api/projects",
      interns: "/api/interns",
      events: "/api/events",
      relations: "/api/relations",
      uploadImage: "/api/uploads/images",
      health: "/health",
    },
  });
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

app.use("/api/events",   eventsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/profiles", profiles);
app.use("/api/social-links", socialLinks);
app.use("/api/educations", educations);
app.use("/api/tech-stacks", techStacks);
app.use("/api/interns", interns);
app.use("/api/relations", relationsRouter);
app.use("/api/uploads", uploadsRouter);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Error handler ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || (err.name === "MulterError" ? 400 : err.code === "P2025" ? 404 : err.code === "P2002" ? 409 : 500);
  res.status(status).json({ success: false, message: status === 500 ? err.message || "Internal server error" : err.message });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
