import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, ListField, TextField, LongTextField, RadioField } from 'uniforms-semantic';
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
  foodType: String,
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
  submit(data, formRef) {
    const { name, foodType, storeImage, open, openAmOrPm, close, closeAmOrPm, menuItem, description } = data;
    const owner = Meteor.user().username;
    Vendors.collection.update({ name, foodType, storeImage, open, openAmOrPm, close, closeAmOrPm, menuItem, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vendor updated successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Vendor</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <TextField name='foodType'/>
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
  // Get access to Stuff documents.
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
