import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavoutire: {
      type: Boolean,
      default: false,
    },

    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: ['work', 'home', 'personal'],
    },
  },
  { timestamps: true },
);

export const ContactCollection = model('contacts', contactSchema);
