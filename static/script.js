// =============================
// AI Agent Studio V2
// Part 3A
// =============================

// Typing Animation

const typing = document.getElementById("typing");

const words = [

"Powered by Google Gemini",

"Python Flask AI",

"Build Smart AI Agents",

"Professional AI Assistant",

"24/7 Available"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

if(!typing) return;

const current = words[wordIndex];

if(!deleting){

typing.innerHTML=current.substring(0,charIndex++);

if(charIndex>current.length){

deleting=true;

setTimeout(typeEffect,1500);

return;

}

}

else{

typing.innerHTML=current.substring(0,charIndex--);

if(charIndex<0){

deleting=false;

wordIndex=(wordIndex+1)%words.length;

charIndex=0;

}

}

setTimeout(typeEffect,deleting?40:80);

}

typeEffect();


// =============================
// Card Hover Animation
// =============================

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-15px) scale(1.05)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px) scale(1)";

});

});


// =============================
// Smooth Scroll
// =============================

document.querySelectorAll("a").forEach(anchor=>{

anchor.addEventListener("click",function(e){

const href=this.getAttribute("href");

if(href.startsWith("#")){

e.preventDefault();

document.querySelector(href).scrollIntoView({

behavior:"smooth"

});

}

});

});
// =============================
// AI Agent Studio V2
// Part 3B
// =============================

// Mouse Glow Effect

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "20px";
glow.style.height = "20px";
glow.style.borderRadius = "50%";
glow.style.background = "#38bdf8";
glow.style.pointerEvents = "none";
glow.style.boxShadow = "0 0 40px #38bdf8";
glow.style.opacity = ".7";
glow.style.zIndex = "9999";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left = (e.clientX-10)+"px";
glow.style.top = (e.clientY-10)+"px";

});

// =============================
// Scroll Reveal Animation
// =============================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

});

document.querySelectorAll(".card").forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s";

observer.observe(card);

});

// =============================
// Loading Animation
// =============================

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});

document.body.style.opacity="0";

document.body.style.transition="1s";

// =============================
// Floating Robot Animation
// =============================

const robot=document.querySelector(".robot");

if(robot){

setInterval(()=>{

robot.style.transform="translateY(-15px)";

setTimeout(()=>{

robot.style.transform="translateY(0px)";

},1000);

},2000);

}

// =============================
// Random Background Glow
// =============================

setInterval(()=>{

document.body.style.backgroundPosition=
Math.floor(Math.random()*100)+"% "+
Math.floor(Math.random()*100)+"%";

},5000);
// =============================
// AI Agent Studio V2
// Part 3C
// =============================

// Theme Toggle

const themeBtn = document.createElement("button");

themeBtn.innerHTML = "🌙";

themeBtn.style.position = "fixed";
themeBtn.style.bottom = "20px";
themeBtn.style.right = "20px";
themeBtn.style.width = "55px";
themeBtn.style.height = "55px";
themeBtn.style.borderRadius = "50%";
themeBtn.style.border = "none";
themeBtn.style.cursor = "pointer";
themeBtn.style.fontSize = "22px";
themeBtn.style.background = "#2563eb";
themeBtn.style.color = "#fff";
themeBtn.style.zIndex = "9999";

document.body.appendChild(themeBtn);

let dark = true;

themeBtn.onclick = () => {

if(dark){

document.body.style.background="#f5f5f5";
document.body.style.color="#111";
themeBtn.innerHTML="☀️";

}else{

document.body.style.background="#050816";
document.body.style.color="#fff";
themeBtn.innerHTML="🌙";

}

dark=!dark;

};

// =============================
// Robot Blink Animation
// =============================

const robot=document.querySelector(".robot");

if(robot){

setInterval(()=>{

robot.style.opacity=".7";

setTimeout(()=>{

robot.style.opacity="1";

},200);

},3000);

}

// =============================
// Floating Notification
// =============================

