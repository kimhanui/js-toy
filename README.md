js-toy

## JS만 실행시킬 프로젝트 생성
(개발환경: Node.js, Babel사용)

1. package.json 생성, babel 설치
```
$ npm init -y
$ npm install --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/preset-env
```
* package.json > "scripts"에 아래 실행명령어 추가
    ```
    "start": "babel-node index.js"
    ```

2. babel 설정파일 생성
```
{
    "presets": [
      "@babel/preset-env"
    ],
    "assumptions": {
      "setPublicClassFields": true
    },
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties"]
    ]
  }
```

## 프로젝트 실행
```
npm start
```

## 실행 오류
1. decorator 못 읽는 오류
```
@readonly
    ^

SyntaxError: Invalid or unexpected token
```
-> babel 설정 필요
* babel 설정방법: https://etch-cure.github.io/javascript/js-decorator/ , https://github.com/etch-cure/decorator_boilerplate/blob/main/package.json 참고 (위에)

2. HTML파일에서 rxjs라이브러리를 es6 import문으로 불러오지 못하는 오류
```
<script src="https://unpkg.com/rxjs@^7/dist/bundles/rxjs.umd.min.js"></script>
import {fromEvent} from 'rxjs'; // es6 import 문

const { fromEvent } = rxjs; // <-- CDN 사용할 경우 이걸로 써야됨
```
-> 두 번째 방식을 사용해야됨 (참고: https://rxjs.dev/guide/importing#v720-or-later)

## 참고 문서
- [Decorator.md](./docs/Decorator.md) - Decorator 적용 방법 정리 문서
- [Rxjs.md](./docs/Rxjs.md) - Rxjs 이해를 위한 문서
  - [Rxjs 사용예제](https://junwoo45.gitbook.io/learn-rxjs-korean/learn-rxjs/recipes/catch-the-dot-game) - 읽어 볼만 한 Rxjs operator를 골라볼 수 있음.