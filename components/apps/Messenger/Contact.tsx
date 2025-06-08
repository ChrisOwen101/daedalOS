import { useEffect, useState } from "react";
import Profile from "components/apps/Messenger/Profile";
import { shortTimeStamp } from "components/apps/Messenger/functions";
import Button from "styles/common/Button";
import { MILLISECONDS_IN_MINUTE } from "utils/constants";

type Customer = {
  avatar: string;
  id: string;
  lastMessage: string;
  name: string;
  status: string;
  timestamp: number;
  unread: boolean;
};

type ContactProps = {
  customer: Customer;
  onClick: () => void;
};

const Contact: FC<ContactProps> = ({ customer, onClick }) => {
  const [timeStamp, setTimeStamp] = useState("");
  const unreadClass = customer.unread ? "unread" : undefined;
  const statusIcon = customer.status === "active" ? "🟢" : customer.status === "waiting" ? "🟡" : "⚪";

  useEffect(() => {
    let interval = 0;

    if (customer.timestamp) {
      const updateTimestamp = (): void => {
        setTimeStamp(shortTimeStamp(Math.floor(customer.timestamp / 1000)));
      };
      
      updateTimestamp();
      interval = window.setInterval(updateTimestamp, MILLISECONDS_IN_MINUTE);
    }

    return () => window.clearInterval(interval);
  }, [customer.timestamp]);

  return (
    <li className={unreadClass}>
      <Button onClick={onClick}>
        <Profile
          customerId={customer.id}
          picture={customer.avatar}
          userName={customer.name}
        >
          <div>
            <div className={unreadClass}>
              {statusIcon} {customer.lastMessage}
            </div>
            {timeStamp ? "·" : ""}
            <div>{timeStamp}</div>
          </div>
        </Profile>
      </Button>
    </li>
  );
};

export default Contact;
