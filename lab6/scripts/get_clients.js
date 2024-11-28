async function fetchClient(id) {
    try {
        let response = await fetch(`https://dummyjson.com/users/${id}`, { signal: AbortSignal.timeout(10000) });
        if (!response.ok) {
            return Promise.reject(`Что-то пошло не так. Статус ошибки: ${response.status}`);
        }
        return await response.json();
    } catch(error) {
        if (error.name === 'AbortError') {
            return Promise.reject('Превышено время ожидания');
          } else {
            return Promise.reject(`Ошибка запроса: ${error.message}`);
          }
    }
    
};

async function fetchRandomClients() {
    let clients = Array.from({ length: 10 }, () => Math.floor(Math.random() * 200) + 1);
    let fetchPromises = clients.map(fetchClient);
    return await Promise.allSettled(fetchPromises);
};

async function loadClients() {
    let preloader = document.getElementById('preloader');
    let clientsList = document.getElementById('clients-list');

    results = await fetchRandomClients();
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            let user = result.value;
            let li = document.createElement('li');
            li.innerHTML = `
                <strong>${user.firstName} ${user.lastName}</strong><br>
                Почта: ${user.email}<br>
                Адрес: ${user.company.address.address}, ${user.company.address.city}, 
                ${user.company.address.state}, ${user.company.address.postalCode}, ${user.company.address.country}<br>
                Номер горячей линии: ${user.phone}<br>
                Компания: ${user.company.name}
            `;
            clientsList.appendChild(li);
        } else if (result.status === 'rejected') {
            let errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `${result.reason}`;
            clientsList.appendChild(errorMessage);
        }
    });
    preloader.style.display = 'none';
};

loadClients();
