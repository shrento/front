import"./listener-D7thdLZJ.js";let l=[];document.getElementById("vessel-form").addEventListener("submit",function(e){e.preventDefault(),o()});function o(){let e=document.getElementById("vessel-name").value.trim();if(e===""){window.alert("Введите название судна");return}l.push(e),document.getElementById("vessel-name").value="";let t=document.getElementById("final-vessel-tabel"),n=t.querySelector("tbody").insertRow().insertCell(0);n.textContent=e,t.style.display="table"}function d(){let e=document.getElementById("final-vessel-tabel"),t=e.querySelector("tbody");t.innerHTML="",l.forEach(s=>{let n=t.insertRow().insertCell(0);n.textContent=s}),e.style.display="table",i()}function i(){localStorage.setItem("uploadedVessels",JSON.stringify(l))}function r(){let e=JSON.parse(localStorage.getItem("uploadedVessels"))||[];l=e,e.length!=0&&d()}r();