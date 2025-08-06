import React, { useState, useRef, useEffect } from "react";
import API from "../api/index";
const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const answerRef = useRef(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await API.post("/ai", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollTop = answerRef.current.scrollHeight;
    }
  }, [answer]);

  return (
    <>
      {isOpen ? (
        <div className="fixed top-1/2 transform -translate-y-1/2 right-6 h-[370px] w-96 bg-black text-white shadow-lg rounded-xl p-4 border z-50">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white-800">🤖 Ask AI</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white-500 hover:text-red-500 text-xl font-bold"
              title="Close"
            >
              ×
            </button>
          </div>

          <textarea
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
            placeholder="Ask something..."
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition w-full"
          >
            {loading ? "Thinking..." : "Send"}
          </button>

          {answer && (
            <div className="mt-3 flex-1 overflow-y-auto">
              <div
                ref={answerRef}
                className="p-2 border-t text-sm text-white-700 max-h-40 overflow-y-auto whitespace-pre-wrap break-words"
              >
                <strong>AI:</strong> {answer}
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 right-6 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 z-50"
        >
          💬 How can I advise for you ?
        </button>
      )}
    </>
  );
};

export default AIChatBox;
