import { Grid, Header } from "semantic-ui-react";

const PhotoUploadWidget = () => {
  return (
    <Grid>
      <Grid.Column width={4}>
        {" "}
        <Header sub color="teal" content="Step 1 - Add Photo" />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        {" "}
        <Header sub color="teal" content="Step 2 - Resize" />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        {" "}
        <Header sub color="teal" content="Step 3 - Preview & upload" />
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
