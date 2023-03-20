let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));const iniciarApp=()=>{mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()},mostrarSeccion=()=>{const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const a=document.querySelector(".actual");a&&a.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")},tabs=()=>{document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault(),paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})},botonesPaginador=()=>{const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1==paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3==paso?(e.classList.remove("ocultar"),t.classList.add("ocultar")):(e.classList.remove("ocultar"),t.classList.remove("ocultar"),mostrarResumen()),mostrarSeccion()},paginaAnterior=()=>{document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))},paginaSiguiente=()=>{document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))},consultarAPI=async()=>{try{const e="http://localhost:3000/api/servicios",t=await fetch(e),a=await t.json();mostrarServicios(a)}catch(e){console.log(e)}},mostrarServicios=e=>{e.forEach(e=>{const{id:t,nombre:a,precio:o}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=a;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent="$"+o;const c=document.createElement("DIV");c.classList.add("servicio"),c.dataset.idServicio=t,c.onclick=function(){seleccionarServicio(e)},c.appendChild(n),c.appendChild(r),document.querySelector("#servicios").appendChild(c)})},seleccionarServicio=e=>{const{id:t}=e,{servicios:a}=cita,o=document.querySelector(`[data-id-servicio="${t}"]`);a.some(e=>e.id===t)?(cita.servicios=a.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...a,e],o.classList.add("seleccionado"))},idCliente=()=>{cita.id=document.querySelector("#id").value},nombreCliente=()=>{cita.nombre=document.querySelector("#nombre").value},seleccionarFecha=()=>{document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no permitimos","error",".formulario")):cita.fecha=e.target.value}))},seleccionarHora=()=>{document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<9||t>18?mostrarAlerta("Hora no válida","error",".formulario"):cita.hora=e.target.value}))},mostrarAlerta=(e,t,a,o=!0)=>{const n=document.querySelector(".alerta");n&&n.remove();const r=document.createElement("DIV");r.textContent=e,r.classList.add("alerta"),r.classList.add(t);document.querySelector(a).appendChild(r),o&&setTimeout(()=>{r.remove()},3e3)},mostrarResumen=()=>{const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Falta datos de Servicios, Fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:a,hora:o,servicios:n}=cita,r=document.createElement("H3");r.textContent="Resumen de Servicios",e.appendChild(r),n.forEach(t=>{const{id:a,precio:o,nombre:n}=t,r=document.createElement("DIV");r.classList.add("contenedor-servicio");const c=document.createElement("P");c.textContent=n;const i=document.createElement("P");i.innerHTML="<span>Precio:</span> $"+o,r.appendChild(c),r.appendChild(i),e.appendChild(r)});const c=document.createElement("H3");c.textContent="Resumen de Cita",e.appendChild(c);const i=document.createElement("P");i.innerHTML="<span>Nombre:</span> "+t;const s=new Date(a),d=s.getMonth(),l=s.getDate()+2,u=s.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML="<span>Fecha:</span> "+m;const v=document.createElement("P");v.innerHTML=`<span>Hora:</span> ${o} Horas`;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Resercar cita",h.onclick=reservarCita,e.appendChild(i),e.appendChild(p),e.appendChild(v),e.appendChild(h)},reservarCita=async()=>{const{nombre:e,fecha:t,hora:a,servicios:o,id:n}=cita,r=o.map(e=>e.id),c=new FormData;c.append("usuarioId",n),c.append("fecha",t),c.append("hora",a),c.append("servicios",r);try{const e="http://localhost:3000/api/citas",t=await fetch(e,{method:"POST",body:c}),a=await t.json();console.log(a.resultado),a.resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente",button:"OK"}).then(()=>{setTimeout(()=>{window.location.reload()},3e3)})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error al guardar la cita",button:"OK"})}};