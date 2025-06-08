import { useCallback, useRef, useState } from "react";
import { Send } from "components/apps/Messenger/Icons";
import StyledSendMessage from "components/apps/Messenger/StyledSendMessage";
import Button from "styles/common/Button";
import { haltEvent } from "utils/functions";

// Simulated customer service responses
const AUTOMATED_RESPONSES = [
  "Thank you for contacting us. Let me look into that for you.",
  "I understand your concern. I'll check on that right away.",
  "I've located your account information. Here's what I can see...",
  "I've processed that request for you. You should see the changes shortly.",
  "Is there anything else I can help you with today?",
  "Thank you for being a valued customer. Have a great day!",
];

const SendMessage: FC<{ customerId: string }> = ({ customerId }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [canSend, setCanSend] = useState(false);
  
  const sendMessage = useCallback(
    (message: string) => {
      // Simulate sending the message (for demo purposes)
      // In a real app, this would send to a backend service
      if (message && customerId) {
        // Message would be sent here
      }
      
      if (inputRef.current?.value) inputRef.current.value = "";
      setCanSend(false);
      
      // Simulate customer response after a short delay
      setTimeout(() => {
        const responseIndex = Math.floor(Math.random() * AUTOMATED_RESPONSES.length);
        const response = AUTOMATED_RESPONSES[responseIndex];
        // In a real app, this would be handled by the backend
        if (response) {
          // Response would be displayed here
        }
      }, 2000 + Math.random() * 3000);
    },
    [customerId]
  );
  const updateHeight = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "0px";
      inputRef.current.style.height = `${Math.max(
        35,
        inputRef.current.scrollHeight + 4
      )}px`;
    }
  }, []);

  return (
    <StyledSendMessage>
      <textarea
        ref={inputRef}
        onChange={() => {
          setCanSend(Boolean(inputRef.current?.value));
          updateHeight();
        }}
        onKeyDown={(event) => {
          const { key, shiftKey } = event;
          const message = inputRef.current?.value.trim();

          if (message && key === "Enter" && !shiftKey) {
            event.preventDefault();
            sendMessage(message);
          } else setCanSend(Boolean(message));

          updateHeight();
        }}
        placeholder="Type your response to the customer..."
        autoFocus
      />
      <Button
        disabled={!canSend}
        onClick={() =>
          inputRef.current?.value && sendMessage(inputRef.current.value)
        }
        onContextMenuCapture={haltEvent}
      >
        <Send />
      </Button>
    </StyledSendMessage>
  );
};

export default SendMessage;
