require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Source: Film-Tanapon/Illusia0.2-Project and Film-Tanapon/Illusia_backend.
// Course, responsibilities, dates and Render deployment were supplied by the owner.
const technologies = [
  { name: "HTML", slug: "html", category: "FRONTEND", color: "#E34F26", usageType: "FRONTEND" },
  { name: "CSS", slug: "css", category: "FRONTEND", color: "#1572B6", usageType: "FRONTEND" },
  { name: "JavaScript", slug: "javascript", category: "LANGUAGE", color: "#F7DF1E", usageType: "FRONTEND" },
  { name: "Node.js", slug: "nodejs", category: "BACKEND", color: "#68A063", usageType: "BACKEND" },
  { name: "Express", slug: "express", category: "BACKEND", color: "#444444", usageType: "BACKEND" },
  { name: "PostgreSQL", slug: "postgresql", category: "DATABASE", color: "#336791", usageType: "DATABASE" },
  { name: "Render", slug: "render", category: "DEVOPS", color: "#46E3B7", usageType: "DEVOPS" },
];

async function seedIllusia() {
  const project = await prisma.$transaction(async (tx) => {
    const links = [];
    for (const [index, { usageType, ...data }] of technologies.entries()) {
      const tech = await tx.techStack.upsert({ where: { slug: data.slug }, create: data, update: {} });
      links.push({ techstackId: tech.techstackId, usageType, displayOrder: index + 1 });
    }
    const data = {
      title: "Illusia",
      slug: "illusia",
      shortDescription: "เกมเนื้อเรื่องแนวสยองขวัญแบบมีตัวเลือกบนเว็บ สำหรับรายวิชากระบวนการทางซอฟต์แวร์ ขณะเป็นนักศึกษาปีที่ 2",
      description: [
        "Illusia เป็นเกมเนื้อเรื่องแนวสยองขวัญแบบมีตัวเลือกบนเว็บ พัฒนาเป็นโปรเจกต์ส่งรายวิชากระบวนการทางซอฟต์แวร์ ขณะเป็นนักศึกษาปีที่ 2",
        "รองรับการสมัครสมาชิกและเข้าสู่ระบบ การแสดงฉากและตัวเลือกของเนื้อเรื่อง การบันทึกและโหลดความคืบหน้า รวมถึงหน้าจัดการเนื้อเรื่อง",
        "รับผิดชอบพัฒนา frontend และเป็นผู้รับผิดชอบหลักด้าน backend และ database โดยใช้ HTML, CSS และ JavaScript ร่วมกับ Node.js, Express และ PostgreSQL ออกแบบตารางผู้ใช้ บันทึกเกม และฉากเนื้อเรื่อง พร้อม API สำหรับเชื่อมต่อระบบ",
        "รับผิดชอบ deploy frontend, backend และ database บน Render ปัจจุบันเว็บไซต์ไม่ได้เปิดใช้งาน เนื่องจากฐานข้อมูลบน Render หมดอายุ",
        "Frontend repository: https://github.com/Film-Tanapon/Illusia0.2-Project",
        "Backend repository: https://github.com/Film-Tanapon/Illusia_backend",
      ].join("\n\n"),
      role: "Frontend Developer / Backend Developer (Main) / Database Developer (Main)",
      repositoryURL: "https://github.com/Film-Tanapon/Illusia0.2-Project",
      startDate: new Date("2025-08-22T00:00:00.000Z"),
      endDate: new Date("2025-11-17T00:00:00.000Z"),
      status: "COMPLETED",
      featured: true,
      displayOrder: 1,
    };
    const result = await tx.project.upsert({
      where: { slug: data.slug },
      create: { ...data, techStacks: { create: links } },
      update: data,
    });
    for (const link of links) {
      await tx.projectTechStack.upsert({
        where: { projectId_techstackId: { projectId: result.projectId, techstackId: link.techstackId } },
        create: { projectId: result.projectId, ...link },
        update: { usageType: link.usageType, displayOrder: link.displayOrder },
      });
    }
    return result;
  });
  console.log(`Seeded ${project.title} (id: ${project.projectId}) with ${technologies.length} tech stacks.`);
}


