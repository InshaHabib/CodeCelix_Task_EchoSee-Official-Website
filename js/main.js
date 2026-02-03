/* FAQ Accordion - Keyboard navigation, ARIA, reduced motion support */
(function(){'use strict';const buttons=document.querySelectorAll('.faq__button');if(!buttons.length)return;const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function expandPanel(b,p){b.setAttribute('aria-expanded','true');p.setAttribute('aria-hidden','false');p.hidden=false;if(!reduceMotion){p.style.maxHeight=p.scrollHeight+'px';p.addEventListener('transitionend',function onEnd(){p.style.maxHeight='none';p.removeEventListener('transitionend',onEnd)},{once:true})}}
function collapsePanel(b,p){b.setAttribute('aria-expanded','false');p.setAttribute('aria-hidden','true');if(!reduceMotion){const h=p.scrollHeight;p.style.maxHeight=h+'px';void p.offsetHeight;p.style.maxHeight='0px';p.addEventListener('transitionend',function onEnd(){p.hidden=true;p.style.maxHeight='';p.removeEventListener('transitionend',onEnd)},{once:true})}else{p.style.maxHeight='0px';p.hidden=true}}

function toggle(b){const panelId=b.getAttribute('aria-controls');const panel=document.getElementById(panelId);if(!panel)return;const willExpand=b.getAttribute('aria-expanded')!=='true';if(willExpand){buttons.forEach(o=>{if(o!==b&&o.getAttribute('aria-expanded')==='true'){collapsePanel(o,document.getElementById(o.getAttribute('aria-controls')))}})}willExpand?expandPanel(b,panel):collapsePanel(b,panel)}

buttons.forEach((btn,idx)=>{const panel=document.getElementById(btn.getAttribute('aria-controls'));if(panel){panel.setAttribute('aria-hidden',btn.getAttribute('aria-expanded')!=='true');panel.hidden=btn.getAttribute('aria-expanded')!=='true'}
btn.addEventListener('click',()=>toggle(btn));btn.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();buttons[(idx+1)%buttons.length].focus()}else if(e.key==='ArrowUp'){e.preventDefault();buttons[(idx-1+buttons.length)%buttons.length].focus()}else if(e.key==='Home'){e.preventDefault();buttons[0].focus()}else if(e.key==='End'){e.preventDefault();buttons[buttons.length-1].focus()}else if(e.key==='Enter'||e.key===' '||e.key==='Spacebar'){e.preventDefault();toggle(btn)}})})})();

/* Contact Form - Validation, floating labels, loading/success states */
(function(){'use strict';const form=document.getElementById('contact-form');if(!form)return;const fields={name:{el:form.querySelector('#name'),err:form.querySelector('#name-error'),msg:'Full Name required'},email:{el:form.querySelector('#email'),err:form.querySelector('#email-error'),pat:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,msg:'Valid email required'},subject:{el:form.querySelector('#subject'),err:form.querySelector('#subject-error'),msg:'Subject required'},message:{el:form.querySelector('#message'),err:form.querySelector('#message-error'),min:10,msg:'Message required (10+ chars)'}};const submitBtn=form.querySelector('.contact__submit');const success=document.getElementById('form-success');const announcer=document.getElementById('a11y-announcer');

function updateLabel(e){e.classList.toggle('has-value',e.value.trim()!=='')}
function validate(f){const e=f.el;let v=true,t=f.msg;if(f.required&&!e.value.trim())v=false;else if(f.pat&&!f.pat.test(e.value.trim()))v=false;else if(f.min&&e.value.trim().length<f.min)v=false;e.setAttribute('aria-invalid',!v);f.err.textContent=v?'':t;return v}

Object.values(fields).forEach(f=>{f.el.addEventListener('input',()=>{updateLabel(f.el);if(f.el.getAttribute('aria-invalid')==='true')validate(f)});f.el.addEventListener('change',()=>updateLabel(f.el));updateLabel(f.el)});

form.addEventListener('submit',async e=>{e.preventDefault();let first;Object.values(fields).forEach(f=>{if(!validate(f)&&!first)first=f.el});if(first){first.focus();if(announcer)announcer.textContent='Fix form errors';return}
submitBtn.classList.add('loading');submitBtn.disabled=true;await new Promise(r=>setTimeout(r,1500));form.hidden=true;success.hidden=false;if(announcer)announcer.textContent='Message sent!'})})();
