const express = require('express');
const { getShopStatistics,getRevenueAdmin } = require('../controllers/statisticsController');
const router = express.Router();


router
  .route('/shop-statsic')
  .get( getShopStatistics);


  router
  .route('/revenueAdmin')
  .get( getRevenueAdmin);

module.exports = router;
