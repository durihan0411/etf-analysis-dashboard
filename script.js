// 멀티 레버리지 ETF 분석 대시보드

class LoginManager {
    constructor() {
        this.correctPassword = 'snowball';
        this.maxAttempts = 3;
        this.attempts = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingLogin();
    }

    setupEventListeners() {
        const loginButton = document.getElementById('loginButton');
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.getElementById('passwordToggle');

        // 로그인 버튼 클릭
        loginButton.addEventListener('click', () => {
            this.handleLogin();
        });

        // Enter 키로 로그인
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });

        // 비밀번호 표시/숨김 토글
        passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // 입력 시 에러 메시지 숨김
        passwordInput.addEventListener('input', () => {
            this.hideError();
        });
    }

    checkExistingLogin() {
        const isLoggedIn = localStorage.getItem('etf_dashboard_logged_in');
        if (isLoggedIn === 'true') {
            this.showMainContent();
        }
    }

    handleLogin() {
        const passwordInput = document.getElementById('password');
        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === this.correctPassword) {
            this.loginSuccess();
        } else {
            this.loginFailed();
        }
    }

    loginSuccess() {
        // 로그인 상태 저장
        localStorage.setItem('etf_dashboard_logged_in', 'true');
        
        // 로그인 화면 숨기기
        const loginOverlay = document.getElementById('loginOverlay');
        loginOverlay.style.opacity = '0';
        
        setTimeout(() => {
            loginOverlay.style.display = 'none';
            this.showMainContent();
        }, 300);
    }

    loginFailed() {
        this.attempts++;
        const errorDiv = document.getElementById('loginError');
        const passwordInput = document.getElementById('password');
        const loginButton = document.getElementById('loginButton');

        // 에러 메시지 표시
        errorDiv.style.display = 'block';
        errorDiv.style.animation = 'shake 0.5s ease-in-out';
        
        // 입력 필드 강조
        passwordInput.style.borderColor = '#e74c3c';
        passwordInput.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        
        // 입력 필드 초기화
        passwordInput.value = '';
        passwordInput.focus();

        // 최대 시도 횟수 확인
        if (this.attempts >= this.maxAttempts) {
            this.showMaxAttemptsMessage();
        }

        // 3초 후 스타일 초기화
        setTimeout(() => {
            passwordInput.style.borderColor = '#e0e0e0';
            passwordInput.style.boxShadow = 'none';
            errorDiv.style.animation = 'none';
        }, 3000);
    }

    showMaxAttemptsMessage() {
        const loginButton = document.getElementById('loginButton');
        const passwordInput = document.getElementById('password');
        
        loginButton.disabled = true;
        passwordInput.disabled = true;
        
        const errorDiv = document.getElementById('loginError');
        errorDiv.innerHTML = '🚫 최대 시도 횟수를 초과했습니다. 페이지를 새로고침해주세요.';
        errorDiv.style.display = 'block';
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.querySelector('.toggle-icon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleIcon.textContent = '👁️';
        }
    }

    hideError() {
        const errorDiv = document.getElementById('loginError');
        errorDiv.style.display = 'none';
    }

    showMainContent() {
        const mainContent = document.getElementById('mainContent');
        mainContent.style.display = 'block';
        
        // 메인 컨텐츠가 표시된 후 ETF 분석기 초기화
        setTimeout(() => {
            if (!window.etfAnalyzer) {
                window.etfAnalyzer = new ETFAnalyzer();
                
                // 자동 업데이트 시작
                window.etfAnalyzer.startAutoUpdate();
                
                console.log('멀티 ETF 분석 대시보드 초기화 완료');
                
                // 키보드 단축키 안내
                console.log('키보드 단축키:');
                console.log('- Ctrl+R: 현재 종목 새로고침');
                console.log('- 1, 2, 3: TQQQ, SOXL, UPRO 탭 전환');
                console.log('- Ctrl+L: 로그아웃');
            }
        }, 100);
    }

    logout() {
        localStorage.removeItem('etf_dashboard_logged_in');
        window.location.reload();
    }
}

