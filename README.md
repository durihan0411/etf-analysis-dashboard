# 🔐 ETF 분석 대시보드

실시간 레버리지 ETF(TQQQ, SOXL, UPRO) 가격 분석 및 1년 최고가 비교 대시보드

## 🚀 주요 기능

- **실시간 가격 분석**: Yahoo Finance API를 통한 실시간 데이터
- **1년 최고가 비교**: 현재가와 1년 최고가 분석
- **시각적 차트**: Chart.js를 이용한 인터랙티브 차트
- **멀티 종목**: TQQQ, SOXL, UPRO 3개 종목 분석
- **보안 로그인**: 암호 기반 접근 제어
- **반응형 디자인**: 모바일/데스크톱 최적화

## 🔑 접근 정보

- **로그인 암호**: `snowball`
- **접근 권한**: 승인된 사용자만 접근 가능

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Chart Library**: Chart.js
- **Data Source**: Yahoo Finance API
- **Storage**: LocalStorage (세션 관리)

## 📊 지원 종목

| 종목 | 이름 | 설명 |
|------|------|------|
| TQQQ | ProShares UltraPro QQQ | 3x NASDAQ-100 |
| SOXL | Direxion Daily Semiconductor Bull 3X | 3x SOXX |
| UPRO | ProShares UltraPro S&P 500 | 3x S&P 500 |

## ⌨️ 키보드 단축키

- `Ctrl + R`: 현재 종목 새로고침
- `1, 2, 3`: TQQQ, SOXL, UPRO 탭 전환
- `Ctrl + L`: 로그아웃
- `Enter`: 로그인 (로그인 화면에서)

## 🚀 배포 방법

### 1. Vercel 배포 (추천)

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 배포
cd EFT_tqqq_soxl
vercel

# 도메인 확인
vercel --prod
```

### 2. Netlify 배포

1. [Netlify](https://netlify.com)에 회원가입
2. "New site from Git" 선택
3. GitHub 저장소 연결
4. 빌드 설정:
   - Build command: (비워둠)
   - Publish directory: `EFT_tqqq_soxl`

### 3. GitHub Pages

1. GitHub에 저장소 생성
2. Settings > Pages에서 소스 선택
3. `EFT_tqqq_soxl` 폴더를 루트로 설정

### 4. 로컬 서버

```bash
# Python 3
cd EFT_tqqq_soxl
python -m http.server 8000

# Node.js (http-server)
npx http-server EFT_tqqq_soxl -p 8000

# PHP
cd EFT_tqqq_soxl
php -S localhost:8000
```

## 📁 파일 구조

```
EFT_tqqq_soxl/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # JavaScript 로직
├── README.md           # 프로젝트 문서
├── vercel.json         # Vercel 배포 설정
├── netlify.toml        # Netlify 배포 설정
└── package.json        # 프로젝트 설정
```

## 🔧 환경 요구사항

- **브라우저**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6+ 지원
- **네트워크**: 인터넷 연결 (Yahoo Finance API 접근용)

## 📱 반응형 지원

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

## 🔒 보안 고려사항

- 클라이언트 사이드 암호 검증
- LocalStorage 세션 관리
- CORS 프록시를 통한 API 접근
- 최대 시도 횟수 제한

## 🐛 문제 해결

### 자주 묻는 질문

**Q: 데이터가 로드되지 않습니다**
A: CORS 프록시 서버 문제일 수 있습니다. 페이지를 새로고침해보세요.

**Q: 차트가 표시되지 않습니다**
A: Chart.js 라이브러리 로딩을 확인하세요.

**Q: 로그인이 안됩니다**
A: 암호는 "snowball"입니다. 대소문자를 확인하세요.

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 브라우저 콘솔 에러 메시지
2. 네트워크 연결 상태
3. 브라우저 JavaScript 활성화 여부

## 📄 라이선스

이 프로젝트는 개인 사용을 위한 것입니다.

---

**© 2024 ETF Analysis Dashboard**

