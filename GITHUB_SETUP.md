# 🐙 GitHub 저장소 생성 및 배포 가이드

## 1단계: GitHub 저장소 생성

### 웹 브라우저에서 GitHub 접속
1. [github.com](https://github.com) 접속
2. GitHub 계정으로 로그인 (없으면 회원가입)
3. 우측 상단 "+" 버튼 클릭 → "New repository" 선택

### 저장소 설정
- **Repository name**: `etf-analysis-dashboard`
- **Description**: `실시간 레버리지 ETF 분석 대시보드 (TQQQ, SOXL, UPRO)`
- **Visibility**: Public (GitHub Pages 무료 사용을 위해)
- **Initialize**: 체크하지 않음 (이미 파일이 있으므로)

### 저장소 생성
- "Create repository" 버튼 클릭

## 2단계: 로컬 저장소와 연결

### 원격 저장소 추가
```bash
# GitHub에서 제공하는 URL 사용 (사용자명에 맞게 수정)
git remote add origin https://github.com/[사용자명]/etf-analysis-dashboard.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 3단계: GitHub Pages 설정

### Settings에서 Pages 설정
1. GitHub 저장소 페이지에서 "Settings" 탭 클릭
2. 왼쪽 메뉴에서 "Pages" 클릭
3. Source 설정:
   - **Source**: "Deploy from a branch" 선택
   - **Branch**: "main" 선택
   - **Folder**: "/ (root)" 선택
4. "Save" 버튼 클릭

### 배포 완료 대기
- 몇 분 후 다음 URL에서 사이트 확인 가능:
  - `https://[사용자명].github.io/etf-analysis-dashboard`

## 4단계: 접속 및 테스트

### 로그인 정보
- **URL**: `https://[사용자명].github.io/etf-analysis-dashboard`
- **암호**: `snowball`

### 테스트 항목
1. ✅ 로그인 화면 표시
2. ✅ 암호 입력 및 로그인
3. ✅ TQQQ, SOXL, UPRO 탭 전환
4. ✅ 차트 및 데이터 로드
5. ✅ 반응형 디자인

## 🔄 업데이트 방법

### 코드 수정 후 재배포
```bash
# 파일 수정 후
git add .
git commit -m "Update: 설명"
git push origin main
```

GitHub Pages는 자동으로 재배포됩니다.

## 🛠️ 문제 해결

### 일반적인 문제들

**Q: Pages가 활성화되지 않습니다**
A: 저장소가 Public인지 확인하세요.

**Q: 404 에러가 발생합니다**
A: index.html 파일이 루트에 있는지 확인하세요.

**Q: 스타일이 적용되지 않습니다**
A: CSS 파일 경로가 올바른지 확인하세요.

## 📊 GitHub Pages 장점

- ✅ **무료 호스팅**
- ✅ **자동 HTTPS**
- ✅ **커스텀 도메인 지원**
- ✅ **자동 배포**
- ✅ **GitHub 통합**

---

**위 단계를 따라하면 GitHub Pages로 성공적으로 배포할 수 있습니다!** 🚀
