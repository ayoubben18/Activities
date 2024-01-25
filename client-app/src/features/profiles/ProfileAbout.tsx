import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";
import { observer } from "mobx-react-lite";

const ProfileAbout = () => {
  const {
    profileStore: { isCurrentUser, profile },
  } = useStore();
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Header
              as="h2"
              icon="user"
              content={`About ${profile?.displayName || "N/A"}`}
            />
          </Grid.Column>
          <Grid.Column width={6} textAlign="right">
            {isCurrentUser && (
              <Button
                basic
                content={editMode ? "Cancel" : "Edit Profile"}
                onClick={() => setEditMode(!editMode)}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {editMode ? (
              <ProfileEditForm setEditMode={setEditMode} />
            ) : (
              <span style={{ whiteSpace: "pre-wrap" }}>
                {profile?.bio || "No bio available."}
              </span>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);
