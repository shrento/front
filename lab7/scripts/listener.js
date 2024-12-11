(function () {
    window.addEventListener('load', () => {
        let loadingTime = performance.now();
        let message = `Страница загружена за ${loadingTime.toFixed(2)} миллисекунд`;
        let footer = document.getElementsByTagName('footer')[0];
        footer.innerHTML += `<p>${message}</p>`;
    });
})();