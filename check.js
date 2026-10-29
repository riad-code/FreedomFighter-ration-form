
const STORE_KEY='nonPimsRationRecords_v1';
const memberFields = [
 ['gender','লিঙ্গ','select','পুরুষ,নারী,অন্যান্য'],
 ['memberNo','সদস্য সংখ্যা','text',''],
 ['memberPin','রেশনীর PIN নম্বর','text',''],
 ['memberClassNo','রেশনী নম্বর','text',''],
 ['memberRIDNo','কার্ড নম্বর','text',''],
 ['memberNameBn','রেশনীর নাম (বাংলা)','text',''],
 ['memberNameEn','রেশনীর নাম (ইংরেজি)','text',''],
 ['memberClass','রেশনীর শ্রেণির নাম','text',''],
 ['relation','মুক্তিযোদ্ধার সঙ্গে সম্পর্ক','select','স্বামী, স্ত্রী,পিতা,মাতা,ভাই,বোন,অন্যান্য'],
 ['memberDob','জন্ম তারিখ','date',''],
 ['profession','পেশা','text',''],
 ['memberFather','পিতার নাম','text',''],
 ['memberMother','মাতার নাম','text',''],
 ['memberMarital','বৈবাহিক অবস্থা','select','অবিবাহিত,বিবাহিত,বিধবা,বিপত্নীক,তালাকপ্রাপ্ত'],
 ['memberReligion','ধর্ম','select','ইসলাম,হিন্দু,বৌদ্ধ,খ্রিস্টান,অন্যান্য'],
 ['memberNid','জাতীয় পরিচয়পত্র নম্বর / জন্ম নিবন্ধন নম্বর','text',''],
 ['policeVerifyNo','পুলিশ হেডকোয়ার্টার্সের স্মারক নম্বর','text',''],
 ['policeVerifyDate','পুলিশ হেডকোয়ার্টার্সের স্মারকের তারিখ','date',''],
 ['tradeMemoNo','কল্যাণ ট্রাস্টের স্মারক নম্বর','text',''],
 ['tradeMemoDate','কল্যাণ ট্রাস্টের স্মারকের তারিখ','date',''],
 ['unitOrderNo','রেশন ইউনিটের আদেশ নম্বর','text',''],
 ['unitOrderDate','রেশন ইউনিটের আদেশের তারিখ','date',''],
 ['memberMobile','মোবাইল নম্বর','tel',''],
 ['unitName','রেশন প্রদানকারী ইউনিট','text',''],
 ['memberStatus','রেশন সচল/স্থগিত','select','সচল,স্থগিত']
];
function inputMarkup(id,label,type,options,required=false){
 let req=required?' <span class="req">*</span>':'';
 let control='';
 if(type==='select'){
   let opts=(options||'').split(',').filter(Boolean).map(v=>`<option>${v}</option>`).join('');
   control=`<select class="form-select" id="${id}"><option value="">নির্বাচন করুন</option>${opts}</select>`;
 } else control=`<input class="form-control" id="${id}" type="${type==='tel'?'tel':type==='date'?'date':'text'}" ${required?'required':''}>`;
 return `<div class="col-12 col-sm-6"><label class="form-label" for="${id}">${label}${req}</label>${control}</div>`;
}
function buildFamilyCards(){
 const wrap=document.getElementById('familyMembers');
 for(let n=1;n<=4;n++){
   let fields=memberFields.map(([key,label,type,opts])=>{
     const id=`f${n}_${key}`;
     if(key==='memberNo'||key==='memberClassNo') return `<div class="col-12 col-sm-6"><label class="form-label">${label}</label><input class="form-control" id="${id}" readonly placeholder="সংরক্ষণের সময় তৈরি হবে"></div>`;
     return inputMarkup(id,label,type,opts);
   }).join('');
   wrap.insertAdjacentHTML('beforeend',`<div class="col-12 col-xl-6"><div class="member-card"><div class="member-head"><div><strong>সদস্য ${String(n).padStart(2,'0')}</strong><div class="small">পরিবার/নির্ভরশীল সদস্যের তথ্য</div></div><span class="badge rounded-pill text-bg-light border">Member ${n}</span></div><div class="member-body"><div class="row g-2">${fields}</div></div></div></div>`);
 }
}
let otherCounter=0;
function addOtherMember(data={}){
 otherCounter++;
 const id='other_'+otherCounter;
 document.getElementById('noOther').classList.add('hidden');
 const fields=[
   ['gender','লিঙ্গ','select','পুরুষ,নারী,অন্যান্য'],
   ['memberNo','সদস্য সংখ্যা','text'],['memberPin','রেশনীর PIN নম্বর','text'],
   ['memberClassNo','রেশনী নম্বর ','text'],['memberRIDNo','কার্ড নম্বর','text'],
   ['nameBn','রেশনীর নাম (বাংলা)','text'],['nameEn','রেশনীর নাম (ইংরেজি)','text'],
   ['memberClass','রেশনীর শ্রেণির নাম','text'],['relation','মুক্তিযোদ্ধার সঙ্গে সম্পর্ক','select','স্বামী, স্ত্রী,পিতা,মাতা,ভাই,বোন,অন্যান্য'],
   ['dob','জন্ম তারিখ','date'],['profession','পেশা','text'],['father','পিতার নাম','text'],['mother','মাতার নাম','text'],
   ['marital','বৈবাহিক অবস্থা','select','অবিবাহিত,বিবাহিত,বিধবা,বিপত্নীক,তালাকপ্রাপ্ত'],
   ['religion','ধর্ম','select','ইসলাম,হিন্দু,বৌদ্ধ,খ্রিস্টান,অন্যান্য'],
   ['nid','জাতীয় পরিচয়পত্র নম্বর / জন্ম নিবন্ধন নম্বর','text'],
   ['policeVerifyNo','পুলিশ হেডকোয়ার্টার্সের স্মারক নম্বর','text'],
   ['policeVerifyDate','পুলিশ হেডকোয়ার্টার্সের স্মারকের তারিখ','date'],
   ['tradeMemoNo','কল্যাণ ট্রাস্টের স্মারক নম্বর','text'],
   ['tradeMemoDate','কল্যাণ ট্রাস্টের স্মারকের তারিখ','date'],
   ['unitOrderNo','রেশন ইউনিটের আদেশ নম্বর','text'],
   ['unitOrderDate','রেশন ইউনিটের আদেশের তারিখ','date'],
   ['mobile','মোবাইল নম্বর','tel'],['unitName','রেশন প্রদানকারী ইউনিট','text'],
   ['memberStatus','রেশন সচল/স্থগিত','select','সচল,স্থগিত']
  ];
 let inner=fields.map(([k,l,t,o])=>`<div class="col-12 col-sm-6">${inputMarkup(`${id}_${k}`,l,t,o||'')}</div>`).join('');
 document.getElementById('otherMembers').insertAdjacentHTML('beforeend',`<div class="col-12 col-xl-6 other-member" data-id="${id}"><div class="member-card"><div class="member-head"><div><strong>অতিরিক্ত সদস্য ${otherCounter}</strong><div class="small">ঐচ্ছিক তথ্য</div></div>
 

<button
  class="btn btn-sm btn-outline-danger"
  type="button"
  data-remove-other="${id}">
  বাদ দিন ×
</button>

</div><div class="member-body"><div class="row g-2">${inner}</div></div></div></div>`);
 for(const [k] of fields){const el=document.getElementById(`${id}_${k}`);if(el&&data[k]!=null)el.value=data[k];}
}



