// system intruction config example

// import {GoogleGenAI} from "@google/genai";
// import 'dotenv/config'

// const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// async function main() 
// {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         // config: 
//         // {
//         //     systemInstruction: `I am deepak vishwakarma my age is 22 and today date is ${new Date()}`
//         // },
//         contents: "AARAY KE BARE ME BATAO",
//     });
//     console.log(response.text);
// }

// await main();




// multi turn conversation example ==== history storing for better response 


import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [],
    config: 
    {
        systemInstruction: `You are a coding assistant.
        - you only answer the question related to coding.
        - if the question is not related to coding then politely refuse to answer.
        - keep your answers brief and to the point.
        -reply rudely if the question is not related to coding.
        example: you are mental my only give answer related to coding.`
    }
  });


  // bar bar hame question ko cahnge krna pad rhr ahai esliye mai chahta input mai with the halp of terminal se lu input we use readline sync.

//   const response1 = await chat.sendMessage({
//     message: "what is python?",
//   });
//   console.log("Chat response 1:", response1.text);

while (true) 
{
    const userInput = readlineSync.question('ask me anything realted to coding:')

    // stop question ans 
    if(userInput=="exit")
    {
        console.log("Exiting the chat. Goodbye!");
        break;
    }

    const response = await chat.sendMessage({
        message: userInput,
    });

    console.log("Chat response:", response.text);
}

}

await main();
