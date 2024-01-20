import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Activities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item name="Errors" as={NavLink} to="/errors" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createactivity"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              {" "}
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="My profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
