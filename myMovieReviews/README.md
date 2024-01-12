### 필수

- 모두 구현

### 🔥챌린지🔥

- 장르 선택 기능 구현
- 러닝타임 시간 구현
- 정렬 기능 구현 (제목 이름, 별점, 상영 시간)
- 로그인 회원가입 기능 구현
    - login_required 사용하여 리뷰 작성, 수정, 삭제에 권한 부여
    - 권한을 벗어난 접근일 경우 permission_denied 창으로 리디렉션
    - 리뷰 정보에 작성자 정보를 저장
- forms.py 사용
    - form.as_p를 사용하여 자동으로 form이 생성되도록 구현
    - 리뷰, 회원가입 시 forms를 사용하여 생성
    - fields 사용 → 필수로 작성해야 하는 곳 보호, 작성하지 않을 시 경고 나타남.
    ```
    class ReviewForm(forms.ModelForm):
        class Meta:
            model=Review
            fields = ["title", "createYear", "genres", "starRate", "runningTime", "content", "directors", "actors"]
    ```
- Review 입력 제한사항 설정
    - createYear: choices 사용하여 연도 선택 (1950~2024)
    - starRate: 0.0~5.0 사이의 값만 입력, x.x 꼴로 제한
    
    ```html
    starRate = models.DecimalField(max_digits=2, decimal_places=1, validators=[MaxValueValidator(5.0), MinValueValidator(0.0)])
    ```
    
    - runningTime: 양의 정수만 입력
    
    ```html
    runningTime = models.PositiveIntegerField()
    ```
    
    - 나머지 TextField들 → 최대 입력수 제한
- index (메인 화면)
    - 리뷰가 없을 시 ‘리뷰가 없습니다’가 뜨도록 함.