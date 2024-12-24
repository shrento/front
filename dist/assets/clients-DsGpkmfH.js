import"./listener-D7thdLZJ.js";async function n(r){try{let t=await fetch(`https://dummyjson.com/users/${r}`,{signal:AbortSignal.timeout(1e4)});return t.ok?await t.json():Promise.reject(`Что-то пошло не так. Статус ошибки: ${t.status}`)}catch(t){return t.name==="AbortError"?Promise.reject("Превышено время ожидания"):Promise.reject(`Ошибка запроса: ${t.message}`)}}async function o(){let t=Array.from({length:10},()=>Math.floor(Math.random()*200)+1).map(n);return await Promise.allSettled(t)}async function l(){let r=document.getElementById("preloader"),t=document.getElementById("clients-list");results=await o(),results.forEach(s=>{if(s.status==="fulfilled"){let e=s.value,a=document.createElement("li");a.innerHTML=`
                <strong>${e.firstName} ${e.lastName}</strong><br>
                Почта: ${e.email}<br>
                Адрес: ${e.company.address.address}, ${e.company.address.city}, 
                ${e.company.address.state}, ${e.company.address.postalCode}, ${e.company.address.country}<br>
                Номер горячей линии: ${e.phone}<br>
                Компания: ${e.company.name}
            `,t.appendChild(a)}else if(s.status==="rejected"){let e=document.createElement("div");e.className="error-message",e.textContent=`${s.reason}`,t.appendChild(e)}}),r.style.display="none"}l();
