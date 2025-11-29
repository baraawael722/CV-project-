import React, { useState, useRef, useEffect } from 'react'

export default function Interview() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m your AI Interview Coach. I\'m here to help you prepare for technical interviews. Let\'s start with some questions about React. Are you ready?',
      feedback: null
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const evaluateAnswer = (userAnswer) => {
    // Simple mock evaluation
    const score = Math.floor(Math.random() * 30) + 70 // 70-100
    const feedback = {
      score,
      strengths: ['Clear explanation', 'Good understanding of concepts'],
      improvements: ['Could provide more examples', 'Consider edge cases']
    }
    return feedback
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
      feedback: null
    }

    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response with evaluation
    setTimeout(() => {
      const feedback = evaluateAnswer(input)
      
      const aiResponse = {
        role: 'assistant',
        content: `Great answer! Let me give you some feedback on your response.`,
        feedback
      }

      const nextQuestion = {
        role: 'assistant',
        content: 'Here\'s your next question: What is the difference between useState and useRef in React?',
        feedback: null
      }

      setMessages(prev => [...prev, aiResponse, nextQuestion])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Interview Practice 🎯</h1>
          <p className="text-lg text-gray-600">Practice technical interviews with real-time feedback</p>
        </div>

        {/* Interview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">5h</div>
            <div className="text-sm text-gray-600">Practice Time</div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div key={index}>
                {message.role === 'assistant' ? (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-50 rounded-2xl rounded-tl-none p-4 inline-block max-w-2xl">
                        <p className="text-gray-900">{message.content}</p>
                      </div>
                      
                      {message.feedback && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-l-4 border-green-500">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">📊</span>
                            <h4 className="font-bold text-gray-900">Your Score: {message.feedback.score}/100</h4>
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="font-semibold text-green-700 mb-2">✅ Strengths:</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {message.feedback.strengths.map((strength, i) => (
                                <li key={i} className="text-gray-700">{strength}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-orange-700 mb-2">💡 Areas for Improvement:</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {message.feedback.improvements.map((improvement, i) => (
                                <li key={i} className="text-gray-700">{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 inline-block max-w-2xl">
                        <p>{message.content}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">
                      You
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your answer here..."
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 placeholder-gray-500 bg-white"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Send 📤
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              💡 Tip: Be specific and detailed in your answers for better feedback
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
