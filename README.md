# Film Portfolio — Backend & Admin

Backend สำหรับเว็บ Portfolio ใช้ Node.js, Express, Prisma และ PostgreSQL พร้อม Admin จัดการ Profile, Social Links, Education, Tech Stack, Projects, Internships และ Events

## เริ่มใช้งานด้วย Docker

ติดตั้ง Docker Engine/Desktop และ Compose จากนั้นรันคำสั่งทั้งหมดในโฟลเดอร์ backend

คัดลอก .env.example เป็น .env:

```powershell
Copy-Item .env.example .env
```

บน Linux ใช้ `cp .env.example .env` ตั้ง `ADMIN_PASSWORD` เป็นรหัสของคุณก่อนเริ่มระบบ:

```dotenv
ADMIN_PASSWORD=your-own-password
```

```sh
docker compose up -d --build
```

| URL | หน้าที่ |
|---|---|
| http://localhost:3001/admin/ | หน้าเข้าสู่ระบบ Admin |
| http://localhost:3001/health | ตรวจ API และการเชื่อมต่อฐานข้อมูล |
| http://localhost:3001/api/projects | ตัวอย่างอ่านข้อมูลโปรเจกต์ |

Compose เริ่มบริการ api และ db และใช้ `prisma db push` สร้าง/ปรับ schema อัตโนมัติ ไม่รัน seed ให้เอง หากเป็นฐานข้อมูลใหม่และต้องการข้อมูลเริ่มต้นให้รัน:

```sh
docker compose exec api npm run db:seed
```

## Environment

| ค่า | การใช้งาน |
|---|---|
| `DATABASE_URL` | PostgreSQL connection สำหรับรัน Node/Prisma ในเครื่อง |
| `ADMIN_PASSWORD` | รหัสเข้า Admin จำเป็นสำหรับ Docker Compose |
| `PORT` | พอร์ต Node ค่าเริ่มต้น 3001 |
| `NODE_ENV` | โหมดการทำงาน |
| `UPLOAD_DIR` | ที่เก็บรูป ค่าเริ่มต้น storage/uploads |

Compose กำหนด DATABASE_URL, PORT, NODE_ENV และ UPLOAD_DIR ให้ api โดยตรง ส่วน ADMIN_PASSWORD อ่านจาก .env ของ backend การแก้ DATABASE_URL ใน .env จึงไม่ได้เปลี่ยนฐานข้อมูลของ Compose

ค่า user/password/database ของ PostgreSQL ปัจจุบันกำหนดใน docker-compose.yml ถ้าปรับ ต้องปรับ DATABASE_URL ของ api ให้ตรงกันด้วย การแก้ credentials ใน Compose ไม่เปลี่ยน credentials ของฐานข้อมูลใน volume ที่สร้างไว้แล้ว

ห้าม commit .env หรือรหัสจริงขึ้น Git และอย่าใส่ ADMIN_PASSWORD ใน VITE_* ของ frontend

## พัฒนาแบบ Local

ใช้ Node.js 22 และ PostgreSQL ที่เปิดใช้งานอยู่:

```sh
npm ci
npm run db:generate
npm run db:push
npm run dev
```

ตั้ง DATABASE_URL ใน .env ให้ตรงกับ PostgreSQL ของคุณก่อนรัน ถ้าใช้ PostgreSQL จาก Compose ให้เริ่มเฉพาะ db:

```sh
docker compose up -d db
```

ใช้ connection ของ localhost:5432 และ credentials ตาม Compose อย่ารัน Node ในเครื่องกับ api container บนพอร์ต 3001 พร้อมกัน

`npm run dev` ใช้ nodemon ส่วน `npm start` รัน Node ปกติ Frontend พัฒนาแยกที่พอร์ต 5173 และส่งต่อ API มาที่ backend

## Admin และรหัสผ่าน

เปิด /admin/ แล้วกรอกรหัสตรงกับ ADMIN_PASSWORD ระบบใช้ session cookie แบบ HttpOnly และ SameSite=Strict มีอายุ 8 ชั่วโมง Session หมดอายุเมื่อ backend รีสตาร์ต และมีปุ่มออกจากระบบ

