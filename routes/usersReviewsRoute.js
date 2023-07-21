// routes>reviews.routes.js

const express = require('express');
const router = express.Router();

// Middleware
const authMiddleware = require('../middlewares/cusAuthMiddleware.js');
const upload = require('../middlewares/upload-middleware.js');

// Model
const { Reviews } = require('../models/index.js');

const { Op } = require('sequelize');

// 리뷰 작성 API (POST)
router.post('/user/:storeId/review', authMiddleware, upload.single('image'), async (req, res) => {
  const { userId } = res.locals.user;
  const { storeId } = req.params;
  const { rating, content } = req.body;
  const imageUrl = req.file.location;

  try {
    if (!storeId) {
      return res.status(404).json({ message: '해당 음식점이 존재하지 않습니다.' });
    }
    if (!rating || !content) {
      return res.status(400).json({ message: '입력값이 유효하지 않습니다.' });
    }

    await Reviews.create({ userId, storeId, image: imageUrl, rating, content });
    return res.status(201).json({ message: '리뷰 작성에 성공하였습니다.' });
  } catch {
    return res.status(400).json({ message: '리뷰 작성에 실패였습니다.' });
  }
});

// 리뷰 조회 API (GET)
router.get('/user/:storeId/review', async (req, res) => {
  const { storeId } = req.params;

  try {
    if (!storeId) {
      return res.status(404).json({ message: '해당 음식점이 존재하지 않습니다.' });
    }

    const reviews = await Reviews.findAll({
      attributes: ['reviewId', 'storeId', 'email', 'image', 'rating', 'content', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ data: reviews });
  } catch {
    return res.status(400).json({ message: '리뷰 조회에 실패하였습니다.' });
  }
});

// 리뷰 수정 API (PUT)
router.put('/user/:storeId/review/:reviewId', authMiddleware, upload.single('image'), async (req, res) => {
  const { storeId, reviewId } = req.params;
  const { userId } = res.locals.user;
  const { image, rating, content } = req.body;
  const imageUrl = req.file.location;

  try {
    if (!storeId) {
      return res.status(404).json({ message: '해당 음식점이 존재하지 않습니다.' });
    }
    const review = await Reviews.findOne({ where: { reviewId } });
    if (!review) {
      return res.status(404).json({ message: '리뷰가 존재하지 않습니다.' });
    } else if (review.userId !== userId) {
      return res.status(403).json({ message: '리뷰 수정 권한이 존재하지 않습니다.' });
    }
    if (!content) {
      return res.status(400).json({ message: '입력값이 유효하지 않습니다.' });
    }

    await reviews.update(
      { image: imageUrl, rating, content },
      { where: { [Op.and]: [{ reviewId }, { userId }] } },
    );
    return res.status(200).json({ data: '리뷰 수정에 성공하였습니다.' });
  } catch {
    return res.status(400).json({ data: '댓글 수정에 실패하였습니다.' });
  }
});

// 리뷰 삭제 API (DELETE)
router.delete('/user/:storeId/review/:reviewId', authMiddleware, async (req, res) => {
  const { storeId, reviewId } = req.params;
  const { userId } = res.locals.user;

  try {
    if (!storeId) {
      return res.status(404).json({ message: '해당 음식점이 존재하지 않습니다.' });
    }
    const review = await Reviews.findOne({ where: { reviewId } });
    if (!review) {
      return res.status(404).json({ message: '리뷰가 존재하지 않습니다.' });
    } else if (review.userId !== userId) {
      return res.status(403).json({ message: '리뷰 삭제 권한이 존재하지 않습니다.' });
    }

    await Reviews.destroy({ where: { [Op.and]: [{ reviewId }, { userId }] } });
    return res.status(200).json({ data: '리뷰 삭제에 성공하였습니다.' });
  } catch {
    return res.status(400).json({ data: '리뷰 삭제에 실패하였습니다.' });
  }
});

module.exports = router;
