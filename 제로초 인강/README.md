### 1-2: 가로세로 법칙

- 구현 계획의 중요성
  - 코드를 만들기 전에 구조를 먼저 짜야 함.
  - 필요한 기능이 무엇인지도 구조를 통해 알 수 있음.
- 가로세로 법칙
  - 먼저 가로 수평선으로 구역을 자름
  - 세로로 나눌 수 있는 구역 확인
  - 처음에 전체 페이지를 html 태그 안에 가운데 정렬한다고 생각해도 무관
- 반응형
  - 페이지의 사이즈에 따라 레이아웃이 바뀌는 웹페이지

### 1-3 html 파일 만들기

- 필요한 도구
  - vscode 설치
  - 크롬 개발자 도구 (F12)
    - asset 찾을 때 좋음.
    - 소스코드도 볼 수 있으나 그대로 복붙하지는 않을 것
    - hover된 element의 정보를 확인할 수 있음.
- index.html
  - !+tab
  - lang은 ko로 변경
  - 인코딩은 UTF-8로 고정
    - 한글 깨짐 문제 방지
    - vscode에서도 인코딩이 utf-8로 설정되었는지 확인
- 파비콘
  - TITLE 옆에 나오는 이미지
- head vs body
  - head: 문서를 설명하는 것 (metadata; 데이터에 대한 데이터)
  - body: 문서에 들어갈 정보
- live server를 사용하면 더 편리하게 수정 사항 확인 가능
  - 파일 저장 시 자동으로 새로고침

### 1-4 asset 확인하기

- 파비콘 만들기
  - 개발자 도구를 사용하여 파비콘 불러오기
  - naver 서버에 필요한 파일 요청 → 필요한 asset을 모두 보내줌.
    - html, css, 이미지 등 웹페이지를 만들기 위한 모든 정보
  - https://www.naver.com/favicon.ico 등의 요청을 통해 불러올 수 있음.

### 1-5 block/inline-block/inline

- id
  - id는 중복되면 안됨.
  - html, css 상에서는 문제가 없을 수 있어도 js 상에서 문제 발생 가능
- header, search, navigator, 본문으로 가로 자르기
- block
  - div는 block 속성 → width가 100% 모두 차지하고 있음.
  - 이때 임의로 div 너비를 설정하면 나머지는 자동으로 margin 처리됨.
  - inline-block으로 변경하면 margin이 자동으로 처리되지 않음.
- inline은 width, height 모두 무시
  - width, height를 설정하고 싶으면 inline-block 사용

### 1-6 기본 css 설정 초기화

- css는 기본적으로 style을 설정해줌.
  - 모두 초기화하면 됨.
  - reset.css와 같은 global css 파일을 사용해도 됨.
- 이미지 스프라이트 다운로드 후 저장
- 자주 사용하는 component는 id를 설정할 때 위치 정보까지 같이 저장하면 좋음.
  - ex) header-hamburger

### 1-7 이미지 스프라이트

- 이미지 스프라이트
  - 여러 이미지가 들어갈 때 로딩 속도가 느려짐.
  - 특히 옛날 브라우저일수록 성능 저하가 심하여 하나의 이미지만 다운로드 받아도 되도록 처리
- 이미지 스프라이트 위치를 조절하여 원하는 아이콘만 보이도록 함.
- margin 잘못 쓰면 대참사날 수 있음.
  - 부모태그를 활용하여 padding으로 처리할 수 있음.

### 1-8 패딩과 마진

- 패딩과 마진의 차이
  - 마진은 아예 바깥 요소이므로 기능이 적용되지 않음.
  - 패딩은 기능을 적용함.
  - border를 기준으로 border까지 영역으로 취급
- 원하는 컴포넌트를 우클릭하면 상태에 따른 변화 확인 가능
- root에서 전체적인 색을 확인할 수 있음.
  - 옛날 브라우저는 적용하지 않을 수 있음.
  - 대비할 수 있는 색깔도 적용해야 함. (폰트와 유사)
- root란?
  - html은 트리 구조를 이룸.
  - 트리에서의 루트를 불러온다는 의미
  - 일반적으로 html 태그임.

### 1-9 position

- 기본적으로는 static
  - 이외 relative, absolute, float, fixed 등이 있음.
- relative
  - 자신의 자리에서 조금씩 이동 가능
  - static 기준으로 이동
- absolute
  - 기준점으로부터 떨어진 위치를 정할 수 있음.
    - left, right, top, bottom
  - 이때 기준점을 설정할 수 있음.
    - static이 아닌 컴포넌트가 기준점이 됨.
  - 이전 위치와 완전히 다른 위치로 배정하고 싶을 때 주로 사용
- fixed
  - 위치를 고정할 수 있음.
  - 스크롤 무시
- sticky
  - 초반에는 absolute
  - 스크롤을 내리다보면 fixed 처리
- relative, absolute 위주로 사용할 예정
- pseudo element
  - 실제로는 존재하지 않지만 디자인에서 주로 사용하는 가상의 상태
  - before, after가 대표적임.

### 1-10 z-index와 display none

- z-index
  - 가려지는 요소를 위로 올릴 때 사용
  - 서로 형제일 때만 적용됨.
  - position static이면 적용되지 않음.
- display none
  - 요소를 보여주지 않음.
  - 스크린리더에 읽히지 않는 문제
  - 스크린리더가 필요한 경우 따로 blind class를 생성하여 보이지 않도록 처리
  - 여러 사용자층이 사용할 수 있도록 하는 것 → 웹 사용성
    - 대기업일수록 잘 챙기는 경향이 있음.
    - 이외 색약 등의 여러 장애를 고려하여 개발할 필요가 있음.

