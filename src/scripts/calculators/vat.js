function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-vat-form', () => {
    const kwota = parseFloat(document.getElementById('vat-kwota').value);
    const typ = document.getElementById('vat-typ').value;
    const stawka = parseFloat(document.getElementById('vat-stawka').value) / 100;
    if (isNaN(kwota)) return;
    let netto, brutto, vat;
    if (typ === 'brutto') {
        brutto = kwota;
        netto = kwota / (1 + stawka);
        vat = brutto - netto;
    } else {
        netto = kwota;
        vat = netto * stawka;
        brutto = netto + vat;
    }
    document.getElementById('vat-wynik-netto').textContent = netto.toFixed(2);
    document.getElementById('vat-wynik-vat').textContent = vat.toFixed(2);
    document.getElementById('vat-wynik-brutto').textContent = brutto.toFixed(2);
    document.getElementById('vat-wynik').classList.remove('hidden');
});