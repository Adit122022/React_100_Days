import { GoogleGenAI } from "@google/genai";

const GenAi = async ({ messages, setMessages, setStreamingReply, setIsLoading, Instruction }) => {
  try {
    setIsLoading(true);

    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const model = "gemini-2.0-flash";

    const contents = [
      {   role: "user",
        parts: [{ text: messages[messages.length - 1].text }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      contents,
      config: {
      systemInstruction: [Instruction]},
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    let reply = "";
    for await (const chunk of response) {
        //   console.log("Chunk:", chunk);
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply += chunk.candidates[0].content.parts[0].text;
        setStreamingReply(reply);
      }
    }
// console.log("System instruction:", Instruction);

    setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    setStreamingReply(null);
  } catch (error) {
    console.error("Error:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Sorry, I encountered an error. Please try again.", sender: "bot" },
    ]);
    setStreamingReply(null);
  } finally {
    setIsLoading(false);
  }
};

export default GenAi;
