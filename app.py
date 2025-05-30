from flask import Flask, render_template, request, jsonify
import cohere
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
co = cohere.Client(os.getenv('COHERE_API_KEY'))

@app.route('/')
def index():
    return render_template('index.html')

ZODIAC_CONTEXT = """
You are a knowledgeable astrology expert. Provide insightful, accurate information about zodiac signs 
and their characteristics. Focus on:
- Personality traits
- Compatibility with other signs
- Career aptitudes
- Life path guidance
- Element (Fire, Earth, Air, Water) influences

Keep responses concise but informative, and maintain a mystical yet professional tone.
"""

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    # Initialize chat with context
    response = co.chat(
        message=user_message,
        model="command",
        temperature=0.8,
        chat_history=[{
            "role": "SYSTEM",
            "message": ZODIAC_CONTEXT
        }],
        prompt_truncation='AUTO'
    )
    return jsonify({'response': response.text})

if __name__ == '__main__':
    app.run(debug=True)
