const UserModel = require('../models/user-model');
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findHouseholdAppliance = (cartItems, id) => cartItems.find((item) => item.householdApplianceId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems)
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundHouseholdAppliance = findHouseholdAppliance(req.authUser.cartItems, data.householdApplianceId);
    if (foundHouseholdAppliance) throw createBadDataError('HouseholdAppliance already exist in cart');

    const newCartItem = {
      householdApplianceId: data.householdApplianceId,
      amount: data.amount,
    }

    req.authUser.cartItems.push(newCartItem);

    await req.authUser.save()

    res.status(200).json(newCartItem)
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const update = async (req, res) => {
  const data = {
    householdApplianceId: req.params.id,
    amount: req.body.amount,
  }

  try {
    await UserModel.validateCartItem(data);

    const foundHouseholdAppliance = findHouseholdAppliance(req.authUser.cartItems, data.householdApplianceId);
    if (!foundHouseholdAppliance) throw createNotFoundError('HouseholdAppliance does not exist in cart');

    foundHouseholdAppliance.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(foundHouseholdAppliance)
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const householdApplianceId = req.params.id;

  try {
    const foundHouseholdAppliance = findHouseholdAppliance(req.authUser.cartItems, householdApplianceId);
    if (!foundHouseholdAppliance) throw createNotFoundError('HouseholdAppliance does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.householdApplianceId.toString() !== householdApplianceId);

    await req.authUser.save();

    res.status(200).json(foundHouseholdAppliance);
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

module.exports = {
  fetchAll,
  create,
  update,
  remove,
};
