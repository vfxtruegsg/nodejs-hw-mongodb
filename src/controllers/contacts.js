import {
  deleteContact,
  getAllContacts,
  getContactById,
  postContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { sendFileToCloudinary } from '../utils/sendFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId, req.user.id);

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
  const photo = req.file;

  let photoLink;
  if (photo) {
    photoLink = await sendFileToCloudinary(photo);
  }

  const data = await postContact({
    ...req.body,
    userId: req.user.id,
    photo: photoLink,
  });

  res
    .status(201)
    .json({ status: 201, message: 'Successfully created a contact!', data });
};

export const putContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const photo = req.file;

  let photoLink;
  if (photo) {
    photoLink = await sendFileToCloudinary(photo);
  }

  const data = await updateContact(
    {
      id: contactId,
      userId: req.user.id,
    },
    { ...req.body, photo: photoLink },
    { upsert: true },
  );

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

  const photo = req.file;

  let photoLink;
  if (photo) {
    photoLink = await sendFileToCloudinary(photo);
  }

  const data = await updateContact(
    {
      id: contactId,
      userId: req.user.id,
    },
    { ...req.body, photo: photoLink },
  );

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

  const data = await deleteContact({
    id: contactId,
    userId: req.user.id,
  });

  if (!data) {
    throw next(createHttpError(404, 'Contact not found!'));
  }

  res.status(204).json();
};
