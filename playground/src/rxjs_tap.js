// RxJS v6+
import { of } from "rxjs";
import { tap, map } from "rxjs/operators";

const source = of(1, 2, 3, 4, 5);
// 'tap'을 사용하여 소스로부터 로그 값을 찍습니다.
const example = source.pipe(
  tap((val) => console.log(`BEFORE MAP: ${val}`)),
  map((val) => val + 10),
  tap((val) => console.log(`AFTER MAP: ${val}`))
);


export function execute() {
  //'tap'은 값을 바꾸지 않습니다.
  //결과: 11...12...13...14...15
  const subscribe = example.subscribe((val) => console.log(val));
}

