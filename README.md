# Zodiac Guide

A beautiful parallax scrolling website that connects users with zodiac insights and features an AI-powered chatbot using the Cohere API.

## Features
- Stunning parallax scrolling effects
- Zodiac sign calculator
- AI-powered chatbot for zodiac-related questions
- Modern, celestial-themed design

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the project root and add your Cohere API key:
```
COHERE_API_KEY=your_api_key_here
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and navigate to `http://localhost:5000`

## Requirements
- Python 3.7+
- Flask
- Cohere API key
- Modern web browser with JavaScript enabled

## Note
You'll need to add your own background images:
- `static/images/stars.jpg` for the intro section
- `static/images/constellation.jpg` for the zodiac section
