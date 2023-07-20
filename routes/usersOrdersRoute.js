const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

const { Orders, OrderMenus, Users, sequelize, Stores, Menus } = require('../models/index.js');
const { Op, Sequelize, Transaction, QueryTypes } = require('sequelize');




// 1. 고객 주문 생성 (POST)
router.post('/user/order', authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;

    // 아래와 같이 하지 말고 프론트에서 바디로 받아서
    // 로직 구현할것@!

    // const totalPrice = await sequelize.query(
    //   `
    //   SELECT o.orderId, SUM(om.price * om.quantity) AS totalPrice
    //   FROM Order o
    //   JOIN OrderMenus om ON o.orderId = om.orderId
    //   GROUP BY o.orderId;
    //   `,
    //   { type: QueryTypes.SELECT }
    // );

    // 트랜젝션
    const transaction = await Sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const user = await Users.findOne({ where: userId });
      if (user.point > totalPrice) {
        const afterpoint = user.point - totalPrice;
        await Users.update({ point: afterpoint }, { transaction });
        await Orders.create({ orderId, storeId, totalPrice, delivery, createdAt }, { transaction });
        // order가 생기고 orderMenus가 생겨야 한다.
        // menuId를 받을때 프론트엔드에서 받아서 for문으로 여러개 돌려라.
        await OrderMenus.create({ orderId, storeId, totalPrice, delivery, createdAt }, { transaction });
        await transaction.commit();
      }
    } catch (transactionError) {
      await transaction.rollback();
      throw new Error(transactionError);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }
});

// 2. 고객이 배달을 받았는지 여부 (POST)
router.post('/user/order/delivery', authMiddleware, async (req, res) => {
  const { delivery } = req.body;
  await Orders.update({ delivery });
});

// 3. 고객 주문조회
router.get('/user/order/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      res.status(404).json({ message: '주문정보가 조회되지 않습니다.' });
    }

    const post = await OrderMenus.findOne({
      raw: true,
      attributes: ['orderId', 'menuId', 'price', 'createdAt'],
      where: { orderId },
    });

    if (!post) {
      res.status(404).json({ message: '주문 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }
});

// 4. 고객 주문취소
router.delete('/user/order/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = res.locals.user;

    if (!orderId) {
      res.status(404).json({ message: '주문정보가 조회되지 않습니다.' });
    }

    const transaction = await Sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, //격리수준 설정
    });
    try {
      const user = await OrderMenus.destroy({ where: userId }, { transaction });
      const afterpoint = user.point + totalPrice;
      await Users.update({ point: afterpoint }, { transaction });
      await transaction.commit();
    } catch (transactionError) {
      await transaction.rollback();
      throw new Error(transactionError);
    }

    const order = await Orders.findOne({ where: { orderId } });
    if (!order) {
      res.status(404).json({ message: '주문정보가 존재하지 않습니다.' });
    }

    await Orders.destroy({
      where: { [Op.and]: [{ orderId }, { userId }] },
    });
    return res.status(200).json({ message: '주문 정보가 정상적으로 취소처리 되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '요청이 정상적으로 처리되지 않았습니다.' });
  }
});

module.exports = router;