function notify(text){

const box=document.createElement("div");

box.innerHTML=text;

box.style.position="fixed";
box.style.top="20px";
box.style.right="20px";
box.style.background="#2563eb";
box.style.color="#fff";
box.style.padding="15px 20px";
box.style.borderRadius="10px";
box.style.boxShadow="0 0 20px #2563eb";
box.style.zIndex="9999";

document.body.appendChild(box);

setTimeout(()=>{

box.remove();

},3000);

}

window.onload=()=>{

notify("🤖 AI Agent Studio Loaded Successfully");

};

// =============================
// Live Clock
// =============================

const clock=document.createElement("div");

clock.style.position="fixed";
clock.style.left="20px";
clock.style.bottom="20px";
clock.style.padding="10px 18px";
clock.style.background="rgba(0,0,0,.4)";
clock.style.borderRadius="10px";
clock.style.backdropFilter="blur(10px)";
clock.style.zIndex="9999";

document.body.appendChild(clock);

setInterval(()=>{

const d=new Date();

clock.innerHTML=d.toLocaleTimeString();

},1000);

// =============================
// Console Message
// =============================

console.log("🚀 AI Agent Studio V2 Loaded");
// ===================================
// AI Agent Studio V2 - Part 4
// ===================================

// Welcome Notification
setTimeout(() => {
    notify("🚀 Welcome to AI Agent Studio");
}, 1500);

// Navbar Shadow on Scroll
window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
        nav.style.background = "rgba(5,8,22,0.95)";
    } else {
        nav.style.boxShadow = "none";
        nav.style.background = "rgba(0,0,0,.35)";
    }

});

// Animated Counter
document.querySelectorAll(".counter").forEach(counter => {

    let target = parseInt(counter.getAttribute("data-target"));

    if (isNaN(target)) return;

    let value = 0;

    let speed = Math.ceil(target / 100);

    const update = () => {

        value += speed;

        if (value >= target) {

            counter.innerHTML = target;

        } else {

            counter.innerHTML = value;

            requestAnimationFrame(update);

        }

    };

    update();

});

// Button Ripple Effect
document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function(e) {

        const ripple = document.createElement("span");

        ripple.style.position = "absolute";
        ripple.style.width = "20px";
        ripple.style.height = "20px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.5)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple .6s linear";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left - 10) + "px";
        ripple.style.top = (e.clientY - rect.top - 10) + "px";

        this.style.position = "relative";
        this.style.overflow = "hidden";

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

    });

});

// Ripple Animation
const style = document.createElement("style");

style.innerHTML = `
@keyframes ripple{

0%{
transform:scale(0);
opacity:1;
}

100%{
transform:scale(12);
opacity:0;
}

}
`;

document.head.appendChild(style);

// Console
console.log("✅ AI Agent Studio Part 4 Loaded");
// ===================================
// AI Agent Studio V2 - Part 5
// Premium Effects
// ===================================

// Floating Particles

function createParticle(){

    const particle=document.createElement("div");

    particle.className="particle";

    particle.style.left=Math.random()*window.innerWidth+"px";

    particle.style.top=window.innerHeight+"px";

    particle.style.width=(Math.random()*8+4)+"px";

    particle.style.height=particle.style.width;

    particle.style.position="fixed";

    particle.style.background="#38bdf8";

    particle.style.borderRadius="50%";

    particle.style.opacity=Math.random();

    particle.style.pointerEvents="none";

    particle.style.zIndex="-1";

    particle.style.boxShadow="0 0 20px #38bdf8";

    document.body.appendChild(particle);

    let y=window.innerHeight;

    let x=parseFloat(particle.style.left);

    let speed=Math.random()*2+1;

    const animate=setInterval(()=>{

        y-=speed;

        x+=Math.sin(y/50);

        particle.style.top=y+"px";

        particle.style.left=x+"px";

        if(y<-20){

            clearInterval(animate);

            particle.remove();

        }

    },20);

}

setInterval(createParticle,400);

// ==============================
// Robot Speaking Animation
// ==============================

const robot=document.querySelector(".robot");

