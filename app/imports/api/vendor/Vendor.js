import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VendorsCollection. It encapsulates state and variable values for Vendor.
 */
class VendorsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      foodType: String,
      open: Number,
      openAmOrPm: {
        type: String,
        allowedValues: ['AM', 'PM'],
        defaultValue: 'AM',
      },
      close: Number,
      closeAmOrPm: {
        type: String,
        allowedValues: ['AM', 'PM'],
        defaultValue: 'PM',
      },
      menuItem: { type: Array, minCount: 1 },
      'menuItem.$': Object,
      'menuItem.$.name': { type: String },
      'menuItem.$.price': { type: Number, min: 0 },
      description: String,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the VendorsCollection.
 * @type {VendorsCollection}
 */
export const Vendors = new VendorsCollection();