document.getElementById('otherMembers').addEventListener('click', function(e) {
  const button = e.target.closest('[data-remove-other]');
  if (!button) return;

  const card = button.closest('.other-member');
  if (!card) {
    alert('সদস্যের কার্ড পাওয়া যায়নি।');
    return;
  }

  if (!confirm('এই সদস্যের তথ্য বাদ দিতে চান?')) return;

  card.remove();

  if (!document.querySelector('#otherMembers .other-member')) {
    document.getElementById('noOther')?.classList.remove('hidden');
  }
});



function getRecords(){try{return JSON.parse(localStorage.getItem(STORE_KEY)||'[]')}catch(e){return []}}
function setRecords(records){localStorage.setItem(STORE_KEY,JSON.stringify(records));updateCount()}
function updateCount(){document.getElementById('recordCount').textContent=getRecords().length}
function val(id){return document.getElementById(id)?.value?.trim()||''}
function setVal(id,value){const el=document.getElementById(id);if(el&&value!==undefined&&value!==null)el.value=value}
function showSearch(message,type='info'){
 const el=document.getElementById('searchMessage');el.className=`alert alert-${type} mt-3`;el.textContent=message;
}
function searchRecord(){
 const pin=val('searchPin'),reg=val('searchReg'),category=val('searchCategory');
 if(!pin&&!reg){showSearch('অনুগ্রহ করে PIN নম্বর অথবা রেজিস্ট্রেশন নম্বর লিখুন।','warning');return}
 const found=getRecords().find(r=>r.category===category&&((pin&&r.pin===pin)||(reg&&r.regNo===reg)));
 if(found){loadRecord(found);showSearch('রেকর্ড পাওয়া গেছে। সংরক্ষিত তথ্য ফরমে দেখানো হয়েছে।','success')}
 else {showSearch('এই শ্রেণিতে দেওয়া PIN/রেজিস্ট্রেশন নম্বরে কোনো রেকর্ড পাওয়া যায়নি। নতুন রেশনভোগী হলে “নতুন ফরম” নির্বাচন করে তথ্য পূরণ করুন।','warning')}
}
function clearSearch(){setVal('searchPin','');setVal('searchReg','');const m=document.getElementById('searchMessage');m.className='hidden';m.textContent=''}
function copyPermanentAddress(){if(document.getElementById('sameAddress').checked)setVal('currentAddress',val('permanentAddress'));}
function collectMember(n){
 const obj={};memberFields.forEach(([k])=>obj[k]=val(`f${n}_${k}`));return obj;
}
function collectOtherMembers(){
 return [...document.querySelectorAll('.other-member')].map(card=>{
  const id=card.dataset.id,obj={};
  ['gender','memberNo','memberPin','memberClassNo','memberRIDNo','nameBn','nameEn','memberClass','relation','dob','profession','father','mother','marital','religion','nid','policeVerifyNo','policeVerifyDate','tradeMemoNo','tradeMemoDate','unitOrderNo','unitOrderDate','mobile','unitName','memberStatus'].forEach(k=>obj[k]=val(`${id}_${k}`));
  return obj;
 });
}
function collectRecord(){
 const obj={};['category','className','regNo','pin','fatherName','motherName','dob','nid','mobile','religion','familyCount','maritalStatus','permanentAddress','currentAddress','deathDate','deathCert'].forEach(k=>obj[k]=val(k));
 obj.id=val('recordId')||crypto.randomUUID();obj.members=[1,2,3,4].map(collectMember);obj.otherMembers=collectOtherMembers();obj.updatedAt=new Date().toISOString();return obj;
}
function loadRecord(r){
 setVal('recordId',r.id);
 ['category','className','regNo','pin','fatherName','motherName','dob','nid','mobile','religion','familyCount','maritalStatus','permanentAddress','currentAddress','deathDate','deathCert'].forEach(k=>setVal(k,r[k]));
 (r.members||[]).forEach((m,i)=>{memberFields.forEach(([k])=>setVal(`f${i+1}_${k}`,m[k]));});
 document.getElementById('otherMembers').innerHTML='';otherCounter=0;document.getElementById('noOther').classList.remove('hidden');(r.otherMembers||[]).forEach(m=>addOtherMember(m));
 window.scrollTo({top:document.getElementById('rationForm').offsetTop-20,behavior:'smooth'});
}
function newRecord(){
 document.getElementById('rationForm').reset();setVal('recordId','');if(document.getElementById('sameAddress'))document.getElementById('sameAddress').checked=false;
 for(let n=1;n<=4;n++)memberFields.forEach(([k])=>setVal(`f${n}_${k}`,''));
 document.getElementById('otherMembers').innerHTML='';otherCounter=0;document.getElementById('noOther').classList.remove('hidden');clearSearch();
}
document.getElementById('rationForm').addEventListener('submit',function(e){
 e.preventDefault();
 if(!this.reportValidity())return;
 const r=collectRecord();const records=getRecords();
 const duplicate=records.find(x=>x.id!==r.id&&x.category===r.category&&(x.pin===r.pin||x.regNo===r.regNo));
 if(duplicate){alert('এই শ্রেণিতে একই PIN অথবা রেজিস্ট্রেশন নম্বরের রেকর্ড আগে থেকেই আছে। আগে সার্চ করে রেকর্ডটি খুলুন।');return}
 // Generate visible sequence numbers for entered family members.
 r.members.forEach((m,i)=>{if(Object.values(m).some(v=>v)) {m.memberNo=m.memberNo||String(i+1).padStart(2,'0');m.memberClassNo=m.memberClassNo||String(i+1).padStart(2,'0');}});
 const index=records.findIndex(x=>x.id===r.id);if(index>=0)records[index]=r;else records.push(r);
 setRecords(records);setVal('recordId',r.id);setVal('searchPin',r.pin);setVal('searchReg',r.regNo);setVal('searchCategory',r.category);
 showSearch('তথ্য সফলভাবে এই ব্রাউজারে সংরক্ষণ করা হয়েছে। পরে PIN/রেজিস্ট্রেশন নম্বর দিয়ে খুঁজে পাওয়া যাবে।','success');
 alert('তথ্য সংরক্ষণ হয়েছে।'); 
});
function importData(event){
 const file=event.target.files&&event.target.files[0];if(!file)return;
 const reader=new FileReader();
 reader.onload=()=>{try{
   const parsed=JSON.parse(reader.result);
   if(!Array.isArray(parsed))throw new Error('invalid');
   const current=getRecords(),merged=[...current];
   parsed.forEach(r=>{if(r&&r.id){const i=merged.findIndex(x=>x.id===r.id);if(i>=0)merged[i]=r;else merged.push(r)}});
   setRecords(merged);showSearch('ব্যাকআপ ইমপোর্ট হয়েছে। একই ID থাকলে পুরোনো রেকর্ড আপডেট হয়েছে।','success');alert('ব্যাকআপ ইমপোর্ট সম্পন্ন।');
  }catch(e){alert('JSON ফাইলটি সঠিক ব্যাকআপ ফাইল নয়।');}
  event.target.value='';
 };
 reader.readAsText(file);
}
function exportData(){
 const data=JSON.stringify(getRecords(),null,2),blob=new Blob([data],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='non-pims-ration-backup.json';a.click();URL.revokeObjectURL(url);
}
buildFamilyCards();updateCount();
