import { useState, useRef, useEffect } from 'react';
import Galaxy from './Galaxy';

const generateThreadId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId] = useState(generateThreadId());
  const messagesEndRef = useRef(null);

  const handleAsk = async () => {
    const text = inputText.trim();
    if (!text) return;

    const userMessage = { text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ threadId, message: text }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      setMessages(prev => [...prev, { text: result.message, isUser: false }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: 'An error occurred while connecting to the server.', isUser: false, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="min-h-screen bg-black text-[#e3e3e3] font-sans flex flex-col items-center selection:bg-white/20 relative overflow-hidden">
      
      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy 
          transparent={false}
          mouseInteraction={true}
          mouseRepulsion={true}
          density={1}
          glowIntensity={0.5}
          hueShift={180}
          twinkleIntensity={0.4}
          rotationSpeed={0.05}
          speed={0.8}
        />
      </div>

      {/* Main App Overlay */}
      <div className="relative z-10 w-full flex flex-col items-center min-h-screen pointer-events-none">
        
        {/* Navbar Minimalist */}
        <header className="w-full flex items-center justify-between px-6 py-5 z-20 sticky top-0 bg-transparent backdrop-blur-lg border-b border-white/10 pointer-events-auto">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-md">
              <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" fill="currentColor"/>
            </svg>
            <span className="text-xl font-medium tracking-tight text-[#f0f0f0] drop-shadow-md">AskBuddy</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-[12px] bg-white/5 backdrop-blur-md border border-white/10 text-[13px] font-medium text-[#e0e0e0]">
            Alpha
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 w-full max-w-4xl px-4 sm:px-6 pb-40 flex flex-col gap-8 overflow-y-auto mt-6 pointer-events-auto">
          {messages.length === 0 && (
            <div className="flex flex-col h-full items-center justify-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] mt-10">
              <div className="w-20 h-20 rounded-[28px] bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 flex items-center justify-center mb-8 hover:scale-105 transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white opacity-90 drop-shadow-lg">
                  <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl font-normal tracking-tight mb-4 text-[#fcfcfc] text-center drop-shadow-md">Ask. Get. Done.</h1>
              <p className="text-gray-300 text-lg max-w-lg text-center leading-relaxed drop-shadow-md">
                Tell me what you need — I’m here to help.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex w-full opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards] ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              style={{ animationDelay: '0.05s' }}
            >
              {msg.isUser ? (
                <div className="max-w-[85%] sm:max-w-[75%] px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/10 text-[#fcfcfc] rounded-[28px] rounded-tr-[8px] text-[16px] leading-relaxed font-normal shadow-lg">
                  {msg.text}
                </div>
              ) : (
                <div className="flex gap-4 max-w-[95%] sm:max-w-[85%]">
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#fcfcfc]">
                        <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className={`text-[16px] leading-relaxed font-normal mt-1.5 drop-shadow-md ${msg.isError ? 'text-red-300' : 'text-[#fcfcfc]'}`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex w-full justify-start opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
              <div className="flex gap-4">
                 <div className="mt-0.5 flex-shrink-0">
                   <div className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-300 animate-spin-slow">
                       <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" fill="currentColor"/>
                     </svg>
                   </div>
                 </div>
                 <div className="mt-[14px] flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#ccc] animate-pulse [animation-delay:-0.30s]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#ccc] animate-pulse [animation-delay:-0.15s]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#ccc] animate-pulse"></div>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-6" />
        </main>

        {/* Input Area */}
        <div className="fixed bottom-0 inset-x-0 pb-6 pt-4 px-4 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none">
          <div className="max-w-4xl mx-auto flex items-end bg-black/40 backdrop-blur-xl rounded-[32px] p-2 pl-6 pr-2.5 shadow-[0_5px_30px_rgba(0,0,0,0.5)] border border-white/10 focus-within:border-white/30 transition-colors duration-300 pointer-events-auto">
            <textarea
              className="w-full bg-transparent text-[#fcfcfc] outline-none py-4 placeholder-gray-400 resize-none max-h-48 min-h-[56px] text-[16px] font-normal leading-relaxed"
              rows="1"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 192) + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or describe an interface..."
              style={{ overflowY: inputText.split('\n').length > 6 ? 'auto' : 'hidden' }}
            ></textarea>
            
            <button
              onClick={handleAsk}
              disabled={isLoading || !inputText.trim()}
              className="mb-1.5 ml-2 w-11 h-11 rounded-full bg-white/90 text-black hover:bg-white transition-all disabled:opacity-20 flex items-center justify-center flex-shrink-0 cursor-pointer disabled:cursor-not-allowed group shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                 <path d="M5 12h14"></path>
                 <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          <p className="text-center text-gray-400 text-[11px] mt-4 font-medium tracking-wide pointer-events-auto">
            AskBuddy is an experimental interface. Responses may be inaccurate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
