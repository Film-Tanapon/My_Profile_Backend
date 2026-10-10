const resources = {
  profiles: { label: "Profile", icon: "◉", endpoint: "/api/profiles", id: "profileId", title: "displayName", subtitle: "headline", columns: ["email", "location", "availabilityStatus"], fields: [
    ["firstName", "ชื่อ", "text", true], ["lastName", "นามสกุล", "text", true], ["displayName", "ชื่อที่แสดง", "text", true], ["headline", "Headline"], ["englishName", "ชื่อภาษาอังกฤษ"], ["shortBio", "คำแนะนำตัวสั้น", "textarea"], ["currentRole", "ตำแหน่ง / สถานะปัจจุบัน"], ["preferredRoles", "ตำแหน่งที่สนใจ (หนึ่งบรรทัดต่อรายการ)", "array"], ["languages", "ภาษาที่ใช้สื่อสาร (หนึ่งบรรทัดต่อรายการ)", "array"], ["interests", "ความสนใจ (หนึ่งบรรทัดต่อรายการ)", "array"], ["websiteURL", "เว็บไซต์ส่วนตัว", "url"], ["contactEmail", "อีเมลสำหรับติดต่อ", "email"], ["timezone", "เขตเวลา เช่น Asia/Bangkok"], ["birthDate", "วันเกิด (ค.ศ.)", "date"], ["biography", "เกี่ยวกับฉัน", "textarea"], ["profileImageURL", "รูปโปรไฟล์", "image"], ["coverImageURL", "รูปปก", "image"], ["resumeURL", "URL Resume"], ["email", "Email", "email"], ["phone", "เบอร์โทร"], ["location", "ที่อยู่"], ["availabilityStatus", "สถานะ", "select", false, ["AVAILABLE", "OPEN_TO_WORK", "BUSY", "UNAVAILABLE"]],
  ]},
  "social-links": { label: "Social Links", icon: "↗", endpoint: "/api/social-links", id: "socialLinkId", title: "platform", subtitle: "label", columns: ["url", "isVisible", "displayOrder"], fields: [
    ["profileId", "Profile ID", "number", true], ["platform", "Platform", "text", true], ["label", "ชื่อที่แสดง"], ["url", "URL", "url", true], ["icon", "ชื่อ Icon"], ["displayOrder", "ลำดับ", "number"], ["isVisible", "แสดงบนเว็บไซต์", "boolean"],
  ]},
  educations: { label: "Education", icon: "⌂", endpoint: "/api/educations", id: "educationId", title: "institutionName", subtitle: "fieldOfStudy", columns: ["degree", "startDate", "isPublished"], fields: [
    ["profileId", "Profile ID", "number", true], ["institutionName", "สถานศึกษา", "text", true], ["institutionLogoURL", "โลโก้สถานศึกษา", "image"], ["educationLevel", "ระดับการศึกษา", "select", false, ["HIGH_SCHOOL", "VOCATIONAL", "DIPLOMA", "BACHELOR", "MASTER", "DOCTORATE", "CERTIFICATE", "OTHER"]], ["degree", "วุฒิการศึกษา"], ["fieldOfStudy", "สาขาวิชา"], ["description", "รายละเอียด", "textarea"], ["grade", "เกรด"], ["location", "สถานที่"], ["startDate", "วันที่เริ่ม", "date", true], ["endDate", "วันที่จบ", "date"], ["isCurrent", "กำลังศึกษา", "boolean"], ["isPublished", "เผยแพร่", "boolean"], ["displayOrder", "ลำดับ", "number"],
  ]},
  "tech-stacks": { label: "Tech Stack", icon: "◇", endpoint: "/api/tech-stacks", id: "techstackId", title: "name", subtitle: "slug", columns: ["category", "proficiency", "websiteURL"], fields: [
    ["name", "ชื่อ Technology", "text", true], ["slug", "Slug", "text", true], ["category", "หมวดหมู่", "select", true, ["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOL", "LANGUAGE", "OTHER"]], ["iconURL", "Icon", "image"], ["color", "สี", "color"], ["websiteURL", "เว็บไซต์", "url"], ["proficiency", "ระดับความถนัด (1–5)", "number"],
  ]},
  projects: { label: "Projects", icon: "▣", endpoint: "/api/projects", id: "projectId", title: "title", subtitle: "shortDescription", columns: ["status", "role", "featured"], fields: [
    ["title", "ชื่อโปรเจกต์", "text", true], ["slug", "Slug", "text", true], ["shortDescription", "คำอธิบายสั้น", "textarea"], ["description", "รายละเอียด", "textarea"], ["role", "หน้าที่"], ["status", "สถานะ", "select", false, ["PLANNING", "ACTIVE", "COMPLETED", "ARCHIVED"]], ["themeColor", "สีพื้นหลัง", "theme"], ["dotColor", "สีลายจุด", "theme"], ["fontColor", "สีตัวอักษร", "theme"], ["imageURL", "รูปปกโปรเจกต์", "image"], ["gallery", "รูปภาพเพิ่มเติม", "gallery"], ["webURL", "เว็บไซต์", "url"], ["repositoryURL", "Repository", "url"], ["startDate", "วันที่เริ่ม", "date"], ["endDate", "วันที่จบ", "date"], ["featured", "โปรเจกต์เด่น", "boolean"], ["displayOrder", "ลำดับ", "number"],
  ]},
  interns: { label: "Internships", icon: "▤", endpoint: "/api/interns", id: "internId", title: "companyName", subtitle: "position", columns: ["workMode", "startDate", "endDate"], fields: [
    ["companyName", "บริษัท", "text", true], ["themeColor", "สีพื้นหลัง", "theme"], ["dotColor", "สีลายจุด", "theme"], ["fontColor", "สีตัวอักษร", "theme"], ["companyLogoURL", "โลโก้บริษัท", "image"], ["gallery", "รูปภาพการฝึกงาน", "gallery"], ["position", "ตำแหน่ง", "text", true], ["employmentType", "ประเภท", "select", false, ["INTERNSHIP", "COOP", "PART_TIME"]], ["description", "รายละเอียด", "textarea"], ["responsibilities", "หน้าที่ (หนึ่งบรรทัดต่อรายการ)", "array"], ["achievements", "ผลงาน (หนึ่งบรรทัดต่อรายการ)", "array"], ["location", "สถานที่"], ["workMode", "รูปแบบงาน", "select", false, ["ONSITE", "REMOTE", "HYBRID"]], ["companyURL", "เว็บไซต์บริษัท", "url"], ["startDate", "วันที่เริ่ม", "date", true], ["endDate", "วันที่จบ", "date"], ["certificateURL", "URL ใบรับรอง"],
  ]},
  events: { label: "Events", icon: "✦", endpoint: "/api/events", id: "eventId", title: "title", subtitle: "organizer", columns: ["eventType", "startDate", "result"], fields: [
    ["title", "ชื่อกิจกรรม", "text", true], ["eventType", "ประเภท", "select", false, ["HACKATHON", "WORKSHOP", "COMPETITION", "CONFERENCE", "MEETUP", "OTHER"]], ["organizer", "ผู้จัด"], ["description", "รายละเอียด", "textarea"], ["role", "หน้าที่"], ["location", "สถานที่"], ["workMode", "รูปแบบ", "select", false, ["ONSITE", "REMOTE", "HYBRID"]], ["themeColor", "สีพื้นหลัง", "theme"], ["dotColor", "สีลายจุด", "theme"], ["fontColor", "สีตัวอักษร", "theme"], ["imageURL", "รูปกิจกรรม", "image"], ["gallery", "รูปภาพกิจกรรม", "gallery"], ["eventURL", "เว็บไซต์", "url"], ["certificateURL", "URL ใบรับรอง"], ["result", "ผลลัพธ์/รางวัล"], ["startDate", "วันที่เริ่ม", "date", true], ["endDate", "วันที่จบ", "date"], ["featured", "กิจกรรมเด่น", "boolean"],
  ]},
};