// App: https://github.com/Film-Tanapon/TwiTi-App-V0.2
// Backend: https://github.com/Film-Tanapon/Twiti-server-V0.2
async function seedTwiti() {
  const stack = [
    { name: "Flutter", slug: "flutter", category: "FRONTEND", color: "#02569B", usageType: "FRONTEND" },
    { name: "Dart", slug: "dart", category: "LANGUAGE", color: "#0175C2", usageType: "FRONTEND" },
    { name: "Go", slug: "go", category: "LANGUAGE", color: "#00ADD8", usageType: "BACKEND" },
    { name: "WebSocket", slug: "websocket", category: "TOOL", color: "#4353FF", usageType: "BACKEND" },
    { name: "PostgreSQL", slug: "postgresql", category: "DATABASE", color: "#336791", usageType: "DATABASE" },
    { name: "Supabase", slug: "supabase", category: "DATABASE", color: "#3ECF8E", usageType: "DATABASE" },
    { name: "Render", slug: "render", category: "DEVOPS", color: "#46E3B7", usageType: "DEVOPS" },
  ];
  const project = await prisma.$transaction(async (tx) => {
    const links = [];
    for (const [index, { usageType, ...data }] of stack.entries()) {
      const tech = await tx.techStack.upsert({ where: { slug: data.slug }, create: data, update: {} });
      links.push({ techstackId: tech.techstackId, usageType, displayOrder: index + 1 });
    }
    const data = {
      title: "TwiTi",
      slug: "twiti",
      shortDescription: "แอปโซเชียลพร้อมระบบโพสต์และแชต สำหรับรายวิชาการสื่อสารข้อมูลและเครือข่ายคอมพิวเตอร์ ขณะเป็นนักศึกษาปีที่ 2",
      description: [
        "TwiTi เป็นแอปโซเชียลที่พัฒนาด้วย Flutter และ Dart สำหรับส่งรายวิชาการสื่อสารข้อมูลและเครือข่ายคอมพิวเตอร์ ขณะเป็นนักศึกษาปีที่ 2",
        "รองรับระบบบัญชีผู้ใช้ โปรไฟล์ การสร้างโพสต์และความคิดเห็น การกดถูกใจ รีโพสต์ บุ๊กมาร์ก การติดตามผู้ใช้ การค้นหา และการแชตผ่าน WebSocket",
        "รับผิดชอบพัฒนา backend ด้วย Go และออกแบบและจัดการฐานข้อมูล PostgreSQL บน Supabase สำหรับผู้ใช้ โพสต์ ความสัมพันธ์ระหว่างผู้ใช้ และข้อความ พร้อมเชื่อมต่อแอปผ่าน HTTP และ WebSocket",
        "Deploy backend บน Render และใช้ Supabase สำหรับจัดการฐานข้อมูล พัฒนาแอปเสร็จแล้ว แต่ปัจจุบัน backend และ database ไม่ได้ทำงาน จึงไม่สามารถใช้งานบริการที่เชื่อมต่อระบบเหล่านี้ได้",
        "App repository: https://github.com/Film-Tanapon/TwiTi-App-V0.2",
        "Backend repository: https://github.com/Film-Tanapon/Twiti-server-V0.2",
      ].join("\n\n"),
      role: "Backend Developer / Database Developer",
      repositoryURL: "https://github.com/Film-Tanapon/Twiti-server-V0.2",
      startDate: new Date("2026-02-20T00:00:00.000Z"),
      endDate: new Date("2026-04-25T00:00:00.000Z"),
      status: "COMPLETED",
      featured: true,
      displayOrder: 2,
    };
    const result = await tx.project.upsert({
      where: { slug: data.slug },
      create: { ...data, techStacks: { create: links } },
      update: data,
    });
    for (const link of links) {
      await tx.projectTechStack.upsert({
        where: { projectId_techstackId: { projectId: result.projectId, techstackId: link.techstackId } },
        create: { projectId: result.projectId, ...link },
        update: { usageType: link.usageType, displayOrder: link.displayOrder },
      });
    }
    return result;
  });
  console.log(`Seeded ${project.title} (id: ${project.projectId}) with ${stack.length} tech stacks.`);
}

