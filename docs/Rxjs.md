# Rxjs 적용방법

RxJS 를 이용하여 이벤트를 다룰 때는 항상 아래와 같은 절차를 거치게 된다.

## 1 observable 정의
- 어떤 이벤트들을 하나의 observable 로 묶을 것인가
- 적절한 operator 를 이용하여 obserable 을 가공
## 2 observer 정의
- observable 로 부터 이벤트를 전달받으면 어떻게 처리할 지를 정의
## 3 observable 와 observer 를 연결
- observer 와 observable 을 연결한다(observable.subscribe())

참고문서: https://min9nim.vercel.app/2020-04-24-rxjs/


# Rxjs operator 이해하기

### 1. scan
scan연산을 하면서 `단 하나`의 상태 값을 계속 업데이트한다. 그 상태 값은 value가 될 수도, Object가 될 수도 있다.  
> 상태 값을 `여러개` 갖고 싶으면 어떻게하는지 모르겠음.(Object 쓰는건가?)

# Rxjs 객체들 이해하기

### Subject

Subject는 특별한 Observable타입이다. 그냥 Observable은 `unicast`라 1대1로만 통신한다. 즉, subscribe하는 observer가 하나뿐이다.
반면, Subject는 `multicast`는 subscribe하는 observer가 여러개다. (마치 EventEmitter가 여러 listener를 저장하고 관리하는 느낌이다.)

또한, Subject는 Observable이기도하고 Observer이기도 하다.
- Observable인 면: Subject에 subscribe할 수 있다.
- Observer인 면: Subject에 next 함수를 사용해 data를 feed할 수 있다.(문서에서 `feed`라는 용어를 썼다)
```js
import { Subject, from } from 'rxjs';

const subject = new Subject<number>(); // 아래 두 개의 Observer를 붙인다.(마치 listener를 관리하는 것처럼)

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

/* next로 data를 feed할 수도 있고 */
subject.next(1);
subject.next(2);
 
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2

/* Subject가 직접 다른 Observable에 구독해 데이터 스트림을 받아올 수도 있다. */
const observable = from([1, 2, 3]);
observable.subscribe(subject);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```


참고문서: [한국어 버전](https://junwoo45.gitbook.io/learn-rxjs-korean/learn-rxjs/subjects), [영어 버전](https://rxjs.dev/guide/subject)


### Subscription
Observer가 subscribe를 하면 Subscription객체를 리턴받는데 이 객체를 사용해 해당 구독을 취소할 수 있다.
(구독 취소 용도로만 쓰임)

```js
import {interval} from 'rxjs'

const observable = interval(1000)
const subscription = observable.subscribe(x => console.log(x))
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
subscription.unsubscribe()
```