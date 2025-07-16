// Основной функционал приложения
document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            // Проверка на администратора
            const userId = user.uid;
            database.ref('users/' + userId).once('value').then(function(snapshot) {
                const userData = snapshot.val();
                
                if (userData && ADMIN_IDS.includes(parseInt(userData.telegramId))) {
                    if (!window.location.pathname.includes('admin.html')) {
                        window.location.href = 'admin.html';
                    }
                    loadAdminData();
                } else {
                    if (window.location.pathname.includes('admin.html')) {
                        window.location.href = 'dashboard.html';
                    }
                    loadUserData(userId);
                }
            });
        }
    });
    
    // Выход из системы
    if (document.getElementById('logout-btn')) {
        document.getElementById('logout-btn').addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                window.location.href = 'index.html';
            });
        });
    }
    
    // Выход для админа
    if (document.getElementById('admin-logout')) {
        document.getElementById('admin-logout').addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                window.location.href = 'index.html';
            });
        });
    }
});

function loadUserData(userId) {
    database.ref('users/' + userId).on('value', function(snapshot) {
        const userData = snapshot.val();
        
        if (userData) {
            // Заполняем данные в личном кабинете
            if (document.getElementById('username')) {
                document.getElementById('username').textContent = userData.username || 'Пользователь';
            }
            
            if (document.getElementById('ref-link')) {
                const refLink = window.location.origin + '/index.html?ref=' + userData.referralCode;
                document.getElementById('ref-link').value = refLink;
                
                // Копирование реферальной ссылки
                document.getElementById('copy-btn').addEventListener('click', function() {
                    navigator.clipboard.writeText(refLink).then(function() {
                        alert('Ссылка скопирована!');
                    });
                });
            }
            
            // Загрузка статистики
            if (document.getElementById('total-refs')) {
                document.getElementById('total-refs').textContent = userData.referralsCount || 0;
            }
            
            if (document.getElementById('total-earned')) {
                document.getElementById('total-earned').textContent = (userData.balance || 0).toFixed(2) + ' €';
            }
            
            // Проверка подписки на каналы
            checkChannelSubscriptions(userId, userData.telegramId);
        }
    });
}

function checkChannelSubscriptions(userId, telegramId) {
    const botToken = '8021685539:AAF-7553vrjyqSN8okqwnf1tmu5w3Kul2EA';
    let subscribedChannels = 0;
    
    Object.keys(CHANNELS).forEach(channel => {
        fetch(`https://api.telegram.org/bot${botToken}/getChatMember?chat_id=@${channel}&user_id=${telegramId}`)
            .then(response => response.json())
            .then(data => {
                if (data.ok && (data.result.status === 'member' || data.result.status === 'administrator' || data.result.status === 'creator')) {
                    subscribedChannels++;
                    updateUserBalance(userId, subscribedChannels);
                }
            });
    });
}

function updateUserBalance(userId, subscribedChannels) {
    // Расчет баланса по вашим правилам
    let earnedAmount = 0;
    
    if (subscribedChannels === 1) {
        earnedAmount = 0.20;
    } else if (subscribedChannels === 4) {
        earnedAmount = 0.56;
    }
    
    // Обновление баланса в базе данных
    database.ref('users/' + userId).transaction(function(user) {
        if (user) {
            user.balance = (user.balance || 0) + earnedAmount;
        }
        return user;
    });
}

function loadAdminData() {
    // Загрузка списка пользователей для админа
    database.ref('users').on('value', function(snapshot) {
        const users = snapshot.val();
        const tableBody = document.getElementById('users-table');
        
        if (tableBody) {
            tableBody.innerHTML = '';
            
            for (const userId in users) {
                if (users.hasOwnProperty(userId) {
                    const user = users[userId];
                    
                    if (!ADMIN_IDS.includes(parseInt(user.telegramId))) {
                        const row = document.createElement('tr');
                        
                        row.innerHTML = `
                            <td>${user.telegramId || '-'}</td>
                            <td>${user.username || 'Пользователь'}</td>
                            <td>${user.referralsCount || 0}</td>
                            <td>${(user.balance || 0).toFixed(2)} €</td>
                            <td>
                                <button class="btn btn-sm btn-warning block-user" data-id="${userId}">Блокировать</button>
                                <button class="btn btn-sm btn-danger delete-user" data-id="${userId}">Удалить</button>
                            </td>
                        `;
                        
                        tableBody.appendChild(row);
                    }
                }
            }
            
            // Обработчики для кнопок блокировки/удаления
            document.querySelectorAll('.block-user').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    const reason = prompt('Укажите причину блокировки:');
                    
                    if (reason) {
                        blockUser(userId, reason);
                    }
                });
            });
            
            document.querySelectorAll('.delete-user').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    const reason = prompt('Укажите причину удаления:');
                    
                    if (reason) {
                        deleteUser(userId, reason);
                    }
                });
            });
        }
    });
}

function blockUser(userId, reason) {
    database.ref('users/' + userId).update({
        isBlocked: true,
        blockReason: reason
    }).then(() => {
        alert('Пользователь заблокирован!');
    });
}

function deleteUser(userId, reason) {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        database.ref('users/' + userId).remove().then(() => {
            alert('Пользователь удален!');
        });
    }
}