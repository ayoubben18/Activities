import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadingInitial, activityRegistery, loadActivities } = activityStore;

  useEffect(() => {
    if (activityRegistery.size === 0) loadActivities();
  }, [loadActivities, activityRegistery.size]);

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2 style={{ textAlign: "center" }}>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
