import Profile from "components/apps/Messenger/Profile";
import StyledChatProfile from "components/apps/Messenger/StyledChatProfile";

type ChatProfileProps = {
  customerId: string;
  customerName: string;
};

const ChatProfile: FC<ChatProfileProps> = ({ customerId, customerName }) => {
  const customerInfo = {
    customer_1: "Customer since 2023 • Premium member • Order #12345",
    customer_2: "Customer since 2022 • Standard member • Payment issue",
    customer_3: "Customer since 2021 • VIP member • Missing item resolved",
  }[customerId] || "Customer information";

  return (
    <StyledChatProfile>
      <Profile
        customerId={customerId}
        picture="/System/Icons/user.webp"
        userName={customerName}
      >
        <div className="about">{customerInfo}</div>
        <div className="encryption">
          <span>🛡️ Secure customer support</span>
          <span>All conversations are logged for quality assurance.</span>
        </div>
      </Profile>
    </StyledChatProfile>
  );
};

export default ChatProfile;
