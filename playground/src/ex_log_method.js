/**
 * Method Decorator 함수에는 아래의 세 인자가 전달된다.
 * 1.target: 정적 멤버에 대한 클래스의 생성자 함수 또는 인스턴스 멤버에 대한 클래스의 프로토타입
 * 2.name: 멤버 이름
 * 3.descriptor: propertyDescriptor 객체
 * 
 * 반환 타입은 PropertyDescriptor 이다.
 * */
function log(target, name, descriptor) {
  const original = descriptor.value; // [Function: sum]

  if (typeof original === "function") {
    descriptor.value = function (...args) {
      console.log(`Arguments: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    };
  }
  return descriptor;
}

class Example {
  @log
  sum(a, b) {
    return a + b;
  }
}

export function execute() {
  const e = new Example();
  e.sum(1, 2);
  // Arguments: 1,2
  // Result: 3
}
