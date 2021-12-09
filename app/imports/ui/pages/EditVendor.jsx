import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, ListField, TextField, LongTextField, RadioField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vendors } from '../../api/vendor/Vendor';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  owner: String,
  foodType: {
    type: String,
    defaultValue: 'Vegetarian',
    allowedValues: ['Vegetarian', 'Italian', 'French', 'Chinese', 'Japanese', 'Vietnamese', 'Fast', 'Mexican', 'American', 'Indian', 'Korean', 'Hawaiian', 'Filipino'],
  },
  storeImage: String,
  open: Number,
  openAmOrPm: {
    type: String,
    allowedValues: ['AM', 'PM'],
    uniforms: { checkboxes: true },
  },
  close: Number,
  closeAmOrPm: {
    type: String,
    allowedValues: ['AM', 'PM'],
    uniforms: { checkboxes: true },
  },
  menuItem: { type: Array, minCount: 1 },
  'menuItem.$': Object,
  'menuItem.$.name': { type: String },
  'menuItem.$.price': { type: Number, min: 0 },
  'menuItem.$.description': { type: String },
  'menuItem.$.image': { type: String },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class EditVendor extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { name, owner, location, foodType, storeImage, open, openAmOrPm, close, closeAmOrPm, menuItem, description, _id } = data;
    Vendors.collection.update(_id, { $set: { name, owner, foodType, location, storeImage, open, openAmOrPm, close, closeAmOrPm, menuItem, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Vendor updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Vendor</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='name'/>
              <TextField name='location'/>
              <TextField name='owner'/>
              <SelectField name='foodType'/>
              <TextField name='storeImage'/>
              <NumField name='open'/>
              <RadioField name='openAmOrPm'/>
              <NumField name='close'/>
              <RadioField name='closeAmOrPm'/>
              <ListField name='menuItem'/>
              <LongTextField name='description'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

EditVendor.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Vendor.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Vendors.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditVendor);
