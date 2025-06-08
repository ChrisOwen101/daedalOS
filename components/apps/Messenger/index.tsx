import { useCallback, useState } from "react"
import { AnimatePresence } from "motion/react"
import ChatLog from "components/apps/Messenger/ChatLog"
import Contact from "components/apps/Messenger/Contact"
import ProfileBanner from "components/apps/Messenger/ProfileBanner"
import SendMessage from "components/apps/Messenger/SendMessage"
import StyledChatContainer from "components/apps/Messenger/StyledChatContainer"
import StyledContacts from "components/apps/Messenger/StyledContacts"
import StyledMessenger from "components/apps/Messenger/StyledMessenger"
import {
  inLeftOutRight,
  inRightOutLeft,
} from "components/apps/Messenger/constants"
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent"
import { haltEvent } from "utils/functions"

// Simulated customer data
const SIMULATED_CUSTOMERS = [
  {
    avatar: "/System/Icons/user.webp",
    id: "customer_1",
    lastMessage: "Hi, I need help with my order",
    name: "John Smith",
    status: "active",
    timestamp: Date.now() - 300000, // 5 minutes ago
    unread: true,
  },
  {
    avatar: "/System/Icons/user.webp",
    id: "customer_2",
    lastMessage: "My payment was declined",
    name: "Sarah Johnson",
    status: "waiting",
    timestamp: Date.now() - 600000, // 10 minutes ago
    unread: true,
  },
  {
    avatar: "/System/Icons/user.webp",
    id: "customer_3",
    lastMessage: "Thank you for your help!",
    name: "Mike Chen",
    status: "resolved",
    timestamp: Date.now() - 1800000, // 30 minutes ago
    unread: false,
  },
]

type CustomerServiceChatProps = {
  processId: string
}

const CustomerServiceChat: FC<CustomerServiceChatProps> = ({ processId: _processId }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
  const [customers, setCustomers] = useState(SIMULATED_CUSTOMERS)

  const changeCustomer = useCallback((customerId: string) => {
    setSelectedCustomerId(customerId)
    // Mark customer as read when selected
    if (customerId) {
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === customerId
            ? { ...customer, unread: false }
            : customer
        )
      )
    }
  }, [])

  return (
    <StyledMessenger>
      <ProfileBanner
        goHome={() => changeCustomer("")}
        selectedCustomerId={selectedCustomerId}
      />
      <div>
        <AnimatePresence initial={false} presenceAffectsLayout={false}>
          {selectedCustomerId ? (
            <StyledChatContainer key="chat" {...inRightOutLeft}>
              <ChatLog customerId={selectedCustomerId} />
              <SendMessage customerId={selectedCustomerId} />
            </StyledChatContainer>
          ) : (
            <StyledContacts
              key="contacts"
              onContextMenu={haltEvent}
              {...inLeftOutRight}
            >
              {customers.map((customer) => (
                <Contact
                  key={customer.id}
                  customer={customer}
                  onClick={() => changeCustomer(customer.id)}
                />
              ))}
            </StyledContacts>
          )}
        </AnimatePresence>
      </div>
    </StyledMessenger>
  )
}

const Messenger: FC<ComponentProcessProps> = ({ id }) => <CustomerServiceChat processId={id} />

export default Messenger
