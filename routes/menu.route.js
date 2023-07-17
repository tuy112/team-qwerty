const express = require('express');
const {Store, Menu} = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// <사장님> 주문 확인_GET
router.get("/ceo/getMenu", async (req, res) => {
    try {
      const menus = await Menus.findAll({
        attributes: ["storeName", "storeImage", "totalRating"],
        // 내림차순 정렬
        order: [["createdAt", "DESC"]],
      });
  
      return res.status(200).json({ data: orders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류" });
    }
  });

// <사장님> 배달 완료_GET
router.get("/ceo/getMenu", async (req, res) => {
    try {
      const menus = await Menus.findAll({
        attributes: ["storeName", "storeImage", "totalRating"],
        // 내림차순 정렬
        order: [["createdAt", "DESC"]],
      });
  
      return res.status(200).json({ message: "배달이 완료되었습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류" });
    }
  });