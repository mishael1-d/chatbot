import OpenAI from "openai";

export const sendMessageToAssistant = async (msg) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const model = "gpt-3.5-turbo-16k";

  const assistant = await openai.beta.assistants.create({
    name: "Blanca AI",
    instructions:
      "You are a professional law consultant. You are chatting with a client who needs help with a legal issue. Provide legal advice and answer any questions they may have concerning any of these areas: family law, criminal law, civil law, and business law.",
    tools: [{ type: "code_interpreter" }],
    model: model,
  });

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: msg,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions:
      "You are a professional law consultant. You are chatting with a client who needs help with a legal issue. Provide legal advice and answer any questions they may have concerning any of these areas: family law, criminal law, civil law, and business law.",
  });

  const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

  const messages = await openai.beta.threads.messages.list(thread.id);

  console.log("messages", messages);
  return { status: runStatus.status, messages: messages.data };
};
