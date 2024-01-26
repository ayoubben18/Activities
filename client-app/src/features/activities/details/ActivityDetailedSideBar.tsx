import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedSidebar({
  activity: { attenddees, host },
}: Props) {
  if (!attenddees) return null;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attenddees.length} {attenddees.length === 1 ? "Person" : "People"}{" "}
        going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attenddees.map((attenddee) => (
            <Item style={{ position: "relative" }} key={attenddee.username}>
              {attenddee.username === host?.username && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}

              <Image size="tiny" src={attenddee.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attenddee.username}`}>
                    {attenddee.displayName}
                  </Link>
                </Item.Header>
                {attenddee.following && (
                  <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
                )}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
