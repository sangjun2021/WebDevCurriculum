const loginResolver = async (_, { loginForm }, { controller }) => {
  try {
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
