## 세줄 요약

- 장고는 웹 어플리케이션 프레임워크 (서버 아님)
- url 패턴에 일치하는 view 탐색 → view의 결과 전송
- 데이터 객체화 → makemigrations(마이그레이션 파일을 사용하여 모델 변경 사항 버전 관리), migrate(마이그레이션 파일을 DB에 적용)

## 인터넷은 어떻게 작동할까요

- 웹사이트란?
  - 파일의 묶음
  - 하드디스크처럼 저장할 공간이 필요함 → 서버
  - 서버: 데이터를 제공하는 주체
    - 모든 컴퓨터를 연결할 수는 없음.
    - 여러 서버를 거쳐서 통과함.
- 웹의 작동 과정
  - 편지(데이터 패킷) → 가장 가까운 우체국(라우터) → 다음 우체국 → … → 주소지
  - url → DNS(도메일 주소 시스템) → IP주소
- 상세한 프로세스
  - URL 파싱
  - DNS 조회
  - IP 주소 탐색 과정
  - 서버와의 연결
  - HTTP 요청
  - 웹 서버와 WAS의 요청 처리/응답

### URL 파싱

- url의 구조를 해석함.
- IP 주소
  - 컴퓨터가 가지는 주소
  - 통신을 위한 고유한 주소
- 도메인
  - ip 주소는 인간이 이해하기 너무 어려움. → 도메인으로 관리
  - ex) 216.58.220.110 → [naver.com](http://naver.com)
- 도메인 체계

  - 역트리 형태

- DNS
  - 도메인 주소 체계
  - 도메인을 사용하여 웹 사이트에 접근할 수 있도록 함.
  - 도메인 입력 → DNS → IP 주소
- URL
  - 클라이언트가 불러올 리소스를 요청하기 위해 필요한 정보의 집합
  - 프로토콜, 호스트(네트워크에 연결된 컴퓨터), 포트, 리소스 경로, 쿼리
  - 프로토콜
    - 통신 규약
    - 나는 이렇게 주면 너는 이렇게 받으렴
    - HTTP: Hypertext Transfer Protocol
    - HTTP: Hypertext Transfer Protocol Secure
  - 포트
    - 외부 장비에 접속하기 위한 소프트웨어 상의 플러그
    - 보통 하나의 컴푸터에는 여러 프로그램이 동시에 실행되고 있음.
    - 나에게 접속하려고 하는 프로그램이 무엇인지를 알려줘야 함. → 포트
    - 장고는 8000 포트를 사용함.

### DNS 조회

- 도메인에서 IP 주소를 구하는 데 시간이 걸림
- 이미 방문했던 도메인의 IP 주소는 브라우저에 저장해둠. (캐싱)
- 캐싱을 먼저 확인 → 없으면 DNS에 ip 주소 요청
- 빠른 접속을 위한 단계

### IP 주소 탐색

- 여러 통신사의 DNS 서버에서 등록됨. → Local DNS
- 컴퓨터 LAN 선으로 인터넷 연결 → 인터넷을 사용할 수 있도록 통신사에서 IP 할당 → 통신사의 DNS 서버에 IP 주소가 등록됨.
- 작은 우체국에서 큰 우체국으로 이동하듯이 DNS도 여러 단계를 거쳐 목적지로 이동 → Recursive Query
- 재귀적 요청으로 속도가 느림 → 캐싱 필요

### 서버와 연결

- 패킷 통신
  - pack + bucket
  - 데이터를 작은 조각으로 쪼개서 보냄
  - 대부분의 인터넷 통신에서 패킷 통신을 사용함.
- TCP/IP
  - 패킷통신을 위한 프로토콜
  - IP
    - 인터넷 상의 주소 규칙
    - 패킷의 순서가 바뀌거나 누락되더라도 최대한 빨리 보내는 것이 목표
  - TCP
    - IP 위에서 동작
    - 데이터 전달을 관리하는 규칙
    - 작게 나누고 조립하는 과정 (패킷 생성 병합)
    - 순서를 다시 맞추거나 누락된 패킷을 판단하여 재요청하는 프로토콜
- 서버와 TCP 소켓의 연결

  - IP 주소를 받으면 해당 서버와 연결
  - 서버와 데이터를 통신하기 위해서는 TCP 소켓을 연결해야 함.

    - 소켓: 클라이언트와 서버를 연결하고 양방향 통신이 가능하도록 하는 기술
    - 3-way handshake

      - 서버와 사전에 데이터 전송을 준비하는 과정
      - 클라이언트가 HTTP 통신을 사용하여 서버에 소켓 통신이 가능한지 요청을 보냄.
        - 이때 Upgrade, Connection, WebSocket에 대한 정보를 함께 전송함.
        - syn 패킷이라고도 부름
      - 서버가 웹 소켓 통신을 할 수 있다면 101 응답을 보냄
        - Sec-WebSocket-Key에 문자를 더한 후 암호화
        - 암호를 Sec-WebSocket-Apccet로 전송
        - ACK, SYN flag가 설정된 패킷이라고도 부름
      - 클라이언트가 서버에게 응답 확인을 보냄
        - ACK 패킷이라고도 부름.
      - ws 또는 wss 프로토콜로 양방향 통신을 진행
      - 사실 HTTPS면 TLS 협상이라는 handshake 과정을 한번 더 거쳐야 함.
        - TLS 협상: 정보를 암호화하여 송수신하는 프로토콜
        - 암호화된 데이터를 교환하기 위한 협상의 과정

      ```jsx
      let socket = new WebSocket("ws://chanstory.dev");

      GET /chat
      Host: https://chanstory.dev
      Origin: https://chanstory.dev
      Connection: Upgrade
      Upgrade: websocket
      Sec-WebSocket-Key: ...
      Sec-WebSocket-Version: 13

      101 Switching Protocols
      Upgrade: websocket
      Connection: Upgrade
      Sec-WebSocket-Accept: ...
      ```

    - 4-way-handshake
      - 데이터를 수신받은 이후 서버와의 연결을 종료할 때 사용
      - 클라이언트가 FIN 플래그를 서버에 전송
      - 서버는 ack 메시지를 보내고 통신이 끝날 때까지 기다림.
        - 만약 서버가 클라이언트에게 데이터를 보내고 있는 경우, fin 플래그가 먼저 도착하면 데이터 유실이 발생할 수 있음.
        - 일정 시간동안 기다려서 남은 패킷을 모두 보내도록 함. → 이후에 FIN 플래그 보내기
      - 서버가 통신이 끝나면 클라이언트에서 FIN 플래스 전송
      - 클라이언트는 ACK 메시지를 서버에 보냄

### HTTP 요청

- TCP 연결이 완료되면 데이터 요청이 시작됨.
- Request 메시지 구조
  - 시작줄, 헤더, 본문으로 구성됨.
  - 시작줄
    - 메서드: 수행하는 동작을 알려줌. (GET, POST, PUT, PATCH, DELETE)
    - Path: 리소스의 경로
    - 프로토콜 버전
  - 헤더
    - 요청에 대한 정보를 담음.
  - 본문
    - 요청할 때 함께 보낼 데이터를 담음.
- Response 메시지 구조
  - 시작줄 - 프로토콜 버전 - Status Code
  - Status Message: 상태 코드에 대한 짧은 설명
  - 헤더
    - HTTP 해더
  - 바디
    - 요청한 데이터를 담아주는 부분
    - HTML을 담아줌
    - 클라이언트는 해당 HTML을 사용하여 화면에 렌더링

| 200(성공)            | 200 | GET 성공                                                  |
| -------------------- | --- | --------------------------------------------------------- |
|                      | 204 | 성공했으나 데이터는 없음                                  |
|                      | 205 | 성공했으나 화면 새로고침하도록 권고                       |
|                      | 206 | 성공했으나 일부 데이터만 반환                             |
| 300(리다이렉션)      | 301 | 요청한 자원이 새 URL에 존재                               |
|                      | 303 | 요청한 자원이 임시 주소에 존재                            |
|                      | 304 | 요청한 자원이 변경되지 않아 캐싱된 자원을 사용하도록 권고 |
| 400(클라이언트 에러) | 400 | 잘못된 요청                                               |
|                      | 401 | 권한 없는 요청                                            |
|                      | 403 | 서버에서 해당 자원에 대해 접근을 금지시킴                 |
|                      | 405 | 요청 메서드가 허용되지 않음.                              |
|                      | 409 | 최신 자원이 아닌데 업데이트 (버전 충돌)                   |
| 500(서버 에러)       | 501 | 서버가 요청한 동작을 수행할 수 없는 경우                  |
|                      | 503 | 서버 과부하 또는 유지보수 중                              |

### 웹 서버와 WAS의 요청/응답

- 정적 페이지와 동적 페이지
  - 정적페이지: 언제나 같은 화면을 보여주는 페이지
  - 동적 페이지: 서버에서 추가적인 처리가 필요한 페이지, 접속할 때마다 다른 화면
- 웹 서버
  - 웹 서버가 있는 컴퓨터
  - 클라이언트로부터 HTTP 요청을 받아 정적 콘텐츠들을 저공하는 컴퓨터 프로그램
  - 정적인 페이지에 대해 응답함.
  - 동적 페이지 → WAS에게 요청 처리를 맡김.
  - 대표적인 웹 서버: Apache, WebtoB, NginX
- WAS
  - Web Application Server
  - 웹 어플리케이션: 웹에서 실행되는 프로그램
  - WAS: 웹 어플리케이션을 실행시켜 필요한 기능 수행 → 결과를 웹 서버로 전달 (미들웨어)
    - 웹 서버와 웹 컨테이너가 합쳐짐
    - 웹 컨테이너: JSP, Servlet을 실행시킬 수 있음. (구동환경 제공)
    - JSP: 정적인 HTML 코드에 java코드를 넣어 동적으로 웹을 구성하는 웹 어플리케이션 도구
    - Servelet: 클라이언트가 어떠한 요청을 했을 때 그에 대한 결과를 다시 전송하는 자바 프로그램

```jsx
장고는 웹 서버가 아닙니다..
장고는 웹 어플리케이션 프레임워크입니다..

우리가 사용하는 아래 코드
python manage.py runserver
는 debug 용으로 local에서만 사용해야 함.
실제 production 환경에서는 추천하지 않음. (보안/퍼포먼스 이슈, 공식문서 참고)
AWS에서 NGINX나 apache를 적용하는 여러 방법이 있음. (요즘은 NGINX 많이 사용)

웹 서버: 웹 페이지를 클라이언트로 전달
그림, css, js 등 정적인 정보 반환
Apache: 하나의 request에 하나의 thread
Nginx: Event-Driven 방식의 비동기 처리
```

- WAS가 서버 역할까지 하면 안되나요?
  - was는 동적 데이터를 처리하기 때문에 서버 부하가 생기기 쉬움.
  - SSL 암복호화 처리에서 웹 서버를 사용하면 물리적으로 분리되어 보안 강화
  - 여러 WAS를 연결해 로드 밸런싱 가능
- 이상적인 웹서비스 아키텍처
  - 서버를 기능에 따라 분리
  - 웹 브라우저 → 웹 서버 → 애플리케이션 서버 → 데이터 서버

```jsx
wsgi는 무엇인가요?
웹 서버에 동적 페이지 요청이 들어오면 웹 서버가 파이썬 프로그램을 호출해야 함.
그런데 웹 서버에는 파이썬이 없음
-> WSGI 서버를 사용

웹 서버에 동적 요청
-> 웹 서버가 WSGI 서버 호출
-> WSGI 서버가 파이썬 프로그램 호출
-> 동적 페이지 요청 처리

WSGI를 사용하려면 gnuicorn 또는 uwsgi가 필요함.
Gunicorn을 많이 사용하는 추세임.
```

## 장고란 무엇인가요?

- 웹 서버에 요청이 오면 장고로 전달됨.
  - 정확히 말하면 “동적 페이지 요청”이 장고로 전달됨.
- urlsolver가 웹 페이지 주소를 가져와 자신이 할 일을 확인함.
  - 패턴 목록을 자신의 URL과 일일이 대조
  - 일치하는 패턴이 있으면 해당 요청을 view로 넘김
- view
  - 특정 정보를 데이터베이스에서 찾음.
  - 권한 확인
  - 해당 요청을 수행 후 답장 생성 → 클라이언트로 보냄.

## 장고 개발 준비 (점프 투 장고)

### 장고는 무엇일까?

- 장고는 웹 프레임워크
- 웹 프레임워크란?
    - 자주 사용하는 기능을 누군가가 이미 만들어 놓음.
    - 웹 스타터 키트
- 장고의 보안 기능
    - 기본적인 보안 공격을 막아줌.
    - SQL 인젝션, XSS, CSRF, 클릭재킹 등

### 장고 프로젝트 시작하기

```jsx
django-admin startproject config .
python manage.py runserver
```

## 장고의 기본 요소 익히기!

### URL과 뷰

- 앱
    - 프로젝트에 추가하는 기능
    
    ```jsx
    django-admin startapp pybo
    ```
    
- urls.py
    - 페이지 요청이 발생하면 가장 먼저 호출되는 파일
    - url과 뷰 함수 사이의 매핑 정의
    
    ```jsx
    from django.urls import path, include
    // project urls
    path("", include('demos.urls'))
    path("pybo/", include('login.urls')),
    
    // app urls (under pybo)
    path('', index, name='index')
    ```
    
- 장고의 흐름
    - 로컬 서버로 페이지 요청
    - [urls.py](http://urls.py) 파일에서 요청한 url과 일치하는 (url, view) 매핑 확인
    - view 함수 호출
    - 결과를 브라우저에 반영

### 모델

- 장고의 데이터베이스
    - 모델을 사용하여 처리
    - SQL 쿼리문을 사용하지 않아도 처리 가능
    - sqlite3 파일을 사용하여 데이터 저장
        - 보통 소규모 프로젝트에서 사용
        - 실제로는 DB를 따로 빼는 것이 일반적임.
- migrate
    - 데이터베이스 쪽에서 테이블을 생성할 수 있도록 만듦.
    - 파이썬 객체 → 데이터베이스 (sqlite3)
- ORM
    - 기존의 쿼리문들은 개발자에 따라 달라질 수 있다는 문제가 있음.
    - 쿼리를 잘못 사용하면 성능 저하
    - MySQL → 오라클 변경 시 쿼리문을 모두 변경해야 함.
    - 테이블을 모델화 → 쿼리문 사용 X
- 모델의 속성
    - 파이보: 질문과 답변을 할 수 있는 게시판 서비스
    - 질문
        - subject (제목)
        - content (내용)
        - create_date (작성 일시)
    - 답변
        - question (질문)
        - content (내용)
        - create_date (답변을 작성한 일시)
- Foreign Key
    - 역방향 접근을 가능하게 함.
    
    ```python
    from django.db import models
    
    # Create your models here.
    class Question(models.Model):
        subject = models.CharField(max_length=200)
        content = models.TextField()
        create_date = models.DateTimeField()
    
        def __str__(self):
            return self.subject
    
    class Answer(models.Model):
        question = models.ForeignKey(Question, on_delete=models.CASCADE)
        content = models.TextField()
        create_date = models.DateTimeField()
    
        def __str__(self):
            return self.question.subject
    
    q = Question.objects.get(id=1)
    q.answer_set.all() # q에서의 역방향 접근
    ```
    

### 장고 관리자

- 슈퍼유저
    - 장고 관리자 화면에 접속할 수 있는 유저
    
    ```python
    django-admin manage.py createsuperuser
    
    # admin.py
    from django.contrib import admin
    from .models import Question
    
    class QuestionAdmin(admin.ModelAdmin):
    	search_fiels = ['subject']
    
    admin.site.register(Question) # Add model to the admin page
    admin.site.register(Question, QuestionAdmin) # Add search field to admin page
    ```
    

### 조회와 템플릿

- 템플릿 태그

```python
{% if 조건문1 %}
    <p>조건문1에 해당되는 경우</p>
{% elif 조건문2 %}
    <p>조건문2에 해당되는 경우</p>
{% else %}
    <p>조건문1, 2에 모두 해당되지 않는 경우</p>
{% endif %}
```

```python
{% for item in list %}
    <p>순서: {{ forloop.counter }} </p>
    <p>{{ item }}</p>
{% endfor %}
```

- 아이디별 상세 페이지 만들기

```python
#urls.py
from django.urls import path
from .views import index, question_detail

urlpatterns = [
    path('', index, name = 'index'),
    path('question/<int:pk>/', question_detail, name='question_detail')
]
```

```python
# views.py
from django.shortcuts import render, get_object_or_404
from .models import Question

# Create your views here.
def index(request):
    question_list = Question.objects.order_by('-create_date')
    return render(request, 'pybo/question_list.html', {'question_list': question_list})

def question_detail(request, pk):
    question = get_object_or_404(Question, pk=pk)
    return render(request, 'pybo/question_detail.html', {'question':question})
```

```python
# templates/question_list.html
{% if question_list %}
<ul>
  {% for question in question_list %}
  <li>
    <p>순서: {{ forloop.counter }}</p>
    <a href="{% url 'question_detail' pk=question.pk %}"
      >{{ question.subject }}</a
    > # url 'question_detail' is url in path[1]
  </li>
  {% endfor %}
</ul>
{% else %}
<p>질문이 없습니다.</p>
{% endif %}

#templates/question_detail.html
<h1>{{question.subject}}</h1>
<div>{{question.content}}</div>
```

### URL 별칭

- 하드코딩되지 않은 링크 → URL 별칭을 사용하면 쉽게 path 변경 가능
- 네임스패이스
    - app_name 설정 가능
    - 여러 앱을 사용했을 때 별칭이 겹치지 않도록 함.

### 데이터 저장

- form을 사용하여 답변을 저장할 수 있음.
- csrf_token
    - 해커가 이상한 값을 입력하는 것을 방지하기 위한 토큰
    - 토큰이 없으면 오류 발생

```python
<h1>{{question.subject}}</h1>
<div>{{question.content}}</div>

<h5>{{ question.answer_set.count}}개의 답변이 있습니다.</h5>
<div>
  <ul>
    {% for answer in question.answer_set.all %}
    <li>{{ answer.content }}</li>
    {% endfor %}
  </ul>
</div>
<form action="{% url 'pybo:answer_create' pk=question.pk %}" method="POST">
  {% csrf_token %}
  <textarea name="content" id="content" rows="15"></textarea>
  <input type="submit" value="Register answer" />
</form>
```

```python
from django.urls import path
from .views import index, question_detail, answer_create

app_name = 'pybo'
urlpatterns = [
    path('', index, name = 'index'),
    path('question/<int:pk>/', question_detail, name='question_detail'),
    path('answer/create/<int:pk>/', answer_create, name="answer_create")
]
```

```python
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .models import Question, Answer

# Create your views here.
def index(request):
    question_list = Question.objects.order_by('-create_date')
    return render(request, 'pybo/question_list.html', {'question_list': question_list})

def question_detail(request, pk):
    question = get_object_or_404(Question, pk=pk)
    return render(request, 'pybo/question_detail.html', {'question':question})

def answer_create(request, pk):
    question = get_object_or_404(Question, pk=pk)
    content = request.POST.get('content')
    create_date = timezone.now()
    answer = Answer(question = question, content=content, create_date=create_date)
    answer.save()
    return redirect('pybo:question_detail', pk=question.id)
```

### 스태틱

- 스태틱 디렉터리 세팅

```python
# config/settings.py
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# templates/question_detail
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">
```

- 앱마다 static을 깔아도 되고 전체에 저장해도 됨.

### 템플릿 상속

- 공통으로 사용되는 구조는 BASE 템플릿으로 지정할 수 있음.

```python
{% load static %}
<!doctype html>
<html lang="ko">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="{% static 'bootstrap.min.css' %}">
    <!-- pybo CSS -->
    <link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">
    <title>Hello, pybo!</title>
</head>
<body>
<!-- 기본 템플릿 안에 삽입될 내용 Start -->
{% block content %}
{% endblock %}
<!-- 기본 템플릿 안에 삽입될 내용 End -->
</body>
</html>
```

- 앱 네임스페이스를 사용한 경우 base는 app 바깥으로 빼기
    - 안 썼으면 templates 안 아무데나 넣으면 됨.

### 폼

- [forms.py](http://forms.py)에서 설정 가능
    - 파라미터를 관리할 때 사용 (필수 사항 누락, 양식 검증 등)

```python
from django import forms
from pybo.models import Question

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question  # 사용할 모델
        fields = ['subject', 'content']  # QuestionForm에서 사용할 Question 모델의 속성
				widgets = {
            'subject': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 10}),
        } # Control the attributes of HTML tags
        labels = {
            'subject': '제목',
            'content': '내용',
        } # Add label in form
```

```python
def answer_create(request, question_id):
    """
    pybo 답변등록
    """
    question = get_object_or_404(Question, pk=question_id)
    if request.method == "POST":
        form = AnswerForm(request.POST)
        if form.is_valid():
            answer = form.save(commit=False)
            answer.create_date = timezone.now()
            answer.question = question
            answer.save()
            return redirect('pybo:detail', question_id=question.id)
    else:
        return HttpResponseNotAllowed('Only POST is possible.')
    context = {'question': question, 'form': form}
    return render(request, 'pybo/question_detail.html', context)
```

```python
{% extends 'base.html' %}
{% block content %}
<div class="container my-3">
    (... 생략 ...)
    <form action="{% url 'pybo:answer_create' question.id %}" method="post" class="my-3">
        {% csrf_token %}
        <!-- 오류표시 Start -->
        {% if form.errors %}
        <div class="alert alert-danger" role="alert">
            {% for field in form %}
            {% if field.errors %}
            <div>
                <strong>{{ field.label }}</strong>
                {{ field.errors }}
            </div>
            {% endif %}
            {% endfor %}
        </div>
        {% endif %}
        <!-- 오류표시 End -->
        <div class="mb-3">
            <textarea name="content" id="content" class="form-control" rows="10"></textarea>
        </div>
        <input type="submit" value="답변등록" class="btn btn-primary">
    </form>
</div>
{% endblock %}
```

## 파이보 서비스 개발!

### 템플릿 삽입

- 템플릿의 특정 위치에 다른 템플릿 삽입 가능
- include 태그를 사용하여 추가
    - 내비바는 독립된 템플릿으로 관리하는 것이 유지보수에 유리하여 분리

```python
{% include "navbar.html" %}
```

### 페이징

- 대량의 테스트 데이터 만들기
    - 장고 셸을 사용하면 쉬움
    - 아예 패키지로 나온 것도 있음.
        - django-seed

```python
def index(request):
    page = request.GET.get('page', '1')
		# URL에서 page 값을 가지고 옴. 디폴트 값은 1로 설정
    question_list = Question.objects.order_by('-create_date')
    paginator = Paginator(question_list, 10)
		# 페이지당 10개씩 보여주기로 설정
    page_obj = paginator.get_page(page)
		# 장고 내부에서는 해당 페이지의 데이터만 조회하도록 함.
    return render(request, 'pybo/question_list.html', {'question_list': page_obj})
```

| 항목 | 설명 |
| --- | --- |
| paginator.count | 전체 게시물 개수 |
| paginator.per_page | 페이지당 보여줄 게시물 개수 |
| paginator.page_range | 페이지 범위 |
| number | 현재 페이지 번호 |
| previous_page_number | 이전 페이지 번호 |
| next_page_number | 다음 페이지 번호 |
| has_previous | 이전 페이지 유무 |
| has_next | 다음 페이지 유무 |
| start_index | 현재 페이지 시작 인덱스(1부터 시작) |
| end_index | 현재 페이지의 끝 인덱스(1부터 시작) |

```python
 		<ul>
      {% for question in question_list %}
      <li>
        <p>순서: {{ forloop.counter }}</p>
        <a href="{% url 'pybo:question_detail' pk=question.pk %}"
          >{{ question.subject }}</a
        >
      </li>
      {% endfor %}
    </ul>
    <ul>
      {% if question_list.has_previous %}
      <li class="page-item">
        <a class="page-link" href="?page={{ question_list.previous_page_number }}">이전</a>
      </li>
      {% else %}
      <li class="page-item disabled">
        <a class="page-link">이전</a>
      </li>
      {% endif %}
			# 이전 페이지가 없으면 disable, 있으면 활성화
      {% for page_number in question_list.paginator.page_range %}
        {% if page_number >= question_list.number|add:-5 and page_number <= question_list.number|add:5 %}
          {% if page_number == question_list.number %}
            <li class="page-item">
              <a class="page-link active" href="?page={{page_number}}">{{page_number}}</a>
            </li>
          {% else %}
            <li class="page-item">
              <a class="page-link" href="?page={{page_number}}">{{page_number}}</a>
            </li>
          {% endif %}
        {% endif %}
      {% endfor %}
			# 현재 페이지 기준으로 -5, 5 범위 내에 있는 페이지는 보여줌.
			# |add:-5 는 템플릿 필터
			# 현재 페이지는 활성화 표시
      {% if question_list.has_next %}
        <li class="page-item">
          <a class="page-link" href="?page={{ question_list.next_page_number }}">다음</a>
        </li>
      {% else %}
        <li class="page-item disabled">
          <a class="page-link">다음</a>
        </li>
      {% endif %}
			# 다음 페이지가 없으면 disable, 있으면 활성화
    </ul>
```

| 페이징 기능 | 코드 |
| --- | --- |
| 이전 페이지가 있는지 체크 | {% if question_list.has_previous %} |
| 이전 페이지 번호 | {{ question_list.previous_page_number }} |
| 다음 페이지가 있는지 체크 | {% if question_list.has_next %} |
| 다음 페이지 번호 | {{ question_list.next_page_number }} |
| 페이지 리스트 루프 | {% for page_number in question_list.paginator.page_range %} |
| 현재 페이지와 같은지 체크 | {% if page_number == question_list.number %} |

### 템플릿 필터

- 템플릿 필터란?
    - 템플릿 태그에서 | 문자 뒤에 사용하는 필터
    - templatetags 디렉터리에 템플릿 필터 저장 가능
    - 인라인으로 쓰는 필터들은 변수를 인자로 받을 수 없음. → 따로 파일 필요

```python
from django import template

register = template.Library()

@register.filter
def sub(value, arg):
    return value - arg
```

```python
{% load pybo_filter %}
...
<td>
	<!-- 번호 = 전체건수 - 시작인덱스 - 현재인덱스 + 1 -->
	{{ question_list.paginator.count|sub:question_list.start_index|sub:forloop.counter0|add:1 }}
</td>
```

### 로그인과 로그아웃

- 권한을 체크하는 단계
    - django.contrib.auth
- common 앱
    - 여러 앱에서 공통으로 사용되는 앱은 common에 저장
    - common이라는 새로운 앱을 생성함.
    
    ```python
    django-admin startapp common
    ```
    
- 공통으로 관리하는 템플릿은 어디에 위치시킬까?
    - 기본적으로 장고는 앱 외부 디렉토리에 위치한 템플릿도 불러올 수 있음.
    - 공통으로 관리하는 템플릿은 아예 프로젝트 최상단으로 뽑을 수 있음.
        - 대신 settings에 템플릿의 디렉토리를 추가해야 함.
        
        ```python
        TEMPLATES = [
            {
                'BACKEND': 'django.template.backends.django.DjangoTemplates',
                'DIRS': [BASE_DIR / 'templates'], # (앱 디렉토리에 속해있지 않으면서) 템플릿이 있는 디렉토리는 여기야~
                'APP_DIRS': True, # 앱 디렉토리 안에 템플릿이 있으니 한번 찾아보렴~
                'OPTIONS': {
                    'context_processors': [
                        'django.template.context_processors.debug',
                        'django.template.context_processors.request',
                        'django.contrib.auth.context_processors.auth',
                        'django.contrib.messages.context_processors.messages',
                    ],
                },
            },
        ]
        ```
        
    - 각 앱마다 base.html이 달라도 됨.
        - 앱 내부 디렉토리에 있는 건 알아서 찾아줌.