class ETFAnalyzer {
    constructor() {
        this.symbols = ['TQQQ', 'SOXL', 'UPRO'];
        this.currentSymbol = 'TQQQ';
        this.analyzers = {};
        this.charts = {};
        this.etfInfo = {
            'TQQQ': {
                name: 'ProShares UltraPro QQQ',
                description: '3x QQQ',
                index: 'NASDAQ-100',
                icon: '📈'
            },
            'SOXL': {
                name: 'Direxion Daily Semiconductor Bull 3X Shares',
                description: '3x SOXX',
                index: 'PHLX Semiconductor Sector Index',
                icon: '🔧'
            },
            'UPRO': {
                name: 'ProShares UltraPro S&P 500',
                description: '3x S&P500',
                index: 'S&P 500',
                icon: '🇺🇸'
            }
        };
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.showLoading(true);
        
        try {
            // 모든 종목 데이터 로드
            await this.loadAllSymbolsData();
            
            // UI 업데이트 진행률 표시
            this.updateLoadingProgress('UI 업데이트 중...', 75);
            
            // 모든 종목의 UI 미리 업데이트
            for (let i = 0; i < this.symbols.length; i++) {
                const symbol = this.symbols[i];
                if (this.analyzers[symbol]) {
                    this.updateUI(symbol);
                    this.updateChart(symbol);
                    this.updateLoadingProgress(`차트 생성 중... (${symbol})`, 75 + (i + 1) / this.symbols.length * 20);
                }
            }
            
            // 첫 번째 종목으로 전환
            this.updateLoadingProgress('완료 중...', 100);
            setTimeout(() => {
                this.switchToSymbol(this.currentSymbol);
            }, 500);
            
        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
            this.showError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setTimeout(() => {
                this.showLoading(false);
            }, 1000);
        }
    }

