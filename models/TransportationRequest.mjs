import mongoose from 'mongoose';

const TransportationRequestSchema = new mongoose.Schema({
  dateTimeOFCall: {
    type: Date,
  },
  callersName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  dateOfAppointment: {
    type: Date,
  },
  refferingProvider: {
    type: String,
  },
  reasonForAppointment: {
    type: String,
  },
  specialInsructions: {
    type: String,
  },
  caseManagerName: {
    type: Boolean,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

const TransportationRequestModel = mongoose.model(
  'transportation_request',
  TransportationRequestSchema
);

export default TransportationRequestModel;
