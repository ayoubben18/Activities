import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import HomePage from "../../features/home/HomePage";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};

export default observer(App);
