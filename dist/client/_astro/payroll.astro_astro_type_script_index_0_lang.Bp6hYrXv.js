const h=Array.from(document.querySelectorAll(".period-tab")),B=document.getElementById("prev-period"),L=document.getElementById("next-period"),$=document.getElementById("period-label"),x=document.getElementById("anchor-date"),p=document.getElementById("payroll-body"),k=document.getElementById("sum-teachers"),P=document.getElementById("sum-sessions"),T=document.getElementById("sum-total"),M=document.getElementById("export-csv"),D=document.getElementById("rate-modal"),A=document.getElementById("rate-form"),v=document.getElementById("rate-teacher-id"),C=document.getElementById("rate-teacher-name"),E=document.getElementById("rate-amount"),S=document.getElementById("rate-effective-from"),s=document.getElementById("rate-msg");let i="weekly",c=new Date,l=[],y=new Set;function b(t){return Number(t||0).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}function u(t){return new Date(t).toISOString().slice(0,10)}function N(){h.forEach(t=>{const e=t.getAttribute("data-period")===i;t.style.background=e?"#7c3aed":"#11111f",t.style.border=e?"none":"1px solid rgba(255,255,255,0.08)",t.style.color=e?"#fff":"#cbd5e1",t.style.fontWeight=e?"700":"500"})}function F(t,e){const a=new Date(e.getFullYear(),e.getMonth(),e.getDate());if(t==="weekly"){const d=a.getDay(),o=d===0?-6:1-d,r=new Date(a);r.setDate(a.getDate()+o);const f=new Date(r);return f.setDate(r.getDate()+6),{start:r,end:f}}if(t==="bimonthly"){const d=a.getFullYear(),o=a.getMonth();if(a.getDate()<=15)return{start:new Date(d,o,1),end:new Date(d,o,15)};const r=new Date(d,o+1,0).getDate();return{start:new Date(d,o,16),end:new Date(d,o,r)}}const n=a.getFullYear(),m=a.getMonth();return{start:new Date(n,m,1),end:new Date(n,m+1,0)}}function j(){const{start:t,end:e}=F(i,c);$.textContent=`${t.toLocaleDateString()} - ${e.toLocaleDateString()}`}function w(t){const e=new Date(c);i==="weekly"&&e.setDate(e.getDate()+7*t),i==="bimonthly"&&e.setDate(e.getDate()+15*t),i==="monthly"&&e.setMonth(e.getMonth()+t),c=e,x.value=u(c),g()}function I(){if(!l.length){p.innerHTML='<tr><td colspan="5" style="padding:14px 12px;color:#64748b;">No payroll data for this period.</td></tr>';return}p.innerHTML=l.map(t=>{const e=y.has(t.teacherId),a=e?`
            <tr>
              <td colspan="5" style="padding:10px 12px 14px 12px;background:#11111f;border-top:1px solid rgba(255,255,255,0.04);">
                <div style="border:1px solid rgba(255,255,255,0.06);border-radius:10px;overflow:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:11px;">
                    <thead style="background:#0d0d1a;color:#94a3b8;">
                      <tr>
                        <th style="text-align:left;padding:8px 10px;">Date</th>
                        <th style="text-align:left;padding:8px 10px;">Student</th>
                        <th style="text-align:left;padding:8px 10px;">Subject</th>
                        <th style="text-align:left;padding:8px 10px;">Time</th>
                      </tr>
                    </thead>
                    <tbody style="background:#11111f;color:#cbd5e1;">
                      ${t.breakdown.length?t.breakdown.map(n=>`
                        <tr style="border-top:1px solid rgba(255,255,255,0.05);">
                          <td style="padding:8px 10px;">${new Date(n.scheduledDate).toLocaleDateString()}</td>
                          <td style="padding:8px 10px;">${n.studentName??""}</td>
                          <td style="padding:8px 10px;">${n.subject??""}</td>
                          <td style="padding:8px 10px;">${n.time??""}</td>
                        </tr>
                      `).join(""):'<tr><td colspan="4" style="padding:10px;color:#64748b;">No attended sessions.</td></tr>'}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          `:"";return`
          <tr style="border-top:1px solid rgba(255,255,255,0.06);">
            <td style="padding:10px 12px;">${t.teacherName}</td>
            <td style="padding:10px 12px;">${t.sessionsCount}</td>
            <td style="padding:10px 12px;">PHP ${b(t.ratePerSession)}</td>
            <td style="padding:10px 12px;">PHP ${b(t.totalAmount)}</td>
            <td style="padding:10px 12px;text-align:right;white-space:nowrap;">
              <button data-action="expand" data-id="${t.teacherId}" style="background:transparent;border:1px solid rgba(255,255,255,0.10);color:#60a5fa;border-radius:10px;padding:7px 10px;cursor:pointer;font-size:12px;margin-right:8px;">
                ${e?"Hide":"Breakdown"}
              </button>
              <button data-action="rate" data-id="${t.teacherId}" data-name="${t.teacherName}" data-rate="${t.ratePerSession}" style="background:transparent;border:1px solid rgba(255,255,255,0.10);color:#22c55e;border-radius:10px;padding:7px 10px;cursor:pointer;font-size:12px;">
                Set Rate
              </button>
            </td>
          </tr>
          ${a}
        `}).join("")}async function g(){N(),j(),p.innerHTML='<tr><td colspan="5" style="padding:14px 12px;color:#64748b;">Loading...</td></tr>';const t=u(c),a=await(await fetch(`/api/payroll/summary?period=${i}&date=${t}`)).json().catch(()=>({}));if(!a.success){p.innerHTML='<tr><td colspan="5" style="padding:14px 12px;color:#ef4444;">Failed to load payroll summary.</td></tr>';return}l=a.summaries??[];const n=l.length,m=l.reduce((o,r)=>o+Number(r.sessionsCount||0),0),d=l.reduce((o,r)=>o+Number(r.totalAmount||0),0);k.textContent=String(n),P.textContent=String(m),T.textContent=b(d),I()}function R(){const t=[["Teacher","Sessions","RatePerSession","TotalAmount","PeriodStart","PeriodEnd"].join(","),...l.map(n=>[`"${(n.teacherName||"").replace(/"/g,'""')}"`,n.sessionsCount??0,n.ratePerSession??0,n.totalAmount??0,n.periodStart?new Date(n.periodStart).toISOString():"",n.periodEnd?new Date(n.periodEnd).toISOString():""].join(","))],e=new Blob([t.join(`
`)],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(e),a.download=`payroll-${i}-${u(c)}.csv`,a.click(),URL.revokeObjectURL(a.href)}function H(t,e,a){v.value=t,C.value=e,E.value=Number(a||0),S.value=u(new Date),s.textContent="",s.style.color="#94a3b8",D.showModal()}h.forEach(t=>{t.addEventListener("click",()=>{i=t.getAttribute("data-period"),g()})});B?.addEventListener("click",()=>w(-1));L?.addEventListener("click",()=>w(1));x?.addEventListener("change",()=>{c=new Date(x.value||new Date),g()});M?.addEventListener("click",R);p?.addEventListener("click",t=>{const e=t.target?.closest?.("button");if(!e)return;const a=e.getAttribute("data-action"),n=e.getAttribute("data-id");if(!(!a||!n)){if(a==="expand"){y.has(n)?y.delete(n):y.add(n),I();return}a==="rate"&&H(n,e.getAttribute("data-name")||"",e.getAttribute("data-rate")||0)}});A?.addEventListener("submit",async t=>{t.preventDefault(),s.textContent="Saving...",s.style.color="#94a3b8";const e={teacherId:v.value,amountPerSession:Number(E.value),currency:"PHP",effectiveFrom:S.value},n=await(await fetch("/api/payroll/rates",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json().catch(()=>({}));if(!n.success){s.textContent=n.message||"Failed to save rate",s.style.color="#ef4444";return}s.textContent="Rate saved.",s.style.color="#22c55e",setTimeout(()=>D.close(),300),await g()});x.value=u(c);g();
