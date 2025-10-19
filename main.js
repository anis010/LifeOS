// My System - Main JavaScript
class MySystem {
    constructor() {
        this.charts = {};
        this.aiCompanion = null;
        this.init();
    }

    init() {
        this.initAnimations();
        this.initCharts();
        this.initAICompanion();
        this.initScrollAnimations();
        this.initMetricCards();
    }

    initAnimations() {
        // Initialize text splitting animation
        if (typeof Splitting !== 'undefined') {
            Splitting();
            
            // Animate hero title
            anime({
                targets: '.splitting .char',
                translateY: [100, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1400,
                delay: (el, i) => 30 * i
            });
        }

        // Animate hero elements
        anime({
            targets: '.hero .subtitle',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 500
        });

        anime({
            targets: '.hero .description',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 700
        });

        anime({
            targets: '.cta-button',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 900
        });
    }

    initCharts() {
        // Main dashboard chart
        this.createMainDashboard();
        
        // Individual metric charts
        this.createFinanceChart();
        this.createHealthChart();
        this.createSpiritChart();
        this.createHabitsChart();
        this.createCareerChart();
    }

    createMainDashboard() {
        const chartDom = document.getElementById('main-dashboard');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            title: {
                text: 'Life Balance Overview',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#cc8b3c',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(26, 26, 46, 0.9)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                textStyle: {
                    color: '#f5f5f5'
                }
            },
            radar: {
                indicator: [
                    { name: 'Finance', max: 100, color: '#cc8b3c' },
                    { name: 'Health', max: 100, color: '#7fb069' },
                    { name: 'Spirituality', max: 100, color: '#c17767' },
                    { name: 'Habits', max: 100, color: '#cc8b3c' },
                    { name: 'Career', max: 100, color: '#7fb069' }
                ],
                shape: 'polygon',
                splitNumber: 4,
                axisName: {
                    color: '#f5f5f5',
                    fontSize: 12
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            series: [{
                name: 'Life Metrics',
                type: 'radar',
                data: [{
                    value: [87, 92, 78, 85, 89],
                    name: 'Current Status',
                    areaStyle: {
                        color: 'rgba(204, 139, 60, 0.2)'
                    },
                    lineStyle: {
                        color: '#cc8b3c',
                        width: 2
                    },
                    itemStyle: {
                        color: '#cc8b3c'
                    }
                }],
                animationDuration: 2000,
                animationEasing: 'cubicOut'
            }]
        };

        myChart.setOption(option);
        this.charts.main = myChart;

        // Animate chart appearance
        setTimeout(() => {
            myChart.resize();
        }, 100);
    }

    createFinanceChart() {
        const chartDom = document.getElementById('finance-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            grid: {
                left: '10%',
                right: '10%',
                top: '10%',
                bottom: '10%'
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(245, 245, 245, 0.6)',
                    fontSize: 10
                }
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [{
                data: [8200, 9100, 8800, 9500, 10200, 11000],
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#cc8b3c',
                    width: 3
                },
                itemStyle: {
                    color: '#cc8b3c'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(204, 139, 60, 0.3)' },
                            { offset: 1, color: 'rgba(204, 139, 60, 0.05)' }
                        ]
                    }
                },
                animationDuration: 1500,
                animationDelay: 300
            }]
        };

        myChart.setOption(option);
        this.charts.finance = myChart;
    }

    createHealthChart() {
        const chartDom = document.getElementById('health-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            series: [{
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 5,
                itemStyle: {
                    color: '#7fb069'
                },
                progress: {
                    show: true,
                    width: 8
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 8,
                        color: [
                            [0.3, '#c17767'],
                            [0.7, '#cc8b3c'],
                            [1, '#7fb069']
                        ]
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 92,
                    name: 'Health Score'
                }],
                animationDuration: 2000,
                animationDelay: 500
            }]
        };

        myChart.setOption(option);
        this.charts.health = myChart;
    }

    createSpiritChart() {
        const chartDom = document.getElementById('spirit-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 78, name: 'Practice', itemStyle: { color: '#c17767' } },
                    { value: 22, name: 'Remaining', itemStyle: { color: 'rgba(193, 119, 103, 0.2)' } }
                ],
                label: {
                    show: false
                },
                emphasis: {
                    disabled: true
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDuration: 2000,
                animationDelay: 700
            }]
        };

        myChart.setOption(option);
        this.charts.spirit = myChart;
    }

    createHabitsChart() {
        const chartDom = document.getElementById('habits-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            grid: {
                left: '15%',
                right: '10%',
                top: '10%',
                bottom: '10%'
            },
            xAxis: {
                type: 'value',
                max: 100,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false }
            },
            yAxis: {
                type: 'category',
                data: ['Exercise', 'Meditate', 'Read', 'Journal', 'Sleep'],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(245, 245, 245, 0.8)',
                    fontSize: 11
                }
            },
            series: [{
                type: 'bar',
                data: [85, 90, 75, 88, 92],
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 1, y2: 0,
                        colorStops: [
                            { offset: 0, color: '#cc8b3c' },
                            { offset: 1, color: '#7fb069' }
                        ]
                    },
                    borderRadius: [0, 5, 5, 0]
                },
                barWidth: '60%',
                animationDuration: 1500,
                animationDelay: 900
            }]
        };

        myChart.setOption(option);
        this.charts.habits = myChart;
    }

    createCareerChart() {
        const chartDom = document.getElementById('career-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            grid: {
                left: '10%',
                right: '10%',
                top: '10%',
                bottom: '10%'
            },
            xAxis: {
                type: 'category',
                data: ['Q1', 'Q2', 'Q3', 'Q4'],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgba(245, 245, 245, 0.6)',
                    fontSize: 10
                }
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [{
                data: [75, 82, 85, 89],
                type: 'bar',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: '#7fb069' },
                            { offset: 1, color: 'rgba(127, 176, 105, 0.6)' }
                        ]
                    },
                    borderRadius: [5, 5, 0, 0]
                },
                barWidth: '50%',
                animationDuration: 1500,
                animationDelay: 1100
            }]
        };

        myChart.setOption(option);
        this.charts.career = myChart;
    }

    initAICompanion() {
        this.aiCompanion = document.getElementById('aiCompanion');
        if (!this.aiCompanion) return;

        // Floating animation
        anime({
            targets: this.aiCompanion,
            translateY: [-10, 10],
            duration: 3000,
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true
        });

        // Click handler
        this.aiCompanion.addEventListener('click', () => {
            this.showAICompanionDialog();
        });

        // Contextual messages
        setInterval(() => {
            this.showContextualMessage();
        }, 30000); // Every 30 seconds
    }

    showAICompanionDialog() {
        const messages = [
            "Hi! I'm Ain, your AI companion. I've noticed you've been consistent with your morning routine. Keep it up! 🦉",
            "Your financial health improved by 5% this month. The envelope budgeting system is working well for you.",
            "I've detected a pattern: your sleep quality improves when you meditate before bed. Consider making it a habit.",
            "Your career progress is accelerating! The new skills you've been learning are paying off.",
            "Would you like me to suggest a personalized workout based on your recent HRV data?",
            "Your spiritual practice consistency is beautiful to see. How about trying a 5-minute evening reflection?"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Create and show dialog
        this.showNotification(randomMessage, 'info');
    }

    showContextualMessage() {
        const time = new Date().getHours();
        let message = "";

        if (time < 12) {
            message = "Good morning! Welcome to My System - your AI companion for life optimization. Ready to explore? 🌅";
        } else if (time < 18) {
            message = "Welcome to My System! Click around and experience unified life management. No signup needed! ☀️";
        } else {
            message = "Welcome to My System! Explore freely - every module is available to try. Your data stays private. 🌙";
        }

        this.showNotification(message, 'gentle');
    }

    showWelcomeMessage() {
        const welcomeMessages = [
            "Welcome to My System! 🎉 I'm Ain, your AI companion. Click around and explore - every feature is available to try!",
            "This is your personal LifeOS - no signup required! Try the dashboard, explore modules, and see how unified optimization feels. ✨",
            "Your privacy is paramount. Everything stays on your device. Experience the future of personal technology today! 🔒"
        ];

        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        this.showNotification(randomMessage, 'welcome');
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.ai-notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `ai-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <img src="resources/ain-owl.png" alt="Ain" class="notification-icon">
                <div class="notification-message">${message}</div>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            max-width: 300px;
            background: rgba(26, 26, 46, 0.95);
            border: 1px solid rgba(204, 139, 60, 0.3);
            border-radius: 15px;
            padding: 15px;
            backdrop-filter: blur(20px);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: flex-start;
            gap: 10px;
        `;

        const icon = notification.querySelector('.notification-icon');
        icon.style.cssText = `
            width: 30px;
            height: 30px;
            border-radius: 50%;
            flex-shrink: 0;
        `;

        const messageEl = notification.querySelector('.notification-message');
        messageEl.style.cssText = `
            color: #f5f5f5;
            font-size: 14px;
            line-height: 1.4;
            flex: 1;
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #f5f5f5;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin: -5px -5px 0 0;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close handlers
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initMetricCards() {
        const cards = document.querySelectorAll('.metric-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const domain = card.dataset.domain;
                this.showDomainDetails(domain);
            });

            // Hover effects
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    showDomainDetails(domain) {
        const domainInfo = {
            finance: {
                title: 'Financial Health',
                description: 'Your financial wellness is at 87%. The envelope budgeting system has helped you save 15% more this month. Your investment portfolio is diversified and growing steadily.',
                insights: [
                    'Spending pattern: 40% essentials, 30% lifestyle, 20% savings, 10% investments',
                    'Emergency fund: 6 months of expenses covered ✅',
                    'Debt-to-income ratio: Healthy at 15%'
                ]
            },
            health: {
                title: 'Physical Wellness',
                description: 'Excellent health metrics at 92%! Your consistent workout routine and balanced nutrition are paying off. HRV indicates good recovery and stress management.',
                insights: [
                    'Weekly exercise: 5 sessions (3 strength, 2 cardio)',
                    'Sleep quality: 8.2/10 average, consistent bedtime',
                    'Nutrition: Hitting all micronutrient targets'
                ]
            },
            spirituality: {
                title: 'Spiritual Growth',
                description: 'Your spiritual practice is flourishing at 78%. Daily meditation and reflection have increased your mindfulness and inner peace significantly.',
                insights: [
                    'Meditation streak: 45 days consecutive',
                    'Prayer/reflection: 20 minutes daily average',
                    'Community connection: Active in spiritual groups'
                ]
            },
            habits: {
                title: 'Habit Strength',
                description: 'Strong habit formation at 85%. Your atomic habits are compounding into significant life improvements. Keystone habits are positively impacting multiple areas.',
                insights: [
                    'Morning routine: 90% consistency rate',
                    'Learning habit: 30 minutes daily reading',
                    'Health habits: Exercise, nutrition, sleep tracking'
                ]
            },
            career: {
                title: 'Career Progress',
                description: 'Career trajectory looking great at 89%! Your skill development and networking efforts are opening new opportunities. Leadership qualities becoming evident.',
                insights: [
                    'Skill development: 3 new certifications this quarter',
                    'Network growth: 50+ meaningful connections',
                    'Project success: 95% on-time delivery rate'
                ]
            }
        };

        const info = domainInfo[domain];
        if (!info) return;

        const modal = document.createElement('div');
        modal.className = 'domain-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${info.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${info.description}</p>
                    <div class="insights">
                        <h3>Key Insights</h3>
                        <ul>
                            ${info.insights.map(insight => `<li>${insight}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: rgba(26, 26, 46, 0.95);
            border: 1px solid rgba(204, 139, 60, 0.3);
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            backdrop-filter: blur(20px);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        const header = modal.querySelector('.modal-header');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        `;

        const title = modal.querySelector('h2');
        title.style.cssText = `
            color: #cc8b3c;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0;
        `;

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #f5f5f5;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            margin: 0;
        `;

        const body = modal.querySelector('.modal-body');
        body.style.cssText = `
            color: #f5f5f5;
            line-height: 1.6;
        `;

        const insights = modal.querySelector('.insights');
        insights.style.cssText = `
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        `;

        const insightsTitle = modal.querySelector('.insights h3');
        insightsTitle.style.cssText = `
            color: #7fb069;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
        `;

        const list = modal.querySelector('.insights ul');
        list.style.cssText = `
            list-style: none;
            padding: 0;
        `;

        const listItems = modal.querySelectorAll('.insights li');
        listItems.forEach(item => {
            item.style.cssText = `
                padding: 0.5rem 0;
                padding-left: 1.5rem;
                position: relative;
            `;
            
            const marker = document.createElement('span');
            marker.textContent = '→';
            marker.style.cssText = `
                position: absolute;
                left: 0;
                color: #7fb069;
                font-weight: bold;
            `;
            item.insertBefore(marker, item.firstChild);
        });

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 100);

        // Close handlers
        const closeModal = () => {
            modal.style.opacity = '0';
            content.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Resize charts on window resize
    handleResize() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.mySystemInstance = new MySystem();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        window.mySystemInstance.handleResize();
    });

    // Add some interactive particles effect
    createParticleEffect();
    
    // Show welcome message on first visit
    setTimeout(() => {
        if (window.mySystemInstance) {
            window.mySystemInstance.showWelcomeMessage();
        }
    }, 3000);
});

function createParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(204, 139, 60, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(127, 176, 105, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Global functions for direct access
function startExploring() {
    if (window.mySystemInstance) {
        window.mySystemInstance.startExploring();
    }
}

function showWelcomeMessage() {
    if (window.mySystemInstance) {
        window.mySystemInstance.showWelcomeMessage();
    }
}