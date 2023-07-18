const express = require("express");
const jwt = require("jsonwebtoken");
const { DBStores } = require("../models");
const router = express.Router();

// 내 분담 역할
// store table

// 연관된 테이블, order(다대일, 담당 상우님),
// menu(일대다, 담당 지혜님), review(일대다, 담당 재용님)

// DB store table에 등록된 컬럼
// storeId, email, password, storeName, storeImage, totalRating, createdAt

// 1. 사장님 회원 가입 API
router.post("/ceo/signup", async (req, res) => {
  // email, password, confirm, storeName, storeImage
  const { email, password, confirm, storeName, storeImage } = req.body;

  const validEmailCheck = (string) => {
    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/;
    return pattern.test(string);
  };

  if (!validEmailCheck(email) || email.length < 3) {
    return res
      .status(400)
      .json({ errorMessage: "이메일의 형식이 올바르지 않습니다." });
  }

  if (!password || password < 4) {
    return res
      .status(412)
      .json({ errorMessage: "패스워드는 4자이상이어야 합니다." });
  }

  if (password !== confirm) {
    return res.status(412).json({
      errorMessage:
        "패스워드가 일치하지 않습니다. 패스워드 재입력은 confirm 입니다.",
    });
  }

  const isExistUser = await DBStores.findOne({ where: { email: email } });
  if (isExistUser) {
    return res
      .status(412)
      .json({ errorMessage: "이미 존재하는 이메일입니다." });
  }

  try {
    await DBStores.create({ email, password, storeName, storeImage });
    return res.status(201).json({ message: "가게가 등록되었습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "가게 등록 과정에서 오류가 발생하였습니다." });
  }
});

// 2. 사장님 로그인 API
router.post("/ceo/login", async (req, res) => {
  const { email, password } = req.body;
  const ceoCheck = await DBStores.findOne({
    where: { email: email },
  });

  if (!ceoCheck) {
    return res
      .status(401)
      .json({ errorMessage: "해당하는 사용자가 존재하지 않습니다." });
  } else if (ceoCheck.password !== password) {
    return res
      .status(401)
      .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
  }

  try {
    // JWT 생성
    const token = jwt.sign(
      {
        userId: ceoCheck.userId,
      },
      "customized_secret_key"
      // 필요 시 수정
    );

    // 2. 쿠키 발급
    res.cookie("authorization", `Bearer ${token}`);

    // 3. response
    return res.status(200).json({ message: "사장님 환영합니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "사장님 로그인 과정에 오류가 발생하였습니다." });
  }
});

// 3. 가게 정보 조회 API
router.get("storeInfo/:storeId", async (req, res) => {
  const storeInfo = await DBStores.findOne({
    where: { storeId: storeId },
    attributes: [
      "storeName",
      "storeImage",
      "totalRating",
      "createdAt",
      "updatedAt",
    ],
  });

  return res.status(200).json({ data: storeInfo });
});

// 4. 가입한 사장님 목록 조회 API. 개발용. 개발 완료시 삭제할 것
router.get("/ceo/list", ceo - middleware, async (req, res) => {
  const ceoList = await DBStores.findAll({
    attributes: ["email", "password", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({ data: ceoList });
});

// 5. 사장님 가게 정보 수정 API. 개발용. 개발 완료시 삭제할 것
// 가게 이름이나, 가게 사진
router.put("/ceo/:storeId", async (req, res) => {
  const { storeId } = req.params;
  const { storeName, storeImage } = req.body;

  const ceoIdToUpdate = await DBStores.findOne({
    where: { storeId: storeId },
  });

  if (!ceoIdToUpdate) {
    return res.status(404).json({ message: "storeId를 다시 확인해주세요." });
  }

  // storeName과 storeImage를 받는 부분

  try {
    // 적용하는 부분
    return res.status(200).json({ message: "가게 정보가 수정되었습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errorMessage: "가게 정보를 수정하는 과정에 오류가 발생하였습니다.",
    });
  }
});

// 6. 사장님 회원 탈퇴 API. 개발용. 개발 완료시 삭제할 것
router.delete("/ceo/:storeId", async (req, res) => {
  const { storeId } = req.params;

  const ceoIdToDelete = await DBStores.findOne({
    where: { storeId: storeId },
  });

  if (!ceoIdToDelete) {
    return res.status(404).json({ message: "storeId를 다시 확인해주세요." });
  }

  try {
    await ceoIdToDelete.destroy();
    return res.status(200).json({ message: "사장님 계정이 삭제되었습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errorMessage: "사장님 계정을 삭제하는 과정에 오류가 발생하였습니다.",
    });
  }
});

module.exports = router;
