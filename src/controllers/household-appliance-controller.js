const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const HouseholdApplianceModel = require('../models/household-appliance-model');

const createHouseholdApplianceNotFoundError = (householdApplianceId) => createNotFoundError(`HouseholdAppliance with id '${householdApplianceId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const householdApplianceDocuments = joinBy === 'categoryId'
      ? await HouseholdApplianceModel.find().populate('categoryId')
      : await HouseholdApplianceModel.find();

    res.status(200).json(householdApplianceDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const householdApplianceId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundHouseholdAppliance = joinBy === 'categoryId'
      ? await HouseholdApplianceModel.findById(householdApplianceId).populate('categoryId')
      : await HouseholdApplianceModel.findById(householdApplianceId);
    if (foundHouseholdAppliance === null) throw createHouseholdApplianceNotFoundError(householdApplianceId);

    res.status(200).json(foundHouseholdAppliance);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newHouseholdApplianceData = req.body;

  try {
    await HouseholdApplianceModel.validateData(newHouseholdApplianceData);

    const newHouseholdAppliance = await HouseholdApplianceModel.create(newHouseholdApplianceData)

    res.status(201).json(newHouseholdAppliance)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const householdApplianceId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseholdApplianceData = { title, description, categoryId, img, price };

  try {
    await HouseholdApplianceModel.validateData(newHouseholdApplianceData);

    const updatedHouseholdAppliance = await HouseholdApplianceModel.findByIdAndUpdate(
      householdApplianceId,
      newHouseholdApplianceData,
      { new: true, runValidators: true }
    );

    if (updatedHouseholdAppliance === null) throw createHouseholdApplianceNotFoundError(householdApplianceId);

    res.status(200).json(updatedHouseholdAppliance)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const householdApplianceId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseholdApplianceData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    await HouseholdApplianceModel.validateUpdateData(newHouseholdApplianceData);

    const updatedHouseholdAppliance = await HouseholdApplianceModel.findByIdAndUpdate(
      householdApplianceId,
      newHouseholdApplianceData,
      { new: true }
    );

    if (updatedHouseholdAppliance === null) throw createHouseholdApplianceNotFoundError(householdApplianceId);

    res.status(200).json(updatedHouseholdAppliance)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const householdApplianceId = req.params.id;

  try {
    const deletedHouseholdAppliance = await HouseholdApplianceModel.findByIdAndDelete(householdApplianceId);
    if (deletedHouseholdAppliance === null) createHouseholdApplianceNotFoundError(householdApplianceId);

    res.status(200).json(deletedHouseholdAppliance);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
