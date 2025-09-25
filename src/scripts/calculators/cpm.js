function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-cpm-form', () => {
    const plec = document.getElementById('cpm-plec').value;
    const waga = parseFloat(document.getElementById('cpm-waga').value);
    const wzrost = parseFloat(document.getElementById('cpm-wzrost').value);
    const wiek = parseInt(document.getElementById('cpm-wiek').value);
    const aktywnosc = parseFloat(document.getElementById('cpm-aktywnosc').value);
    if (isNaN(waga) || isNaN(wzrost) || isNaN(wiek) || isNaN(aktywnosc)) return;
    let bmr;
    if (plec === 'mezczyzna') { bmr = 88.362 + (13.397 * waga) + (4.799 * wzrost) - (5.677 * wiek); }
    else { bmr = 447.593 + (9.247 * waga) + (3.098 * wzrost) - (4.330 * wiek); }
    const cpm = bmr * aktywnosc;
    document.getElementById('cpm-wynik-bmr').textContent = bmr.toFixed(0) + ' kcal';
    document.getElementById('cpm-wynik-cpm').textContent = cpm.toFixed(0) + ' kcal';
    document.getElementById('cpm-wynik').classList.remove('hidden');
});