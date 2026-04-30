# 잔향 (Janhyang) — Vercel 배포 가이드

## 파일 구조
```
janhyang/
├── api/
│   └── chat.js          ← 채팅 서버 (Vercel Serverless)
├── public/
│   └── index.html       ← 메인 페이지
├── vercel.json          ← Vercel 라우팅 설정
└── package.json
```

## Vercel 배포 방법 (5분)

### 1단계 — GitHub에 올리기
1. https://github.com 에서 새 Repository 생성 (이름: `janhyang`)
2. 이 폴더 안의 파일들을 전부 업로드

### 2단계 — Vercel 연결
1. https://vercel.com 에서 GitHub 계정으로 로그인
2. `Add New → Project` 클릭
3. GitHub에서 `janhyang` 선택 → `Import`
4. **Framework Preset: `Other`** 선택
5. `Deploy` 클릭

### 3단계 — 배포 완료
- 약 30초~1분 후 `https://janhyang.vercel.app` 같은 URL 생성
- 이 URL로 접속하면 끝!

### GIF 파일 추가
- `public/` 폴더에 `다운로드__4_.gif` 파일도 같이 올리면 로딩 화면에 표시됨

## 관리자 계정
- ID: `X1Xo0x`
- PW: `dusrbs@0828`
- 인증코드: `0024534X`

## 채팅 서버
- Vercel Serverless Function으로 실행
- 모든 접속자가 실시간으로 채팅 공유 (5초 폴링)
- 서버 재배포 시 채팅 초기화됨 (영구 저장은 Upstash Redis 추가 필요)

## 멤버/공지
- 각 클라이언트 localStorage에 저장
- 관리자가 공지 작성 → 자신의 브라우저에만 저장됨
- 여러 기기에서 공유하려면 백업 기능으로 JSON 내보내기/가져오기 사용
