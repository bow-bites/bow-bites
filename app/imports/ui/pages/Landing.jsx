import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
      <div className="bowbites-background-image" id="landing-page">
        <Grid container stackable centered columns={2} verticalAlign="middle" style={gridStyle}>

          <Grid.Column textAlign="center">
            <Icon name="utensils" size="huge" inverted/>
            <Header as="h1" inverted>Bow Bites</Header>
            <Header as="h3" inverted>Connecting the UH community to Campus Vendors to make finding good eats easy, quick, and accessible</Header>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Icon name="user" size="huge" inverted/>
            <Header as="h1" inverted>Become a User</Header>
            <Header as="h3" inverted>Become a user to like your favorite vendor picks, and sort through your liked vendors to find something good to eat!</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
