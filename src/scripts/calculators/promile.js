function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-promili-form', () => {
    const plec = document.getElementById('prom-plec').value;
    const waga = parseFloat(document.getElementById('prom-waga').value) || 0;
    const ilosc = parseFloat(document.getElementById('prom-ilosc').value) || 0;
    const procent = parseFloat(document.getElementById('prom-procent').value) || 0;
    const czas = parseFloat(document.getElementById('prom-czas').value) || 0;

    if (waga <= 0) return;

    const K = (plec === 'mezczyzna') ? 0.7 : 0.6;
    const A = ilosc * (procent / 100) * 0.79;

    let promile = A / (K * waga);

    promile -= czas * 0.15;

    const wynik = Math.max(0, promile);

    document.getElementById('prom-wynik-wartosc').textContent = wynik.toFixed(2) + ' ‰';
    document.getElementById('prom-wynik').classList.remove('hidden');
});