require('dotenv').config();
const assert=require('node:assert/strict');
const base=process.env.TEST_API_URL||'http://localhost:3001';
(async()=>{
 let cookie='',id;
 try {
  const login=await fetch(base+'/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:process.env.ADMIN_PASSWORD})});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
  const request=async(path,method,body)=>{const response=await fetch(base+path,{method,headers:{cookie,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});assert.ok(response.ok,await response.clone().text());return (await response.json()).data;};
  const fields={englishName:'Test Name',shortBio:'Test bio',currentRole:'Student',preferredRoles:['Backend Developer'],languages:['Thai'],interests:['Systems'],websiteURL:'https://example.com',contactEmail:'test@example.com',timezone:'Asia/Bangkok',birthDate:'2006-03-31'};
  const created=await request('/api/profiles','POST',{firstName:'Test',lastName:'Temporary',displayName:'Profile test',...fields});id=created.profileId;
  const read=await request('/api/profiles/'+id,'GET');for(const [key,value] of Object.entries(fields))assert.deepEqual(read[key],key==='birthDate'?value+'T00:00:00.000Z':value);
  const cleared=await request('/api/profiles/'+id,'PATCH',{preferredRoles:[],languages:[],interests:[],shortBio:'',birthDate:null});assert.deepEqual(cleared.languages,[]);assert.deepEqual(cleared.interests,[]);assert.deepEqual(cleared.preferredRoles,[]);assert.equal(cleared.birthDate,null);assert.equal(cleared.shortBio,'');assert.equal(cleared.englishName,'Test Name');
  console.log('PASS: expanded profile create/read/edit/clear and existing fields');
 } finally {if(id)await fetch(base+'/api/profiles/'+id,{method:'DELETE',headers:{cookie}});if(cookie)await fetch(base+'/admin/logout',{method:'POST',headers:{cookie}});}
})().catch(error=>{console.error(error);process.exitCode=1;});
