import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    agent.Activities.list().then((res) => {
      let activities: Activity[] = [];
      res.forEach((a: Activity) => {
        a.date = a.date.split("T")[0];
        activities.push(a);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };
  const handleCreateOrUpdateActivity = (activity: Activity) => {
    //I'll add it after adding html date picker
    setSubmitting(true);
    try {
      if (activity.id) {
        agent.Activities.update(activity).then(() => {
          setActivities([
            ...activities.filter((x) => x.id !== activity.id),
            activity,
          ]);
          setSelectedActivity(activity);
          setSubmitting(false);
          setEditMode(false);
        });
      } else {
        activity.id = uuid();
        agent.Activities.create(activity).then(() => {
          setActivities([...activities, activity]);
          setSelectedActivity(activity);
          setSubmitting(false);
          setEditMode(false);
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleDeleteActivity = (id: string) => {
    try {
      setDeleting(true);
      agent.Activities.delete(id).then(() => {
        setActivities([...activities.filter((activity) => activity.id !== id)]);
        setDeleting(false);
      });
    } catch (error) {}
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrUpdateActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          deleting={deleting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
