### 구현 내용
- 필수 기능(1~15) 모두 구현
- 챌린지 완료 (페이지네이션, 실시간 검색결과 반영)
- 메인페이지 정렬 ajax로 구현
- css로 꾸미기
- 배포를 시도했으나 실패 ㅜㅜ
    - AWS IAM 계정 및 인스턴스 생성
    - 탄력적 IP 설정
    - nginx, gunicorn 설치 및 환경 설정
    - socket permission denied로 작동하지 않음.
        - gunicorn은 ~/SWIDEA/config/cofig.sock에 소켓 생성
        - nginx는 ~/SWIDEA/config.sock를 자꾸 찾으려고 함.
        - nginx 참조 path가 변경되지 않아 실패함.
```
// nginx setting
server {
    listen 80;
    server_name 15.165.102.86;

    charset utf-8;

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/SWIDEA/config/config.sock;
    }

    location /static {
        alias /home/ubuntu/SWIDEA/staticfiles/;
    }
    location /media {
        alias /home/ubuntu/SWIDEA/media/;
    }
}
```

```
// gunicorn setting
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/SWIDEA/
ExecStart=/home/ubuntu/anaconda3/envs/serverSession/bin/gunicorn \
        --workers 2 \
        --bind unix:/home/ubuntu/SWIDEA/config/config.sock  \
        config.wsgi:application

[Install]
WantedBy=multi-user.target
```