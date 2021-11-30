import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import AnythingContent from './AnythingContent';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Anything extends React.Component {

  render() {
    return (
      <Popup
        trigger={
          <Button color='green' icon='quidditch' id="listVendor-Delete" content="Anything"/>
        }
        content={<AnythingContent/>}
        on='click'
        position='top right'
      />
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Anything);
