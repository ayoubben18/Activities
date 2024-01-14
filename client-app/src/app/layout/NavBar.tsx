import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const { activityStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as="a" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Activities
        </Menu.Item>
        <Menu.Item name="activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => activityStore.openForm("")}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
