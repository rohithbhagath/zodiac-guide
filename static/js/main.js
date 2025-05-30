// Global variables for chat functionality
let chatMessages;
let userMessageInput;

document.addEventListener('DOMContentLoaded', function() {
    const birthForm = document.getElementById('birthForm');
    chatMessages = document.getElementById('chatMessages');
    userMessageInput = document.getElementById('userMessage');
    const symbols = document.querySelectorAll('.symbol');
    
    // Add event listener for the send button
    document.querySelector('.chat-input button').addEventListener('click', function(e) {
        e.preventDefault();
        sendMessage();
    });
    
    // Add event listener for Enter key in the input field
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Animate zodiac symbols on load
    setTimeout(() => {
        symbols.forEach((symbol, index) => {
            setTimeout(() => {
                symbol.style.opacity = '1';
                symbol.classList.add('visible');
            }, index * 100);
        });
    }, 500);

    // Add click handlers for zodiac symbols
    symbols.forEach(symbol => {
        symbol.addEventListener('click', () => {
            const sign = symbol.getAttribute('data-sign');
            addMessage(`Tell me about the ${getZodiacName(sign)} zodiac sign`, 'user');
            sendMessage(`Tell me about the ${getZodiacName(sign)} zodiac sign`);
        });
    });

    birthForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const birthDate = new Date(document.getElementById('birthDate').value);
        const zodiacSign = getZodiacSign(birthDate);
        
        addMessage('Your zodiac sign is ' + zodiacSign, 'bot');
    });
});

function getZodiacName(symbol) {
    const signs = {
        '♈': 'Aries',
        '♉': 'Taurus',
        '♊': 'Gemini',
        '♋': 'Cancer',
        '♌': 'Leo',
        '♍': 'Virgo',
        '♎': 'Libra',
        '♏': 'Scorpio',
        '♐': 'Sagittarius',
        '♑': 'Capricorn',
        '♒': 'Aquarius',
        '♓': 'Pisces'
    };
    return signs[symbol] || 'Unknown';
}

function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

async function sendMessage() {
    if (!userMessageInput || !chatMessages) {
        console.error('Chat elements not initialized');
        return;
    }

    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    userMessageInput.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        addMessage(data.response, 'bot');
    } catch (error) {
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${type}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
