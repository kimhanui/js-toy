# Rxjs-flappy-bird

## 프로젝트 생성
예제 코드는 그냥 갖다 붙이면 바로 실행시킬 수 있을 줄 알았는데 아니었다^^; (ts, rxjs, webpack 설정 필요)

[1] 의존성 필요 (ts, rxjs, webpack, babel 관련)
```
npm install -D typescript ts-loader
npm install -D rxjs @reactivex/rxjs
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install -D @babel/core @babel/preset-env babel-loader
```
- 참고) node.js에서 ts사용하려면 `@types/node typescript ts-node` 를 설치해야되는데 여긴 필요 없다는 점이 다르다.


[2] 설정파일 추가

2-1) tsconfig.json 생성 후 `src`,`dist` 폴더 생성
```
$ yarn tsc --init --rootDir src --outDir ./dist --esModuleInterop --lib ES2015 --module commonjs
```
* --rootDir: src 하위에 ts파일들을 넣어야 됨.
* --outDir: 컴파일된 js파일들은 ./dist 하위에 생긴다는 뜻.
> --noImplicitAny: any라는 타입이 의도치않게 발생할 경우 에러를 띄워주는 설정. (제공된 코드에서 any를 명시 안 한 부분도 있어서 안 넣을 것임. 넣으면 컴파일에러 남. 넣으려면 `--noImplicitAny true`)

tsconfig.json 생성 후 수정
* `strict` 옵션 주석처리
* `lib` 옵션에 `'dom'` 추가 (`document` 등의 웹 요소를 사용하려면 필수)

2-2) webpack 설정파일 생성
> webpack.config.js 참고
- 중요한 점: **node.js 에서 `window, document`를 사용할 수 있게 된 이유는 webpack에 html관련 plugin을 추가한 덕분임.**


[3] package.json에 실행 스크립트 추가
```
"scripts": {
    "start": "webpack serve --open",
    "build": "webpack"
  }
```

## 프로젝트 실행
- npm 으로 실행
```
npm start  // live server 실행
또는
npm run build  // build 실행
```

- ~~tsc 또는 ts-node으로 실행~~ **-> webpack 설치 후 필요 없어짐**

tsc로 ts를 js로 컴파일 해 dist폴더 안에 생기게 함.
```
yarn tsc
```

ts-node 사용해보기
```
yarn ts-node ./src/index.ts
```

> 참고
>
>  `npm install --save-dev`와 `npm install {라이브러리명} -D`은 같은 명령어인데 둘 다 devDependencies에 의존성을 설치하게된다. 왜 dependencies가 아니라 devDependencies에 설치하는가?  
-> 배포할 때 개발환경에 따라 필요한 라이브러리를 구분하기 위함. 이로써 불필요한 라이브러리를 정리할 수 있음.

## 실행 오류
[1] `node ./dist/index.js` 실행시 `document` 못 찾는 오류
```
[오류]

const bird$ = (0, rxjs_1.merge)((0, rxjs_1.interval)(1000), (0, rxjs_1.fromEvent)(document, 'keydown')) // 1초마다 or keydown됐을 때
                                                                                  ^

ReferenceError: document is not defined
    at Object.<anonymous> (/Users/hnuikim-mn/Github/js-toy/rxjs-flappy-bird/dist/index.js:17:83)
```
-> webpack 설치 필요함.
* 원인: `node ./dist/index.js`는 해당 경로의 스크립트만 서버에 올리는 명령이고, **브라우저**에서 벗어났기 때문에 window 나 document를 찾지 못함. 애초에 `Node.js` = 브라우저 없이도 사용할 수 있는 JS실행기임! 
  <details>
  <summary>참고 문서</summary>
    
    - Node.js 개념 참고: [링크](https://velog.io/@dev-hoon/Node.js-Node-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4)
    
    - rxjs나 ts 설정의 문제가 아니라 js로 document를 쓰려해도 아래처럼 `document`를 못 찾는걸 볼 수 있음
    ![](../docs/%EB%AC%B4%EC%A0%9C%203.png)
  </details>
* 해결: webpack 설치, 설정 파일 추가, package.json 스크립트 수정 (위 `프로젝트 생성`, `프로젝트 실행` 방법도 업데이트 완료.)
  <details>
  <summary>참고 문서</summary>
    
    - `webpack`: js의 '모듈 기능'(Common.js, AMD, ES6에서 제공)을 모든 브라우저에서 지원하기 위한 모듈이다. webpack은 하나의 시작점(Entry point)으로부터 의존적인 모듈을 전부 찾아내서 하나의 파일로 만든다. 이 결과물을 Output이라고 한다.(이 내용은 `webpack.config.js` 파일을 보면 더 직관적으로 이해할 수 있다.)
    
    - 참고 설명: [링크](https://velog.io/@ssh1997/webpack-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
  </details>


## 참고
코드 출처: [출처](https://junwoo45.gitbook.io/learn-rxjs-korean/learn-rxjs/recipes/flappy-bird-game)  
프로젝트 실행: https://offbyone.tistory.com/445