import { Router } from 'express';
import {
  getAllContactsController,
  getContactsByIdController,
  patchContactController,
  postContactController,
  putContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(postContactController));

router.put('/contacts/:contactId', ctrlWrapper(putContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default router;
