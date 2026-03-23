import Groq from "groq-sdk";
import readline from "node:readline/promises";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = new tavily({ apikey: process.env.TAVILY_API_KEY });

async function main() {

  const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
  })



  const messages = [
    {
      role: "system",
      content: `You are a smart personal assistant who answers the asked questions.
                You have access to following tools you can use to get the information to answer the questions asked by user.:
                1. webSearch({query}: {query: string}) //Search the latest information and realtime data on the internet.
                current date and time: ${new Date().toUTCString()}`,
    },
    // {
    //   role: "user",
    //   content: "height of mount everest and current weather there",
    // },
  ];

  while (true) {

   const question=await rl.question("you :");

   if(question === "exit" || question === "quit" || question === "bye"){
    break;
   }

   messages.push({
       role:"user",
       content:question,
   });



    while (true) {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: messages,

        tools: [
          {
            type: "function",
            function: {
              name: "webSearch",
              description: "Get real-time information from the web",
              parameters: {
                // JSON Schema object
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description:
                      "The search query to perform search on the web",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
        tool_choice: "auto",
      });

      messages.push(completion.choices[0].message);

      const toolCall = completion.choices[0].message.tool_calls;

      if (!toolCall) {
        console.log(`Assistant :${completion.choices[0].message.content}`);
        break;
      }

      for (const tool of toolCall) {
        // console.log("tool",tool);
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionParams));
          // console.log(`Tool Result : ${toolResult}`);

          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }
    }
  }

  rl.close();
}

main();

async function webSearch({ query }) {
  console.log("calling web search with query:", query);

  const response = await tvly.search(query);

  // console.log("web search response:", response);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n");

  return finalResult;
}
