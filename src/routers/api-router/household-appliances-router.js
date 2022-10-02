const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/household-appliance-controller');

const householdAppliancesRouter = Router();

householdAppliancesRouter.get('/', fetchAll);

householdAppliancesRouter.get('/:id', fetch);

householdAppliancesRouter.post('/', create);

householdAppliancesRouter.put('/:id', replace);

householdAppliancesRouter.patch('/:id', update);

householdAppliancesRouter.delete('/:id', remove);

module.exports = householdAppliancesRouter;
