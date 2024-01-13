import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

const NavBar = ({ openForm }: Props) => {
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
            onClick={() => openForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
