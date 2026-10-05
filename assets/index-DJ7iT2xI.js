(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.addEventListener(`DOMContentLoaded`,function(){document.querySelectorAll(`.btn`).forEach(e=>{e.addEventListener(`click`,function(){this.style.opacity=`0.8`,setTimeout(()=>{this.style.opacity=`1`},200)})});let e=new IntersectionObserver(function(e){e.forEach(e=>{e.isIntersecting&&(e.target.style.animation=`fadeInUp 0.6s ease-out forwards`)})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`section`).forEach(t=>{e.observe(t)});let t=document.createElement(`style`);t.textContent=`
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: rgba(15, 15, 15, 0.95);
            padding: 40px;
            border: 1px solid rgba(0, 217, 255, 0.2);
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-header {
            font-size: 28px;
            font-weight: 900;
            background: linear-gradient(135deg, #ffffff, #00d9ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 30px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            color: #a0a0a0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px;
            background-color: rgba(0, 217, 255, 0.05);
            border: 1px solid rgba(0, 217, 255, 0.2);
            color: #ffffff;
            font-size: 14px;
            border-radius: 4px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .form-group input:focus {
            outline: none;
            border-color: #00d9ff;
            background-color: rgba(0, 217, 255, 0.1);
            box-shadow: 0 0 12px rgba(0, 217, 255, 0.3);
        }

        .modal-buttons {
            display: flex;
            gap: 12px;
            margin-top: 30px;
        }

        .modal-btn {
            flex: 1;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }

        .modal-btn-submit {
            background: linear-gradient(135deg, #00d9ff, #0099cc);
            color: #000;
        }

        .modal-btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 217, 255, 0.5);
        }

        .modal-btn-cancel {
            background-color: transparent;
            border: 2px solid #00d9ff;
            color: #00d9ff;
        }

        .modal-btn-cancel:hover {
            background-color: rgba(0, 217, 255, 0.1);
            box-shadow: 0 0 12px rgba(0, 217, 255, 0.4);
        }

        .toggle-form {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #a0a0a0;
        }

        .toggle-form a {
            color: #00d9ff;
            cursor: pointer;
            text-decoration: none;
            font-weight: 600;
        }

        .toggle-form a:hover {
            text-decoration: underline;
        }
    `,document.head.appendChild(t);let n=document.querySelector(`.btn-login`),r=document.querySelector(`.btn-register`);n&&n.addEventListener(`click`,function(){i()}),r&&r.addEventListener(`click`,function(){a()});function i(){let e=document.getElementById(`auth-modal`);e&&e.remove();let t=document.createElement(`div`);t.id=`auth-modal`,t.className=`modal active`,t.innerHTML=`
            <div class="modal-content">
                <div class="modal-header">Login</div>
                <form id="login-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="modal-btn modal-btn-submit">Login</button>
                        <button type="button" class="modal-btn modal-btn-cancel" onclick="document.getElementById('auth-modal').remove()">Close</button>
                    </div>
                    <div class="toggle-form">
                        Don't have an account? <a onclick="showRegisterModal()">Register here</a>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(t),t.addEventListener(`click`,function(e){e.target===t&&t.remove()}),document.getElementById(`login-form`).addEventListener(`submit`,function(e){e.preventDefault(),alert(`Login successful! Welcome to ARENA.`),t.remove()})}function a(){let e=document.getElementById(`auth-modal`);e&&e.remove();let t=document.createElement(`div`);t.id=`auth-modal`,t.className=`modal active`,t.innerHTML=`
            <div class="modal-content">
                <div class="modal-header">Register</div>
                <form id="register-form">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Choose your username" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" required>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" required>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="modal-btn modal-btn-submit">Register</button>
                        <button type="button" class="modal-btn modal-btn-cancel" onclick="document.getElementById('auth-modal').remove()">Close</button>
                    </div>
                    <div class="toggle-form">
                        Already have an account? <a onclick="showLoginModal()">Login here</a>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(t),t.addEventListener(`click`,function(e){e.target===t&&t.remove()}),document.getElementById(`register-form`).addEventListener(`submit`,function(e){if(e.preventDefault(),this.querySelector(`input[type="password"]`).value!==this.querySelectorAll(`input[type="password"]`)[1].value){alert(`Passwords do not match!`);return}alert(`Registration successful! You can now login to ARENA.`),t.remove()})}window.showLoginModal=i,window.showRegisterModal=a}),document.addEventListener(`DOMContentLoaded`,function(){let e=document.querySelectorAll(`.tab-btn`),t=document.getElementById(`pricing-content`),n={hourly:[{name:`Standard`,price:`$12`,desc:`Per hour`},{name:`VIP`,price:`$24`,desc:`Per hour`},{name:`Bootcamp`,price:`$18`,desc:`Per hour`}],daily:[{name:`Standard`,price:`$85`,desc:`Per day`},{name:`VIP`,price:`$170`,desc:`Per day`},{name:`Bootcamp`,price:`$125`,desc:`Per day`}],monthly:[{name:`Standard`,price:`$280`,desc:`Unlimited`},{name:`VIP`,price:`$560`,desc:`Unlimited`},{name:`Bootcamp`,price:`$420`,desc:`Unlimited`}]};function r(e){t.innerHTML=n[e].map(e=>`
                <div class="price-card">
                    <h3>${e.name}</h3>
                    <p class="price-desc">${e.desc}</p>
                    <div class="price-amount">${e.price}</div>
                    <button class="btn btn-primary-small" onclick="openBookingModal()">Select Plan</button>
                </div>
            `).join(``)}e.forEach(t=>{t.addEventListener(`click`,function(){e.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),r(this.getAttribute(`data-tab`))})});let i={vip:24,bootcamp:18,ps5:12,streaming:30,tournament:40,casual:8,vr:25},a=document.getElementById(`zone-select`),o=document.getElementById(`duration`),s=document.getElementById(`rate-display`),c=document.getElementById(`duration-display`),l=document.getElementById(`total-price`),u=document.querySelector(`.reservation-form`);function d(){let e=a.value,t=o.value;if(e&&t){let n=i[e],r=parseInt(t),a=n*r;s.textContent=`$${n}`,c.textContent=`${r} hour${r>1?`s`:``}`,l.textContent=`$${a}`}else s.textContent=`$0`,c.textContent=`0 hours`,l.textContent=`$0`}a.addEventListener(`change`,d),o.addEventListener(`change`,d),u.addEventListener(`submit`,function(e){e.preventDefault();let t={zone:a.value,date:document.getElementById(`reservation-date`).value,time:document.getElementById(`reservation-time`).value,duration:o.value,players:document.getElementById(`players`).value,name:document.getElementById(`name`).value,email:document.getElementById(`email`).value,totalPrice:l.textContent};console.log(`Reservation submitted:`,t),alert(`Reservation confirmed!\n\nZone: ${a.options[a.selectedIndex].text}\nDate: ${t.date}\nTime: ${t.time}\nTotal: ${t.totalPrice}\n\nConfirmation sent to ${t.email}`),u.reset(),d()})});var e={selectedDate:null,selectedTime:null,selectedDuration:2,selectedZone:null,userInfo:{name:``,email:``,phone:``}},t=[{id:`vip`,name:`VIP ARENA`,price:24,specs:`RTX 4090 • 240Hz Monitors • Private Booths`,maxSlots:3},{id:`bootcamp`,name:`Bootcamps`,price:18,specs:`Pro Coaching • Ranked Matches • Team Events`,maxSlots:5},{id:`ps5`,name:`PS5 Lounge`,price:15,specs:`Tournaments • Streaming Setup • Arcade Feel`,maxSlots:6},{id:`streaming`,name:`Streaming Studio`,price:20,specs:`4K Cameras • Green Screen • Audio Mixing`,maxSlots:2},{id:`tournament`,name:`Tournament Arena`,price:28,specs:`Large Display • Live Commentary • Spectator Seating`,maxSlots:4}];document.addEventListener(`DOMContentLoaded`,function(){let e=document.querySelector(`.btn-primary`);e&&e.textContent.includes(`Book`)&&(e.onclick=function(e){e.preventDefault(),n()}),a()});function n(){let e=document.getElementById(`booking-modal`);e&&(e.classList.add(`active`),document.body.style.overflow=`hidden`)}function r(){let e=document.getElementById(`booking-modal`);e&&(e.classList.remove(`active`),document.body.style.overflow=`auto`,i())}function i(){e.selectedDate=null,e.selectedTime=null,e.selectedDuration=2,e.selectedZone=null,e.userInfo={name:``,email:``,phone:``},h(`date`)}function a(){o(new Date)}function o(t){let n=document.getElementById(`booking-calendar`);if(!n)return;n.innerHTML=``;let r=document.createElement(`div`);r.className=`calendar-header`,r.innerHTML=`
    <button onclick="previousMonth()">←</button>
    <h4 id="month-year"></h4>
    <button onclick="nextMonth()">→</button>
  `,n.appendChild(r);let i=document.getElementById(`month-year`);i&&(i.textContent=t.toLocaleDateString(`en-US`,{month:`long`,year:`numeric`})),[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`].forEach(e=>{let t=document.createElement(`div`);t.className=`calendar-weekday`,t.textContent=e,n.appendChild(t)});let a=new Date(t.getFullYear(),t.getMonth(),1).getDay(),o=new Date(t.getFullYear(),t.getMonth()+1,0).getDate(),c=new Date(t.getFullYear(),t.getMonth(),0).getDate();for(let e=a-1;e>=0;e--){let t=document.createElement(`div`);t.className=`calendar-day other-month`,t.textContent=c-e,n.appendChild(t)}let l=new Date;l.setHours(0,0,0,0);for(let r=1;r<=o;r++){let i=document.createElement(`div`),a=new Date(t.getFullYear(),t.getMonth(),r);i.className=`calendar-day`,i.textContent=r,a<l?i.classList.add(`disabled`):(i.addEventListener(`click`,()=>s(a)),e.selectedDate&&e.selectedDate.toDateString()===a.toDateString()&&i.classList.add(`selected`),a.toDateString()===l.toDateString()&&i.classList.add(`today`)),n.appendChild(i)}let u=42-(a+o);for(let e=1;e<=u;e++){let t=document.createElement(`div`);t.className=`calendar-day other-month`,t.textContent=e,n.appendChild(t)}}function s(t){e.selectedDate=t,o(t),h(`time`)}function c(){let t=document.getElementById(`booking-time`).value,n=document.getElementById(`booking-duration`).value;if(!t){alert(`Please select a time`);return}e.selectedTime=t,e.selectedDuration=parseInt(n),l(),h(`zone`)}function l(){let n=document.getElementById(`zone-availability`);n&&(n.innerHTML=``,t.forEach(t=>{let r=Math.floor(Math.random()*t.maxSlots)+1,i=r>0,a=document.createElement(`div`);a.className=`zone-option ${i?``:`unavailable`}`;let o=`available`,s=`${r}/${t.maxSlots} slots available`;r<=1&&(o=`limited`,s=`${r}/${t.maxSlots} slot available`),a.innerHTML=`
      <h4>${t.name}</h4>
      <p>${t.specs}</p>
      <div class="zone-price">$${t.price}/hour</div>
      <span class="zone-availability-status ${o}">${s}</span>
    `,i?(a.addEventListener(`click`,()=>u(t)),e.selectedZone&&e.selectedZone.id===t.id&&a.classList.add(`selected`)):a.style.pointerEvents=`none`,n.appendChild(a)}))}function u(t){e.selectedZone=t,l(),d()}function d(){if(!e.selectedZone){alert(`Please select a zone`);return}let t=e.selectedDate.toLocaleDateString(`en-US`,{weekday:`short`,month:`short`,day:`numeric`});document.getElementById(`review-datetime`).textContent=`${t} at ${e.selectedTime}`,document.getElementById(`review-zone`).textContent=e.selectedZone.name,document.getElementById(`review-duration`).textContent=`${e.selectedDuration} hour${e.selectedDuration>1?`s`:``}`;let n=e.selectedZone.price*e.selectedDuration;document.getElementById(`review-price`).textContent=`$${n}`,h(`review`)}function f(){let t=document.getElementById(`user-name`).value,n=document.getElementById(`user-email`).value,r=document.getElementById(`user-phone`).value;if(!t||!n||!r){alert(`Please fill in all fields`);return}if(!v(n)){alert(`Please enter a valid email`);return}e.userInfo={name:t,email:n,phone:r};let i=y(),a=e.selectedZone.price*e.selectedDuration,o=JSON.parse(localStorage.getItem(`arena_bookings`)||`[]`);o.push({id:i,...e,totalPrice:a,status:`confirmed`,createdAt:new Date().toISOString()}),localStorage.setItem(`arena_bookings`,JSON.stringify(o)),p(i,a)}function p(t,n){let r=e.selectedDate.toLocaleDateString(`en-US`,{weekday:`long`,month:`long`,day:`numeric`,year:`numeric`}),i=document.getElementById(`confirmation-details`);i&&(i.innerHTML=`
      <p><strong>Booking ID:</strong> ${t}</p>
      <p><strong>Date:</strong> ${r}</p>
      <p><strong>Time:</strong> ${e.selectedTime}</p>
      <p><strong>Duration:</strong> ${e.selectedDuration} hours</p>
      <p><strong>Zone:</strong> ${e.selectedZone.name}</p>
      <p><strong>Total Price:</strong> $${n}</p>
      <p style="margin-top: 16px; color: #00d9ff;"><strong>A confirmation email has been sent to ${e.userInfo.email}</strong></p>
    `),m(e.userInfo.email,{bookingId:t,dateStr:r,time:e.selectedTime,duration:e.selectedDuration,zone:e.selectedZone.name,totalPrice:n,name:e.userInfo.name}),h(`confirmation`)}function m(e,t){console.log(`Sending confirmation email to:`,e,t)}function h(e){document.querySelectorAll(`.booking-step`).forEach(e=>{e.classList.add(`hidden`)});let t=document.getElementById(`step-${e}`);t&&t.classList.remove(`hidden`)}function g(){let e=document.getElementById(`month-year`);if(!e)return;let t=new Date(e.textContent);o(new Date(t.getFullYear(),t.getMonth()-1))}function _(){let e=document.getElementById(`month-year`);if(!e)return;let t=new Date(e.textContent);o(new Date(t.getFullYear(),t.getMonth()+1))}function v(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function y(){return`BK-`+Date.now().toString(36).toUpperCase()+Math.random().toString(36).substr(2,5).toUpperCase()}window.openBookingModal=n,window.closeBookingModal=r,window.goToZoneSelection=c,window.goToReview=d,window.completeBooking=f,window.previousMonth=g,window.nextMonth=_,window.selectDate=s,window.selectZone=u;var b=[{id:`vip`,name:`VIP ARENA`,price:24,specs:`RTX 4090 • 240Hz Monitors • Private Booths`,maxSlots:3,equipment:[`rtx`],gameType:[`competitive`,`tournament`],popularity:95,rating:4.9,availability:`available`},{id:`bootcamp`,name:`Bootcamps`,price:18,specs:`Pro Coaching • Ranked Matches • Team Events`,maxSlots:5,equipment:[`rtx`],gameType:[`competitive`,`tournament`],popularity:88,rating:4.7,availability:`available`},{id:`ps5`,name:`PS5 Lounge`,price:15,specs:`Tournaments • Streaming Setup • Arcade Feel`,maxSlots:6,equipment:[`console`,`streaming`],gameType:[`casual`,`competitive`],popularity:82,rating:4.5,availability:`available`},{id:`streaming`,name:`Streaming Studio`,price:20,specs:`4K Cameras • Green Screen • Audio Mixing`,maxSlots:2,equipment:[`streaming`],gameType:[`casual`],popularity:76,rating:4.8,availability:`limited`},{id:`tournament`,name:`Tournament Arena`,price:28,specs:`Large Display • Live Commentary • Spectator Seating`,maxSlots:4,equipment:[`rtx`],gameType:[`tournament`,`competitive`],popularity:91,rating:4.9,availability:`available`}],x=[...b],S={search:``,priceMax:50,availability:[`available`,`limited`,`unavailable`],equipment:[],gameType:[],sort:`default`};document.addEventListener(`DOMContentLoaded`,function(){C(),T()});function C(){let e=document.getElementById(`zone-search`);e&&e.addEventListener(`input`,function(e){S.search=e.target.value.toLowerCase(),T()});let t=document.getElementById(`price-filter`);t&&t.addEventListener(`input`,function(e){S.priceMax=parseInt(e.target.value),document.getElementById(`price-value`).textContent=`$${S.priceMax}+`,T()}),document.querySelectorAll(`.availability-filter`).forEach(e=>{e.addEventListener(`change`,function(){w(`availability`,`availability-filter`),T()})}),document.querySelectorAll(`.equipment-filter`).forEach(e=>{e.addEventListener(`change`,function(){w(`equipment`,`equipment-filter`),T()})}),document.querySelectorAll(`.game-filter`).forEach(e=>{e.addEventListener(`change`,function(){w(`gameType`,`game-filter`),T()})});let n=document.getElementById(`sort-by`);n&&n.addEventListener(`change`,function(e){S.sort=e.target.value,T()})}function w(e,t){let n=document.querySelectorAll(`.${t}:checked`);S[e]=Array.from(n).map(e=>e.value)}function T(){x=b.filter(e=>!(S.search&&!e.name.toLowerCase().includes(S.search)||e.price>S.priceMax||S.availability.length>0&&!S.availability.includes(e.availability)||S.equipment.length>0&&!S.equipment.some(t=>e.equipment.includes(t))||S.gameType.length>0&&!S.gameType.some(t=>e.gameType.includes(t)))),E(),D(),k()}function E(){switch(S.sort){case`price-low`:x.sort((e,t)=>e.price-t.price);break;case`price-high`:x.sort((e,t)=>t.price-e.price);break;case`popularity`:x.sort((e,t)=>t.popularity-e.popularity);break;case`rating`:x.sort((e,t)=>t.rating-e.rating);break;case`availability`:let e={available:0,limited:1,unavailable:2};x.sort((t,n)=>e[t.availability]-e[n.availability]);break;default:x.sort((e,t)=>b.indexOf(e)-b.indexOf(t))}}function D(){let e=document.querySelector(`.zones-grid-modern`);if(e){if(e.querySelectorAll(`.zone-card-modern`).forEach(e=>{e.classList.add(`filtered-out`)}),x.length===0){if(!document.querySelector(`.no-results`)){let t=document.createElement(`div`);t.className=`no-results`,t.innerHTML=`
        <div class="no-results-icon">🔍</div>
        <h3>No zones found</h3>
        <p>Try adjusting your filters or search criteria</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset Filters</button>
      `,e.parentElement.appendChild(t)}}else{let t=document.querySelector(`.no-results`);t&&t.remove(),x.forEach(t=>{let n=e.querySelector(`[data-zone="${t.id}"]`);n&&(n.classList.remove(`filtered-out`),O(n,t))})}M()}}function O(e,t){let n=e.querySelector(`.zone-popularity-badge`);n||(n=document.createElement(`div`),n.className=`zone-popularity-badge`,e.querySelector(`.zone-image`).appendChild(n)),t.popularity>=90?n.textContent=`⭐ Trending`:t.popularity>=80?n.textContent=`🔥 Popular`:n.textContent=`✨ New`}function k(){let e=document.getElementById(`active-filters`),t=document.getElementById(`filter-tags`),n=[];S.search&&n.push({type:`search`,label:`Search: "${S.search}"`}),S.priceMax<50&&n.push({type:`price`,label:`Max $${S.priceMax}/hr`}),S.availability.forEach(e=>{let t=e.charAt(0).toUpperCase()+e.slice(1);n.push({type:`availability`,value:e,label:t})}),S.equipment.forEach(e=>{n.push({type:`equipment`,value:e,label:{rtx:`RTX GPU`,streaming:`Streaming Setup`,console:`Console`}[e]})}),S.gameType.forEach(e=>{let t=e.charAt(0).toUpperCase()+e.slice(1);n.push({type:`gameType`,value:e,label:t})}),n.length>0?(e.style.display=`flex`,t.innerHTML=n.map(e=>`
      <div class="filter-tag">
        ${e.label}
        <button onclick="removeFilter('${e.type}', '${e.value||``}')" title="Remove">×</button>
      </div>
    `).join(``)):e.style.display=`none`}function A(e,t){if(e===`search`)S.search=``,document.getElementById(`zone-search`).value=``;else if(e===`price`)S.priceMax=50,document.getElementById(`price-filter`).value=50,document.getElementById(`price-value`).textContent=`$50+`;else if(e===`availability`||e===`equipment`||e===`gameType`){let n=S[e].indexOf(t);n>-1&&S[e].splice(n,1);let r=e===`availability`?`.availability-filter`:e===`equipment`?`.equipment-filter`:`.game-filter`,i=document.querySelector(`${r}[value="${t}"]`);i&&(i.checked=!1)}T()}function j(){S={search:``,priceMax:50,availability:[`available`,`limited`,`unavailable`],equipment:[],gameType:[],sort:`default`},document.getElementById(`zone-search`).value=``,document.getElementById(`price-filter`).value=50,document.getElementById(`price-value`).textContent=`$50+`,document.getElementById(`sort-by`).value=`default`,document.querySelectorAll(`.equipment-filter, .game-filter`).forEach(e=>{e.checked=!1}),document.querySelectorAll(`.availability-filter`).forEach(e=>{e.checked=!0}),T()}function M(){let e=document.querySelector(`.results-counter`);e||(e=document.createElement(`div`),e.className=`results-counter`,document.querySelector(`.zones-grid-modern`).parentElement.insertBefore(e,document.querySelector(`.zones-grid-modern`)));let t=b.length,n=x.length;n===t?e.style.display=`none`:(e.style.display=`block`,e.innerHTML=`Showing <strong>${n}</strong> of <strong>${t}</strong> zones`)}window.resetAllFilters=j,window.removeFilter=A;