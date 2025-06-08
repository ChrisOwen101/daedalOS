import { useState } from "react";
import { Avatar } from "components/apps/Messenger/Icons";
import StyledProfile from "components/apps/Messenger/StyledProfile";

type ProfileProps = {
  customerId?: string;
  onMouseDown?: () => void;
  picture?: string;
  userName?: string;
};

const Profile: FC<ProfileProps> = ({
  children,
  customerId: _customerId,
  onMouseDown,
  picture,
  userName = "Unknown Customer",
}) => {
  const [loadedImage, setLoadedImage] = useState("");

  return (
    <StyledProfile $clickable={Boolean(onMouseDown)}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onMouseDown={onMouseDown}>
        {picture && (
          <img
            alt={userName}
            onLoad={() => setLoadedImage(picture)}
            src={picture}
            style={
              loadedImage === picture
                ? {}
                : { position: "absolute", visibility: "hidden" }
            }
          />
        )}
        {(!picture || loadedImage !== picture) && <Avatar />}
      </div>
      <figcaption>
        <span>{userName}</span>
        {children}
      </figcaption>
    </StyledProfile>
  );
};

export default Profile;
