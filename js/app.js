
const $=id=>document.getElementById(id),K="cop_v2";
const D={
scripts:[
{t:"Opener",b:"Hello, may I speak with [Name]? Hi [Name], this is [My name] from [Company]. I’m calling because we’re building an online professional directory, and your career at [Bank/Business] caught our eye. Did I catch you at an okay time? (If not: When would be better? Honor the answer.)"},
{t:"Discovery",b:"1. What are you most proud of from your career?\n2. What are you doing these days: advising, boards, charity, family projects?\n3. If someone searched your name today, what would you want them to find?\n\nListen first. Take notes for the listing bio."},
{t:"Visibility pitch",b:"A verified listing gives you one accurate, professional page about your career. It helps former colleagues, boards and family find you, and lets you control what’s said about you online. It’s a paid listing, and I’ll walk you through the options and prices so you can decide if it’s right for you."},
{t:"Milestone",b:"We’re opening the directory in stages, and we’re proud to be working toward our first 500,000 listings. It’s simply where we are in our growth. There’s no deadline pressure on your decision today."},
{t:"Send me info",b:"Of course, happy to. What email is best? I’ll send a short overview with tiers, prices and terms. May I call you on [day/time] to answer questions? If you’d rather not be called, just say so and I’ll note it."},
{t:"Verify & confirm",b:"Let me read back: Name, institution, bio highlights, tier chosen, price, billing term, and refund/cancellation policy. Do you agree to these terms? (Get a clear yes before any payment.) A confirmation email follows today."}],
tiers:[{n:"Essential Directory Listing",p:"$99 / year",d:"Verified name, title, short bio, searchable directory entry."},
{n:"Enhanced Professional Listing",p:"$199 / year",d:"Everything in Essential plus extended bio, photo, links and contact options."},
{n:"Premier Legacy Profile",p:"$349 / year",d:"Everything in Enhanced plus featured placement and a full career-legacy page."}],
cards:[{q:"Why do I need online visibility if I’m retired?",a:"Fair question. It’s less about finding clients and more about being easy to find for former colleagues, boards and family, with an accurate record of your career. Does that matter to you?"},
{q:"It’s too expensive / fixed pension",a:"I understand, and I wouldn’t want you to stretch your budget. We have an entry listing at [price], or you can skip it entirely. May I send details so you can decide later?"},
{q:"Send me information first",a:"Happy to. I’ll email tiers, prices and terms. Which email is best, and may I follow up on [date]? No obligation either way."},
{q:"Is this legitimate?",a:"Good to ask. We’re [Company], website [URL], contact [phone/email]. I’ll send written terms and our refund policy before you pay anything. Feel free to check us first."},
{q:"I need to ask my spouse/partner",a:"Absolutely, that’s a sensible step. I’ll send the details so you can talk it over together. When would be a good time for a short follow-up call?"}],
kpi:{dials:0,connects:0,qualified:0,followups:0},sold:[0,0,0],chk:{},recs:[],si:0};
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
S=Object.assign(JSON.parse(JSON.stringify(D)),S||{});
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const num=p=>parseFloat(String(p).replace(/[^0-9.]/g,""))||0;
function setp(path,v){const a=path.split(".");let o=S;for(let i=0;i<a.length-1;i++)o=o[a[i]];o[a[a.length-1]]=v}
document.addEventListener("input",e=>{const p=e.target.dataset.p;if(!p)return;setp(p,e.target.value);save();if(p.startsWith("tiers")){fillTiers();buildPrompt();kpi()}if(p.startsWith("scripts")&&p.endsWith(".t"))stabs(1);});
function copy(t,m){const done=()=>{if(m){m.textContent="Copied ✓";setTimeout(()=>m.textContent="",1800)}};
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done,()=>fb());else fb();
function fb(){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove();done()}}
/* tabs */
$("nav").onclick=e=>{const t=e.target.dataset.t;if(!t)return;document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x.id===t));document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===t));if(t==="t4")kpi()};
/* 1 prompt */
function buildPrompt(){const v=i=>$(i).value;const tiers=S.tiers.map(t=>`  <tier name="${t.n}" price="${t.p}">${t.d}</tier>`).join("\n");
const o=v("obj"),n=v("xn").trim();
$("pout").value=`<role>You are an outbound sales co-pilot helping a representative on a live phone call. Be warm, consultative and transparent. Never use false urgency or pressure, and always honor a “no”.</role>
<context>
  <persona>${v("persona")}</persona>
  <region>${v("region")}</region>
  <call_stage>${v("stage")}</call_stage>
  <offer>Paid online professional directory listings. Growth milestone: “First 500,000” listings (a company milestone, not a deadline).</offer>
  <tiers>
${tiers}
  </tiers>
</context>${o?`\n<live_objection>${o}</live_objection>`:""}${n?`\n<notes>${n}</notes>`:""}
<instructions>
1. Give 3 short, natural, speakable responses with tonality cues for this stage${o?" and objection":""}.
2. State prices and terms plainly; if the prospect hesitates, offer to send information or let them decide later.
3. Respect regional etiquette and call-time norms; keep claims accurate and verifiable.
4. If the prospect says no or asks not to be called again, give a polite close and a do-not-call note.
</instructions>`}
["persona","region","stage","obj","xn"].forEach(i=>$(i).addEventListener("input",buildPrompt));
$("cp").onclick=()=>copy($("pout").value,$("pmsg"));
$("oc").onclick=()=>{copy($("pout").value,$("pmsg"));window.open("https://claude.ai/new","_blank","noopener")};
/* 2 script */
let T=0,run=0,iv;const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
$("ts").onclick=()=>{if(run){clearInterval(iv);run=0;$("ts").textContent="Resume"}else{run=1;$("ts").textContent="Pause";iv=setInterval(()=>{T++;$("tm").textContent=fmt(T)},1000)}};
$("tr").onclick=()=>{clearInterval(iv);run=0;T=0;$("tm").textContent="00:00";$("ts").textContent="Start"};
const CK={us:["Scrub list against the National Do Not Call Registry and your internal DNC list","Call only between 8am and 9pm in the prospect’s local time","State company, your name and purpose at the start","Disclose total price, billing term and refund/cancellation policy before payment","Get a clear, recorded or written agreement before charging","Announce call recording and get consent (all-party-consent states)","Honor any opt-out request immediately and log it"],
eu:["Screen against TPS/CTPS (UK) and national opt-out lists","Have a lawful basis for the contact data and say where you got it (GDPR)","Check PECR rules for B2B vs. consumer calls","Announce recording and obtain consent before recording","Send written confirmation of terms; offer the 14-day cooling-off where it applies","Honor objection, erasure and access requests promptly","Keep call hours and tone appropriate to local norms"]};
let cr="us";
function chk(){$("chk").innerHTML=CK[cr].map((t,i)=>{const k=cr+i;return`<label class="chk" style="color:var(--tx);font-size:14px;margin:6px 0"><input type="checkbox" data-k="${k}" ${S.chk[k]?"checked":""}> ${t}</label>`}).join("");$("cu").classList.toggle("p",cr==="us");$("ce").classList.toggle("p",cr==="eu")}
$("chk").onchange=e=>{if(e.target.dataset.k){S.chk[e.target.dataset.k]=e.target.checked;save()}};
$("cu").onclick=()=>{cr="us";chk()};$("ce").onclick=()=>{cr="eu";chk()};$("cx").onclick=()=>{S.chk={};save();chk()};
function stabs(k){$("stabs").innerHTML=S.scripts.map((s,i)=>`<button data-i="${i}" class="${i===S.si?"p":""}">${i+1} · ${esc(s.t)}</button>`).join("");if(!k)sbox()}
function sbox(){const s=S.scripts[S.si];$("sbox").innerHTML=`<label>Script title</label><input data-p="scripts.${S.si}.t" value="${esc(s.t)}"><label>Script text</label><textarea data-p="scripts.${S.si}.b" style="min-height:190px;font-size:16px">${esc(s.b)}</textarea>`}
$("stabs").onclick=e=>{const i=e.target.dataset.i;if(i===undefined)return;S.si=+i;save();stabs()};
function tiersR(){$("tiers").innerHTML=S.tiers.map((t,i)=>`<div class="c tier t${i}">${i==1?'<span class="bd">Most popular</span>':i==2?'<span class="bd gd">Premier</span>':''}<label>Name</label><input data-p="tiers.${i}.n" value="${esc(t.n)}"><label>Price</label><input data-p="tiers.${i}.p" value="${esc(t.p)}"><label>What’s included</label><textarea data-p="tiers.${i}.d">${esc(t.d)}</textarea></div>`).join("")}
function cardsR(){$("cards").innerHTML=S.cards.map((c,i)=>`<div class="c"><div class="ctr"><b style="font-size:13px" class="mu">Objection / question</b><button class="x" data-del="${i}">✕</button></div><input data-p="cards.${i}.q" value="${esc(c.q)}"><label>Response</label><textarea data-p="cards.${i}.a">${esc(c.a)}</textarea></div>`).join("")}
$("cards").onclick=e=>{const i=e.target.dataset.del;if(i===undefined||!confirm("Delete this card?"))return;S.cards.splice(+i,1);save();cardsR()};
$("addc").onclick=()=>{S.cards.push({q:"New objection",a:"Your response…"});save();cardsR()};
/* 3 intake */
const F=["name","reg","email","phone","inst","bg","bio","tier","terms","pay","note"];
function fillTiers(){const cur=$("f_tier").value;$("f_tier").innerHTML=S.tiers.map(t=>`<option>${esc(t.n)}</option>`).join("");if(cur)$("f_tier").value=cur}
const cur=()=>{const r={};F.forEach(f=>r[f]=$("f_"+f).value);r.date=new Date().toISOString().slice(0,10);return r};
const data=()=>S.recs.length?S.recs:[cur()];
function recs(){$("fcount").textContent=`(${S.recs.length} saved)`;$("recs").innerHTML=S.recs.map((r,i)=>`<div class="ctr" style="border-top:1px solid var(--line);padding:6px 0"><span>${esc(r.name)} <small>· ${esc(r.tier)} · ${esc(r.pay)}</small></span><button class="x" data-r="${i}">✕</button></div>`).join("")||'<small>No saved records yet.</small>'}
$("fsave").onclick=()=>{if(!$("f_name").value.trim())return alert("Add a name first.");S.recs.push(cur());save();recs();$("fclr").click()};
$("fclr").onclick=()=>{F.forEach(f=>{const e=$("f_"+f);if(e.tagName==="INPUT"||e.tagName==="TEXTAREA")e.value=""})};
$("recs").onclick=e=>{const i=e.target.dataset.r;if(i===undefined)return;S.recs.splice(+i,1);save();recs()};
const H=[...F,"date"];
$("xj").onclick=()=>$("xo").value=JSON.stringify(data(),null,2);
$("xc").onclick=()=>{const q=v=>`"${String(v??"").replace(/"/g,'""')}"`;$("xo").value=[H.join(","),...data().map(r=>H.map(h=>q(r[h])).join(","))].join("\n")};
$("xm").onclick=()=>{const c=v=>String(v??"").replace(/\|/g,"/").replace(/\n/g," ");$("xo").value=`| ${H.join(" | ")} |\n|${H.map(()=>"---").join("|")}|\n`+data().map(r=>`| ${H.map(h=>c(r[h])).join(" | ")} |`).join("\n")};
$("xcp").onclick=()=>copy($("xo").value,null);
/* 4 kpi */
const KL=[["dials","Total dials"],["connects","Conversations"],["qualified","Qualified leads"],["followups","Follow-ups done"]];
function kpi(){let h=KL.map(([k,l])=>`<div class="c"><small>${l}</small><div class="ctr"><button data-k="${k}" data-d="-1">−</button><b>${S.kpi[k]}</b><button class="p" data-k="${k}" data-d="1">+</button></div></div>`).join("");
h+=S.tiers.map((t,i)=>`<div class="c"><small>Sold · ${esc(t.n)} (${esc(t.p)})</small><div class="ctr"><button data-s="${i}" data-d="-1">−</button><b>${S.sold[i]||0}</b><button class="p" data-s="${i}" data-d="1">+</button></div></div>`).join("");
const rev=S.tiers.reduce((a,t,i)=>a+(S.sold[i]||0)*num(t.p),0);
h+=`<div class="c"><small>Total revenue</small><div class="big">${rev.toLocaleString()}</div><small>Auto-calculated from tier prices</small></div>`;$("kg").innerHTML=h;
const sold=S.sold.reduce((a,b)=>a+(b||0),0),pc=(a,b)=>b?(100*a/b).toFixed(1)+"%":"–";
$("rates").innerHTML=[["Connect rate",pc(S.kpi.connects,S.kpi.dials)],["Qualify rate",pc(S.kpi.qualified,S.kpi.connects)],["Close rate (of connects)",pc(sold,S.kpi.connects)],["Listings sold",sold]].map(([l,v])=>`<div><small>${l}</small><div class="big" style="font-size:26px">${v}</div></div>`).join("");return{rev,sold,pc}}
$("kg").onclick=e=>{const d=+e.target.dataset.d;if(!d)return;const k=e.target.dataset.k,s=e.target.dataset.s;if(k)S.kpi[k]=Math.max(0,S.kpi[k]+d);else S.sold[s]=Math.max(0,(S.sold[s]||0)+d);save();kpi()};
function eod(){const r=kpi(),k=S.kpi;return`END-OF-DAY REPORT · ${new Date().toDateString()}
Dials: ${k.dials} | Conversations: ${k.connects} (${r.pc(k.connects,k.dials)})
Qualified leads: ${k.qualified} (${r.pc(k.qualified,k.connects)} of conversations)
Follow-ups completed: ${k.followups}
Listings sold: ${r.sold} (close rate ${r.pc(r.sold,k.connects)})
${S.tiers.map((t,i)=>`  - ${t.n}: ${S.sold[i]||0}`).join("\n")}
Total revenue: ${r.rev.toLocaleString()}
Notes / blockers: `}
$("eg").onclick=()=>$("eod").value=eod();$("ecp").onclick=()=>copy($("eod").value,null);
$("eoc").onclick=()=>{const t=`<task>Turn these daily sales metrics into a concise manager summary with 2 wins, 1 area to improve and a plan for tomorrow.</task>\n<metrics>\n${$("eod").value||eod()}\n</metrics>`;copy(t,null);window.open("https://claude.ai/new","_blank","noopener")};
$("ekr").onclick=()=>{if(confirm("Reset today’s counters?")){S.kpi={dials:0,connects:0,qualified:0,followups:0};S.sold=[0,0,0];save();kpi()}};
/* init */
if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
buildPrompt();chk();stabs();tiersR();cardsR();fillTiers();recs();kpi();

