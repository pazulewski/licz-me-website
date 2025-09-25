function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-kredytu-hipotecznego-form', () => {
    const kwota = parseFloat(document.getElementById('kredyt-kwota').value);
    const lata = parseFloat(document.getElementById('kredyt-okres').value);
    const procent = parseFloat(document.getElementById('kredyt-oprocentowanie').value);
    if (isNaN(kwota) || isNaN(lata) || isNaN(procent) || kwota <= 0 || lata <= 0 || procent <= 0) return;
    const r = (procent / 100) / 12;
    const n = lata * 12;
    const rata = kwota * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    document.getElementById('kredyt-wynik-rata').textContent = rata.toFixed(2) + ' PLN';
    document.getElementById('kredyt-wynik-calkowita').textContent = (rata * n).toFixed(2) + ' PLN';
    document.getElementById('kredyt-wynik').classList.remove('hidden');
});