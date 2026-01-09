// AIzaSyCaT3Xtw7__EnOpcWceUEs-8Bc_Ilgthf8
// import { GoogleGenAI } from "@google/genai";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({apiKey:"AIzaSyCI1LO_JHgvtEt8xNwAxgJws06Y9CCmeh0"});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "my name is deepak software engineer",
//   });
//   console.log(response.text);
// }

// main();

import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCI1LO_JHgvtEt8xNwAxgJws06Y9CCmeh0"
});

// ---------- UI ----------
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Gemini Chat</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
          }

          .box {
            width: 420px;
            margin: 100px auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }

          h2 {
            text-align: center;
          }

          input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          button {
            width: 100%;
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background: #0056b3;
          }

          #output {
            margin-top: 15px;
            padding: 10px;
            background: #f1f1f1;
            border-radius: 5px;
            min-height: 40px;
          }
        </style>
      </head>

      <body>
        <div class="box">
          <h2>Gemini Chat</h2>

          <input id="input" placeholder="Ask something..." />
          <button onclick="ask()">Send</button>

          <div id="output"></div>
        </div>

        <script>
          async function ask() {
            const input = document.getElementById("input");
            const output = document.getElementById("output");

            const text = input.value;
            if (!text) return;

            output.innerText = "Thinking...";
            input.value = ""; // ✅ auto clear input

            const res = await fetch("/ask", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: text })
            });

            const data = await res.json();
            output.innerText = data.answer;
          }
        </script>
      </body>
    </html>
  `);
});

// ---------- Gemini API ----------
app.post("/ask", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.prompt
    });

    res.json({ answer: response.text });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
