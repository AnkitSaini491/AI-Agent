// ===========================
// Gemini AI Clone Script
// ===========================

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const historyList = document.getElementById("historyList");
const newChat = document.getElementById("newChat");
const themeBtn = document.getElementById("themeBtn");

// ===========================
// Add Message
// ===========================

function addMessage(text, type){

    const div = document.createElement("div");

    div.className = type + "-message";

    div.innerHTML = text.replace(/\n/g,"<br>");

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

// ===========================
// History
// ===========================

function addHistory(text){

    const li = document.createElement("li");

    li.textContent = text.substring(0,40);

    historyList.prepend(li);

}

// ===========================
// Send Message
// ===========================

async function sendMessage(){

    const message = input.value.trim();

    if(message==="") return;

    addMessage(message,"user");

    addHistory(message);

    input.value="";

    typing.style.display="block";

    try{

        const res = await fetch("/ask",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:message

            })

        });

        const data = await res.json();

        typing.style.display="none";

        addMessage(data.reply,"bot");

    }

    catch{

        typing.style.display="none";

        addMessage("❌ Unable to connect to Gemini AI.","bot");

    }

}

sendBtn.onclick = sendMessage;

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        sendMessage();
        
    }

});
// ===========================
// Theme Toggle
// ===========================

let dark = true;

themeBtn.onclick = function(){

    document.body.classList.toggle("light-mode");

    themeBtn.innerHTML = dark ? "☀️" : "🌙";

    dark = !dark;

};

// ===========================
// New Chat
// ===========================

newChat.onclick = function(){

    messages.innerHTML = `
    <div class="bot-message">
        👋 Hello! I'm Gemini AI.<br><br>
        How can I help you today?
    </div>
    `;

    historyList.innerHTML = "";

    input.focus();

};

// ===========================
// Copy Bot Message
// ===========================

messages.addEventListener("dblclick",function(e){

    if(e.target.classList.contains("bot-message")){

        navigator.clipboard.writeText(e.target.innerText);

        alert("✅ Response copied!");

    }

});

// ===========================
// Voice Input
// ===========================

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    const mic = document.createElement("button");

    mic.id = "micBtn";

    mic.innerHTML = "🎤";

    document.querySelector(".input-box").appendChild(mic);

    mic.onclick = ()=>{

        recognition.start();

    };

    recognition.onresult = (e)=>{

        input.value = e.results[0][0].transcript;

        sendMessage();

    };

}

// ===========================
// Load Chat History
// ===========================

async function loadHistory(){

    try{

        const res = await fetch("/history");

        const data = await res.json();

        historyList.innerHTML = "";

        data.forEach(chat=>{

            const li = document.createElement("li");

            li.textContent = chat.question.substring(0,40);

            historyList.appendChild(li);

        });

    }

    catch(err){

        console.log("History not loaded");

    }

}

window.onload = function(){

    input.focus();

    loadHistory();

};

// ===========================
// Auto Scroll
// ===========================

function scrollToBottom(){

    messages.scrollTop = messages.scrollHeight;

}

const observer = new MutationObserver(scrollToBottom);

observer.observe(messages,{
    childList:true
});

// ===========================
// Typing Animation
// ===========================

const typingText = [
    "Thinking...",
    "Generating response...",
    "Almost done..."
];

let typingIndex = 0;

setInterval(()=>{

    if(typing.style.display==="block"){

        typing.innerHTML="🤖 "+typingText[typingIndex];

        typingIndex++;

        if(typingIndex>=typingText.length){

            typingIndex=0;

        }

    }

},800);

// ===========================
// Disable Send Button
// ===========================

input.addEventListener("input",()=>{

    sendBtn.disabled = input.value.trim()==="";

});

sendBtn.disabled=true;

// ===========================
// Escape HTML
// ===========================

function escapeHTML(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}

// ===========================
// Clear Input
// ===========================

function clearInput(){

    input.value="";

    sendBtn.disabled=true;

}

// ===========================
// Better Send Function
// ===========================

const oldSend = sendMessage;

sendMessage = async function(){

    if(input.value.trim()==="") return;

    sendBtn.disabled=true;

    await oldSend();

    clearInput();

    input.focus();

};

// ===========================
// Network Status
// ===========================

window.addEventListener("offline",()=>{

    addMessage("⚠️ Internet connection lost.","bot");

});

window.addEventListener("online",()=>{

    addMessage("✅ Internet connection restored.","bot");

});

// ===========================
// End of Script
// ===========================

console.log("Gemini Clone Ready 🚀");
