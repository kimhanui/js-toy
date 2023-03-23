# Reference

## [1. submit_popup_animated](./1_submit_popup_animated/)
자료: [youtube](https://www.youtube.com/watch?v=AobDmYWOY34)

### 콘텐츠를 가운데 정렬
```html
display: flex;
justify-content: center; //수평 정렬
align-items: center; //수직 정렬
```

### px, em, rem, vh, vw단위들의 차이점

절대 길이 단위.
- px: 절대 길이 단위. 픽셀 단위. 

상대 길이 단위. (글꼴 크기)
- em: 글꼴의 크기를 나타냄. 상위 요소의 글꼴크기에 비례한다.
- rem: 똑같이 글꼴의 크기를 나타냄. 상위 요소가 아닌 root(html요소)가 되는 요소의 크기에 비례한다.

상대 길이 단위. (요소 크기)  
반응형 웹을 만든다고 했을 때 `%`단위만 사용하는 건 한계가 있다. 이때 vw, vh가 쓰인다.  
vw, vh는 viewport 크기의 1/100 단위임. (ex. 브라우저 창 높이가 700px일 때 1vh=7px)
- vw: vertical height의 약자.
- vh: vertical width의 약자.

## [2. tooltip](./2_tooltip/)
자료: [youtube](https://www.youtube.com/watch?v=qdiUrCnuCjI&t)

### box-sizing
`box-sizing: content-box | border-box | initial | inherit`
content-box : 콘텐트 영역을 기준으로 크기를 정한다.
border-box : 테두리를 기준으로 크기를 정한다.(테두리포함)
initial : 기본값으로 설정한다.
inherit : 부모 요소의 속성값을 상속받는다.

### ::before
`::before` 은 선택한 요소의 첫 자식으로 의사요소(?)를 하나 생성함. 보통 `content` 속성과 함께쓰는데, 요소에 장식용 콘텍츠를 추가할 때 사용한다.
> 의사요소(가상요소): 선택자에 추가하는 키워드. 선택한 요소의 일부분에만 스타일을 입할 수 있음.  
> ex. `::first-line` 을 사용하면 문단 첫 줄의 글씨체만 바꿀 수 있음.
> ```css
> /* The first line of every <p> element. */
> p::first-line {
>   color: blue;
>   text-transform: uppercase;
> }
> ```

### 말풍선 뾰족한 부분 만들기
```css
border: 15px solid;
border-color: #000 #0000 #0000 #0000; /* 이걸로 말풍선 뾰족한 모양을 만듦. (rgba의 a(opacity) 속성 이용한 형태)*/
```
> opacity: 16진수로 표현.(0~F로 표현)