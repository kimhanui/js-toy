import { Observable } from "rxjs";
/**
 * [Note]
 * 위에서 정의된 observable 은 observer 에게 연속으로 1,2,3 을 푸시하고 1초 후 4를 푸시하고 마치는 간단한 observable 이다.
 * 이 observable 에 observer 가 등록되면(observer 가 observable 을 구독하면) observer 는 연속으로 1,2,3 을 전달 받고 1초 후 4를 전달받고 끝이 난다.
 */
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => { // Observable은 이벤트를 비동기로 발생시킬 수 있다.
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

export function executeRxjs() {
  console.log("just before subscribe");

  // subscribe하는 순간 이벤트 흐름이 시작된다. setTimeout은 비동기로 동작해서 subscribe가 끝난 뒤에 문구 출력되는걸 알 수 있다.
  observable.subscribe({
    next(x) {
      console.log("got value " + x);
    },
    error(err) {
      console.error("something wrong occurred: " + err);
    },
    complete() {
      console.log("done");
    },
  });

  console.log("just after subscribe");
}
