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
            let strong = document.createElement('strong');
            let textNodeName = document.createTextNode(`${user.firstName} ${user.lastName}`);
            let textNodeEmail = document.createTextNode(`Почта: ${user.email}`);
            let textNodeCompanyAddress = document.createTextNode(`Адрес: ${user.company.address.address}, 
                ${user.company.address.city}, ${user.company.address.state}, 
                ${user.company.address.postalCode}, ${user.company.address.country}`);
            let textNodePhone = document.createTextNode(`Номер горячей линии: ${user.phone}`);
            let textNodeCompany = document.createTextNode(`Компания: ${user.company.name}`);

            strong.appendChild(textNodeName);
            li.appendChild(strong);
            li.appendChild(document.createElement('br'));
            li.appendChild(textNodeEmail);
            li.appendChild(document.createElement('br'));
            li.appendChild(textNodeCompanyAddress);
            li.appendChild(document.createElement('br'));
            li.appendChild(textNodePhone);
            li.appendChild(document.createElement('br'));
            li.appendChild(textNodeCompany);

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