รหัสผิด 10 ครั้งต่อ IP ภายใน 15 นาทีจะถูกจำกัดการเข้าสู่ระบบชั่วคราว หากไม่มี ADMIN_PASSWORD การเข้าสู่ระบบจะไม่เปิดให้ใช้งาน

หลังเปลี่ยนรหัสใน .env:

```sh
docker compose up -d
```

ถ้ารัน Local ให้รีสตาร์ต Node การอ่าน API เป็น public แต่การเพิ่ม แก้ไข ลบ และอัปโหลดรูปต้องมี session Admin และคำขอที่มี Origin ต้องตรงกับ backend host ที่ใช้เข้าถึง

Admin รองรับค้นหา เพิ่ม แก้ไข และลบข้อมูล สำหรับ Project/Intern/Event มีตัวอย่างหน้ารายละเอียด เพิ่มย่อหน้า รูปปก gallery เลือก Tech Stack และเชื่อมโปรเจกต์ได้

สีรายรายการเก็บเป็น HEX 6 หลัก เช่น #F5EEDD:

| Field | หน้าที่ |
|---|---|
| `themeColor` | สีพื้นหลัง |
| `dotColor` | สีลายจุด |
| `fontColor` | สีตัวอักษร |

เว้นว่างหรือคืนสีเริ่มต้นเพื่อบันทึกเป็น null และใช้สี default ช่อง workMode ของ Event เว้นว่างได้ หรือเลือก ONSITE, REMOTE, HYBRID

## รูปภาพและไฟล์

รองรับ JPEG, PNG, WebP, GIF, AVIF สูงสุด 15 MB ต่อรูป รูปถูกเก็บใน storage/uploads/images และเปิดผ่าน /uploads/images/{filename} Docker เก็บใน volume portfolio_uploads

`POST /api/uploads/images` รับ multipart/form-data ชื่อ field `image` และต้องเข้าสู่ระบบ Response มี data.url สำหรับบันทึกในรายการ การใช้ URL ภายนอกไม่คัดลอกไฟล์นั้นมาเก็บในระบบ

## API

Resources: profiles, social-links, educations, tech-stacks, projects, interns, events

| Method | Path | หน้าที่ |
|---|---|---|
| GET | /api/{resource} | อ่านรายการ ค้นหาด้วย ?q= |
| GET | /api/{resource}/:id | อ่านรายการเดียว |
| POST | /api/{resource} | เพิ่มข้อมูล |
| PUT / PATCH | /api/{resource}/:id | แก้ไขข้อมูล โดย PATCH ส่งเฉพาะ field ที่ต้องการ |
| DELETE | /api/{resource}/:id | ลบรายการ |

คำขอเขียนต้องส่ง session cookie ที่ได้จาก `POST /admin/login` body `{"password":"..."}` ออกจากระบบด้วย `POST /admin/logout` รูปแบบ response หลักเป็น `{success, data}` หรือ `{success, message}`

Project/Intern/Event รับ techStackEntries เป็น array ของ `{techstackId, usageType}` ส่วน Intern/Event รับ linkedProjectIds เป็น array ของ projectId การแก้ข้อมูลกับความสัมพันธ์ทำใน transaction ส่ง [] เพื่อล้างความสัมพันธ์ หรือละ field เพื่อเก็บค่าเดิม

Relation API อยู่ใต้ /api/relations ได้แก่ project-tech-stacks, intern-tech-stacks, event-tech-stacks, intern-projects, event-projects รองรับ GET/POST และ DELETE โดยส่ง ID คู่ใน query string

## Seed และ snapshot

- prisma/seed-data.json: ข้อมูลเริ่มต้นทุกตารางและความสัมพันธ์ รวมสีและระดับความถนัด
- prisma/seed.js: restore แบบ upsert และ map ID ของความสัมพันธ์ รันซ้ำได้
- scripts/export-seed.cjs: export ฐานข้อมูลเป็น snapshot ด้วย RepeatableRead

Seed อัปเดตรายการที่ตรงกันและเพิ่มรายการใหม่ ไม่ล้างข้อมูลอื่น ไม่ใช่คำสั่งแทนที่ฐานข้อมูลทั้งหมด Snapshot เว้น URL รูป, gallery, createdAt และ updatedAt ตามรูปแบบของโปรเจกต์นี้ จึงไม่ใช่ backup เต็มสำหรับกู้คืนรูปภาพ

