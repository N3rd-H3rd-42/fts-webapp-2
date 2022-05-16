import express from 'express';
import { patientController } from './patient.contoller.mjs';

const router = express.Router();

router
  .route('/patient')
  .post(patientController.createOne)
  .put(patientController.updateOne);

router.route('/patient/toggle-active').put(patientController.toggleActive);

export default router;
