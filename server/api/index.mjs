import express from 'express';
import PatientModel from '../../models/Patient.mjs';

const router = express.Router();

router
  .route('/patient')
  .post((request, response) => {
    const patientList = PatientModel.find();
    const {
      firstName,
      lastName,
      ahcccsId,
      locationName,
      locationAdress,
      phoneNumber,
      prefferedDriver,
    } = request;
    if (
      !firstName ||
      !lastName ||
      !ahcccsId ||
      !locationName ||
      !locationAdress ||
      !phoneNumber ||
      !prefferedDriver
    ) {
      return response.render('dashboard', {
        user: request.user,
        error: 'Error with request',
        patientList,
      });
    } else {
      const isPresent = PatientModel.find({ ahcccsId });
      if (isPresent) {
        return response.render('dashboard', {
          user: request.user,
          error: 'Patient already in system',
          patientList,
        });
      } else {
        const newPatient = new PatientModel({
          firstName,
          lastName,
          ahcccsId,
          locationName,
          locationAdress,
          phoneNumber,
          prefferedDriver,
        });
        PatientModel.bulkSave(newPatient);
        const newPatientList = PatientModel.find();
        return response.render('dashboard', {
          user: request.user,
          patientList: newPatientList,
        });
      }
    }
  })
  .put((request, response) => {
    const patientList = PatientModel.find();
    return response.render('dashboard', {
      user: request.user,
      error: 'Error with request',
      patientList,
    });
  });

export default router;
