/**
 * Class decorator로 수행하는 모든 작업은 클래스 생성자를 대체하기 위해서 새로운 생성자 함수를 반환해야함 (아래처럼) 
 */
function log(Class) {
  return (...args) => {
    console.log(args);
    return new Class(...args);
  };
}

@log
class Example {
  constructor(name, age) {}
}

export function execute() {
    const e = new Example("Graham", 34);
    console.log(e); // [ 'Graham', 34 ]
}
