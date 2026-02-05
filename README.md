# EchoSee Website

A Next.js website for EchoSee AR smart glasses - assistive technology that helps people with hearing impairments by displaying real-time speech-to-text subtitles.

## About

This project was built as part of Codecelix Internship Task 1. It includes a product showcase, pricing information, and an AI-powered chatbot for customer support.

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ahmad-Abudllah-Ahmad/internship-codeclix-task-1.git
cd internship-codeclix-task-1
npm install
```

Create a `.env.local` file in the root directory:

```
GROQ_API_KEY=your_groq_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Tech Stack

- Next.js 15 with React 19
- Pure CSS (no Tailwind)
- Groq API with Llama 3.3-70b for the chatbot
- Google Fonts (Inter)

## Pages

- Home - Landing page with hero and features
- About - Company info and mission
- Product - Smart glasses details
- Pricing - Basic and Premium plans
- Contact - Contact form

## Notes

The chatbot uses the Groq API. You'll need a valid API key for it to work. Get one from https://console.groq.com/
