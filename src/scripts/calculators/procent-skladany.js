function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-procentu-skladanego-form', () => {
    const wklad = parseFloat(document.getElementById('ps-wklad').value) || 0;
    const doplata = parseFloat(document.getElementById('ps-doplata').value) || 0;
    const lata = parseInt(document.getElementById('ps-lata').value) || 0;
    const procent = parseFloat(document.getElementById('ps-procent').value) || 0;

    const r = procent / 100;
    const n = 12;
    const t = lata;

    let kwota = wklad * Math.pow(1 + r/n, n*t);
    if (doplata > 0) {
         kwota += doplata * ( (Math.pow(1 + r/n, n*t) - 1) / (r/n) );
    }

    const wplacono = wklad + (doplata * 12 * lata);
    const zysk = kwota - wplacono;

    document.getElementById('ps-wynik-kwota').textContent = kwota.toFixed(2) + ' PLN';
    document.getElementById('ps-wynik-wplacono').textContent = wplacono.toFixed(2) + ' PLN';
    document.getElementById('ps-wynik-zysk').textContent = zysk.toFixed(2) + ' PLN';
    document.getElementById('ps-wynik').classList.remove('hidden');
});