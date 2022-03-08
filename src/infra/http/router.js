const { Router } = require('express');
const {
  pushDataController,
  updateDataController,
  getDataController,
  deleteDataController,
  clearAllDataController,
  deleteExpiredDataController,
} = require('../../modules/data-web/data-web.module');

const router = Router();

const handler = (cb) => {
  return async (req, res, next) => {
    try {
      const result = await cb({ body: req.body, params: req.params });
      let statusCode = 200;

      switch (req.method) {
        case 'POST':
          statusCode = 201;
          break;
        default:
          statusCode = 200;
      }

      res.status(statusCode).send(result);
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/push',
  handler(({ body }) => pushDataController.push(body)),
);

router.post(
  '/update',
  handler(({ body }) => updateDataController.update(body)),
);

router.get(
  '/:shareCode',
  handler(({ params }) => getDataController.getData(params)),
);

router.post(
  '/delete',
  handler(({ body }) => deleteDataController.delete(body)),
);

router.post(
  '/clear',
  handler(({ body }) => clearAllDataController.clearAll(body)),
);

router.post(
  '/cron',
  handler(() => deleteExpiredDataController.deleteExpired()),
);

const apiDataRouter = Router();
apiDataRouter.use('/api/data', router);

module.exports = { apiDataRouter, Router };