// RoPA CN334 Mini Hackathon, supported by NetBay.
async function seedRopa() {
  const stack = [
    { name: "Next.js", slug: "nextjs", category: "FRONTEND", color: "#111111", usageType: "FRONTEND" },
    { name: "React", slug: "react", category: "FRONTEND", color: "#61DAFB", usageType: "FRONTEND" },
    { name: "TypeScript", slug: "typescript", category: "LANGUAGE", color: "#3178C6", usageType: "FRONTEND" },
    { name: "Tailwind CSS", slug: "tailwind-css", category: "FRONTEND", color: "#38BDF8", usageType: "FRONTEND" },
    { name: "Python", slug: "python", category: "LANGUAGE", color: "#3776AB", usageType: "BACKEND" },
    { name: "FastAPI", slug: "fastapi", category: "BACKEND", color: "#009688", usageType: "BACKEND" },
    { name: "SQLAlchemy", slug: "sqlalchemy", category: "BACKEND", color: "#D71F00", usageType: "BACKEND" },
    { name: "PostgreSQL", slug: "postgresql", category: "DATABASE", color: "#336791", usageType: "DATABASE" },
    { name: "Supabase", slug: "supabase", category: "DATABASE", color: "#3ECF8E", usageType: "DATABASE" },
    { name: "Render", slug: "render", category: "DEVOPS", color: "#46E3B7", usageType: "DEVOPS" },
  ];
  const project = await prisma.$transaction(async (tx) => {
    const links = [];
    for (const [index, { usageType, ...data }] of stack.entries()) {
      const tech = await tx.techStack.upsert({ where: { slug: data.slug }, create: data, update: {} });
      links.push({ techstackId: tech.techstackId, usageType, displayOrder: index + 1 });
    }
    const data = {
      title: "RoPA",
      slug: "ropa",
      shortDescription: "ระบบบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคล สำหรับ RoPA Mini Hackathon by NetBay ขณะเป็นนักศึกษาปีที่ 2 กำลังปรับปรุงเพื่อเปิด showcase",
      description: [
        "RoPA เป็นเว็บแอปสำหรับจัดการบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคล (Records of Processing Activities) พัฒนาใน CN334 Mini Hackathon 2026 ซึ่งได้รับการสนับสนุนจาก NetBay ขณะเป็นนักศึกษาปีที่ 2",
        "รองรับการจัดการผู้ใช้และบทบาท บันทึกกิจกรรมการประมวลผลข้อมูล การโอนข้อมูล มาตรการรักษาความปลอดภัย ระยะเวลาเก็บรักษา ประวัติการเปลี่ยนแปลง (Audit Log) ข้อเสนอแนะ และคำร้อง",
        "รับผิดชอบ backend และ database โดยพัฒนา API ด้วย Python และ FastAPI ใช้ SQLAlchemy เชื่อมต่อ PostgreSQL บน Supabase ส่วน frontend ของโปรเจกต์ใช้ Next.js, React, TypeScript และ Tailwind CSS",
        "Deploy backend บน Render และ database บน Supabase ช่วงพัฒนาโปรเจกต์สำหรับ mini hackathon คือ 20 มีนาคม ถึง 27 เมษายน 2026 ปัจจุบันเว็บไซต์ไม่ได้เปิดใช้งานและกำลังปรับปรุงเพื่อเปิด showcase ในภายหลัง",
        "Frontend repository: https://github.com/Film-Tanapon/RoPA_Frontend_CN334",
        "Backend repository: https://github.com/Film-Tanapon/RoPA_Backend_CN334",
        "Mini hackathon: https://sites.google.com/view/cn334-minihack/home",
      ].join("\n\n"),
      role: "Backend Developer / Database Developer",
      repositoryURL: "https://github.com/Film-Tanapon/RoPA_Backend_CN334",
      startDate: new Date("2026-03-20T00:00:00.000Z"),
      endDate: new Date("2026-04-27T00:00:00.000Z"),
      // Original project period is retained while showcase improvements continue.
      status: "ACTIVE",
      featured: true,
      displayOrder: 3,
    };
    const result = await tx.project.upsert({
      where: { slug: data.slug },
      create: { ...data, techStacks: { create: links } },
      update: data,
    });
    for (const link of links) {
      await tx.projectTechStack.upsert({
        where: { projectId_techstackId: { projectId: result.projectId, techstackId: link.techstackId } },
        create: { projectId: result.projectId, ...link },
        update: { usageType: link.usageType, displayOrder: link.displayOrder },
      });
    }
    return result;
  });
  console.log(`Seeded ${project.title} (id: ${project.projectId}) with ${stack.length} tech stacks.`);
}

