# Rxjs-flappy-bird

## 프로젝트 생성
예제 코드는 그냥 갖다 붙이면 바로 실행시킬 수 있을 줄 알았는데 아니었다^^;  

[1] 의존성 필요 (ts, rxjs 관련)
```
yarn add @types/node
yarn add typescript
yarn add -D ts-node
yarn add rxjs @reactivex/rxjs
```

[2] typescript 프로젝트 구조 생성

tsconfig.json 생성 후 `src`,`bin` 폴더 생성
```
$ yarn tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2015 --module commonjs
```
* --rootDir: src 하위에 ts파일들을 넣어야 됨.
* --outDir: 컴파일된 js파일들은 ./bin 하위에 생긴다는 뜻.
> --noImplicitAny: any라는 타입이 의도치않게 발생할 경우 에러를 띄워주는 설정. (제공된 코드에서 any를 명시 안 한 부분도 있어서 안 넣을 것임. 넣으면 컴파일에러 남. 넣으려면 `--noImplicitAny true`)

tsconfig.json 생성 후 수정
* `strict` 옵션 주석처리
* `lib` 옵션에 `'dom'` 추가 (`document` 등의 웹 요소를 사용하려면 필수)

[3] package.json에 실행 스크립트 추가
```
"scripts": {
  "build": "tsc",
  "start": "node ./bin/index.js",
  "run": "ts-node ./src/index.ts"
},
```

## 프로젝트 실행
- yarn으로 실행
```
yarn build
yarn start
```

- tsc 또는 ts-node으로 실행

tsc로 ts를 js로 컴파일 해 bin폴더 안에 생기게 함.
```
yarn tsc
```

ts-node 사용해보기
```
yarn ts-node index.ts
```

> 참고
>
>  `npm install --save-dev`와 `npm install {라이브러리명} -D`은 같은 명령어인데 둘 다 devDependencies에 의존성을 설치하게된다. 왜 dependencies가 아니라 devDependencies에 설치하는가?  
-> 배포할 때 개발환경에 따라 필요한 라이브러리를 구분하기 위함. 이로써 불필요한 라이브러리를 정리할 수 있음.

## 실행 오류
[1] node index.js 실행시 `document` 못 찾는 오류
```
[오류]

const bird$ = (0, rxjs_1.merge)((0, rxjs_1.interval)(1000), (0, rxjs_1.fromEvent)(document, 'keydown')) // 1초마다 or keydown됐을 때
                                                                                  ^

ReferenceError: document is not defined
    at Object.<anonymous> (/Users/hnuikim-mn/Github/js-toy/rxjs-flappy-bird/bin/index.js:17:83)
```
-> webpack 설치 필요함.
* 원인: `node ./bin/index.js`는 해당 경로의 스크립트만 서버에 올리는 명령이고, **브라우저**에서 벗어났기 때문에 window 나 document를 찾지 못함. 애초에 `Node` = 브라우저 없이도 사용할 수 있는 JS실행기임! 
  <details>
  <summary>참고 문서</summary>
    > - Node.js 개념 참고: [링크](https://velog.io/@dev-hoon/Node.js-Node-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4)
    > - rxjs나 ts 설정의 문제가 아니라 js로 document를 쓰려해도 아래처럼 `document`를 못 찾는걸 볼 수 있음
    ![](../docs/%EB%AC%B4%EC%A0%9C%203.png)
  </details>
* 해결: webpack 설치
  <details>
  <summary>참고 문서</summary>
    > - 
  </details>


## 참고
코드 출처: [출처](https://junwoo45.gitbook.io/learn-rxjs-korean/learn-rxjs/recipes/flappy-bird-game)  
프로젝트 실행: https://offbyone.tistory.com/445