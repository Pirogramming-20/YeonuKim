## 참고 및 출처

- 홈페이지 링크 참고하여 제작
  - https://github-landing-page.netlify.app/#
  - 필요한 asset은 모두 해당 사이트에서 수집 (화살표 제외)
- 구하지 못한 이미지는 외부 사이트에서 수집
  - 아래 방향 화살표(global/img/down_chevron.png) → flaticon에서 다운로드
  - https://www.flaticon.com/search?word=arrow

## 추가 구현 내용

- Nav bar Sign in, Sign up 클릭 가능 (a 태그 사용)
- 메인페이지 오른쪽 input 클릭 시 input 주변에 파란색 box shadow 배경 보이게 함.
  - 배경색 바꾸라는 것이 정확히 어떤 것인지 몰라 원래 페이지처럼 input 주변 배경색 변경
- Sign up for github button 태그 사용하여 구현

## 구현 상세

- min width 설정
  - min-width: 1260px
  - height는 100vh로 설정했으나 최소값을 지정하지는 않음.
- 구성
  - header: 헤더 요소는 flex space-between 사용하여 양옆에 배치
    - header-left: 헤더의 왼쪽에 들어가는 요소 정렬 (flex)
      - header-main-icon: 깃허브 메인 아이콘
      - header-menu: 헤더 메뉴들
    - header-right: 헤더 오른쪽에 들어가는 요소 정렬 (flex)
      - header-search: 검색창
      - 회원가입, 로그인 버튼
    - 아래 배경화면이 main이 속해있음. → absolute와 z-index 사용하여 main 위로 띄워줌. (main은 relative로 설정)
  - main: flex gap 사용하여 각 요소 간격 조정
    - about-us: title에 margin-bottom을 주어 간격 조정
      - title
      - content
    - sign in: flex gap이 공통적으로 16px씩 나타남. → 예외는 해당 요소에 margin 주어 구현
      - sign-in-input: flex gap이 공통적으로 16px씩 타남.
      - sign-in-button: 아래에 예외 마진 10px을 주어 간격 조정
  - footer
    - footer-image: footer 위에 떠 있음. → absolute 사용하여 footer 위로 띄워줌. (footer는 relative로 설정)
