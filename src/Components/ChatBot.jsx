import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaPhone } from "react-icons/fa";

const predefinedQA = [
  { q: "What services do you provide?", a: "We help founders with branding, strategy, content ecosystems and personal brand positioning." },
  { q: "What is the pricing?", a: "Pricing varies depending on the service. You can request a quote directly through this chat." },
  { q: "How can I grow my personal brand?", a: "Consistency with content, clarity in positioning, and defining your audience are key. We guide you in each step." },
  { q: "Who is this program for?", a: "Entrepreneurs, creators, coaches, consultants — anyone who wants to build an influential brand." },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([{ sender: "bot", text: "Hi! How can I help you today?" }]);
  const [input, setInput] = useState("");

  // Ref for auto-scrolling
  const chatEndRef = useRef(null);

  // Auto scroll to last message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Disable background scroll when open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setChat((prev) => [...prev, userMessage]);

    const lower = input.toLowerCase();
    let reply = "I'm not sure about that, but I can help you book a call!";

    predefinedQA.forEach((qa) => {
      if (lower.includes(qa.q.toLowerCase().slice(0, 4))) reply = qa.a;
    });

    setTimeout(() => {
      setChat((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);

    setInput("");
  };

  const bookCall = () => {
    setChat((prev) => [
      ...prev,
      { sender: "bot", text: "Great! Click below to book a call:" },
      { sender: "bot", text: "Book Call →" },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed cursor-pointer bottom-6 right-6 max-sm:bottom-4 max-sm:right-5
        w-16 h-16 max-sm:w-14 max-sm:h-14 flex items-center justify-center
        rounded-full bg-[#FF8C1E] text-black shadow-xl hover:scale-110
        transition z-50">
        <FaComments size={22} />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-28 right-6 w-72 bg-[#0f0f0f] text-white border border-[#222]
          rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up
          max-sm:w-full max-sm:h-full max-sm:bottom-0 max-sm:right-0 max-sm:left-0
          max-sm:top-0 max-sm:rounded-none"
        >

          {/* Mobile close */}
          <div className="sm:hidden flex justify-end p-3 bg-[#111] border-b border-[#222]">
            <button onClick={() => setOpen(false)} className="text-white text-xl">
              <FaTimes />
            </button>
          </div>

          {/* Header */}
          <div className="p-3 border-b border-[#222] bg-[#111] font-medium text-base flex items-center gap-2">
            <FaComments className="text-[#FF8C1E]" /> Chat with Us
          </div>

          {/* Chat Messages */}
          <div
            className="h-64 max-sm:h-[75%] overflow-y-scroll p-4 space-y-3 hide-scrollbar"
          >
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "bg-[#FF8C1E] text-black ml-auto"
                    : "bg-[#1a1a1a] text-gray-200"
                }`}
              >
                {msg.text === "Book Call →" ? (
                  <a
                    href="https://calendar.app.google/7NKe1NBEGwAHouVcA"
                    target="_blank"
                    className="underline font-medium flex items-center gap-2 text-[#FF8C1E]"
                  >
                    <FaPhone /> Book a Call
                  </a>
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {/* Auto-scroll anchor */}
            <div ref={chatEndRef}></div>
          </div>

          {/* QUICK QUESTIONS */}
          <div className="px-4 pb-3 max-sm:absolute max-sm:bottom-20 max-sm:left-0 max-sm:w-full max-sm:bg-[#0f0f0f]/95 max-sm:pt-3 max-sm:border-t max-sm:border-[#222]">
            <p className="text-xs text-gray-400 mb-2">Quick Questions</p>

            <div className="flex flex-wrap gap-2">
              {predefinedQA.map((qa, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(qa.q);
                    setTimeout(sendMessage, 100);
                  }}
                  className="text-xs px-2 py-1 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                >
                  {qa.q}
                </button>
              ))}
            </div>

            {/* Book Call */}
            <button
              onClick={bookCall}
              className="mt-3 w-full bg-[#FF8C1E] text-black rounded-lg py-2 text-sm font-medium hover:bg-white transition flex items-center justify-center gap-2"
            >
              <FaPhone /> Book a Call
            </button>
          </div>

          {/* INPUT FIELD */}
          <div className="flex items-center border-t border-[#222] bg-[#0d0d0d] p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent outline-none text-sm text-white"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>
              <FaPaperPlane className="text-[#FF8C1E] ml-3 cursor-pointer" />
            </button>
          </div>
        </div>
      )}

      {/* Animations + Hidden Scrollbar */}
      <style jsx="true">{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0px);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.35s ease-out forwards;
        }
        /* Hide scrollbar but keep scroll functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
