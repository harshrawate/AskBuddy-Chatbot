# 🤖 AskBuddy Chatbot

AskBuddy is a powerful, full-stack AI chatbot designed to provide smart, context-aware responses by leveraging the latest AI models and real-time web search capabilities. Whether it's answering common knowledge questions or fetching the latest news, AskBuddy has you covered

---

## 🚀 Features

-   **AI-Powered Conversations**: Uses the `llama-3.3-70b-versatile` model via Groq SDK for fast and intelligent responses.
-   **Real-Time Web Search**: Integrated with **Tavily Search API** to fetch up-to-date information from the internet.
-   **Smart Tool Calling**: Automatically decides when to answer from internal knowledge and when to perform a web search.
-   **Persistent Context**: Supports conversation threads using `node-cache` for multi-turn interactions.
-   **Stunning UI**: Features a beautiful, interactive **Galaxy background** built with OGL and React.
-   **Responsive Design**: Modern UI styled with **Tailwind CSS**.

---

## 🛠️ Tech Stack

### **Frontend**
-   **React 19** (Vite)
-   **Tailwind CSS 4**
-   **OGL** (WebGL library for the Galaxy effect)

### **Backend**
-   **Node.js & Express**
-   **Groq SDK** (AI Inference)
-   **Tavily SDK** (Web Search)
-   **Node-Cache** (Thread Management)

---

## 📂 Project Structure

```text
├── frontend/             # React + Vite frontend project
│   ├── src/              # Application source code
│   │   ├── Galaxy.jsx    # Interactive background component
│   │   └── ...           # Other UI components
│   └── package.json      # Frontend dependencies
├── app.js                # CLI-based chatbot version
├── server.js             # Express server entry point
├── chatbot.js            # Core AI logic and tool handling
├── .env                  # Environment variables (API Keys)
└── package.json          # Backend dependencies
```

---

## ⚙️ Getting Started

### **1. Prerequisites**
Ensure you have **Node.js** installed on your system.

### **2. Clone the Repository**
```bash
git clone <your-repo-url>
cd chatbot
```

### **3. Setup Environment Variables**
Create a `.env` file in the root directory and add your API keys:
```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### **4. Install Dependencies**

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

---

## 🏃 Running the Project

### **Start the Backend Server**
From the root directory:
```bash
node server.js
```
The server will run on `http://localhost:3001`.

### **Start the Frontend (Dev Mode)**
From the `frontend` directory:
```bash
npm run dev
```
The application will be available at the URL provided by Vite (usually `http://localhost:5173`).

---

## 🛡️ License
Distributed under the ISC License.

<img width="1915" height="839" alt="{6830EEB2-3C88-4CA7-8FA8-7491DDE50C59}" src="https://github.com/user-attachments/assets/85b41e72-a8a8-419f-ab52-3026da346556" />