/* v2 upgrades */
let PV=0;const hl=t=>esc(t).replace(/\[[^\]]*\]/g,m=>`<span class="ph">${m}</span>`).replace(/\n/g,"<br>");
sbox=function(){const s=S.scripts[S.si];$("sbox").innerHTML=`<div class="row" style="margin-top:0"><input data-p="scripts.${S.si}.t" value="${esc(s.t)}" style="flex:1"><button id="pvt">${PV?"Edit":"Teleprompter"}</button></div>`+(PV?`<div class="pv">${hl(s.b)}</div>`:`<textarea class="script" data-p="scripts.${S.si}.b">${esc(s.b)}</textarea>`);$("pvt").onclick=()=>{PV=!PV;sbox()}};
const _kpi=kpi;kpi=function(){const r=_kpi();$("hdn").textContent=S.kpi.dials;$("hcn").textContent=S.kpi.connects;return r};
$("hd").onclick=()=>{S.kpi.dials++;save();kpi()};$("hc").onclick=()=>{S.kpi.connects++;save();kpi()};
addEventListener("keydown",e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable||e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key.toLowerCase();
if(k===" "){e.preventDefault();if(e.target.tagName==="BUTTON")e.target.blur();$("ts").click()}else if(k==="d")$("hd").click();else if(k==="c")$("hc").click();
else if(/^[1-6]$/.test(k)&&S.scripts[k-1]){document.querySelector("[data-t=t2]").click();S.si=+k-1;save();stabs()}});
{const t=location.hash.slice(1);if(/^t[1-4]$/.test(t))document.querySelector(`nav button[data-t=${t}]`).click()}
stabs();kpi();
