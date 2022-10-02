const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const householdAppliancesRouter = require('./household-appliances-router');
const usersRouter = require('./users-router');
const cartItemsRouter = require('./cart-items-router');

const apiRouter = Router();

apiRouter.use('/householdAppliances', householdAppliancesRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cart-items', cartItemsRouter);

module.exports = apiRouter;