### 1-11 css 코드 정리

- vscode → ctrl+d: 같은 요소 중복 선택 가능
- 강의 영상과 다른 사항
  - 강의 영상에서는 박스 사이즈가 달랐지만 현재 사이트는 박스 사이즈가 동일하여 따로 사이즈를 변경하지 않음.
  - 아이콘이 총 4개로 수정됨. (강의에서는 3개)
- border box를 사용하면 width를 설정하기 편함.
- 공통인 코드는 콤마를 사용하여 함께 저장하기
  - 공통된 것 밑에 특수하게 바꿔야하는 부분 작성
  - 우선순위에 의해 적용되지 않을 수 있으니 주의

### 1-12

- form
  - 값을 받아 결과페이지로 이동시키기 좋음.
- label
  - 폼 요소에 이름을 붙일 수 있음.
- css는 html에서 작업한 뒤 따로 css 파일로 옮기면 작업하기 편함.
  - body 안에 스타일 태그를 쓰면 성능 이슈가 있을 수 있음. (렌더링 문제)
- svg
  - 확대해도 깨지지 않는 이미지
- a
  - 링크로 이동할 수 있는 태그
  - #으로 설정하면 제일 상위 페이지로 이동
  - link와 a의 차이
    - 둘 다 외부 문서와 연결시켜 줌.
    - link를 사용하면 rel 속성을 사용하여 연결관계를 설정할 수 있음.
      - ex) <link rel=”stylesheet” href=”~” />
  - +) React에서의 Link
    - 브라우저의 주소만 바꾸고 페이지를 새로고침하지 않음.
    - a 태그는 브라우저 주소를 바꿔버림.
    - 컴포넌트 state를 조절하기 쉬워서 React Link를 더 많이 사용하는 편 (새로고침이 필요하지 않을 때)

### 2-1 inline-block 자동 마진 문제와 vertical-align

- inline-block 뒤에 엔터를 마진으로 인식하는 문제가 있음.
  - flex를 사용해서 처리할 수 있음.
- vertical-align
  - element의 세로 가운데 정렬이 아님.
  - svg의 텍스트 요소와 input의 텍스트 요소가 중앙에 오도록 배열됨.
  - 텍스트 기준 배열
- 검색 버튼이 이미지 스프라이트가 아님.
  - 강의와 달리 네이버 로고와 똑같은 코드로 수정
  - inline 문제로 버튼이 뒤로 밀리는 현상이 나타나나 다음 강의에서 flex로 수정할 예정

### 2-2 flex

- 정렬하고 싶은 대상들의 부모를 flex로 지정
- inline-flex: 100%를 차지하고 싶지 않은 경우 사용
- flex: 1
  - 늘어날 수 있는 최대 범위까지 늘어남.
  - 2 → 형제끼리 비율이 맞춰짐.
- flex에서는 다양한 정렬 기능을 제공함. → 자세한 기능은 구글링 or 개발자 도구 사용

### 2-3 css 파일 들여다보기

- 투명 이미지는 background 색을 사용하여 보이게 할 수 있음.
  - 현재 네이버 페이지는 svg 파일로 제공하고 있어 해당 내용 생략
- filter
  - 밝기 조절 등 다양한 필터효과 적용 가능
- bing ai 등을 사용하면 쉽게 검색할 수 있음.
- box shadow
  - 박스 아래에 그림자를 넣을 수 있음.

### 2-4 키워드

- 검색창 클릭 시 나타나는 세로 선 만들기
  - after를 사용하여 생성
  - 현재 세로 선 기능이 사라졌으나 구현하였음.
- focus-within
  - 자식 태그가 focus되면 활성화됨.
- AI에 검색하려면 키워드를 잘 알아둬야 함.
  - 평소에 모르는 키워드들이 나오면 공부해두기

### 2-5 리스트를 활용한 메뉴 생성

- 요소가 나열되어 있으면 리스트를 활용할 수 있음.
- li:nth-child(1)
  - 나열된 요소 중 n번째를 선택할 수 있음.
  - 타입 구분 X
- of-type
  - 타입 중에서 하나를 고르도록 제한함.
  - 서로 다른 타입이 섞여있을 때 사용하면 좋음.
- 순서의 영향을 받을 때 사용하기
  - 나중에 순서가 바뀌었을 때 문제가 발생할 것 같으면 사용 지양
- rem
  - html의 폰트사이즈에서 몇 배인지
  - html의 폰트만 바꾸면 전체 폰트를 바꿔줄 수 있음.
- 부모의 높이는 미리 지정할 필요 없음.

### 3-1 시멘틱 태그

- 자주 사용하는 부분은 시멘틱 태그로 나타낼 수 있음.
  - div를 너무 많이 사용하면 파악이 어렵기 때문
  - 광고는 aside, 섹션은 section 태그 사용
- 속성 선택자
  ```css
  /* <a> elements with a title attribute */
  a[title] {
    color: purple;
  }

  /* <a> elements with an href matching "https://example.org" */
  a[href="https://example.org"]
  {
    color: green;
  }

  /* <a> elements with an href containing "example" */
  a[href*="example"] {
    font-size: 2em;
  }

  /* <a> elements with an href ending ".org" */
  a[href$=".org"] {
    font-style: italic;
  }

  /* <a> elements whose class attribute contains the word "logo" */
  a[class~="logo"] {
    padding: 2px;
  }
  ```
