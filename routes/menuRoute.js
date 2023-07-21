const express = require('express');
const { Stores, Menus } = require('../models');
const authMiddleware = require('../middlewares/ceoAuthMiddleware');
const upload = require('../middlewares/ImgUploadMiddleware.js');
const router = express.Router();

// <사장님> 음식 등록_POST
router.post('/ceo/addMenu', authMiddleware, upload.single('image'), async (req, res) => {
    const { storeId } = res.locals.user;
    const { menuName, price } = req.body;
    const imageUrl = req.file.location;

    if (!storeId) {
        res.status(403).json({ errorMessage: '로그인 후 사용 가능합니다.' });
        return;
    }

    if (!menuName) {
        return res.status(400).json({ errorMessage: '메뉴 이름을 입력해주세요.' });
    }

    if (!price) {
        return res.status(400).json({ errorMessage: '메뉴의 가격을 입력해주세요.' });
    }

    try {
        const addMenu = await Menus.create({
            menuName,
            menuImage: imageUrl,
            price,
            storeId: storeId,
        });

        return res.status(201).json({ data: addMenu });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: '메뉴 등록 과정에 오류가 발생하였습니다.' });
    }
});

// <사장님> 음식 전체 조회_GET
router.get('/ceo/getMenuAll', async (req, res) => {
    try {
        const menus = await Menus.findAll({
            attributes: ['menuId', 'storeId', 'menuName', 'menuImage', 'price', 'createdAt'],

            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ data: menus });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: '메뉴 전제 조회 과정에 오류가 발생하였습니다.' });
    }
});



// <사장님> 음식 수정_PUT
router.put('/ceo/updateMenu/:menuId', authMiddleware, upload.single('image'), async (req, res) => {
    const { menuId } = req.params;
    const { storeId } = res.locals.user;
    const { menuName, price } = req.body;
    const imageUrl = req.file.location;

    try {
        const menu = await Menus.findOne({
            where: { menuId: menuId },
        });
        console.log(menu);

        if (menu.storeId !== storeId) {
            return res.status(403).json({ errorMessage: '메뉴를 수정할 권한이 없습니다.' });
        }

        if (!menu) {
            return res.status(404).json({ errorMessage: '메뉴를 찾을 수 없습니다.' });
        }

        await Menus.update({ menuName, menuImage: imageUrl, price }, { where: { menuId: menuId } });

        return res.status(200).json({ message: '메뉴 수정을 완료하였습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ errorMessage: '메뉴 수정 과정에 오류가 발생하였습니다.' });
    }
});

// <사장님> 음식 삭제_DELETE
router.delete('/ceo/deleteMenu/:menuId', authMiddleware, async (req, res) => {
    const { menuId } = req.params;
    const { storeId } = res.locals.user;

    try {
        const menu = await Menus.findOne({
            where: { menuId: menuId },
        });
        console.log(menu);

        if (menu.storeId !== storeId) {
            return res.status(403).json({ errorMessage: '메뉴를 삭제할 권한이 없습니다.' });
        }

        if (!menu) {
            return res.status(404).json({ errorMessage: '메뉴를 찾을 수 없습니다.' });
        }

        await Menus.destroy({ where: { menuId: menuId } });

        // ASIS
        // 객체 - 객체?
        // 가게 이름 / 제공하는 음식
        // 정호중 / 삼각김밥
        // 정호중 / 컵라면
        // 김지혜 / 제육볶음
        // 김재혁 / 카레라이스
        // 정호중 / 돈까스

        // TOBE
        // 객체 - 배열?
        // 정호중 - 삼각김밥, 컵라면, 제육
        // 김지혜 - 햄버거, 피자, 돈까스
        // 김재혁 - 피자, 제육, 카레

        // 설계 미스
        // 우리 지금은 그냥 넘어가고
        // 시말서 쓰는거로

        return res.status(200).json({ message: '메뉴 삭제를 완료하였습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: '메뉴 삭제에 실패하였습니다.' });
    }
});

module.exports = router;
