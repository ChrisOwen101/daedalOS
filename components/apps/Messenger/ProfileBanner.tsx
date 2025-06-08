import { Back, Write } from "components/apps/Messenger/Icons"
import Profile from "components/apps/Messenger/Profile"
import StyledProfileBanner from "components/apps/Messenger/StyledProfileBanner"
import Button from "styles/common/Button"
import { haltEvent } from "utils/functions"

type ProfileBannerProps = {
  goHome: () => void
  selectedCustomerId: string
}

const ProfileBanner: FC<ProfileBannerProps> = ({
  goHome,
  selectedCustomerId
}) => {
  const title = selectedCustomerId ? "Customer Support Chat" : "Customer Service Dashboard"

  return (
    <StyledProfileBanner onContextMenuCapture={haltEvent}>
      <Button onClick={goHome}>
        {selectedCustomerId ? <Back /> : <Write />}
      </Button>
      <Profile
        customerId={selectedCustomerId}
        picture="/System/Icons/user.webp"
        userName={title}
      />
    </StyledProfileBanner>
  )
}

export default ProfileBanner
