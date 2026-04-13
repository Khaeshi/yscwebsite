const f=document.getElementById("page-data"),h=f.dataset.eventId??"",b=f.dataset.eventTitle??"";let a=[],c="all",i=null;function l(e,t=!0){const d=document.getElementById("toast");document.getElementById("toast-icon").textContent=t?"✅":"❌",document.getElementById("toast-msg").textContent=e,d.classList.remove("hidden"),setTimeout(()=>d.classList.add("hidden"),3500)}function r(e){return Math.floor((Date.now()-new Date(e).getTime())/(1e3*60*60*24*365.25))}function u(e){return new Date(e).toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"})}function x(e){return`<span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${{pending:"bg-amber-100 text-amber-700",approved:"bg-green-100 text-green-700",rejected:"bg-red-100 text-red-500"}[e]??""} capitalize">${e}</span>`}async function E(){a=(await(await fetch(`/api/registrations?eventId=${h}`)).json()).registrations??[],y(),m()}function y(){document.getElementById("s-total").textContent=String(a.length),document.getElementById("s-pending").textContent=String(a.filter(e=>e.status==="pending").length),document.getElementById("s-approved").textContent=String(a.filter(e=>e.status==="approved").length),document.getElementById("s-rejected").textContent=String(a.filter(e=>e.status==="rejected").length)}function m(){const e=c==="all"?a:a.filter(t=>t.status===c);if(document.getElementById("tbl-loading").classList.add("hidden"),e.length===0){document.getElementById("tbl-empty").classList.remove("hidden"),document.getElementById("tbl-wrapper").classList.add("hidden"),document.getElementById("mob-cards").classList.add("hidden");return}document.getElementById("tbl-empty").classList.add("hidden"),document.getElementById("tbl-wrapper").classList.remove("hidden"),document.getElementById("tbl-body").innerHTML=e.map(t=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">${t.fullName}</td>
        <td class="px-4 py-3">
          <div class="text-gray-700 text-xs">${t.email}</div>
          <div class="text-gray-400 text-xs mt-0.5">${t.phone}</div>
        </td>
        <td class="px-4 py-3 text-gray-600 whitespace-nowrap">${t.dateOfBirth?r(t.dateOfBirth)+" yrs":"—"}</td>
        <td class="px-4 py-3 text-gray-600 whitespace-nowrap">${t.parentGuardian}</td>
        <td class="px-4 py-3 text-gray-500 max-w-[120px] truncate">${t.instrumentInterest||"—"}</td>
        <td class="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">${u(t.createdAt)}</td>
        <td class="px-4 py-3">${x(t.status)}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-1.5">
            ${t.status!=="approved"?`<button data-action="approve" data-id="${t._id}" data-name="${t.fullName}" class="px-2.5 py-1 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">Approve</button>`:""}
            ${t.status!=="rejected"?`<button data-action="reject"  data-id="${t._id}" data-name="${t.fullName}" class="px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Reject</button>`:""}
          </div>
        </td>
      </tr>
    `).join(""),document.getElementById("mob-cards").classList.remove("hidden"),document.getElementById("mob-cards").innerHTML=e.map(t=>`
      <div class="p-4">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div>
            <p class="font-semibold text-gray-900 text-sm">${t.fullName}</p>
            <p class="text-xs text-gray-500 mt-0.5">${t.email}</p>
            <p class="text-xs text-gray-400">${t.phone}</p>
          </div>
          ${x(t.status)}
        </div>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
          <span>Age: ${t.dateOfBirth?r(t.dateOfBirth)+" yrs":"—"}</span>
          <span>Guardian: ${t.parentGuardian}</span>
          <span>Interest: ${t.instrumentInterest||"—"}</span>
          <span>Registered: ${u(t.createdAt)}</span>
        </div>
        <div class="flex gap-2">
          ${t.status!=="approved"?`<button data-action="approve" data-id="${t._id}" data-name="${t.fullName}" class="flex-1 py-1.5 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Approve</button>`:""}
          ${t.status!=="rejected"?`<button data-action="reject"  data-id="${t._id}" data-name="${t.fullName}" class="flex-1 py-1.5 text-xs font-semibold bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Reject</button>`:""}
        </div>
      </div>
    `).join(""),document.querySelectorAll("[data-action]").forEach(t=>{t.addEventListener("click",()=>{B(t.dataset.id??"",t.dataset.action??"",t.dataset.name??"")})})}document.querySelectorAll(".filter-tab").forEach(e=>{e.addEventListener("click",()=>{c=e.dataset.filter??"all",document.querySelectorAll(".filter-tab").forEach(t=>{t.classList.toggle("active",t.dataset.filter===c)}),m()})});function B(e,t,d){i={id:e,status:t==="approve"?"approved":"rejected"},document.getElementById("action-title").textContent=t==="approve"?`Approve ${d}?`:`Reject ${d}?`,document.getElementById("action-desc").textContent=t==="approve"?"A confirmation email will be sent to the registrant.":"The registrant will not receive an email for rejections.",document.getElementById("action-note").value="";const o=document.getElementById("action-confirm");o.textContent=t==="approve"?"Approve & Send Email":"Reject",o.className=`flex-1 px-4 py-2 text-white rounded-lg text-sm font-semibold transition-colors ${t==="approve"?"bg-green-600 hover:bg-green-700":"bg-red-600 hover:bg-red-700"}`;const s=document.getElementById("action-modal");s.classList.remove("hidden"),s.classList.add("flex")}function p(){const e=document.getElementById("action-modal");e.classList.add("hidden"),e.classList.remove("flex"),i=null}document.getElementById("action-cancel").addEventListener("click",p);document.getElementById("action-backdrop").addEventListener("click",p);document.getElementById("action-confirm").addEventListener("click",async()=>{if(!i)return;const e=document.getElementById("action-confirm"),t=document.getElementById("action-note").value.trim();e.disabled=!0,e.textContent="Saving...";try{const o=await(await fetch(`/api/registrations/${i.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:i.status,statusNote:t})})).json();if(o.success){const s=a.findIndex(g=>g._id===i?.id);s!==-1&&(a[s]={...a[s],...o.registration}),y(),m(),p(),l(i.status==="approved"?"Approved — confirmation email sent":"Registration rejected")}else l(o.message,!1)}catch{l("Action failed",!1)}finally{e.disabled=!1}});document.getElementById("export-btn").addEventListener("click",()=>{if(a.length===0){l("No registrants to export",!1);return}const e=["Full Name","Email","Phone","Date of Birth","Age","Parent/Guardian","Instrument Interest","Status","Registered On"],t=a.map(n=>[n.fullName,n.email,n.phone,n.dateOfBirth?new Date(n.dateOfBirth).toLocaleDateString("en-PH"):"",n.dateOfBirth?String(r(n.dateOfBirth)):"",n.parentGuardian,n.instrumentInterest??"",n.status,new Date(n.createdAt).toLocaleDateString("en-PH")]),d=[e,...t].map(n=>n.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join(`
`),o=new Blob([d],{type:"text/csv"}),s=URL.createObjectURL(o);Object.assign(document.createElement("a"),{href:s,download:`${b.replace(/[^a-z0-9]/gi,"_")}_registrants.csv`}).click(),URL.revokeObjectURL(s),l("Exported successfully")});E();
