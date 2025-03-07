import {
  deleteContact,
  getAllContacts,
  getContactById,
  postContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const data = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: data,
  });
};

export const postContactController = async (req, res) => {
  const data = await postContact(req.body);
  console.log(req.body);

  res
    .status(201)
    .json({ status: 201, message: 'Successfully created a contact!', data });
};

export const putContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body, { upsert: true });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  const status = data.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Succesfully put a contact!',
    data: data.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Succesfully patch a contact!',
    data: data.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await deleteContact(contactId);

  if (!data) {
    throw next(createHttpError(404, 'Contact not found!'));
  }

  res.status(204).json();
};
