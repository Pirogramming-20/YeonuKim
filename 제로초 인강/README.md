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
