import { SyntheticEvent, useState } from "react";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;
  const [target, setTarget] = useState<string>("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item.Image size="tiny" circular src="/assets/user.png" />
          <Item.Content>
            <Item.Header as={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </Item.Header>
            <Item.Description>Hosted By Ayoub</Item.Description>
          </Item.Content>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {activity.date}
          <Icon name="marker" />
          {activity.city}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
