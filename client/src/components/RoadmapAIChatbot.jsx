import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const INITIAL_MESSAGE = (title) => ({
  role: "assistant",
  content: `Hi! I'm your AI learning assistant for ${title || "this roadmap"}. Ask me about any topic, step, project idea, or interview question.`,
});

const RoadmapAIChatbot = ({ roadmap }) => {
  const roadmapTitle = roadmap?.title || "this roadmap";
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE(roadmapTitle)]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([INITIAL_MESSAGE(roadmapTitle)]);
  }, [roadmapTitle]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const resetChat = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([INITIAL_MESSAGE(roadmapTitle)]);
    setMessage("");
    setIsLoading(false);
  };

  const parseSSEBuffer = (buffer, onEvent) => {
    const events = buffer.split("\n\n");
    const remainder = events.pop() || "";

    events.forEach((rawEvent) => {
      const lines = rawEvent.split("\n");
      let eventName = "message";
      const dataLines = [];

      lines.forEach((line) => {
        if (line.startsWith("event:")) eventName = line.slice(6).trim();
        if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
      });

      if (!dataLines.length) return;
      try {
        onEvent(eventName, JSON.parse(dataLines.join("\n")));
      } catch {
        // Ignore incomplete/invalid SSE payloads; the next read will complete it.
      }
    });

    return remainder;
  };

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = { role: "user", content: trimmedMessage };
    const history = messages.slice(-10);

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: "" },
    ]);
    setMessage("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const baseURL = (api.defaults.baseURL || "").replace(/\/$/, "");
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/ai/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history,
          roadmap: {
            title: roadmap?.title,
            description: roadmap?.description,
            category: roadmap?.category,
            sections: roadmap?.sections,
          },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorBody = {};
        try {
          errorBody = await response.json();
        } catch {
          // Non-JSON error response.
        }
        throw new Error(errorBody?.message || `AI request failed (${response.status})`);
      }

      if (!response.body) throw new Error("Streaming is not supported by this browser.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let streamedText = "";
      let streamError = null;

      const handleEvent = (eventName, data) => {
        if (eventName === "chunk") {
          streamedText += data?.text || "";
          setMessages((prev) => {
            const next = [...prev];
            const lastIndex = next.length - 1;
            if (next[lastIndex]?.role === "assistant") {
              next[lastIndex] = { ...next[lastIndex], content: streamedText };
            }
            return next;
          });
        }

        if (eventName === "error") {
          streamError = new Error(data?.message || "The AI service is unavailable.");
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        buffer = parseSSEBuffer(buffer, handleEvent);
      }

      buffer += decoder.decode();
      parseSSEBuffer(`${buffer}\n\n`, handleEvent);

      if (streamError) throw streamError;
      if (!streamedText.trim()) throw new Error("The AI returned an empty response.");
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("AI chatbot error:", error);
      const errorMessage = error.message || "The AI service is temporarily unavailable. Please try again in a moment.";

      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        if (next[lastIndex]?.role === "assistant") {
          next[lastIndex] = { ...next[lastIndex], content: errorMessage };
        }
        return next;
      });
      toast.error(errorMessage);
    } finally {
      abortRef.current = null;
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="roadmap-ai-chat-launcher fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
          aria-label="Open AI chatbot"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {isOpen && (
        <div className="roadmap-ai-chat-window fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold">Roadmap AI</h3>
                <p className="text-xs text-blue-100 truncate">Learning assistant • {roadmapTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="hover:bg-white/20 rounded-lg p-2 transition cursor-pointer"
                aria-label="Reset chat"
                title="Reset chat"
              >
                <RotateCcw size={17} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-lg p-2 transition cursor-pointer"
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Bot size={15} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap leading-6 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.content || (isLoading && index === messages.length - 1 ? (
                    <span className="inline-flex gap-1 items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:120ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:240ms]" />
                    </span>
                  ) : "")}
                </div>

                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                    <User size={15} />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about this roadmap..."
                rows={1}
                maxLength={1800}
                disabled={isLoading}
                className="flex-1 resize-none border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />

              <button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white flex items-center justify-center transition cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              AI responses may be imperfect. Verify important information.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadmapAIChatbot;
