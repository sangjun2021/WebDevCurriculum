const graphql = require("graphql");
const controller = require("../../controllers/index");

const loginResolver = async (_, { loginForm }) => {
  try {
    console.log("로그인 리졸버 실행");
    const { username, password } = loginForm;
    const userList = await controller.getUserPasswordList();
    const userInfo = userList[username];
    const result = await controller.validateKey(
      password,
      userInfo.salt,
      userInfo.password
    );
    if (!result) throw new Error();
    const token = controller.createToken(username);
    return { token };
  } catch (e) {
    console.log(e);
    return {
      error: true,
    };
  }
};

module.exports = loginResolver;