async function seedIptv() {
  const stack = [
    { name: "Node.js", slug: "nodejs", category: "BACKEND", color: "#68A063", usageType: "BACKEND" },
    { name: "Express", slug: "express", category: "BACKEND", color: "#444444", usageType: "BACKEND" },
    { name: "Prisma", slug: "prisma", category: "BACKEND", color: "#2D3748", usageType: "BACKEND" },
    { name: "MySQL", slug: "mysql", category: "DATABASE", color: "#4479A1", usageType: "DATABASE" },
    { name: "FFmpeg", slug: "ffmpeg", category: "TOOL", color: "#007808", usageType: "BACKEND" },
    { name: "Bento4", slug: "bento4", category: "TOOL", color: "#EC681C", usageType: "BACKEND" },
    { name: "Linux", slug: "linux", category: "DEVOPS", color: "#FCC624", usageType: "DEVOPS" },
    { name: "Docker", slug: "docker", category: "DEVOPS", color: "#2496ED", usageType: "DEVOPS" },
  ];
  await prisma.$transaction(async (tx) => {
    const links = [];
    for (const [index, { usageType, ...data }] of stack.entries()) {
      const tech = await tx.techStack.upsert({ where: { slug: data.slug }, create: data, update: {} });
      links.push({ techstackId: tech.techstackId, usageType, displayOrder: index + 1 });
    }
    const startDate = new Date("2026-05-21T00:00:00.000Z");
    const endDate = new Date("2026-07-31T00:00:00.000Z");
    const data = {
      title: "IPTV Backend",
      slug: "iptv-backend",
      shortDescription: "Backend ระบบ IPTV พร้อมการแบ่ง segment วิดีโอด้วย Bento4 และ FFmpeg พัฒนาระหว่างฝึกงานที่ SmartClick",
      description: [
        "ได้รับมอบหมายให้พัฒนา backend โปรเจกต์ IPTV ระหว่างฝึกงานภาคฤดูร้อนที่บริษัท สมาร์ทคลิ๊ก โซลูชั่น จำกัด (Smartclick Solution Co., Ltd.) ขณะเป็นนักศึกษาปีที่ 2 ขึ้นปีที่ 3",
        "พัฒนา backend ด้วย Node.js และ Express ใช้ Prisma ORM เชื่อมต่อ MySQL รองรับการจัดการวิดีโอและการให้บริการวิดีโอแบบ HLS",
        "ใช้ FFmpeg และ Bento4 เพื่อประมวลผลวิดีโอและแบ่งเป็น segment สำหรับสตรีมมิง รวมถึงเข้าไปติดตั้งโค้ดและ deploy บน Linux ของบริษัท",
        "ช่วงฝึกงาน: 21 พฤษภาคม ถึง 31 กรกฎาคม 2026 ข้อมูลเทคโนโลยีอ้างอิง checkout ของ repository สาขา master ในเครื่อง โดยไม่ได้ยืนยันสถานะบริการปัจจุบัน",
        "Repository (master): https://github.com/meoc-smc/iptv-backend/tree/master",
        "Company: https://www.smartclick.co.th/",
      ].join("\n\n"),
      role: "Backend Developer Intern",
      repositoryURL: "https://github.com/meoc-smc/iptv-backend/tree/master",
      startDate,
      endDate,
      status: "COMPLETED",
      featured: true,
      displayOrder: 4,
    };
    const project = await tx.project.upsert({ where: { slug: data.slug }, create: data, update: data });
    const internData = {
      companyName: "Smartclick Solution Co., Ltd.",
      companyURL: "https://www.smartclick.co.th/",
      position: "Backend Developer Intern",
      employmentType: "INTERNSHIP",
      description: "ฝึกงานภาคฤดูร้อน ขณะเป็นนักศึกษาปีที่ 2 ขึ้นปีที่ 3 ได้รับมอบหมายให้พัฒนา backend โปรเจกต์ IPTV พร้อมประมวลผลวิดีโอและ deploy บน Linux ของบริษัท",
      responsibilities: [
        "พัฒนา backend โปรเจกต์ IPTV",
        "ประมวลผลและแบ่ง segment วิดีโอด้วย FFmpeg และ Bento4",
        "ติดตั้งโค้ดและ deploy บน Linux ของบริษัท",
      ],
      startDate,
      endDate,
    };
    // Intern has no unique slug; identify this internship by company and dates.
    const existing = await tx.intern.findFirst({ where: { companyURL: internData.companyURL, startDate, endDate } });
    const internship = existing
      ? await tx.intern.update({ where: { internId: existing.internId }, data: internData })
      : await tx.intern.create({ data: internData });
    for (const link of links) {
      await tx.projectTechStack.upsert({
        where: { projectId_techstackId: { projectId: project.projectId, techstackId: link.techstackId } },
        create: { projectId: project.projectId, ...link },
        update: { usageType: link.usageType, displayOrder: link.displayOrder },
      });
      await tx.internTechStack.upsert({
        where: { internId_techstackId: { internId: internship.internId, techstackId: link.techstackId } },
        create: { internId: internship.internId, ...link },
        update: { usageType: link.usageType, displayOrder: link.displayOrder },
      });
    }
    const relation = { internId: internship.internId, projectId: project.projectId };
    await tx.internProject.upsert({ where: { internId_projectId: relation }, create: relation, update: {} });
    console.log(`Seeded ${project.title} (id: ${project.projectId}) and SmartClick internship (id: ${internship.internId}).`);
  });
}