รัน seed ใน Docker:

```sh
docker compose exec api npm run db:seed
```

รัน Local:

```sh
npm run db:seed
```

Export ข้อมูลล่าสุดจาก Docker เป็น seed ด้วย PowerShell โดยตรวจ JSON ก่อนทับไฟล์เดิม:

```powershell
Get-Content scripts/export-seed.cjs -Raw | docker compose exec -T api node - | Set-Content -Encoding utf8 prisma/seed-data.next.json
if ($LASTEXITCODE -ne 0) { throw 'Export failed' }
node -e "const fs=require('fs');const p='prisma/seed-data.next.json';const data=JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));fs.writeFileSync('prisma/seed-data.json',JSON.stringify(data,null,2)+'\n');fs.unlinkSync(p);"
```

Linux:

```sh
docker compose exec -T api node - < scripts/export-seed.cjs > prisma/seed-data.next.json && node -e "const fs=require('fs');const p='prisma/seed-data.next.json';const data=JSON.parse(fs.readFileSync(p,'utf8'));fs.writeFileSync('prisma/seed-data.json',JSON.stringify(data,null,2)+'\n');fs.unlinkSync(p);"
```

หลังแก้ seed บน host ให้ rebuild image เพื่อเก็บไว้ใน deployment ครั้งต่อไป หรือ copy เข้า container ปัจจุบันก่อนรัน seed:

```sh
docker compose cp prisma/seed-data.json api:/app/prisma/seed-data.json
```

การรัน export ไม่เปลี่ยนฐานข้อมูล แต่การรัน seed อาจทับข้อความและสีที่ตรงกับรายการเดิม ตรวจ snapshot ก่อนรัน

## การเปลี่ยน schema และทดสอบ

Schema อยู่ใน prisma/schema.prisma เปลี่ยนแล้วรัน `npm run db:generate` สำหรับ Prisma Client ในเครื่อง หรือ rebuild Docker

Compose ปัจจุบันใช้ db push และไม่บันทึก migration history อัตโนมัติ หากใช้ workflow migration ให้ตรวจสถานะฐานข้อมูลและวางแผน baseline ก่อนใช้ `npm run db:migrate` โดยเฉพาะฐานข้อมูลที่สร้างด้วย db push แล้ว

ทดสอบ API หลัง backend พร้อมและ .env มี ADMIN_PASSWORD ตรงกับระบบ:

```sh
node tests/editor-api.cjs
```

ทดสอบนี้สร้างรายการชั่วคราว ตรวจเนื้อหา รูป ความสัมพันธ์ สี workMode และ rollback แล้วลบรายการทดสอบเมื่อเสร็จ หาก api อยู่ URL อื่นตั้ง TEST_API_URL ก่อนรัน

## Deploy ร่วมกับ frontend และ Cloudflare Tunnel

เริ่ม backend ก่อน จากนั้นรัน frontend Docker แยก repository ที่พอร์ต 8080 ตั้ง Tunnel บน host ให้ชี้ http://localhost:8080 ตัว Caddy ของ frontend ส่งต่อ API, uploads, health และ Admin ไป backend พอร์ต 3001 จึงใช้ hostname เดียวกันได้

Compose backend ปัจจุบัน publish พอร์ต 3001 และ 5432 ทุก interface หากต้องการเข้าผ่านเครื่อง host/Tunnel เท่านั้นให้ปรับ host binding ของ ports ตามสภาพแวดล้อมจริง

อัปเดตโค้ด:

```sh
git pull
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 api
```

ไม่ต้องรัน seed ทุกครั้งหลัง deploy เพราะอาจทับข้อมูลที่แก้ผ่าน Admin

## เก็บข้อมูลและสำรอง

ฐานข้อมูลอยู่ใน volume portfolio_postgres_data และรูปอยู่ใน portfolio_uploads การ rebuild container ไม่ลบ volumes หยุดระบบแบบเก็บข้อมูลด้วย `docker compose down` ห้ามใช้ `docker compose down -v` หากต้องการเก็บข้อมูล เพราะจะลบทั้งฐานข้อมูลและรูปใน volumes

สำรอง PostgreSQL ด้วย pg_dump/pg_restore และสำรอง upload volume แยกกัน Seed อย่างเดียวไม่กู้คืนไฟล์รูป

