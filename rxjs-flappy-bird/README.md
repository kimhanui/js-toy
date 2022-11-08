# Rxjs-flappy-bird

## 프로젝트 생성
예제 코드는 그냥 갖다 붙이면 바로 실행시킬 수 있을 줄 알았는데 아니었다^^;  

[1] 의존성 필요 (ts, rxjs 관련)
```
yarn add @types/node
yarn add typescript
yarn add -D ts-node
yarn add rxjs
```

[2] typescript 프로젝트 구조 생성

tsconfig.json 생성 후 `src`,`bin` 폴더 생성
```
$ yarn tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2015 --module commonjs
```
* --rootDir: src 하위에 ts파일들을 넣어야 됨.
* --outDir: 컴파일된 js파일들은 ./bin 하위에 생긴다는 뜻.
* --noImplicitAny: any라는 타입이 의도치않게 발생할 경우 에러를 띄워주는 설정 (제공된 코드는 any를 명시 안 하기도해서 안 넣을 것임. 넣으려면 `--noImplicitAny true`)
* 명령어로 tsconfig.json 생성 후 `strict` 옵션도 주석처리함

[3] package.json에 실행 스크립트 추가
```
"scripts": {
  "build": "tsc",
  "start": "node ./bin/index.js",
  "run": "ts-node ./src/index.ts"
},
```

## 프로젝트 실행

```
yarn build
yarn start
```
## 프로젝트 실행(by tsc 또는 ts-node)
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


## 참고
코드 출처: [출처](https://junwoo45.gitbook.io/learn-rxjs-korean/learn-rxjs/recipes/flappy-bird-game)
