const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const householdApplianceSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const householdApplianceValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('HouseholdAppliance.title must be a string')
    .required('HouseholdAppliance.title is required'),
  description: yup
    .string().typeError('HouseholdAppliance.description must be a string')
    .required('HouseholdAppliance.description is required'),
  categoryId: yup
    .string().typeError('HouseholdAppliance.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'HouseholdAppliance.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('HouseholdAppliance.categoryId is required'),
  img: yup
    .string().typeError('HouseholdAppliance.img must be a string')
    .required('HouseholdAppliance.img is required'),
  price: yup
    .number().typeError('HouseholdAppliance.price must be a number')
    .required('HouseholdAppliance.price is required')
    .positive('HouseholdAppliance.price must be positive')
});

const householdApplianceUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('HouseholdAppliance.title must be a string'),
  description: yup.string().typeError('HouseholdAppliance.description must be a string'),
  categoryId: yup.string().typeError('HouseholdAppliance.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'HouseholdAppliance.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  img: yup.string().typeError('HouseholdAppliance.img must be a string'),
  price: yup.number()
    .typeError('HouseholdAppliance.price must be a number')
    .positive('HouseholdAppliance.price must be positive'),
});

householdApplianceSchema.statics.validateData = (householdApplianceData) => householdApplianceValidationSchema.validate(householdApplianceData)
householdApplianceSchema.statics.validateUpdateData = (householdApplianceData) => householdApplianceUpdateValidationSchema.validate(householdApplianceData)

const HouseholdApplianceModel = model('HouseholdAppliance', householdApplianceSchema);

module.exports = HouseholdApplianceModel;