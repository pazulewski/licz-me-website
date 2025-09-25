function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-bmi-form', () => {
    const waga = parseFloat(document.getElementById('bmi-waga').value);
    const wzrost = parseFloat(document.getElementById('bmi-wzrost').value);
    if (isNaN(waga) || isNaN(wzrost) || waga <= 0 || wzrost <= 0) return;
    const bmi = waga / Math.pow(wzrost / 100, 2);
    let interpretacja, colorClass;
    if (bmi < 18.5) { interpretacja = 'Niedowaga'; colorClass = 'text-blue-600'; }
    else if (bmi < 25) { interpretacja = 'Waga prawidłowa'; colorClass = 'text-green-600'; }
    else if (bmi < 30) { interpretacja = 'Nadwaga'; colorClass = 'text-orange-500'; }
    else { interpretacja = 'Otyłość'; colorClass = 'text-red-600'; }
    document.getElementById('bmi-wynik-wartosc').textContent = bmi.toFixed(2);
    const interpretacjaEl = document.getElementById('bmi-wynik-interpretacja');
    interpretacjaEl.textContent = interpretacja;
    interpretacjaEl.className = `text-lg font-medium mt-2 ${colorClass}`;
    document.getElementById('bmi-wynik').classList.remove('hidden');
});