// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
import { EsmUtilClass, esmUtilFunction } from "esm-package";
import { cjsUtilFunction, CjsUtilClass } from "cjs-package";

console.log("esmUtilFunction(hello) : ", esmUtilFunction("hello esm"));
const esmTest = new EsmUtilClass(421);
console.log("esmTest.double() : ", esmTest.double());

console.log("cjsUtilFunction(hello) : ", cjsUtilFunction("hello cjs"));
const cjsTest = new CjsUtilClass(123);
console.log("cjsTest.double() : ", cjsTest.double());
