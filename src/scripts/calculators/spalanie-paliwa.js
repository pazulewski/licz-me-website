function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-spalania-paliwa-form', () => {
    const dystans = parseFloat(document.getElementById('paliwo-dystans').value);
    const spalone = parseFloat(document.getElementById('paliwo-spalone').value);
    const cena = parseFloat(document.getElementById('paliwo-cena').value);
    if (isNaN(dystans) || isNaN(spalone) || dystans <= 0 || spalone <= 0) return;
    const spalanie = (spalone / dystans) * 100;
    document.getElementById('paliwo-wynik-spalanie').textContent = spalanie.toFixed(2) + ' l/100km';
    if (!isNaN(cena) && cena > 0) {
        const koszt = spalanie * cena;
        document.getElementById('paliwo-wynik-koszt').textContent = koszt.toFixed(2) + ' PLN';
    } else {
        document.getElementById('paliwo-wynik-koszt').textContent = '-';
    }
    document.getElementById('paliwo-wynik').classList.remove('hidden');
});