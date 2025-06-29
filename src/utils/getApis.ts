const url = "https://test-stream-python.onrender.com/stream";
export const fetchResponseData = async (
  prompt: string,
  onChunk: (text: string) => void,
//   apiUrl?: string
) => {
  const controller = new AbortController();
  try {
    const response = await fetch(
      `${url}?prompt=${encodeURIComponent(prompt)}`,
      {
        method: "GET",
        headers: {
          "x-api-key": `${import.meta.env.VITE_API_KEY}`,
        },
        signal: controller.signal,
      }
    );

    if (!response.ok || !response.body) {
      throw new Error("API failed");
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split("\n\n");
      buffer = parts.pop() || "";

      for (const part of parts) {
        const line = part.trim();
        if (line.startsWith("data:")) {
          const jsonStr = line.replace(/^data:\s*/, "");
          if (jsonStr === "[DONE]" || !jsonStr) continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed?.choices?.[0]?.delta?.content;
            if (content) onChunk(content);
          } catch (err) {
            console.warn("JSON parse error:", err);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error while streamig:", error);
    throw error;
  } finally {
    controller.abort();
  }
};
