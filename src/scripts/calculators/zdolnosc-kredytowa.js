function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-zdolnosci-kredytowej-form', () => {
    const dochod = parseFloat(document.getElementById('zk-dochod').value) || 0;
    const wydatki = parseFloat(document.getElementById('zk-wydatki').value) || 0;
    const raty = parseFloat(document.getElementById('zk-raty').value) || 0;
    const osoby = parseInt(document.getElementById('zk-osoby').value) || 1;

    const minimumSocjalneNaOsobe = 1200; // Uproszczone założenie
    const dostepneSrodki = dochod - wydatki - raty - (osoby * minimumSocjalneNaOsobe);

    if (dostepneSrodki <= 0) {
        document.getElementById('zk-wynik-zdolnosc').textContent = "Brak zdolności kredytowej";
        document.getElementById('zk-wynik').classList.remove('hidden');
        return;
    }

    const maxRata = dostepneSrodki * 0.5;
    const okres = 300;
    const oprocentowanie = 0.08 / 12;
    const zdolnosc = maxRata * ( (Math.pow(1 + oprocentowanie, okres) - 1) / (oprocentowanie * Math.pow(1 + oprocentowanie, okres)) );

    document.getElementById('zk-wynik-zdolnosc').textContent = `~ ${Math.round(zdolnosc / 1000) * 1000} PLN`;
    document.getElementById('zk-wynik').classList.remove('hidden');
});