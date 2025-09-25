function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-umowa-zlecenie-form', () => {
    const brutto = parseFloat(document.getElementById('zlecenie-kwota').value);
    const status = document.getElementById('zlecenie-status').value;
    const chorobowe = document.getElementById('zlecenie-chorobowe').checked;
    if (isNaN(brutto) || brutto <= 0) return;
    let netto = brutto;
    if (status !== 'student') {
        const kosztyUzyskania = brutto * 0.2;
        const s_emerytalna = brutto * 0.0976;
        const s_rentowa = brutto * 0.015;
        const s_chorobowa = chorobowe ? brutto * 0.0245 : 0;
        const zus = s_emerytalna + s_rentowa + s_chorobowa;
        const podstawa_zdrowotna = brutto - zus;
        const s_zdrowotna = podstawa_zdrowotna * 0.09;
        const podstawa_opodatkowania = Math.round(brutto - kosztyUzyskania - zus);
        const zaliczka_pit = podstawa_opodatkowania * 0.12;
        netto = brutto - zus - s_zdrowotna - zaliczka_pit;
    }
    document.getElementById('zlecenie-wynik-kwota').textContent = netto.toFixed(2) + ' PLN';
    document.getElementById('zlecenie-wynik').classList.remove('hidden');
});