let activeKey = "profiles";
let records = [];
let editingId = null;
let searchTimer;
let galleryItems = [];
let lookupTech = [];
let lookupProjects = [];
let previewUrls = [];
const isDetailResource = () => ["projects", "interns", "events"].includes(activeKey);
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value ?? "—").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const pretty = (value) => typeof value === "boolean" ? (value ? "Yes" : "No") : value instanceof Array ? value.join(", ") : value ? String(value).replaceAll("_", " ") : "—";
const dateValue = (value) => value ? new Date(value).toISOString().slice(0, 10) : "";

function renderNav() {
  $("#resource-nav").innerHTML = Object.entries(resources).map(([key, config]) => `<button class="nav-item ${key === activeKey ? "active" : ""}" data-key="${key}"><span class="nav-icon">${config.icon}</span>${config.label}</button>`).join("");
  document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => selectResource(button.dataset.key)));
}

async function checkHealth() {
  try { const response = await fetch("/health"); const data = await response.json(); if (!response.ok) throw new Error(); $("#api-dot").classList.add("online"); $("#api-status").textContent = data.db === "connected" ? "Database connected" : "API online"; }
  catch { $("#api-status").textContent = "API unavailable"; }
}

function selectResource(key) {
  activeKey = key; editingId = null; $("#search-input").value = ""; renderNav();
  const config = resources[key]; $("#resource-breadcrumb").textContent = config.label.toUpperCase(); $("#page-title").textContent = `จัดการ ${config.label}`;
  loadRecords();
}

async function loadRecords(query = "") {
  const config = resources[activeKey]; $("#loading").classList.remove("hidden"); $("#empty").classList.add("hidden"); $("#table-wrap").classList.add("hidden");
  try {
    const response = await fetch(`${config.endpoint}${query ? `?q=${encodeURIComponent(query)}` : ""}`); const result = await response.json(); if (!response.ok) throw new Error(result.message);
    records = result.data; renderTable();
  } catch (error) { $("#loading").textContent = `โหลดข้อมูลไม่สำเร็จ: ${error.message}`; showToast(error.message, true); }
}

function renderTable() {
  const config = resources[activeKey]; $("#loading").classList.add("hidden"); $("#total-count").textContent = records.length;
  if (!records.length) { $("#empty").classList.remove("hidden"); return; }
  $("#table-wrap").classList.remove("hidden");
  $("#table-head").innerHTML = `<tr><th>${config.label.toUpperCase()}</th>${config.columns.map(column => `<th>${escapeHTML(column.replace(/([A-Z])/g, " $1").toUpperCase())}</th>`).join("")}<th></th></tr>`;
  $("#table-body").innerHTML = records.map(record => `<tr><td><div class="primary-cell"><span class="record-avatar">${escapeHTML(String(record[config.title] || "?").slice(0, 1).toUpperCase())}</span><span><span class="cell-title">${escapeHTML(record[config.title])}</span><span class="cell-sub">${escapeHTML(record[config.subtitle])}</span></span></div></td>${config.columns.map(column => `<td>${column.toLowerCase().includes("status") || typeof record[column] === "boolean" ? `<span class="badge">${escapeHTML(pretty(record[column]))}</span>` : escapeHTML(column.toLowerCase().includes("date") ? dateValue(record[column]) || "—" : pretty(record[column]))}</td>`).join("")}<td><div class="row-actions"><button class="icon-button edit-record" data-id="${record[config.id]}" title="ดูรายละเอียดและแก้ไข">✎</button><button class="icon-button danger delete-record" data-id="${record[config.id]}" title="ลบ">×</button></div></td></tr>`).join("");
  document.querySelectorAll(".edit-record").forEach(button => button.addEventListener("click", () => openDrawer(records.find(record => String(record[config.id]) === button.dataset.id))));
  document.querySelectorAll(".delete-record").forEach(button => button.addEventListener("click", () => deleteRecord(button.dataset.id)));
}

function fieldHTML(field, record = {}) {
  const [name, label, type = "text", required = false, options = []] = field; let value = record[name] ?? "";
  const full = type === "gallery" || type === "textarea" || type === "array" || type === "image" || name.toLowerCase().includes("url") || name === "biography";
  if (type === "date") value = dateValue(value);
  if (type === "array" && Array.isArray(value)) value = value.join("\n");
  let control;
  if (type === "theme") control = `<div class="theme-control"><input type="color" id="${name}-picker" aria-label="เลือก${label}" value="${/^#[0-9a-f]{6}$/i.test(value) ? value : name === "dotColor" ? "#343648" : name === "fontColor" ? "#F3F4F7" : "#191b29"}"><input id="field-${name}" name="${name}" value="${escapeHTML(value)}" placeholder="สีเริ่มต้น" pattern="#[0-9a-fA-F]{6}" aria-label="รหัส${label}"><button type="button" id="reset-${name}" class="ghost-button">สีเริ่มต้น</button></div>`;
  else if (type === "gallery") control = `<div class="gallery-editor"><input id="gallery-files" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif"><small>เพิ่มได้หลายรูป · รูปละไม่เกิน 15 MB</small><div class="gallery-url-row"><input id="gallery-url" type="text" placeholder="หรือวาง URL รูปภาพ"><button type="button" id="add-gallery-url" class="ghost-button">เพิ่มรูป</button></div><div id="gallery-items"></div></div>`;
  else if (type === "select") control = `<select id="field-${name}" name="${name}" ${required ? "required" : ""}><option value="">เลือก...</option>${options.map(option => `<option value="${option}" ${value === option ? "selected" : ""}>${option.replaceAll("_", " ")}</option>`).join("")}</select>`;
  else if (type === "image") control = `<div class="image-upload"><div class="image-preview ${value ? "has-image" : ""}">${value ? `<img src="${escapeHTML(value)}" alt="Preview">` : "<span>＋</span><small>IMAGE</small>"}</div><div><input class="image-file" data-field="${name}" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif"><input id="field-${name}" name="${name}" type="text" value="${escapeHTML(value)}" placeholder="หรือวาง URL รูปภาพ"><small>JPG, PNG, WebP, GIF หรือ AVIF · ไม่เกิน 15 MB</small></div></div>`;
  else if (type === "textarea" || type === "array") control = `<textarea id="field-${name}" name="${name}" ${required ? "required" : ""}>${escapeHTML(value)}</textarea>${type === "array" ? "<small>กรอกหนึ่งรายการต่อหนึ่งบรรทัด</small>" : ""}`;
  else if (type === "boolean") control = `<select id="field-${name}" name="${name}"><option value="true" ${value === true ? "selected" : ""}>Yes</option><option value="false" ${value === false ? "selected" : ""}>No</option></select>`;
  else control = `<input id="field-${name}" name="${name}" type="${type}" value="${escapeHTML(value)}" ${required ? "required" : ""} ${name === "proficiency" ? 'min="1" max="5"' : ""}/>`;
  return `<div class="field ${full ? "full" : ""}"><label for="field-${name}">${label}${required ? " <em>*</em>" : ""}</label>${control}</div>`;
}

async function openDrawer(record = null) {
  const config = resources[activeKey]; editingId = record ? record[config.id] : null;
  galleryItems = (record?.gallery || []).map(url => ({ url }));
  if (isDetailResource()) {
    try {
      const responses = await Promise.all([fetch('/api/tech-stacks'), fetch('/api/projects')]);
      const results = await Promise.all(responses.map(response => response.json()));
      if (responses.some(response => !response.ok)) throw new Error('โหลด Tech Stack หรือโปรเจกต์ไม่สำเร็จ');
      [lookupTech, lookupProjects] = results.map(result => result.data);
    } catch(error) { showToast(error.message, true); return; }
  }
  $('#drawer').classList.toggle('detail-editor', isDetailResource());
  $('#form-mode').textContent = record ? 'DETAILS & EDITOR' : 'NEW RECORD';
  $('#form-title').textContent = record?.[config.title] || `เพิ่ม ${config.label}`;
  if (isDetailResource()) {
    const groups = [
      ['ข้อมูลหลัก', config.fields.filter(f => !['description', 'responsibilities', 'achievements', 'gallery'].includes(f[0]) && f[2] !== 'image')],
      ['เรื่องราวและการทำงาน', config.fields.filter(f => ['description', 'responsibilities', 'achievements'].includes(f[0]))],
      ['รูปภาพ', config.fields.filter(f => f[2] === 'image' || f[2] === 'gallery')],
    ];
    $('#form-fields').innerHTML = groups.map(([title, fields]) => `<section class="editor-section full"><h3>${title}</h3><div class="form-fields">${fields.map(f => fieldHTML(f, record || {})).join('')}</div>${title === 'เรื่องราวและการทำงาน' ? '<button type="button" class="ghost-button add-paragraph">＋ เพิ่มย่อหน้า</button>' : ''}</section>`).join('') + relationFields(record);
  } else $('#form-fields').innerHTML = config.fields.map(field => fieldHTML(field, record || {})).join('');
  document.querySelectorAll('.image-file').forEach(input => input.addEventListener('change', () => { previewImage(input); renderEditorPreview(); }));
  $('#form-fields').oninput = renderEditorPreview;
  $('#form-fields').onchange = renderEditorPreview;
  $('#gallery-files')?.addEventListener('change', event => {
    for (const file of event.target.files) { const url = URL.createObjectURL(file); previewUrls.push(url); galleryItems.push({ url, file }); }
    event.target.value = ''; renderGalleryEditor(); renderEditorPreview();
  });
  $('#add-gallery-url')?.addEventListener('click', () => {
    const url = $('#gallery-url').value.trim();
    if (!/^(https?:\/\/|\/uploads\/)/i.test(url)) return showToast('ใช้ URL รูปภาพ http/https หรือ /uploads/', true);
    galleryItems.push({ url }); $('#gallery-url').value = ''; renderGalleryEditor(); renderEditorPreview();
  });
  $('.add-paragraph')?.addEventListener('click', () => { const area = $('[name="description"]'); area.value += area.value ? '\n\n' : ''; area.focus(); area.setSelectionRange(area.value.length, area.value.length); });
  $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#drawer-backdrop').classList.remove('hidden'); document.body.style.overflow = 'hidden';
  for (const name of ['themeColor', 'dotColor', 'fontColor']) {
    $(`#${name}-picker`)?.addEventListener('input', event => { $(`[name="${name}"]`).value = event.target.value; renderEditorPreview(); });
    $(`#reset-${name}`)?.addEventListener('click', () => { $(`[name="${name}"]`).value = ''; renderEditorPreview(); });
  }
  renderGalleryEditor(); renderEditorPreview(); $('#close-drawer').focus();
}

function relationFields(record) {
  const selected = new Map((record?.techStacks || []).map(item => [item.techstackId, item.usageType]));
  const usages = ['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOL', 'GENERAL'];
  return `<section class="editor-section full"><h3>Tech Stack</h3><div class="relation-options">${lookupTech.map(tech => {
    const usage = selected.get(tech.techstackId) || (['go','python','websocket'].includes(tech.slug) ? 'BACKEND' : ['javascript','typescript','dart'].includes(tech.slug) ? 'FRONTEND' : usages.includes(tech.category) ? tech.category : 'GENERAL');
    return `<div class="tech-option"><label><input type="checkbox" name="techIds" value="${tech.techstackId}" ${selected.has(tech.techstackId) ? 'checked' : ''}>${escapeHTML(tech.name)}</label><select data-tech-usage="${tech.techstackId}" aria-label="การใช้งาน ${escapeHTML(tech.name)}">${usages.map(u => `<option ${u === usage ? 'selected' : ''}>${u}</option>`).join('')}</select></div>`;
  }).join('')}</div></section>${activeKey !== 'projects' ? `<section class="editor-section full"><h3>โปรเจกต์ที่เกี่ยวข้อง</h3><div class="relation-options">${lookupProjects.map(project => `<label><input type="checkbox" name="linkedProjectIds" value="${project.projectId}" ${record?.projects?.some(link => link.projectId === project.projectId) ? 'checked' : ''}>${escapeHTML(project.title)}</label>`).join('')}</div></section>` : ''}`;
}

function renderGalleryEditor() {
  if (!$('#gallery-items')) return;
  $('#gallery-items').innerHTML = galleryItems.map((item,index) => `<div class="gallery-item"><img src="${escapeHTML(item.url)}" alt="ภาพ ${index+1}"><span>ภาพ ${index+1}</span><button type="button" data-remove-image="${index}" aria-label="ลบภาพ ${index+1}">×</button></div>`).join('');
  document.querySelectorAll('[data-remove-image]').forEach(button => button.addEventListener('click', () => { galleryItems.splice(Number(button.dataset.removeImage),1); renderGalleryEditor(); renderEditorPreview(); }));
}

