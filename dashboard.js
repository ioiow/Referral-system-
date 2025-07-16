<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }

        .dashboard-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        #logoutBtn {
            padding: 8px 15px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #logoutBtn:hover {
            background: #d32f2f;
        }

        .user-info {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 20px;
        }

        .balance-box, .referral-box, .stats-box {
            flex: 1;
            min-width: 250px;
            padding: 15px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }

        .balance {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
        }

        .referral-box input {
            width: 100%;
            padding: 8px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        #copyLinkBtn {
            padding: 8px 15px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #copyLinkBtn:hover {
            background: #0b7dda;
        }

        .progress-bar {
            width: 100%;
            height: 20px;
            background: #eee;
            border-radius: 10px;
            margin-top: 10px;
        }

        .progress {
            height: 100%;
            background: #4CAF50;
            border-radius: 10px;
            width: 0%;
            transition: width 0.3s;
        }

        .channels-box {
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .channels-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 15px 0;
        }

        .channel-link {
            display: inline-block;
            padding: 8px 15px;
            background: #2196F3;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        .channel-link:hover {
            background: #0b7dda;
        }

        #checkSubscriptionsBtn {
            padding: 10px 15px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        #checkSubscriptionsBtn:hover {
            background: #45a049;
        }

        .milestones {
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }

        .milestones ul {
            list-style-type: none;
            padding: 0;
        }

        .milestones li {
            padding: 8px;
            margin: 5px 0;
            background: #f9f9f9;
            border-radius: 5px;
        }

        .milestones li.completed {
            background: #e8f5e9;
            color: #2e7d32;
        }

        .reward-animation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 1000;
            animation: bounce 1s;
        }

        .hidden {
            display: none;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translate(-50%, -50%);}
            40% {transform: translate(-50%, -60%);}
            60% {transform: translate(-50%, -40%);}
        }

        @media (max-width: 600px) {
            .user-info {
                flex-direction: column;
            }
            
            .balance-box, .referral-box, .stats-box {
                min-width: 100%;
            }
            
            .channels-list {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <header>
            <h1>Личный кабинет</h1>
            <button id="logoutBtn">Выйти</button>
        </header>
        
        <div class="user-info">
            <div class="balance-box">
                <h2>Ваш баланс</h2>
                <p class="balance">$0.00</p>
            </div>
            
            <div class="referral-box">
                <h2>Реферальная ссылка</h2>
                <input type="text" id="referralLink" readonly>
                <button id="copyLinkBtn">Копировать</button>
            </div>
            
            <div class="stats-box">
                <h2>Статистика</h2>
                <p>Приглашено: <span id="referralsCount">0</span> человек</p>
                <p>Ваш ранг: <span id="userRank">Новичок</span></p>
                <div class="progress-bar">
                    <div class="progress" id="rankProgress"></div>
                </div>
            </div>
        </div>
        
        <div class="channels-box">
            <h2>Подпишитесь на наши каналы</h2>
            <div class="channels-list">
                <a href="https://t.me/IT_Programmer_io" target="_blank" class="channel-link">IT Programmer</a>
                <a href="https://t.me/Kino_vek" target="_blank" class="channel-link">Кино век</a>
                <a href="https://t.me/Iruma_Standoff2" target="_blank" class="channel-link">Iruma Standoff2</a>
                <a href="https://t.me/findpersonbynickname" target="_blank" class="channel-link">Find Person</a>
            </div>
            <button id="checkSubscriptionsBtn">Проверить подписки</button>
        </div>
        
        <div class="milestones">
            <h2>Система рангов</h2>
            <ul id="milestonesList">
                <!-- Будут заполняться динамически -->
            </ul>
        </div>
    </div>
    
    <div id="rewardAnimation" class="reward-animation hidden">
        <h2>Поздравляем!</h2>
        <p>Вы достигли нового ранга!</p>
        <p>Ваш доход увеличен!</p>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js"></script>
    <script>
        // Инициализация Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCEiuwSztOHlrYlowK0pJJS2Qr70pfVTNs",
            authDomain: "referral-system-350c1.firebaseapp.com",
            databaseURL: "https://referral-system-350c1-default-rtdb.firebaseio.com",
            projectId: "referral-system-350c1",
            storageBucket: "referral-system-350c1.firebasestorage.app",
            messagingSenderId: "856238997623",
            appId: "1:856238997623:web:95770afa4a6c2a6d21c672",
            measurementId: "G-7TX2MGGSFF"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const username = getUrlParameter('username');
            if (!username) {
                window.location.href = 'index.html';
                return;
            }
            
            // Элементы интерфейса
            const logoutBtn = document.getElementById('logoutBtn');
            const balanceElement = document.getElementById('balance');
            const referralsCountElement = document.getElementById('referralsCount');
            const userRankElement = document.getElementById('userRank');
            const rankProgressElement = document.getElementById('rankProgress');
            const referralLinkElement = document.getElementById('referralLink');
            const copyLinkBtn = document.getElementById('copyLinkBtn');
            const checkSubscriptionsBtn = document.getElementById('checkSubscriptionsBtn');
            const milestonesList = document.getElementById('milestonesList');
            const rewardAnimation = document.getElementById('rewardAnimation');
            
            // Система рангов
            const rankSystem = [
                { minReferrals: 0, name: "Новичок", rate: 0.56 },
                { minReferrals: 100, name: "Активный", rate: 0.65 },
                { minReferrals: 350, name: "Продвинутый", rate: 0.75 },
                { minReferrals: 1000, name: "Эксперт", rate: 0.85 },
                { minReferrals: 2500, name: "Мастер", rate: 1.00 },
                { minReferrals: 5000, name: "Гуру", rate: 1.20 },
                { minReferrals: 10000, name: "Легенда", rate: 1.50 }
            ];
            
            // Загружаем данные пользователя
            let userData;
            database.ref('users/' + username).on('value', snapshot => {
                userData = snapshot.val();
                if (userData) {
                    updateUI(userData);
                }
            });
            
            // Обновление интерфейса
            function updateUI(data) {
                balanceElement.textContent = '$' + data.balance.toFixed(2);
                referralsCountElement.textContent = data.referrals;
                
                // Определяем текущий ранг
                let currentRank = rankSystem[0];
                let nextRank = rankSystem[1];
                
                for (let i = rankSystem.length - 1; i >= 0; i--) {
                    if (data.referrals >= rankSystem[i].minReferrals) {
                        currentRank = rankSystem[i];
                        nextRank = rankSystem[i+1] || null;
                        break;
                    }
                }
                
                userRankElement.textContent = currentRank.name;
                
                // Прогресс до следующего ранга
                if (nextRank) {
                    const progress = ((data.referrals - currentRank.minReferrals) / 
                                   (nextRank.minReferrals - currentRank.minReferrals)) * 100;
                    rankProgressElement.style.width = progress + '%';
                } else {
                    rankProgressElement.style.width = '100%';
                }
                
                // Реферальная ссылка
                referralLinkElement.value = window.location.origin + '/index.html?ref=' + data.referralCode;
                
                // Обновляем список достижений
                updateMilestonesList(data.referrals);
            }
            
            // Обновление списка достижений
            function updateMilestonesList(referralsCount) {
                milestonesList.innerHTML = '';
                
                rankSystem.forEach(rank => {
                    const li = document.createElement('li');
                    if (referralsCount >= rank.minReferrals) {
                        li.classList.add('completed');
                        li.innerHTML = `✓ ${rank.name} (${rank.minReferrals}+ рефералов) - $${rank.rate} за подписку`;
                    } else {
                        li.innerHTML = `${rank.name} (${rank.minReferrals} рефералов) - $${rank.rate} за подписку`;
                    }
                    milestonesList.appendChild(li);
                });
            }
            
            // Проверка подписок на каналы
            checkSubscriptionsBtn.addEventListener('click', function() {
                alert('Функция проверки подписок будет работать после интеграции с Telegram API');
            });
            
            // Копирование реферальной ссылки
            copyLinkBtn.addEventListener('click', function() {
                referralLinkElement.select();
                document.execCommand('copy');
                alert('Ссылка скопирована в буфер обмена!');
            });
            
            // Выход из системы
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('savedUsername');
                localStorage.removeItem('savedPassword');
                window.location.href = 'index.html';
            });
            
            // Получение параметра из URL
            function getUrlParameter(name) {
                name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
                const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                const results = regex.exec(location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            }
        });
    </script>
</body>
</html>