async function seedRopaEvent() {
  await prisma.$transaction(async (tx) => {
    const project = await tx.project.findUniqueOrThrow({ where: { slug: "ropa" }, include: { techStacks: true } });
    const data = {
      title: "RoPA Mini Hackathon by NetBay",
      eventType: "HACKATHON",
      organizer: "NetBay x TSE",
      eventURL: "https://sites.google.com/view/cn334-minihack/home",
      description: "เข้าร่วม CN334 Mini Hackathon 2026 ขณะเป็นนักศึกษาปีที่ 2 พัฒนาระบบ RoPA สำหรับจัดการบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคล โดยรับผิดชอบ backend และ database กิจกรรมจัดระหว่าง 19 มีนาคม ถึง 30 เมษายน 2026",
      role: "Backend Developer / Database Developer",
      startDate: new Date("2026-03-19T00:00:00.000Z"),
      endDate: new Date("2026-04-30T00:00:00.000Z"),
      featured: true,
    };
    const existing = await tx.event.findFirst({ where: { eventURL: data.eventURL, startDate: data.startDate } });
    const event = existing
      ? await tx.event.update({ where: { eventId: existing.eventId }, data })
      : await tx.event.create({ data });
    const relation = { eventId: event.eventId, projectId: project.projectId };
    await tx.eventProject.upsert({ where: { eventId_projectId: relation }, create: relation, update: {} });
    for (const { techstackId, usageType, displayOrder } of project.techStacks) {
      const key = { eventId: event.eventId, techstackId };
      await tx.eventTechStack.upsert({
        where: { eventId_techstackId: key },
        create: { ...key, usageType, displayOrder },
        update: { usageType, displayOrder },
      });
    }
    console.log(`Seeded ${event.title} (id: ${event.eventId}) linked to RoPA.`);
  });
}

async function main() {
  await seedIllusia();
  await seedTwiti();
  await seedRopa();
  await seedRopaEvent();
  await seedIptv();
}

main()
  .catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });






