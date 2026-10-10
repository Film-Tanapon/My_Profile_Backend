const crypto = require('node:crypto');
const express = require('express');
module.exports = function adminAuth(password) {
  const router = express.Router(), sessions = new Map(), attempts = new Map();
  const cookieName = 'portfolio_admin';
  function authenticated(req) {
    const token = (req.headers.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1);
    const session = sessions.get(token);
    if (!session || session.expires < Date.now()) { if(token)sessions.delete(token); return false; }
    return true;
  }
  const adminOrigins = new Set(['https://myapi.filmtanapon.com', ...(process.env.ADMIN_ORIGINS || '').split(',').map(value=>value.trim()).filter(Boolean)]);
  function sameOrigin(req) {
    return !req.headers.origin || req.headers.origin === req.protocol+'://'+req.get('host') || adminOrigins.has(req.headers.origin);
  }
  router.post('/admin/login', (req,res) => {
    res.set('Cache-Control','no-store');
    if(!password)return res.status(503).json({message:'ตั้งค่า ADMIN_PASSWORD ใน .env ก่อนใช้งาน'});
    if(!sameOrigin(req))return res.status(403).json({message:'Invalid origin'});
    const key=req.ip, now=Date.now();
    for(const [key,value] of attempts)if(value.until<=now)attempts.delete(key);
    const attempt=attempts.get(key)||{count:0,until:now+15*60*1000};
    if(attempt.count>=10)return res.status(429).json({message:'ลองใหม่อีกครั้งใน 15 นาที'});
    const supplied=typeof req.body.password==='string'?req.body.password:'';
    const digest=s=>crypto.createHash('sha256').update(s).digest();
    if(!crypto.timingSafeEqual(digest(supplied),digest(password))) { attempt.count++;attempts.set(key,attempt);return res.status(401).json({message:'รหัสไม่ถูกต้อง'}); }
    attempts.delete(key);
    for(const [token,session]of sessions)if(session.expires<=now)sessions.delete(token);
    const token=crypto.randomBytes(32).toString('hex');sessions.set(token,{expires:now+8*60*60*1000});
    res.cookie(cookieName,token,{httpOnly:true,sameSite:'strict',secure:req.secure,maxAge:8*60*60*1000,path:'/'});
    res.json({success:true});
  });
  router.post('/admin/logout',(req,res)=>{
    if(!sameOrigin(req))return res.sendStatus(403);
    const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1);
    sessions.delete(token);res.clearCookie(cookieName,{path:'/'});res.json({success:true});
  });
  router.use((req,res,next)=>{
    let requestPath;
    try { requestPath=require('node:path').posix.normalize(decodeURIComponent(req.path).replaceAll('\\','/')).toLowerCase(); } catch { return res.sendStatus(400); }
    if(requestPath.startsWith('/admin')) {
      res.set('Cache-Control','no-store');
      if(!authenticated(req)) {
        if(req.method==='GET')return res.type('html').send(require('node:fs').readFileSync(require('node:path').join(__dirname,'../../public/admin-login.html'),'utf8'));
        return res.status(401).json({message:'กรุณาเข้าสู่ระบบ Admin'});
      }
    }
    if(requestPath.startsWith('/api/') && !['GET','HEAD','OPTIONS'].includes(req.method)) {
      if(!authenticated(req))return res.status(401).json({message:'กรุณาเข้าสู่ระบบ Admin'});
      if(!sameOrigin(req))return res.status(403).json({message:'Invalid origin'});
    }
    next();
  });
  return router;
};
