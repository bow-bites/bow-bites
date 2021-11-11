import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, ListField, TextField, LongTextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vendors } from '../../api/vendor/Vendor';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  foodType: String,
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
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddVendor extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, foodType, open, openAmOrPm, close, closeAmOrPm, menuItem, description } = data;
    const owner = Meteor.user().username;
    Vendors.collection.insert({ name, foodType, open, openAmOrPm, close, closeAmOrPm, menuItem, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vendor added successfully', 'success');
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
          <Header as="h2" textAlign="center">Add Vendor</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <TextField name='foodType'/>
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

export default AddVendor;