function renderEditorPreview() {
  if (!isDetailResource()) return;
  const value = name => $(`[name="${name}"]`)?.value || '';
  const color = value('themeColor');
  const valid = /^#[0-9a-f]{6}$/i.test(color);
  const channels = valid ? color.slice(1).match(/../g).map(hex => parseInt(hex,16)) : [];
  const light = valid && (channels[0]*299 + channels[1]*587 + channels[2]*114)/1000 > 155;
  const preview = $('#editor-preview');
  preview.style.backgroundColor = valid ? color : '';
  const dotColor = /^#[0-9a-f]{6}$/i.test(value('dotColor')) ? value('dotColor') : '#343648';
  preview.style.backgroundImage = `radial-gradient(${dotColor} 1px, transparent 1px)`;
  preview.style.backgroundSize = '24px 24px';
  const fontColor = /^#[0-9a-f]{6}$/i.test(value('fontColor')) ? value('fontColor') : '';
  preview.style.color = fontColor || (valid ? (light ? '#172033' : '#F3F4F7') : '');
  preview.classList.toggle('custom-theme', valid || !!fontColor);
  const title = value(activeKey === 'interns' ? 'position' : 'title');
  const subtitle = value(activeKey === 'interns' ? 'companyName' : 'organizer');
  const coverName = activeKey === 'interns' ? 'companyLogoURL' : 'imageURL';
  const coverFile = $(`[data-field="${coverName}"]`);
  const cover = coverFile?.files[0] ? coverFile.closest('.image-upload').querySelector('img')?.src : value(coverName);
  const tags = [...document.querySelectorAll('[name="techIds"]:checked')].map(input => lookupTech.find(t => t.techstackId === Number(input.value))?.name);
  $('#editor-preview').innerHTML = `<span class="preview-kicker">ตัวอย่างหน้ารายละเอียด</span><h2>${escapeHTML(title || 'ชื่อรายการ')}</h2><p class="preview-subtitle">${escapeHTML(subtitle)}</p>${cover ? `<img class="preview-cover" src="${escapeHTML(cover)}" alt="ภาพปก">` : ''}<div class="preview-facts">${[value('startDate'),value('endDate'),value('status') || value('eventType') || value('employmentType'),value('role')].filter(Boolean).map(f => `<span>${escapeHTML(f)}</span>`).join('')}</div><p>${escapeHTML(value('shortDescription'))}</p><h3>เรื่องราวและการทำงาน</h3><div class="preview-description">${escapeHTML(value('description') || 'เพิ่มรายละเอียดการทำงานในช่องด้านซ้าย')}</div>${['responsibilities','achievements'].map(name => value(name) ? `<h3>${name === 'responsibilities' ? 'หน้าที่รับผิดชอบ' : 'ผลงานและสิ่งที่ได้เรียนรู้'}</h3><ul>${value(name).split('\n').filter(Boolean).map(line => `<li>${escapeHTML(line)}</li>`).join('')}</ul>` : '').join('')}<h3>Tech Stack</h3><div class="preview-facts">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>${galleryItems.length ? `<h3>ภาพจากการทำงาน</h3><div class="preview-gallery">${galleryItems.map(item => `<img src="${escapeHTML(item.url)}" alt="ภาพเพิ่มเติม">`).join('')}</div>` : ''}`;
}

function closeDrawer() {
  $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true'); $('#drawer-backdrop').classList.add('hidden'); document.body.style.overflow = '';
  for (const url of previewUrls) URL.revokeObjectURL(url); previewUrls=[];
}

function previewImage(input) {
  const preview = input.closest(".image-upload").querySelector(".image-preview");
  const file = input.files[0];
  if (!file) return;
  preview.classList.add("has-image");
  const url = URL.createObjectURL(file); previewUrls.push(url); preview.innerHTML = `<img src="${url}" alt="Preview">`;
}

