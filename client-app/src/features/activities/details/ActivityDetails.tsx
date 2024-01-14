import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancelSelectActivity,
  } = activityStore;
  if (!activity) return;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span className="date">{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            basic
            content="Edit"
            color="blue"
            onClick={() => openForm(activity.id)}
          />
          <Button
            basic
            content="Cancel"
            color="grey"
            onClick={cancelSelectActivity}
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default observer(ActivityDetails);
