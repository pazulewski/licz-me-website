function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-lokat-form', () => {
    const kwota = parseFloat(document.getElementById('lokata-kwota').value);
    const miesiace = parseInt(document.getElementById('lokata-okres').value);
    const procent = parseFloat(document.getElementById('lokata-oprocentowanie').value);
    if (isNaN(kwota) || isNaN(miesiace) || isNaN(procent)) return;
    const zyskBrutto = kwota * (procent / 100) * (miesiace / 12);
    const podatek = zyskBrutto * 0.19;
    const zyskNetto = zyskBrutto - podatek;
    document.getElementById('lokata-wynik-zysk').textContent = zyskNetto.toFixed(2) + ' PLN';
    document.getElementById('lokata-wynik').classList.remove('hidden');
});