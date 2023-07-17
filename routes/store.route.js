const express = require('express');
const {Store, Menu} = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// <사장님> 음식 등록_POST
router.post('/ceo/addMenu', authMiddleware, async (req, res) => {
  const {userId} = res.locals.user;
  const {storeName, storeImage, totalRating} = req.body;

  const storeMenu = await Posts.create({
    userId: userId,
    storeName,
    storeImage,
    totalRating,
  });

  return res.status(201).json({data: storeMenu});
});

// <사장님> 음식 전체 조회_GET
router.get("/ceo/getMenu", async (req, res) => {
    try {
      const menus = await Menus.findAll({
        attributes: ["storeName", "storeImage", "totalRating"],
        // 내림차순 정렬
        order: [["createdAt", "DESC"]],
      });
  
      return res.status(200).json({ data: menus });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류" });
    }
  });

// <사장님> 음식 수정_PUT
router.put("/ceo/getMenu/:menuId", authMiddleware, async (req, res) => {
    const { menuId } = req.params;
    const { userId } = res.locals.user;
    const { storeName, storeImage, totalRating } = req.body;
  
    try {
      const menu = await Menus.findOne({
        where: { menuId },
      });
  
      if (!menu) {
        return res
          .status(404)
          .json({ errorMessage: "메뉴를 찾을 수 없습니다." });
      }
  
      if (menu.ceoId !== ceoId) {
        return res
          .status(403)
          .json({ errorMessage: "메뉴를 수정할 권한이 없습니다." });
      }
  
      await Menus.update(
        { storeName, storeImage, totalRating },
        {
          where: { menuId },
        }
      );
  
      return res.status(200).json({ message: "메뉴 수정을 완료하였습니다." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "메뉴 수정에 실패하였습니다." });
    }
  });

// <사장님> 음식 삭제_DELETE
router.delete("/ceo/deleteMenu/:menuId", authMiddleware, async (req, res) => {
    const { menuId } = req.params;
    const { userId } = res.locals.user;
  
    try {
      const menu = await Menus.findOne({
        where: { menuId },
      });
  
      if (!menu) {
        return res
          .status(404)
          .json({ errorMessage: "메뉴를 찾을 수 없습니다." });
      }
  
      if (menu.UserId !== userId) {
        return res
          .status(403)
          .json({ errorMessage: "메뉴를 삭제할 권한이 없습니다." });
      }
  
      await Menus.destroy({
        where: { menuId },
      });
  
      return res.status(200).json({ message: "메뉴 삭제를 완료하였습니다." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "메뉴 삭제에 실패하였습니다." });
    }
  });

module.exports = router;