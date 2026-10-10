const assert = require('node:assert/strict');
const base = process.env.TEST_API_URL || 'http://localhost:3001';
require('dotenv').config();
let cookie='';
const created=[];
async function request(resource, method='GET', body) {
 const response=await fetch(`${base}/api/${resource}`,{method,headers:{cookie,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
 const result=await response.json(); if(!response.ok)throw Error(result.message);return result.data;
}
(async()=>{
 const login=await fetch(`${base}/admin/login`,{method:'POST',headers:{cookie,'Content-Type':'application/json'},body:JSON.stringify({password:process.env.ADMIN_PASSWORD})});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
 const tech=(await request('tech-stacks'))[0];assert.ok(tech);
 const marker=`editor-check-${Date.now()}`;
 const project=await request('projects','POST',{title:marker,slug:marker,fontColor:'#112233',dotColor:'#fedcba',themeColor:'#abcdef',description:'first\n\nsecond',gallery:['/uploads/images/check.png'],techStackEntries:[{techstackId:tech.techstackId,usageType:'FRONTEND'}]});
 created.push(['projects',project.projectId]);assert.equal(project.fontColor,'#112233');assert.equal(project.dotColor,'#FEDCBA');assert.equal(project.themeColor,'#ABCDEF');assert.equal(project.techStacks.length,1);assert.equal(project.gallery.length,1);
 for(const [resource,id,extra] of [['interns','internId',{companyName:marker,position:'Check',startDate:'2026-01-01',responsibilities:['one']}],['events','eventId',{title:marker,startDate:'2026-01-01'}]]) {
  const record=await request(resource,'POST',{...extra,fontColor:'#abcdef',dotColor:'#abcdef',themeColor:'#123456',description:'text',gallery:['/uploads/images/check.png'],linkedProjectIds:[project.projectId],techStackEntries:[{techstackId:tech.techstackId,usageType:'BACKEND'}]});created.push([resource,record[id]]);
  if(resource==='events'){
    for(const workMode of ['ONSITE','',null]) { const saved=await request(`${resource}/${record[id]}`,'PATCH',{workMode});assert.equal(saved.workMode,workMode || null); }
    const invalid=await fetch(`${base}/api/${resource}/${record[id]}`,{method:'PATCH',headers:{cookie,'Content-Type':'application/json'},body:JSON.stringify({workMode:'INVALID'})});assert.equal(invalid.status,400);
  }
  assert.equal(record.fontColor,'#ABCDEF');assert.equal(record.dotColor,'#ABCDEF');assert.equal(record.themeColor,'#123456');assert.equal(record.projects.length,1);assert.equal(record.techStacks.length,1);assert.equal(record.gallery.length,1);
  const edited=await request(`${resource}/${record[id]}`,'PATCH',{fontColor:'',dotColor:'',themeColor:'',description:'',gallery:[],linkedProjectIds:[],techStackEntries:[]});
  assert.equal(edited.fontColor,null);assert.equal(edited.dotColor,null);assert.equal(edited.themeColor,null);assert.equal(edited.description,'');assert.deepEqual(edited.gallery,[]);assert.equal(edited.projects.length,0);assert.equal(edited.techStacks.length,0);
 }
 const invalidTheme=await fetch(`${base}/api/projects/${project.projectId}`,{method:'PATCH',headers:{cookie,'Content-Type':'application/json'},body:JSON.stringify({fontColor:'red'})});assert.equal(invalidTheme.status,400);
 const failed=await fetch(`${base}/api/projects/${project.projectId}`,{method:'PATCH',headers:{cookie,'Content-Type':'application/json'},body:JSON.stringify({description:'must rollback',techStackEntries:[{techstackId:2147483647,usageType:'BACKEND'}]})});assert.equal(failed.ok,false);
 const unchanged=await request(`projects/${project.projectId}`);assert.equal(unchanged.description,'first\n\nsecond');assert.equal(unchanged.techStacks.length,1);
 const cleared=await request(`projects/${project.projectId}`,'PATCH',{description:'',gallery:[],techStackEntries:[]});assert.equal(cleared.description,'');assert.deepEqual(cleared.gallery,[]);assert.equal(cleared.techStacks.length,0);
 console.log('PASS: project/intern/event content, gallery, relation editing, clearing, theme persistence/validation/reset and atomic rollback');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{for(const [resource,id]of created.reverse())await request(`${resource}/${id}`,'DELETE');});
