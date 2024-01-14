## AJAX 선행 과제

### 수업의 목적

- 페이지가 모두 바뀌고 있음.
    - 바뀌어야 하는 부분만 바뀌면 어떨까?
- 부분 렌더링의 장점
    - 속도 빠름.
    - 동적/정적 asset의 분리 → 유지 보수 용이 (Single-page Application)
- 개발자도구 → 네트워크에서 다운로드한 Asset 확인 가능

### fetch API

- 가독성 높이도록 콜백 내부에 콜백을 넣지 않도록 코드 수정

```html
<input type="button" value="fetch" onclick="
            fetch('css')
            .then((response)=>{
                return response.text()
            })
            .then((text)=>{
                document.querySelector('article').innerHTML = text;
            })
        "/>
```

- fetch API란?
    - 클라이언트와 서버의 소통 과정
        - 클라이언트가 fetch 요청을 함. (’css’ 파일을 주세요)
            - fetch는 비동기 통신
            - promise 사용하여 콜백 함수 가독성 높이기
        - 서버가 css 파일 내용을 전달함.
            - 이후 then 안에 들어간 (비동기) 콜백 함수 실행
            - 이름이 없는 함수여서 익명함수라고도 함.
        - css.text → 파일에서 텍스트를 가지고 옴.
- Response 객체
    - HTTP response 제공

### 초기 페이지 구현

- a 태그의 기능을 살리면서 fetch를 쓸 수는 없을까?
- hash 사용
    - 페이지의 특정한 부분으로 접근하고 있음.
    - 아이디를 뒤에 붙이면 스크롤이 자동으로 이동됨. (북마크 기능)
        - http://127.0.0.1:5500/hash.html#three
        - pragment / pragment identifier
    - location.hash 사용하여 hash 정보를 알 수 있음.
- 실습 코드에서 다른 a 버튼들을 누른 뒤 ‘WEB’을 누르면 초기 페이지가 보이지 않음.
    - if(location.hash)~ 루프가 초기에만 돌아가기 때문에 발생
    - “WEB a 태그 수정하여 해결
    
    ```html
    <h1><a href="#!welcome" onclick="fetchPage('welcome')">WEB</a></h1>
    ```
