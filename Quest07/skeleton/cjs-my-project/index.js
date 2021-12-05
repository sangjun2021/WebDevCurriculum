// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
const { cjsUtilFunction, CjsUtilClass } = require("cjs-package");

console.log("cjsUtilFunction(hello) : ", cjsUtilFunction("hello cjs"));
const cjsTest = new CjsUtilClass(123);
console.log("cjsTest.double() : ", cjsTest.double());

const getEsModules = async () => {
  const { EsmUtilClass, esmUtilFunction } = await import("esm-package");
  console.log("esmUtilFunction(hello) : ", esmUtilFunction("hello esm"));
  const esmTest = new EsmUtilClass(421);
  console.log("esmTest.double() : ", esmTest.double());
};

getEsModules();
