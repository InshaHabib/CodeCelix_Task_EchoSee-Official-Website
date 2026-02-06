'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    isReceipt?: boolean;
};

type UserData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    plan: 'basic' | 'premium' | null;
    paymentType: 'onetime' | 'monthly' | null;
};

const PRODUCT_INFO = {
    plans: {
        basic: { name: 'Basic', price: 35000, monthlyPrice: 3500 },
        premium: { name: 'Premium', price: 40000, monthlyPrice: 4000 },
    },
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        plan: null,
        paymentType: null,
    });
    const [orderStep, setOrderStep] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize chat with greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = `Welcome to EchoSee Support.\n\nI'm here to assist you with information about our AR smart glasses for the hearing-impaired community.\n\nHow may I help you today?`;

            setMessages([{
                id: Date.now(),
                text: greeting,
                sender: 'bot',
            }]);
        }
    }, [isOpen, messages.length]);

    const generateReceipt = (data: UserData) => {
        const plan = data.plan === 'premium' ? PRODUCT_INFO.plans.premium : PRODUCT_INFO.plans.basic;
        const price = data.paymentType === 'monthly' ? plan.monthlyPrice : plan.price;
        const paymentLabel = data.paymentType === 'monthly' ? '/month (12 months)' : ' (one-time)';
        const orderDate = new Date().toLocaleDateString('en-PK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const deliveryDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-PK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const orderNumber = `ECH${Date.now().toString().slice(-8)}`;

        return `
━━━━━━━━━━━━━━━━━━━━━━━━
🧾 ORDER RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━

📦 PRODUCT DETAILS
• Product: EchoSee Smart Glasses
• Plan: ${plan.name}

💰 PAYMENT
• Amount: PKR ${price.toLocaleString()}${paymentLabel}
• Order #: ${orderNumber}

👤 CUSTOMER DETAILS
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}
• Address: ${data.address}

📅 DATES
• Order Date: ${orderDate}
• Expected Delivery: ${deliveryDate}

━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for choosing EchoSee! 🎉
We'll send a confirmation email shortly.
━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    };

    const parseOrderInfo = (text: string, currentData: UserData): UserData => {
        const updatedData = { ...currentData };
        const lowerText = text.toLowerCase();

        // Detect plan selection
        if (lowerText.includes('basic')) {
            updatedData.plan = 'basic';
        } else if (lowerText.includes('premium')) {
            updatedData.plan = 'premium';
        }

        // Detect payment type
        if (lowerText.includes('one-time') || lowerText.includes('onetime') || lowerText.includes('one time') || lowerText.includes('full payment')) {
            updatedData.paymentType = 'onetime';
        } else if (lowerText.includes('monthly') || lowerText.includes('installment')) {
            updatedData.paymentType = 'monthly';
        }

        // Detect email
        const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
            updatedData.email = emailMatch[0];
        }

        // Detect phone (Pakistani format)
        const phoneMatch = text.match(/(\+92|03)\d{9,10}/);
        if (phoneMatch) {
            updatedData.phone = phoneMatch[0];
        }

        return updatedData;
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userInput = input.trim();
        const userMessage: Message = {
            id: Date.now(),
            text: userInput,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Parse user input for order data
            const updatedUserData = parseOrderInfo(userInput, userData);

            // Check for name (if ordering and no name yet)
            if (orderStep === 'askName' && !updatedUserData.name) {
                updatedUserData.name = userInput;
            }
            // Check for address
            if (orderStep === 'askAddress' && !updatedUserData.address) {
                updatedUserData.address = userInput;
            }

            setUserData(updatedUserData);

            // Determine order step from conversation
            const lowerInput = userInput.toLowerCase();
            let newOrderStep = orderStep;

            if (lowerInput.includes('order') || lowerInput.includes('buy') || lowerInput.includes('purchase')) {
                newOrderStep = 'starting';
            }
            if (lowerInput.includes('confirm') && orderStep === 'confirmOrder') {
                // Generate receipt
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: generateReceipt(updatedUserData),
                    sender: 'bot',
                    isReceipt: true,
                }]);
                setIsTyping(false);
                setOrderStep('complete');
                return;
            }

            setOrderStep(newOrderStep);

            // Call AI API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        sender: m.sender,
                        text: m.text,
                    })),
                    userData: updatedUserData,
                    orderStep: newOrderStep,
                }),
            });

            if (!response.ok) {
                throw new Error('API error');
            }

            const data = await response.json();

            // Update order step based on AI response
            const aiResponse = data.message.toLowerCase();
            if (aiResponse.includes('which plan') || aiResponse.includes('basic or premium')) {
                setOrderStep('askPlan');
            } else if (aiResponse.includes('payment') || aiResponse.includes('one-time or monthly')) {
                setOrderStep('askPayment');
            } else if (aiResponse.includes('your name') || aiResponse.includes('full name')) {
                setOrderStep('askName');
            } else if (aiResponse.includes('email')) {
                setOrderStep('askEmail');
            } else if (aiResponse.includes('phone')) {
                setOrderStep('askPhone');
            } else if (aiResponse.includes('address') || aiResponse.includes('deliver')) {
                setOrderStep('askAddress');
            } else if (aiResponse.includes('confirm')) {
                setOrderStep('confirmOrder');
            }

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: data.message,
                sender: 'bot',
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "I apologize for the inconvenience. Please try again.",
                sender: 'bot',
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(249, 115, 22, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(249, 115, 22, 0.4)';
                }}
            >
                {isOpen ? (
                    <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '24px',
                        width: '380px',
                        maxWidth: 'calc(100vw - 48px)',
                        height: '550px',
                        maxHeight: 'calc(100vh - 140px)',
                        background: 'var(--bg-secondary)',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 999,
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '16px 20px',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>EchoSee AI Assistant</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                                {isTyping ? '✨ Thinking...' : '🟢 Online • Powered by AI'}
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: msg.isReceipt ? '100%' : '85%',
                                    padding: msg.isReceipt ? '16px' : '12px 16px',
                                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: msg.sender === 'user'
                                        ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
                                        : msg.isReceipt
                                            ? 'rgba(249, 115, 22, 0.1)'
                                            : 'var(--bg-tertiary)',
                                    color: 'white',
                                    fontSize: msg.isReceipt ? '0.8rem' : '0.9rem',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-wrap',
                                    border: msg.isReceipt ? '1px solid rgba(249, 115, 22, 0.3)' : 'none',
                                    fontFamily: msg.isReceipt ? 'monospace' : 'inherit',
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div
                                style={{
                                    alignSelf: 'flex-start',
                                    padding: '12px 16px',
                                    borderRadius: '18px 18px 18px 4px',
                                    background: 'var(--bg-tertiary)',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    gap: '4px',
                                }}
                            >
                                <span style={{ animation: 'pulse 1s infinite 0s' }}>●</span>
                                <span style={{ animation: 'pulse 1s infinite 0.2s' }}>●</span>
                                <span style={{ animation: 'pulse 1s infinite 0.4s' }}>●</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div
                        style={{
                            padding: '16px',
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex',
                            gap: '12px',
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            disabled={isTyping}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-tertiary)',
                                color: 'white',
                                fontSize: '0.9rem',
                                outline: 'none',
                                opacity: isTyping ? 0.6 : 1,
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: isTyping
                                    ? 'var(--bg-tertiary)'
                                    : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                border: 'none',
                                cursor: isTyping ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: isTyping ? 0.6 : 1,
                            }}
                        >
                            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
        </>
    );
}
