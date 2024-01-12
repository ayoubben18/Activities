import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";
type Activity = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
};
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Activities'/>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
