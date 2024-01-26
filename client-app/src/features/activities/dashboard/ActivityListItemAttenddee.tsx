import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
  attenddees: Profile[];
}

const ActivityListItemAttenddee = ({ attenddees }: Props) => {
  const styles = {
    borderColor: "lightgreen",
    borderWidth: "2px",
  };
  return (
    <List horizontal>
      {attenddees.map((attenddee) => (
        <Popup
          size="mini"
          hoverable
          key={attenddee.username}
          trigger={
            <List.Item
              key={attenddee.username}
              as={Link}
              to={`/profiles/${attenddee.username}`}
            >
              <Image
                size="mini"
                circular
                src={attenddee.image || "/assets/user.png"}
                bordered
                style={attenddee.following ? styles : null}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attenddee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default observer(ActivityListItemAttenddee);
