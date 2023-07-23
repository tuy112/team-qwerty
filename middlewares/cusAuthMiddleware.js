// 고객 미들웨어

const jwt = require('jsonwebtoken');
const { Users } = require('../../코딩/NODE/6th Weeks/TeamQwerty/models');

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: 'Log-In 후 이용 가능한 기능입니다.',
    });
    return;
  }
  try {
    const { userId } = jwt.verify(authToken, 'customized-secret-key');
    const user = await Users.findOne({ where: { userId } });
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: '비정상적인 접근입니다.' });
  }
};
