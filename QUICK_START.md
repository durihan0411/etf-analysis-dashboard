# ⚡ 빠른 배포 가이드

ETF 분석 대시보드를 빠르게 배포하는 방법입니다.

## 🚀 가장 쉬운 방법: Vercel

### 1단계: 파일 준비
```bash
# 현재 폴더에 다음 파일들이 있는지 확인
EFT_tqqq_soxl/
├── index.html
├── style.css
├── script.js
├── package.json
├── vercel.json
└── README.md
```

### 2단계: Vercel CLI 설치 및 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 폴더로 이동
cd EFT_tqqq_soxl

# 배포 실행
vercel

# 질문에 답하기:
# - Set up and deploy? Y
# - Which scope? (개인 계정 선택)
# - Link to existing project? N
# - What's your project's name? etf-dashboard
# - In which directory is your code located? ./
```

### 3단계: 프로덕션 배포
```bash
vercel --prod
```

### 4단계: 완료! 🎉
배포된 URL이 표시됩니다. 예: `https://etf-dashboard-xxx.vercel.app`

---

## 🌐 다른 배포 방법

### Netlify (무료)
1. [netlify.com](https://netlify.com) 접속
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. 자동 배포 완료

### GitHub Pages (무료)
1. GitHub에 새 저장소 생성
2. 파일 업로드
3. Settings > Pages > Source: Deploy from branch
4. Branch: main, Folder: / (root)

### 로컬 테스트
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server . -p 8000

# 브라우저에서 http://localhost:8000 접속
```

---

## 🔑 로그인 정보

- **암호**: `snowball`
- **접속**: 배포된 URL에서 로그인 화면 확인

---

## 🛠️ 문제 해결

**Q: 배포 후 차트가 안 보입니다**
A: 브라우저 콘솔(F12)에서 에러 확인

**Q: 데이터가 로드되지 않습니다**
A: CORS 프록시 서버 문제일 수 있음

**Q: 로그인이 안됩니다**
A: 암호는 정확히 "snowball" 입력

---

## 📞 지원

배포 관련 문제가 있으면:
1. 브라우저 개발자 도구 확인
2. 네트워크 탭에서 요청 상태 확인
3. 로컬에서 먼저 테스트

**성공적인 배포를 위해 위 단계를 따라해주세요!** 🚀

