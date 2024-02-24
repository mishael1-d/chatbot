"use client";

import LoadingDots from "@/components/Loader";
import { sendMessage } from "@/utils/sendMessage";
import { sendMessageToAssistant } from "@/utils/sendMessageToAssistant";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSendMessage = async () => {
    setLoading(true);
    setMessage("");
    setMessageHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);
    console.log("here", message);
    const res = await sendMessage(message);
    console.log("res", res);
    if (res) {
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", content: res },
      ]);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-[350px] h-screen  flex justify-center items-center m-auto ">
      <div className="bg-white p-4 rounded-md w-full h-[500px] relative overflow-y-scroll">
        <div>
          <p className="text-[14px]">You are chatting with Blanca AI</p>
        </div>
        <div className="'">
          {messageHistory.map((msg, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  msg?.role === "assistant"
                    ? "justify-start items-start text-left bg-blue-500 text-white"
                    : "justify-end items-end text-right bg-orange-800 text-white"
                } p-2 rounded-mg`}
              >
                <p>{msg?.role === "assistant" ? "AI Assistant" : "User"}</p>
                <p>{msg?.content}</p>
              </div>
            );
          })}
        </div>
        <div className="sticky bottom-4 left-0 right-0 mx-4 flex items-center gap-2">
          <input
            className="border-2 border-black w-full p-2 rounded-md bg-white bg-opacity-80"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-black text-white rounded-md p-2"
            onClick={handleSendMessage}
          >
            {loading ? <LoadingDots /> : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}
