// routes>users.routes.js

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Middleware
const authMiddleware = require('../middlewares/cusAuthMiddleware.js');

// JWT
const jwt = require('jsonwebtoken');
// Model

const { Users, Menus, Stores } = require('../models/index.js');

const { Op } = require('sequelize');

// 회원가입 API (POST)
router.post('/user/signup', async (req, res) => {
  console.log('Hello, Server!');
  console.log('req.body =>', req.body);
  
  const { email, verifyNumberInput, password, passwordConfirm } = req.body;

  try {
    const existUserEmail = await Users.findOne({ where: { email } });
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
    const hashedPassword = await bcrypt.hash(password, 10);

    emailVerifyHandler = () => {
      try {
        const verifyNumber = emailSender.sendGmail(email);
        res.status(200).json({ message: '전송 성공' });
        return verifyNumber;
      } catch {
        res.status(400).json({ message: '전송 실패' });
      }
    };

    if (!email || !verifyNumberInput || !password || !passwordConfirm) {
      return res.status(400).json({ message: '입력값이 유효하지 않습니다.' });
    }
    if (verifyNumberInput != verifyNumber) {
      return res.status(412).json({ message: '인증번호가 일치하지 않습니다.' });
    }
    if (existUserEmail) {
      return res.status(412).json({ message: '중복된 email입니다.' });
    }
    if (!password || password.length < 4 || !passwordCheck.test(password)) {
      return res.status(412).json({ message: '비밀번호 형식이 올바르지 않습니다.' });
    }
    if (password !== passwordConfirm) {
      return res.status(412).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    await Users.create({ email, password: hashedPassword, point });
    return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
  } catch {
    return res.status(400).json({ message: '사용자 계정 생성에 실패하였습니다.' });
  }
});

// log-in API (POST)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const existUser = await Users.findOne({ where: { email } });

  // // const passwordMatch = await bcrypt.compare(password, existUser.password);
  // // console.log(passwordMatch)
  
  try{
  if(!req.body) {
    return res.status(404).json({ message: "입력값이 존재하지 않습니다." })
  }

  if (!existUser) {  //!passwordMatch
  return res.status(412).json({ message: 'email 또는 비밀번호를 확인해주세요.' });
  }

  // JWT 생성
  const token = jwt.sign({ userId: existUser.userId }, 'customized_secret_key');

  // Cookie 발급
  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: 'log-in 되었습니다.' });

}catch(error){
  console.log(error);
  return res.status(400).json({ message: 'log-in에 실패하였습니다.' });
}
});

// log-out API (POST)
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    res.clearCookie('authorization');
    return res.status(200).json({message: 'log-out 되었습니다.'});
  } catch {
    return res.status(400).json({message: 'log-out에 실패하였습니다.'});
  }
});


// 음식점 조회 API (GET)
router.get('/user/stores', async (req, res) => {
  try {
    const stores = await Stores.findAll({
      attributes: ['storeId', 'storeImage', 'storeName', 'totalRating'],
      order: [['totalRating', 'DESC']],
    });
    return res.status(200).json(stores);
  } catch {
    return res.status(400).json({ message: '음식점 조회에 실패하였습니다.' });
  }
});

  
// 고객 메뉴조회 API (GET)
router.get('/user/:storeId/getMenuAll', async (req, res) => {
  const {storeId} = req.params;
  try{
  if(!storeId) {
    res.status(404).json({message:'음식점 조회에 실패하였습니다.'})
  }
  const menus = await Menus.findAll({
    attributes: ['menuId','StoreId', 'menuName',"menuImage", 'price', 'createdAt'],
    order: [['createdAt', 'DESC']],
  });

  const result = menus.map((item) => {
    return {
      menuId: item.menuId,
      StoreId: item.StoreId,
      menuName: item.menuName,
      menuImage: item.menuImage,
      price: item.price,
      createdAt: item.createdAt,
    }
  });
  res.status(200).json({menus: result})
  }catch(error){
    console.log(error);
    res.status(400).json({message: "요청을 정상적으로 받아들이지 못했습니다."})
  }
})


// e-mail 인증 API (POST)
router.post('/user/signup/email', async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: 'electruc0095@gmail.com',
        pass: 'yfjlkxwnfxkjxmed',
      },
    });

    const min = 100000;
    const max = 999999;
    const verifyNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Session에 verifyNumber 저장
    req.session.verifyNumber = verifyNumber;

    transporter.sendMail({
      from: '쿼티의 민족',
      to: email,
      subject: '[쿼티의 민족] 반갑습니다! 인증번호를 보내드립니다.',
      text: `우측의 6자리 인증번호를 '인증번호 입력란'에 입력해주세요! => ${verifyNumber}`,
    });
    return res.status(200).json({ message: '전송 성공' });
  } catch {
    return res.status(400).json({ message: '전송 실패' });
  }
});

// 사용자 정보 조회 API (GET)
router.get('/users/:userId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;

  try {
    const user = await Users.findOne({
      attributes: ['userId', 'email', 'point', 'createdAt', 'updatedAt'],
      where: { userId },
    });
    return res.status(200).json({ data: user });
  } catch {
    return res.status(400).json({ message: '사용자 정보 조회에 실패하였습니다.' });
  }
});

// 사용자 정보 수정 API (PUT)
router.put('/users/:userId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { password, newPassword, newPasswordConfirm } = req.body;

  try {
    const existUser = await Users.findOne({ where: { userId } });
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
    const passwordMatch = await bcrypt.compare(password, existUser.password);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    if (!password) {
      return res.status(400).json({ message: '입력값이 유효하지 않습니다.' });
    }
    if (!passwordMatch) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
    if (newPassword !== newPasswordConfirm) {
      return res.status(412).json({ message: '변경된 비밀번호가 일치하지 않습니다.' });
    }
    if (!newPassword || newPassword.length < 4 || !passwordCheck.test(newPassword)) {
      return res.status(412).json({ message: '변경된 비밀번호 형식이 올바르지 않습니다.' });
    }

    await users.update({ password: hashedNewPassword }, { where: { userId } });
    return res.status(200).json({ message: '사용자 정보 수정에 성공하였습니다.' });
  } catch {
    return res.status(400).json({ message: '사용자 정보 수정에 실패하였습니다.' });
  }
});

// 회원탈퇴 API (DELETE)
router.delete('/users/:userId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { email, password } = req.body;

  try {
    const existUser = await Users.findOne({ where: { userId } });
    const passwordMatch = await bcrypt.compare(password, existUser.password);

    if (!email || !password) {
      return res.status(400).json({ message: '입력값이 유효하지 않습니다.' });
    }
    if (email !== existUser.email || !passwordMatch) {
      return res.status(412).json({ message: 'email 또는 비밀번호를 확인해주세요.' });
    }

    await Users.destroy({
      where: { [Op.and]: [{ userId }, { email: existUser.email }] },
    });
    return res.status(200).json({ message: '사용자 정보 삭제에 성공하였습니다.' });
  } catch {
    return res.status(400).json({ message: '사용자 정보 조회에 실패하였습니다.' });
  }
});

module.exports = router;
