function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-inflacji-form', () => {
    const kwota = parseFloat(document.getElementById('inf-kwota').value) || 0;
    const lata = parseInt(document.getElementById('inf-lata').value) || 0;
    const inflacja = parseFloat(document.getElementById('inf-stopa').value) || 0;

    const stopa = inflacja / 100;
    const przyszlaWartosc = kwota / Math.pow(1 + stopa, lata);

    document.getElementById('inf-wynik-tekst').innerHTML = `Za ${lata} lat, dzisiejsze <strong>${kwota.toFixed(2)} PLN</strong> będzie warte tyle, co dzisiaj <strong>${przyszlaWartosc.toFixed(2)} PLN</strong>.`;
    document.getElementById('inf-wynik').classList.remove('hidden');
});