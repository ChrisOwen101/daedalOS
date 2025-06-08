import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import ChatProfile from "components/apps/Messenger/ChatProfile";
import {
  Avatar,
  CheckFullCircle,
} from "components/apps/Messenger/Icons";
import StyledChatLog from "components/apps/Messenger/StyledChatLog";
import { prettyChatTimestamp } from "components/apps/Messenger/functions";
import { clsx } from "utils/functions";

const SanitizedContent = dynamic(
  () => import("components/apps/Messenger/SanitizedContent")
);

// Simulated conversation data
const CUSTOMER_CONVERSATIONS: Record<string, {
  content: string;
  id: string;
  isOperator: boolean;
  status?: 'sent' | 'delivered' | 'read';
  timestamp: number;
}[]> = {
  customer_1: [
    {
      content: "Hi, I need help with my order #12345",
      id: "msg_1",
      isOperator: false,
      timestamp: Date.now() - 600000,
    },
    {
      content: "Hello! I'd be happy to help you with your order. Let me look that up for you.",
      id: "msg_2",
      isOperator: true,
      status: 'delivered',
      timestamp: Date.now() - 580000,
    },
    {
      content: "I can see your order was shipped yesterday. Here's the tracking number: 1Z999AA1234567890",
      id: "msg_3",
      isOperator: true,
      status: 'read',
      timestamp: Date.now() - 560000,
    },
    {
      content: "Great! When should I expect delivery?",
      id: "msg_4",
      isOperator: false,
      timestamp: Date.now() - 300000,
    },
  ],
  customer_2: [
    {
      content: "My payment was declined but I don't understand why",
      id: "msg_5",
      isOperator: false,
      timestamp: Date.now() - 900000,
    },
    {
      content: "I'm sorry to hear about that. Let me check your payment method and see what might have caused the issue.",
      id: "msg_6",
      isOperator: true,
      status: 'delivered',
      timestamp: Date.now() - 870000,
    },
    {
      content: "I can see the issue - your card has expired. Would you like to update your payment method?",
      id: "msg_7",
      isOperator: true,
      status: 'read',
      timestamp: Date.now() - 600000,
    },
  ],
  customer_3: [
    {
      content: "I received my order but one item was missing",
      id: "msg_8",
      isOperator: false,
      timestamp: Date.now() - 2400000,
    },
    {
      content: "I apologize for the inconvenience. I've immediately processed a replacement for the missing item.",
      id: "msg_9",
      isOperator: true,
      status: 'read',
      timestamp: Date.now() - 2370000,
    },
    {
      content: "It should arrive within 2-3 business days with express shipping at no extra cost.",
      id: "msg_10",
      isOperator: true,
      status: 'read',
      timestamp: Date.now() - 2340000,
    },
    {
      content: "Thank you for your help! That's excellent customer service.",
      id: "msg_11",
      isOperator: false,
      timestamp: Date.now() - 1800000,
    },
  ],
};

const CUSTOMER_NAMES: Record<string, string> = {
  customer_1: "John Smith",
  customer_2: "Sarah Johnson", 
  customer_3: "Mike Chen",
};

const ChatLog: FC<{ customerId: string }> = ({ customerId }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const messages = useMemo(() => CUSTOMER_CONVERSATIONS[customerId] || [], [customerId]);
  const customerName = CUSTOMER_NAMES[customerId] || "Unknown Customer";

  useEffect(() => {
    if (messages.length > 0) {
      listRef.current?.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <StyledChatLog ref={listRef}>
      <ChatProfile customerId={customerId} customerName={customerName} />
      {messages.map((message) => (
        <li
          key={message.id}
          className={clsx({
            received: !message.isOperator,
            sent: message.isOperator,
          })}
          title={prettyChatTimestamp(Math.floor(message.timestamp / 1000))}
        >
          {!message.isOperator && (
            <div className="avatar">
              <Avatar />
            </div>
          )}
          <SanitizedContent
            content={message.content}
            decrypted
          />
          {message.isOperator && message.status && (
            <div
              className="status"
              title={message.status}
            >
              <CheckFullCircle />
            </div>
          )}
        </li>
      ))}
    </StyledChatLog>
  );
};

export default ChatLog;