    setupEventListeners() {
        // 탭 버튼 이벤트 리스너
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const symbol = e.currentTarget.dataset.symbol;
                this.switchToSymbol(symbol);
            });
        });

        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.refreshCurrentSymbol();
            }
            
            // 숫자 키로 탭 전환
            if (e.key >= '1' && e.key <= '3') {
                const symbols = ['TQQQ', 'SOXL', 'UPRO'];
                const index = parseInt(e.key) - 1;
                if (symbols[index]) {
                    this.switchToSymbol(symbols[index]);
                }
            }

            // 로그아웃 (Ctrl+L)
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                if (confirm('로그아웃하시겠습니까?')) {
                    window.loginManager.logout();
                }
            }
        });
    }

    async loadAllSymbolsData() {
        console.log('모든 종목 데이터 로드 시작...');
        
        // 병렬 로딩으로 속도 향상
        const loadPromises = this.symbols.map(async (symbol, index) => {
            try {
                this.updateLoadingProgress(`데이터 로딩 중... (${symbol})`, (index + 1) / this.symbols.length * 50);
                console.log(`${symbol} 데이터 로딩 중...`);
                await this.loadSymbolData(symbol);
                console.log(`${symbol} 데이터 로드 성공`);
                return { symbol, success: true };
            } catch (error) {
                console.error(`${symbol} 데이터 로드 실패:`, error);
                return { symbol, success: false, error };
            }
        });
        
        // 모든 로딩 완료 대기
        const results = await Promise.all(loadPromises);
        
        // 결과 확인
        const successCount = results.filter(r => r.success).length;
        console.log(`데이터 로드 완료: ${successCount}/${this.symbols.length} 성공`);
    }

    async loadSymbolData(symbol) {
        try {
            console.log(`${symbol} 데이터 로딩 시작...`);
            
            const analyzer = new SymbolAnalyzer(symbol);
            await analyzer.loadData();
            
            this.analyzers[symbol] = analyzer;
            console.log(`${symbol} 데이터 로드 완료 - 현재가: ${analyzer.currentPrice}, 최고가: ${analyzer.yearHighPrice}`);
        } catch (error) {
            console.error(`${symbol} 데이터 로딩 실패:`, error);
            // 폴백: 모의 데이터 생성
            console.log(`${symbol} 모의 데이터 생성 중...`);
            const analyzer = new SymbolAnalyzer(symbol);
            analyzer.generateMockData();
            this.analyzers[symbol] = analyzer;
            console.log(`${symbol} 모의 데이터 생성 완료 - 현재가: ${analyzer.currentPrice}, 최고가: ${analyzer.yearHighPrice}`);
        }
    }

    switchToSymbol(symbol) {
        console.log(`${symbol}로 전환 시도 중...`);
        
        if (!this.analyzers[symbol]) {
            console.error(`${symbol} 데이터가 없습니다.`);
            return;
        }

        this.currentSymbol = symbol;
        
        // 탭 버튼 활성화 상태 변경
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeButton = document.querySelector(`[data-symbol="${symbol}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // 탭 컨텐츠 전환
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        const activePane = document.getElementById(`${symbol}-tab`);
        if (activePane) {
            activePane.classList.add('active');
        }
        
        // UI 업데이트 (강제로 다시 실행)
        this.updateUI(symbol);
        this.updateChart(symbol);
        this.updateETFInfo(symbol);
        
        console.log(`${symbol}로 전환 완료 - 분석기 데이터:`, this.analyzers[symbol]);
    }

    updateUI(symbol) {
        const analyzer = this.analyzers[symbol];
        if (!analyzer) {
            console.error(`${symbol} 분석기 데이터가 없습니다.`);
            return;
        }

        console.log(`${symbol} UI 업데이트 시작 - 현재가: ${analyzer.currentPrice}, 최고가: ${analyzer.yearHighPrice}`);

        // 현재가 업데이트
        const currentPriceElement = document.getElementById(`${symbol}-currentPrice`);
        if (currentPriceElement) {
            currentPriceElement.textContent = `$${analyzer.currentPrice.toFixed(2)}`;
        }
        
        const lastUpdatedElement = document.getElementById(`${symbol}-lastUpdated`);
        if (lastUpdatedElement) {
            const now = new Date();
            const timeString = now.toLocaleString('ko-KR');
            const dataSource = analyzer.isMockData ? ' (모의 데이터)' : ' (실시간)';
            lastUpdatedElement.textContent = timeString + dataSource;
        }
        
        // 1년 최고가 업데이트
        const yearHighPriceElement = document.getElementById(`${symbol}-yearHighPrice`);
        if (yearHighPriceElement) {
            yearHighPriceElement.textContent = `$${analyzer.yearHighPrice.toFixed(2)}`;
        }
        
        const highDateElement = document.getElementById(`${symbol}-highDate`);
        if (highDateElement) {
            highDateElement.textContent = analyzer.yearHighDate;
        }
        
        // 비교 분석 계산
        const vsHighPercent = ((analyzer.currentPrice - analyzer.yearHighPrice) / analyzer.yearHighPrice * 100);
        const vsHighDiff = analyzer.currentPrice - analyzer.yearHighPrice;
        const recoveryPercent = ((analyzer.yearHighPrice - analyzer.currentPrice) / analyzer.currentPrice * 100);
        
        // 최고가 대비 퍼센트
        const vsHighPercentElement = document.getElementById(`${symbol}-vsHighPercent`);
        if (vsHighPercentElement) {
            vsHighPercentElement.textContent = `${vsHighPercent.toFixed(2)}%`;
            vsHighPercentElement.className = `value ${vsHighPercent >= 0 ? 'positive' : 'negative'}`;
        }
        
        // 최고가와의 차이
        const vsHighDiffElement = document.getElementById(`${symbol}-vsHighDiff`);
        if (vsHighDiffElement) {
            vsHighDiffElement.textContent = `$${vsHighDiff.toFixed(2)}`;
            vsHighDiffElement.className = `value ${vsHighDiff >= 0 ? 'positive' : 'negative'}`;
        }
        
        // 회복 필요 비율
        const recoveryPercentElement = document.getElementById(`${symbol}-recoveryPercent`);
        if (recoveryPercentElement) {
            recoveryPercentElement.textContent = `${recoveryPercent.toFixed(2)}%`;
            recoveryPercentElement.className = 'value negative';
        }

        console.log(`${symbol} UI 업데이트 완료`);
    }

    updateChart(symbol) {
        const analyzer = this.analyzers[symbol];
        if (!analyzer || !analyzer.historicalData.length) return;

        // 기존 차트가 있다면 제거
        if (this.charts[symbol]) {
            this.charts[symbol].destroy();
        }

        const ctx = document.getElementById(`${symbol}-priceChart`).getContext('2d');
        
        // 차트 데이터 준비
        const labels = analyzer.historicalData.map(item => 
            item.date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
        );
        const prices = analyzer.historicalData.map(item => item.close);
        
        // 최고가 지점 찾기
        const maxIndex = prices.indexOf(Math.max(...prices));
        const maxPrice = Math.max(...prices);
        
        // 종목별 색상
        const colors = {
            'TQQQ': { border: '#3498db', background: 'rgba(52, 152, 219, 0.1)' },
            'SOXL': { border: '#e67e22', background: 'rgba(230, 126, 34, 0.1)' },
            'UPRO': { border: '#27ae60', background: 'rgba(39, 174, 96, 0.1)' }
        };
        
        this.charts[symbol] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${symbol} 가격`,
                    data: prices,
                    borderColor: colors[symbol].border,
                    backgroundColor: colors[symbol].background,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: function(context) {
                        return context.dataIndex === maxIndex ? 8 : 0;
                    },
                    pointHoverRadius: function(context) {
                        return context.dataIndex === maxIndex ? 12 : 6;
                    },
                    pointBackgroundColor: function(context) {
                        return context.dataIndex === maxIndex ? '#e74c3c' : colors[symbol].border;
                    },
                    pointBorderColor: function(context) {
                        return context.dataIndex === maxIndex ? '#fff' : colors[symbol].border;
                    },
                    pointBorderWidth: function(context) {
                        return context.dataIndex === maxIndex ? 3 : 1;
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: colors[symbol].border,
                        borderWidth: 1,
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                const date = analyzer.historicalData[index].date;
                                return date.toLocaleDateString('ko-KR', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                });
                            },
                            label: function(context) {
                                const price = context.parsed.y;
                                const isMaxPrice = context.dataIndex === maxIndex;
                                return isMaxPrice 
                                    ? `🎯 최고가: $${price.toFixed(2)}` 
                                    : `가격: $${price.toFixed(2)}`;
                            },
                            afterBody: function(context) {
                                if (context[0].dataIndex === maxIndex) {
                                    const date = analyzer.historicalData[maxIndex].date;
                                    return `📅 달성일: ${date.toLocaleDateString('ko-KR')}`;
                                }
                                return null;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: '날짜',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0,
                            maxTicksLimit: 8,
                            callback: function(value, index) {
                                // 최고가 날짜 강조
                                if (index === maxIndex) {
                                    return '🎯';
                                }
                                // 날짜를 간소화
                                const date = analyzer.historicalData[index].date;
                                return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
                            }
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '가격 ($)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    updateETFInfo(symbol) {
        const info = this.etfInfo[symbol];
        const infoElement = document.getElementById('current-etf-info');
        
        infoElement.innerHTML = `
            <ul>
                <li><strong>종목명:</strong> ${info.name}</li>
                <li><strong>티커:</strong> ${symbol}</li>
                <li><strong>유형:</strong> 레버리지 ETF</li>
                <li><strong>기초지수:</strong> ${info.index}</li>
            </ul>
        `;
    }

    async refreshCurrentSymbol() {
        this.showLoading(true);
        try {
            await this.loadSymbolData(this.currentSymbol);
            this.updateUI(this.currentSymbol);
            this.updateChart(this.currentSymbol);
        } catch (error) {
            console.error('새로고침 실패:', error);
            this.showError('데이터 새로고침 중 오류가 발생했습니다.');
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('hidden');
            this.updateLoadingProgress('초기화 중...', 0);
        } else {
            overlay.classList.add('hidden');
        }
    }

    updateLoadingProgress(text, progress) {
        const loadingText = document.getElementById('loadingText');
        const progressBar = document.getElementById('progressBar');
        const loadingProgress = document.getElementById('loadingProgress');
        
        if (loadingText) loadingText.textContent = text;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (loadingProgress) loadingProgress.textContent = `${Math.round(progress)}%`;
    }

    showError(message) {
        const container = document.querySelector('.container');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #e74c3c;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1001;
            max-width: 400px;
        `;
        errorDiv.textContent = message;
        container.appendChild(errorDiv);
        
        // 5초 후 에러 메시지 제거
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // 주기적 데이터 업데이트 (5분마다)
    startAutoUpdate() {
        setInterval(async () => {
            try {
                await this.loadSymbolData(this.currentSymbol);
                this.updateUI(this.currentSymbol);
            } catch (error) {
                console.error('자동 업데이트 실패:', error);
            }
        }, 5 * 60 * 1000); // 5분
    }
}

// 개별 종목 분석 클래스
class SymbolAnalyzer {
    constructor(symbol) {
        this.symbol = symbol;
        this.currentPrice = 0;
        this.yearHighPrice = 0;
        this.yearHighDate = '';
        this.historicalData = [];
        this.isMockData = false;
    }

    async loadData() {
        await Promise.all([
            this.loadCurrentPrice(),
            this.loadHistoricalData()
        ]);
        this.calculateYearHigh();
    }

    async loadCurrentPrice() {
        try {
            // 여러 API 소스를 시도 (Finnhub 우선)
            const apis = [
                this.tryFinnhubAPI(),
                this.tryYahooFinanceAPI(),
                this.tryPolygonAPI()
            ];
            
            for (let i = 0; i < apis.length; i++) {
                try {
                    const price = await apis[i];
                    if (price && price > 0) {
                        this.currentPrice = price;
                        const apiNames = ['Finnhub', 'Yahoo Finance', 'Polygon'];
                        console.log(`${this.symbol} 현재가 로드 성공 (${apiNames[i]}): $${price}`);
                        this.isMockData = false;
                        return;
                    }
                } catch (error) {
                    const apiNames = ['Finnhub', 'Yahoo Finance', 'Polygon'];
                    console.warn(`${this.symbol} ${apiNames[i]} API 시도 실패:`, error.message);
                    continue;
                }
            }
            
            // 모든 API 실패 시 모의 데이터 사용
            console.warn(`${this.symbol} 모든 API 실패, 모의 데이터 사용`);
            this.isMockData = true;
            this.generateMockCurrentPrice();
            
        } catch (error) {
            console.error(`${this.symbol} 현재가 로딩 실패:`, error);
            this.isMockData = true;
            this.generateMockCurrentPrice();
        }
    }

    async tryYahooFinanceAPI() {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${this.symbol}`;
        const response = await fetch(proxyUrl + encodeURIComponent(yahooUrl));
        const data = await response.json();
        
        const parsedData = JSON.parse(data.contents);
        const quote = parsedData.chart.result[0].meta;
        
        return quote.regularMarketPrice;
    }

    async tryAlphaVantageAPI() {
        // Alpha Vantage는 무료 API 키가 필요하므로 일단 스킵
        throw new Error('Alpha Vantage API 키 필요');
    }

    async tryIEXCloudAPI() {
        // IEX Cloud도 API 키가 필요하므로 일단 스킵
        throw new Error('IEX Cloud API 키 필요');
    }

    async tryPolygonAPI() {
        // Polygon.io 무료 API (일일 5회 제한)
        const apiKey = 'demo'; // 실제 사용시 무료 API 키 필요
        const url = `https://api.polygon.io/v1/last/stocks/${this.symbol}?apikey=${apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Polygon API 응답 실패');
        
        const data = await response.json();
        return data.results?.p;
    }

    async tryFinnhubAPI() {
        // Finnhub 무료 API (분당 60회 제한)
        const apiKey = 'd3noq61r01qhclk39ir0d3noq61r01qhclk39irg';
        const url = `https://finnhub.io/api/v1/quote?symbol=${this.symbol}&token=${apiKey}`;
        
        console.log(`${this.symbol} Finnhub API 호출 중...`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Finnhub API 응답 실패: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(`Finnhub API 에러: ${data.error}`);
        }
        
        if (!data.c || data.c === 0) {
            throw new Error('Finnhub API: 유효하지 않은 가격 데이터');
        }
        
        console.log(`${this.symbol} Finnhub API 성공: $${data.c}`);
        return data.c; // current price
    }

    generateMockCurrentPrice() {
        // 실제와 유사한 가격 범위로 모의 데이터 생성
        const priceRanges = {
            'TQQQ': { base: 45.50, volatility: 2.0 },
            'SOXL': { base: 35.20, volatility: 3.0 },
            'UPRO': { base: 62.80, volatility: 1.5 }
        };
        
        const range = priceRanges[this.symbol] || { base: 50, volatility: 2 };
        const variation = (Math.random() - 0.5) * range.volatility;
        this.currentPrice = Math.round((range.base + variation) * 100) / 100;
        
        console.log(`${this.symbol} 모의 현재가 생성: $${this.currentPrice}`);
    }

    async loadHistoricalData() {
        try {
            // Finnhub API로 히스토리컬 데이터 시도
            try {
                await this.loadHistoricalDataFromFinnhub();
                console.log(`${this.symbol} Finnhub 히스토리컬 데이터 로드 성공`);
                return;
            } catch (error) {
                console.warn(`${this.symbol} Finnhub 히스토리컬 데이터 실패:`, error.message);
            }
            
            // Yahoo Finance API로 폴백
            const endTime = Math.floor(Date.now() / 1000);
            const startTime = endTime - (365 * 24 * 60 * 60);
            
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${this.symbol}?period1=${startTime}&period2=${endTime}&interval=1d`;
            const response = await fetch(proxyUrl + encodeURIComponent(yahooUrl));
            const data = await response.json();
            
            const parsedData = JSON.parse(data.contents);
            const result = parsedData.chart.result[0];
            
            const timestamps = result.timestamp;
            const closes = result.indicators.quote[0].close;
            
            this.historicalData = timestamps.map((timestamp, index) => ({
                date: new Date(timestamp * 1000),
                close: closes[index]
            })).filter(item => item.close !== null);
            
            console.log(`${this.symbol} Yahoo Finance 히스토리컬 데이터 로드 성공`);
        } catch (error) {
            console.error(`${this.symbol} 히스토리컬 데이터 로딩 실패:`, error);
            throw error;
        }
    }

    async loadHistoricalDataFromFinnhub() {
        const apiKey = 'd3noq61r01qhclk39ir0d3noq61r01qhclk39irg';
        const endTime = Math.floor(Date.now() / 1000);
        const startTime = endTime - (365 * 24 * 60 * 60);
        
        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${this.symbol}&resolution=D&from=${startTime}&to=${endTime}&token=${apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Finnhub 히스토리컬 API 응답 실패: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.s !== 'ok') {
            throw new Error(`Finnhub 히스토리컬 API 에러: ${data.s}`);
        }
        
        if (!data.c || data.c.length === 0) {
            throw new Error('Finnhub 히스토리컬 API: 데이터 없음');
        }
        
        this.historicalData = data.t.map((timestamp, index) => ({
            date: new Date(timestamp * 1000),
            close: data.c[index]
        })).filter(item => item.close !== null);
    }

    generateMockData() {
        console.log(`${this.symbol} 모의 데이터 생성 중...`);
        
        // 종목별 기본 가격 범위 설정
        const priceRanges = {
            'TQQQ': { base: 45, volatility: 15 },
            'SOXL': { base: 35, volatility: 20 },
            'UPRO': { base: 60, volatility: 12 }
        };
        
        const range = priceRanges[this.symbol] || { base: 50, volatility: 15 };
        
        const data = [];
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        
        let currentPrice = range.base;
        let maxPrice = 0;
        let maxDate = startDate;
        
        for (let i = 0; i < 252; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            
            const change = (Math.random() - 0.5) * 2 * (range.volatility / 10);
            currentPrice = Math.max(range.base * 0.6, Math.min(range.base * 1.4, currentPrice + change));
            
            const roundedPrice = Math.round(currentPrice * 100) / 100;
            
            data.push({
                date: date,
                close: roundedPrice
            });
            
            // 최고가 추적
            if (roundedPrice > maxPrice) {
                maxPrice = roundedPrice;
                maxDate = date;
            }
        }
        
        this.historicalData = data;
        this.currentPrice = currentPrice;
        this.yearHighPrice = maxPrice;
        this.yearHighDate = maxDate.toLocaleDateString('ko-KR');
        
        console.log(`${this.symbol} 모의 데이터 생성 완료 - 현재가: ${this.currentPrice}, 최고가: ${this.yearHighPrice}, 최고가 날짜: ${this.yearHighDate}`);
    }

    calculateYearHigh() {
        if (this.historicalData.length === 0) return;
        
        let maxPrice = 0;
        let maxDate = '';
        
        this.historicalData.forEach(item => {
            if (item.close > maxPrice) {
                maxPrice = item.close;
                maxDate = item.date;
            }
        });
        
        this.yearHighPrice = maxPrice;
        this.yearHighDate = maxDate.toLocaleDateString('ko-KR');
    }
}

// Chart.js 기본 설정

// 페이지 로드 시 로그인 매니저 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 로그인 매니저 초기화
    window.loginManager = new LoginManager();
    
    console.log('로그인 시스템 초기화 완료');
    console.log('암호: snowball');
});