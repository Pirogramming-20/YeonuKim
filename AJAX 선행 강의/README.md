## AJAX 선행 과제

### 수업의 목적

- 페이지가 모두 바뀌고 있음.
    - 바뀌어야 하는 부분만 바뀌면 어떨까?
- 부분 렌더링의 장점
    - 속도 빠름.
    - 동적/정적 asset의 분리 → 유지 보수 용이 (Single-page Application)
- 개발자도구 → 네트워크에서 다운로드한 Asset 확인 가능

### fetch API

- Promise 사용한 코드가 마음에 안 들어서 바꿈.
    - 가독성 높이도록 콜백 내부에 콜백을 넣지 않도록 함.

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