## แก้ปัญหาเบื้องต้น

- Compose แจ้ง ADMIN_PASSWORD ไม่ได้ตั้ง: สร้าง .env ในโฟลเดอร์ backend แล้วกำหนดรหัส
- Login ไม่ผ่านหลังเปลี่ยนรหัส: สร้าง container ใหม่ และตรวจว่าคำสั่งรันจากโฟลเดอร์ backend ถูกต้อง
- API 401: session หมดอายุหรือยังไม่ได้เข้าสู่ระบบ
- API 403: ตรวจ Origin และ hostname โดยเฉพาะเมื่อเรียกข้าม domain
- รูปแบบ workMode ไม่ถูกต้อง: Event รับ null/ONSITE/REMOTE/HYBRID
- Upload ถูกปฏิเสธ: ตรวจชนิดรูปและขนาดสูงสุด 15 MB
- Database ไม่พร้อม: ตรวจ `docker compose logs db` และ /health
- สีหรือข้อความเดิมกลับมา: ตรวจว่ามีการรัน seed หลังแก้ใน Admin หรือไม่

เก็บ source, Prisma schema/migrations, seed, package-lock.json และไฟล์ Docker ใน Git ส่วน .env, node_modules และไฟล์ uploads ถูกเว้นใน .gitignore

## โครงสร้างโค้ด backend

- src/index.js: โหลด environment และเริ่ม/หยุดเซิร์ฟเวอร์
- src/app.js: ประกอบ Express middleware และ routes
- src/routes/: กำหนด URL และ resource configuration
- src/controllers/: รับ request และจัด response
- src/services/: CRUD และธุรกรรม/ความสัมพันธ์กับฐานข้อมูล
- src/middleware/: Admin authentication, upload limits และ error handler
- src/config/: Prisma client และ relation definitions
- src/utils/: แปลงค่าจาก request

เมื่อเพิ่ม resource ให้กำหนด fields/include ใน routes และใช้ CRUD factory เดิม ส่วน logic เฉพาะให้เพิ่ม service/controller ของ resource นั้น หน้า Admin อยู่ใน public/admin และ Prisma schema/seed อยู่ใน prisma

### CORS

อนุญาต https://myapi.filmtanapon.com และ localhost พอร์ต 5173/8080/3001 โดย default เพิ่ม origin ของ frontend ใน CORS_ORIGINS ของ .env คั่นด้วย comma แล้วรัน docker compose up -d ตัวอย่าง CORS_ORIGINS=https://portfolio.example.com โดย origin ต้องเป็น domain ของหน้าที่เรียก API ไม่ใช่แค่ domain ของ API การเขียนผ่าน Admin ยังตรวจ same-origin และ session ตามเดิม


Admin ผ่าน Cloudflare Tunnel ใช้ ADMIN_ORIGINS=https://myapi.filmtanapon.com เพื่อรองรับ HTTPS ด้านหน้าและ HTTP ของ backend เพิ่มหลาย origin ด้วย comma แล้วรัน docker compose up -d เพื่อใช้ค่าใหม่

Profile มี birthDate แบบ DATE เว้นว่างได้ แก้ใน Admin ด้วยปี ค.ศ. Frontend คำนวณอายุเต็มปีตามวันที่ใน Asia/Bangkok และแสดง AGE แทนเลเวล หากไม่มีวันเกิดจะแสดงขีด

### ข้อมูล Profile สำหรับ Portfolio

Profile เพิ่ม englishName, shortBio, currentRole, preferredRoles, languages, interests, websiteURL, contactEmail และ timezone นอกเหนือจากชื่อ headline biography วันเกิด รูป Resume และข้อมูลติดต่อเดิม ช่องใหม่เป็น optional และแก้ได้ใน Admin; preferredRoles/languages/interests เป็น string array ส่ง [] เพื่อล้างค่า Social Links และ Education ใช้ตารางความสัมพันธ์เดิม ไม่ต้องใส่ซ้ำใน biography ช่องใหม่รองรับใน API/seed แล้วแต่ frontend ยังแสดงเฉพาะ field ที่ใช้อยู่ ข้อมูล Profile ที่ส่งผ่าน GET เป็น public จึงใส่เฉพาะข้อมูลที่ต้องการแสดงใน Portfolio
