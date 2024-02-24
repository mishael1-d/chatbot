import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function sendMessage(input) {
  const chatModel = new ChatOpenAI({
    openAIApiKey: "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",
  });

  const outputParser = new StringOutputParser();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world class legal consultant. Answer only legal related questions"],
    ["user", "{input}"],
  ]);

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);

  try {
    const AIRespone = await llmChain.invoke({
      input: input,
    });
    console.log("AIResponse", AIRespone);
    return AIRespone;
  } catch (error) {
    console.error("Error:", error);
  }
}
