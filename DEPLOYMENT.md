# 🚀 배포 가이드

ETF 분석 대시보드 배포 방법을 단계별로 안내합니다.

## 📋 배포 전 준비사항

1. **파일 확인**: 다음 파일들이 모두 있는지 확인
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - `package.json`

2. **로컬 테스트**: 브라우저에서 정상 작동 확인

## 🌐 배포 옵션

### 1. Vercel 배포 (추천) ⭐

**장점**: 빠른 배포, 자동 HTTPS, 커스텀 도메인 지원

#### 방법 1: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 디렉토리에서
cd EFT_tqqq_soxl
vercel

# 프로덕션 배포
vercel --prod
```

#### 방법 2: Vercel 웹사이트 사용
1. [vercel.com](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 연결
5. 자동 배포 완료

**결과**: `https://your-project.vercel.app`

### 2. Netlify 배포

**장점**: 무료, 폼 처리, 서버리스 함수 지원

#### 방법 1: Netlify CLI 사용
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
cd EFT_tqqq_soxl
netlify deploy

# 프로덕션 배포
netlify deploy --prod
```

#### 방법 2: Netlify 웹사이트 사용
1. [netlify.com](https://netlify.com) 접속
2. "New site from Git" 클릭
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: (비워둠)
   - Publish directory: `.` (현재 디렉토리)

**결과**: `https://your-site.netlify.app`

### 3. GitHub Pages

**장점**: 무료, GitHub 통합

#### 설정 방법
1. GitHub에 새 저장소 생성
2. 파일 업로드
3. Settings > Pages 이동
4. Source: "Deploy from a branch" 선택
5. Branch: `main` 선택
6. Folder: `/ (root)` 선택

**결과**: `https://yourusername.github.io/repository-name`

### 4. Firebase Hosting

**장점**: Google 인프라, 빠른 CDN

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 초기화
firebase init hosting

# 배포
firebase deploy
```

### 5. AWS S3 + CloudFront

**장점**: 높은 성능, 글로벌 CDN

1. S3 버킷 생성
2. 정적 웹사이트 호스팅 활성화
3. 파일 업로드
4. CloudFront 배포 생성

## 🔧 로컬 개발 서버

### Python 서버
```bash
cd EFT_tqqq_soxl
python -m http.server 8000
# http://localhost:8000 접속
```

### Node.js 서버
```bash
# http-server 설치
npm install -g http-server

# 서버 실행
cd EFT_tqqq_soxl
http-server -p 8000 -c-1
# http://localhost:8000 접속
```

### PHP 서버
```bash
cd EFT_tqqq_soxl
php -S localhost:8000
# http://localhost:8000 접속
```

## 🔒 보안 설정

### HTTPS 강제
모든 배포 플랫폼에서 HTTPS를 자동으로 제공합니다.

### CORS 설정
현재 Yahoo Finance API는 CORS 프록시를 사용하므로 추가 설정이 필요하지 않습니다.

## 📊 성능 최적화

### 캐싱 설정
- 정적 파일: 1년 캐시
- HTML: 짧은 캐시 또는 no-cache

### 압축
대부분의 호스팅 서비스에서 자동으로 gzip 압축을 제공합니다.

## 🐛 문제 해결

### 일반적인 문제

**Q: 배포 후 차트가 표시되지 않습니다**
A: Chart.js CDN 링크가 차단되었을 수 있습니다. 로컬 파일로 다운로드하여 사용하세요.

**Q: API 데이터가 로드되지 않습니다**
A: CORS 정책으로 인한 문제일 수 있습니다. 프록시 서버 상태를 확인하세요.

**Q: 로그인이 작동하지 않습니다**
A: 브라우저의 LocalStorage가 비활성화되었을 수 있습니다.

### 디버깅 팁

1. 브라우저 개발자 도구 콘솔 확인
2. 네트워크 탭에서 요청 상태 확인
3. 로컬에서 먼저 테스트

## 📈 모니터링

### Vercel Analytics
```javascript
// vercel.json에 추가
{
  "analytics": {
    "vercel": true
  }
}
```

### Google Analytics
```html
<!-- index.html <head>에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 자동 배포 설정

### GitHub Actions (Vercel)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 지원

배포 관련 문제가 있으면:
1. 배포 플랫폼 문서 확인
2. 브라우저 콘솔 에러 메시지 확인
3. 네트워크 연결 상태 확인

---

**성공적인 배포를 위해 위 단계를 순서대로 따라해주세요!** 🚀

