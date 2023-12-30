## 구현 기능

- 공통
  - hover effect 구현
    - 박스 2px 올라감.
    - 햄버거 버튼 찌그러짐.
    - 이미지 확대
    - 커서 올리면 포인터가 나타나도록 수정
- portfolio.html
  - moblie first로 구현
  - 반응형
    - min-width: 500px
      - 제작자 명단이 3명, 2명 순으로 wrapping 됨.
    - min-width: 650px
      - 태블릿 기준 배치로 변화
      - 이미지가 왼쪽, 설명이 오른쪽에 위치하도록 배치 변화
    - min-width: 780
      - 최대 너비 1200px로 고정
  - 전공자/비전공자/복수전공자에 따른 색 변화
- interview.html
  - moblie first로 구현
  - 반응형
    - min-width: 600px
      - 2단으로 레이아웃 변경
    - min-width: 780px
      - 최대 너비 1200px로 고정
    - min-width: 850px
      - 2단으로 레이아웃 변경

## 추가 구현

- 사이드바 디자인 수정
- 헤더
  - 가운데에 위치하도록 수정
  - 검정 그라데이션 background-color 삽입

## 구현 상세

- header
  - position fixed 사용 -> 상단에 고정
  - 높이 7rem
  - space-between 사용하여 양쪽 정렬
  - 양쪽 padding 80px 넣어 아이콘이 옆 화면으로부터 떨어지도록 함.
  - 반응형
    - min-width 1200px일 때 로고 크기 30*30에서 40*40으로 변경
- side bar
  - flex gap 사용하여 요소 세로 정렬 및 간격 조정
- main title (19기)
  - flex 사용하여 19기 가운데 정렬
  - position absolute 사용하여 18기 오른쪽 정렬 (flex를 position relative로 설정)
  - title hover 시 pointer로 변경 효과
- main
  - 그리드 사용하여 정렬
- program, interview
  - 그리드로 정렬된 박스 (설명 상자)
  - 한 쪽의 설명글이 overflow 되었을 때 같은 행의 높이를 동일하게 만듦. (노영진, 박석류 행 참조)
  - position relative로 설정
    - 위로 올라가는 애니메이션 구현에 필요
    - 햄버거 버튼을 오른쪽 위로 올릴 때 필요
  - flex 사용하여 내부 요소 배치 (gap 16px)
- main-hamburger
  - program이나 interview 오른쪽 위에 위치한 햄버거 버튼
  - margin auto 사용하여 transition 발생 시 부드럽게 되돌아갈 수 있도록 설정
