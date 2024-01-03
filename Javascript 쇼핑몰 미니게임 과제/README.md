### Introduction

- 챕터 1에서 할 것
  - html, css, js로 쇼핑몰 미니게임 만들기

### Let’s get started!

- 스스로 웹페이지 만들어보기
- json 파일 불러오는 게 잘 안 됨. 나머지는 다 구현

### HTML

- 기능을 컨테이너별로 나눠보기
- 구성
  - header
  - nav
    - 영상에서는 button 태그를 사용했으나 나는 ul li 사용 → 변경 안해도 eventListener 상에서는 상관 없을 듯. 일단 남겨두기
  ```jsx
  <button>
    <img />
  </button>
  ```
  - contents
    - ul li를 사용하여 배치했으나 나는 그냥 div 사용
    - ul li로 변경

### CSS

- 주로 flex 활용해서 정렬
- 크기 내용 변수화

### JSON

- 데이터는 애플리케이션 코드와 분리하는 것이 좋음.
- JSON을 사용하여 데이터 분리
  - {key: value} 방식으로 저장되어야 함.
  - json을 사용할 수 있도록 js와 연결시켜야 함.

### fetch

- promise를 사용하여 함수 처리

<aside>
📎 promise란?
- 자바스크립트는 기본적으로 동기임.
- 비동기 함수들은 어떻게 처리하지? →

1. 동기와 비동기

- 자바스크립트는 기본적으로 동기 언어
- 비동기 함수들은 Web APIs를 사용하여 처리함.
- 처리된 비동기 함수들은 callback을 사용하여 처리함. (Task queue, event loop 등의 개념은 생략, 대강 call back이 들어오는 순서대로 동기 처리 됨.)

1. Callback 함수란?

- 함수의 인자로 들어가는 함수
- 이때 비동기 처리에 사용되는 callback 함수를 비동기콜백이라고 함.

1. Callback 지옥

- callback을 계속 사용하면 가독성이 매우 떨어지게 됨.
- 콜백 안에 콜백 안에 콜백 …
- 유지 보수의 어려움. → callback 지옥

1. Promise

- 콜백함수의 가독성을 높여줌.
- then을 사용하여 callback 안에 callback을 넣지 않아도 작동할 수 있도록 함.
</aside>

### Display

- map
  - items에 있는 요소들을 하나씩 꺼내서 콜백함수에 따라 처리함.
  - 백틱을 사용하여 처리하면 더 쉽게 요소들을 만들 수 있음.
    - createElement를 계속 사용하지 않아도 됨.

### Filter

- filter
  - map과 마찬가지로 items에 있는 요소들을 하나씩 꺼내서 기준에 충족하는 것만 꺼내 새로운 객체를 생성함.
- null은 결과가 나오지 않도록 return 처리
