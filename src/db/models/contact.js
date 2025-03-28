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

    isFavourite: {
      type: Boolean,
      default: false,
    },

    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: ['work', 'home', 'personal'],
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    photo: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactCollection = model('contacts', contactSchema);
