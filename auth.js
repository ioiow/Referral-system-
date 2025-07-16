document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Проверяем, есть ли сохраненные данные для входа
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedUsername && savedPassword) {
        usernameInput.value = savedUsername;
        passwordInput.value = savedPassword;
    }
    
    // Регистрация нового пользователя
    registerBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username && password) {
            // Проверяем, существует ли уже пользователь
            database.ref('users/' + username).once('value').then(snapshot => {
                if (snapshot.exists()) {
                    alert('Этот логин уже занят!');
                } else {
                    // Создаем нового пользователя
                    const userData = {
                        username: username,
                        password: password,
                        balance: 0,
                        referrals: 0,
                        rank: 1,
                        referralCode: generateReferralCode(),
                        referredBy: getUrlParameter('ref') || null,
                        createdAt: firebase.database.ServerValue.TIMESTAMP
                    };
                    
                    database.ref('users/' + username).set(userData)
                        .then(() => {
                            localStorage.setItem('savedUsername', username);
                            localStorage.setItem('savedPassword', password);
                            alert('Регистрация успешна!');
                            window.location.href = 'dashboard.html?username=' + username;
                        })
                        .catch(error => {
                            alert('Ошибка регистрации: ' + error.message);
                        });
                }
            });
        } else {
            alert('Пожалуйста, введите логин и пароль!');
        }
    });
    
    // Вход существующего пользователя
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username && password) {
            database.ref('users/' + username).once('value').then(snapshot => {
                const userData = snapshot.val();
                
                if (userData && userData.password === password) {
                    localStorage.setItem('savedUsername', username);
                    localStorage.setItem('savedPassword', password);
                    window.location.href = 'dashboard.html?username=' + username;
                } else {
                    alert('Неверный логин или пароль!');
                }
            }).catch(error => {
                alert('Ошибка входа: ' + error.message);
            });
        } else {
            alert('Пожалуйста, введите логин и пароль!');
        }
    });
    
    // Генерация реферального кода
    function generateReferralCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    
    // Получение параметра из URL
    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
});