async function uploadImage(file) {
  const formData = new FormData(); formData.append("image", file);
  const response = await fetch("/api/uploads/images", { method: "POST", body: formData });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "อัปโหลดรูปไม่สำเร็จ");
  return result.data.url;
}

async function saveRecord(event) {
  event.preventDefault(); const config = resources[activeKey]; const form = event.currentTarget; const data = {};
  for (const [name,,type='text',required] of config.fields) {
    if (type === 'gallery') continue;
    const control=form.elements.namedItem(name); if (!control) continue;
    const value=control.value;
    if (type === 'array') data[name]=value.split('\n').map(line=>line.trim()).filter(Boolean);
    else if (type === 'boolean') data[name]=value==='true';
    else if (type === 'number') { if(value!=='')data[name]=Number(value); }
    else if (type === 'date') { if(value || editingId)data[name]=value || null; }
    else if (type === 'select') { if(value)data[name]=value; else if(name==='workMode' && activeKey==='events')data[name]=null; }
    else if (value || editingId || required) data[name]=value;
  }
  if (isDetailResource()) {
    data.techStackEntries=[...form.querySelectorAll('[name="techIds"]:checked')].map(input=>({techstackId:Number(input.value),usageType:form.querySelector(`[data-tech-usage="${input.value}"]`).value}));
    if(activeKey!=='projects')data.linkedProjectIds=[...form.querySelectorAll('[name="linkedProjectIds"]:checked')].map(input=>Number(input.value));
  }
  const button=$('#save-button'); button.disabled=true; button.textContent='กำลังบันทึก...';
  try {
    for(const input of form.querySelectorAll('.image-file'))if(input.files[0])data[input.dataset.field]=await uploadImage(input.files[0]);
    if(isDetailResource()) {
      for(const item of galleryItems)if(item.file){item.url=await uploadImage(item.file);delete item.file;}
      data.gallery=galleryItems.map(item=>item.url);
    }
    const response=await fetch(editingId ? `${config.endpoint}/${editingId}` : config.endpoint,{method:editingId?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const result=await response.json(); if(!response.ok)throw new Error(result.message);
    closeDrawer();showToast(editingId?'อัปเดตข้อมูลแล้ว':'เพิ่มข้อมูลแล้ว');await loadRecords($('#search-input').value);
  }catch(error){showToast(error.message,true);}
  finally{button.disabled=false;button.textContent='บันทึกข้อมูล';}
}

async function deleteRecord(id) {
  const config = resources[activeKey]; if (!window.confirm("ต้องการลบข้อมูลรายการนี้หรือไม่? การลบไม่สามารถย้อนกลับได้")) return;
  try { const response = await fetch(`${config.endpoint}/${id}`, { method: "DELETE" }); const result = await response.json(); if (!response.ok) throw new Error(result.message); showToast("ลบข้อมูลแล้ว"); await loadRecords($("#search-input").value); }
  catch (error) { showToast(error.message, true); }
}

function showToast(message, error = false) { const toast = $("#toast"); toast.textContent = message; toast.classList.toggle("error", error); toast.classList.remove("hidden"); window.setTimeout(() => toast.classList.add("hidden"), 2800); }

$("#create-button").addEventListener("click", () => openDrawer()); $("#close-drawer").addEventListener("click", closeDrawer); $("#cancel-button").addEventListener("click", closeDrawer); $("#drawer-backdrop").addEventListener("click", closeDrawer); $("#record-form").addEventListener("submit", saveRecord); $("#refresh-button").addEventListener("click", () => loadRecords($("#search-input").value));
$("#search-input").addEventListener("input", (event) => { clearTimeout(searchTimer); searchTimer = setTimeout(() => loadRecords(event.target.value), 300); });
document.addEventListener("keydown", event => {
  if (!$("#drawer").classList.contains("open")) return;
  if (event.key === "Escape") closeDrawer();
  if (event.key === "Tab") {
    const focusable = [...$("#drawer").querySelectorAll('button, input, select, textarea, a[href]')].filter(el => !el.disabled && el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
renderNav(); checkHealth(); loadRecords();

$('#logout-button').addEventListener('click',async()=>{await fetch('/admin/logout',{method:'POST'});location.replace('/admin/');});