if(robot){

    setInterval(()=>{

        robot.style.transform="scale(1.08)";

        robot.style.filter="drop-shadow(0 0 40px cyan)";

        setTimeout(()=>{

            robot.style.transform="scale(1)";

            robot.style.filter="drop-shadow(0 0 20px cyan)";

        },500);

    },4000);

}

// ==============================
// Mouse Click Glow
// ==============================

document.addEventListener("click",e=>{

    const glow=document.createElement("div");

    glow.style.position="fixed";

    glow.style.left=e.clientX-15+"px";

    glow.style.top=e.clientY-15+"px";

    glow.style.width="30px";

    glow.style.height="30px";

    glow.style.borderRadius="50%";

    glow.style.background="#38bdf8";

    glow.style.pointerEvents="none";

    glow.style.boxShadow="0 0 40px #38bdf8";

    glow.style.animation="clickGlow .6s forwards";

    document.body.appendChild(glow);

    setTimeout(()=>{

        glow.remove();

    },600);

});

const clickStyle=document.createElement("style");

clickStyle.innerHTML=`

@keyframes clickGlow{

0%{

transform:scale(0);

opacity:1;

}

100%{

transform:scale(6);

opacity:0;

}

}

`;

document.head.appendChild(clickStyle);

// ==============================
// Random AI Tips
// ==============================

const tips=[

"💡 Ask AI to write Python code.",

"🚀 Use Dashboard to monitor activity.",

"🤖 Gemini can explain difficult topics.",

"📄 Upload support coming soon!",

"🎤 Voice Assistant coming soon!"

];

setInterval(()=>{

    notify(tips[Math.floor(Math.random()*tips.length)]);

},30000);

console.log("✅ AI Agent Studio Part 5 Loaded");

// ===================================
// AI Agent Studio V2 - Final Part 6
// ===================================

// Voice Output (Text-to-Speech)

function speak(text){

    if(!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "en-US";
    msg.rate = 1;
    msg.pitch = 1;

    speechSynthesis.speak(msg);

}

// Auto speak AI response
const oldNotify = notify;

notify = function(text){

    oldNotify(text);

    if(text.includes("🤖") || text.includes("AI")){

        speak(text.replace(/🤖/g,""));

    }

};

// ==============================
// Page Loader
// ==============================

const loader=document.createElement("div");

loader.innerHTML="🤖";

loader.style.position="fixed";
loader.style.top="0";
loader.style.left="0";
loader.style.width="100%";
loader.style.height="100%";
loader.style.display="flex";
loader.style.justifyContent="center";
loader.style.alignItems="center";
loader.style.fontSize="80px";
loader.style.background="#050816";
loader.style.zIndex="10000";

document.body.appendChild(loader);

window.addEventListener("load",()=>{

loader.style.transition="1s";

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},1000);

});

// ==============================
// Live Date
// ==============================

const date=document.createElement("div");

date.style.position="fixed";
date.style.left="20px";
date.style.top="90px";
date.style.background="rgba(255,255,255,.08)";
date.style.padding="10px 15px";
date.style.borderRadius="10px";
date.style.backdropFilter="blur(10px)";
date.style.zIndex="999";

document.body.appendChild(date);

setInterval(()=>{

date.innerHTML=new Date().toDateString();

},1000);

// ==============================
// Keyboard Shortcut
// Ctrl + /
// ==============================

document.addEventListener("keydown",e=>{

if(e.ctrlKey && e.key==="/"){

alert("🤖 AI Agent Studio\nShortcut Activated");

}

});

// ==============================
// AI Status
// ==============================

const status=document.createElement("div");

status.innerHTML="🟢 AI Online";

status.style.position="fixed";
status.style.right="20px";
status.style.top="90px";
status.style.padding="10px 15px";
status.style.background="#16a34a";
status.style.borderRadius="10px";
status.style.fontWeight="bold";
status.style.zIndex="999";

document.body.appendChild(status);

console.log("🚀 AI Agent Studio Fully Loaded");
