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
        // Здесь будет код для проверки подписок через Telegram API
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
    
    // Показ анимации достижения
    function showRewardAnimation() {
        rewardAnimation.classList.remove('hidden');
        setTimeout(() => {
            rewardAnimation.classList.add('hidden');
        }, 3000);
    }
    
    // Получение параметра из URL
    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
});