/* =========================================
   ELEMENTS
========================================= */

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const chatArea = document.querySelector(".chat-area");
const messagesContainer = document.querySelector(".messages");

const welcomeScreen = document.querySelector(".welcome-screen");

const newChatBtn = document.querySelector(".new-chat-btn");

const suggestionButtons = document.querySelectorAll(".suggestions button");

const mobileMenu = document.querySelector(".mobile-menu");
const sidebar = document.querySelector(".sidebar");


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage() {

    const message = messageInput.value.trim();

    // Empty message check
    if (message === "") {
        return;
    }

    // Hide welcome screen
    if (welcomeScreen) {
        welcomeScreen.style.display = "none";
    }

    // Add user message
    addUserMessage(message);

    // Clear input
    messageInput.value = "";

    // Reset textarea height
    messageInput.style.height = "auto";

    // Scroll to bottom
    scrollToBottom();

    // Show AI typing
    showTyping();

    // Demo AI response
    setTimeout(() => {

        removeTyping();

        generateAIResponse(message);

        scrollToBottom();

    }, 1200);
}


/* =========================================
   ADD USER MESSAGE
========================================= */

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
        "message",
        "user-message"
    );

    messageElement.innerHTML = `

        <div class="message-content">

            <div class="message-name">
                You
            </div>

            <p></p>

        </div>

        <div class="message-avatar user-avatar">
            R
        </div>

    `;

    // Use textContent to avoid interpreting user input as HTML
    messageElement.querySelector("p").textContent = message;

    messagesContainer.appendChild(messageElement);
}


/* =========================================
   AI MESSAGE
========================================= */

function addAIMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
        "message",
        "ai-message"
    );

    messageElement.innerHTML = `

        <div class="message-avatar">
            <i class="fa-solid fa-sparkles"></i>
        </div>

        <div class="message-content">

            <div class="message-name">
                Nova AI
            </div>

            <p></p>

        </div>

    `;

    // Add AI response safely
    messageElement.querySelector("p").textContent = message;

    messagesContainer.appendChild(messageElement);
}


/* =========================================
   DEMO AI RESPONSE
========================================= */

function generateAIResponse(userMessage) {

    const message = userMessage.toLowerCase();

    let response;


    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {

        response =
            "Hello! 👋 I'm Nova AI. How can I help you today?";

    }

    else if (
        message.includes("website") ||
        message.includes("web")
    ) {

        response =
            "Absolutely! 🚀 We can create a modern, responsive and professional website using HTML, CSS and JavaScript.";

    }

    else if (
        message.includes("html")
    ) {

        response =
            "HTML creates the structure of a website. Think of it as the skeleton of your webpage.";

    }

    else if (
        message.includes("css")
    ) {

        response =
            "CSS is used to design the website — colors, layout, spacing, animations and responsiveness.";

    }

    else if (
        message.includes("javascript") ||
        message.includes("js")
    ) {

        response =
            "JavaScript makes your website interactive. For example, buttons, chat messages, animations and dynamic content.";

    }

    else if (
        message.includes("python")
    ) {

        response =
            "Python is a beginner-friendly programming language commonly used for web development, automation, data science and AI.";

    }

    else if (
        message.includes("thank")
    ) {

        response =
            "You're welcome! 😊 I'm always here to help.";

    }

    else {

        response =
            "That's interesting! 🤖 This is currently a frontend demo, so I'm using predefined responses. Later we can connect a real AI API.";

    }


    addAIMessage(response);
}


/* =========================================
   TYPING INDICATOR
========================================= */

function showTyping() {

    // Prevent duplicate typing indicator
    if (document.querySelector(".typing-message")) {
        return;
    }

    const typingElement = document.createElement("div");

    typingElement.classList.add(
        "message",
        "ai-message",
        "typing-message"
    );

    typingElement.innerHTML = `

        <div class="message-avatar">
            <i class="fa-solid fa-sparkles"></i>
        </div>

        <div class="message-content">

            <div class="message-name">
                Nova AI
            </div>

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;

    messagesContainer.appendChild(typingElement);

    scrollToBottom();
}


/* =========================================
   REMOVE TYPING
========================================= */

function removeTyping() {

    const typingElement =
        document.querySelector(".typing-message");

    if (typingElement) {
        typingElement.remove();
    }
}


/* =========================================
   ENTER KEY
========================================= */

messageInput.addEventListener("keydown", function (event) {

    // Enter = Send
    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }

});


/* =========================================
   SEND BUTTON
========================================= */

sendBtn.addEventListener("click", sendMessage);


/* =========================================
   TEXTAREA AUTO RESIZE
========================================= */

messageInput.addEventListener("input", function () {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 140) + "px";

});


/* =========================================
   SUGGESTION BUTTONS
========================================= */

suggestionButtons.forEach(button => {

    button.addEventListener("click", function () {

        const strongText =
            this.querySelector("strong");

        if (!strongText) {
            return;
        }

        const title =
            strongText.textContent;

        let prompt = "";


        if (title === "Write Code") {

            prompt =
                "Help me write code for a modern website.";

        }

        else if (title === "Brainstorm Ideas") {

            prompt =
                "Give me some creative project ideas.";

        }

        else if (title === "Learn Something") {

            prompt =
                "Explain JavaScript in a simple way.";

        }

        else if (title === "Write Something") {

            prompt =
                "Help me write professional content.";

        }


        messageInput.value = prompt;

        messageInput.focus();

        // Trigger auto resize
        messageInput.dispatchEvent(
            new Event("input")
        );

    });

});


/* =========================================
   NEW CHAT
========================================= */

newChatBtn.addEventListener("click", function () {

    // Remove all messages
    messagesContainer.innerHTML = "";

    // Show welcome screen
    welcomeScreen.style.display = "block";

    // Clear input
    messageInput.value = "";

    messageInput.style.height = "auto";

    // Focus input
    messageInput.focus();

});


/* =========================================
   MOBILE SIDEBAR
========================================= */

mobileMenu.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});


/* =========================================
   CLOSE MOBILE SIDEBAR
========================================= */

document.addEventListener("click", function (event) {

    if (
        window.innerWidth <= 700 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !mobileMenu.contains(event.target)
    ) {

        sidebar.classList.remove("open");

    }

});


/* =========================================
   SCROLL TO BOTTOM
========================================= */

function scrollToBottom() {

    setTimeout(() => {

        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: "smooth"
        });

    }, 50);
}