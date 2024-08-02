

import useChatMessages from './hooks/useChatMessages';

const ChatbotComponent = () => {
const { messages } = useChatMessages();
const handleUserMessage = (message) => {
    addMessage({ text: message, isUser: true });
    };
    
    const config = {
   
    inputPlaceholder: 'Type a message…',
    };
    
    const actionProvider = "";
    const messageParser = "";
return (
<div>
<Chatbot
config={config}
actionProvider={actionProvider}
messageParser={messageParser}
handleUserMessage={handleUserMessage}
/>
<div>
    
{messages.map((message, index) => (
<div key={index}>{message.text}</div>
))}
</div>
</div>
);



    
};

export default  ChatbotComponent;