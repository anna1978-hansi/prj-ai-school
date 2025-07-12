import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 支持表格、粗体、代码块等

const ChatStreaming = () => {
  const [input, setInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setResponseText("");
    setLoading(true);

    const controller = new AbortController();

    const res = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-26017e0b3b2a444e951243e4f9d6ea6e" // ⚠️ 建议后期移至服务端
      },
      body: JSON.stringify({
        model: "qwen-plus",
        stream: true,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input }
        ]
      }),
      signal: controller.signal
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk
        .split("\n")
        .filter(line => line.trim().startsWith("data: "))
        .map(line => line.replace("data: ", "").trim());

      for (const line of lines) {
        if (line === "[DONE]") break;

        try {
          const json = JSON.parse(line);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            setResponseText(fullText);
          }
        } catch (e) {
          console.error("解析出错：", line, e);
        }
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>🧠 通义千问模拟 AI 聊天</h2>
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="输入你的问题..."
      />
      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 16px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "正在生成..." : "发送"}
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "#f8f8f8",
          padding: "16px",
          borderRadius: "6px",
          fontSize: "16px",
          lineHeight: "1.6"
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {responseText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatStreaming;
