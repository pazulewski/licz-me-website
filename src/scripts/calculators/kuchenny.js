function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-kuchenny-form', () => {
    const ilosc = parseFloat(document.getElementById('kuch-ilosc').value) || 0;
    const jednostka = document.getElementById('kuch-jednostka').value;

    const przeliczniki = {
        maka_szklanka_g: 150,
        cukier_szklanka_g: 220,
        olej_szklanka_ml: 220,
        woda_szklanka_ml: 250,
        lyzka_ml: 15,
        lyzeczka_ml: 5,
    };

    let wynikText = '';
    switch(jednostka) {
        case 'maka_szklanka':
            wynikText = `${ilosc} szkl. mąki ≈ ${ilosc * przeliczniki.maka_szklanka_g} g`;
            break;
        case 'cukier_szklanka':
            wynikText = `${ilosc} szkl. cukru ≈ ${ilosc * przeliczniki.cukier_szklanka_g} g`;
            break;
        case 'olej_szklanka':
            wynikText = `${ilosc} szkl. oleju ≈ ${ilosc * przeliczniki.olej_szklanka_ml} ml`;
            break;
        case 'woda_szklanka':
            wynikText = `${ilosc} szkl. wody ≈ ${ilosc * przeliczniki.woda_szklanka_ml} ml`;
            break;
        case 'lyzka':
            wynikText = `${ilosc} łyżek ≈ ${ilosc * przeliczniki.lyzka_ml} ml`;
            break;
        case 'lyzeczka':
            wynikText = `${ilosc} łyżeczek ≈ ${ilosc * przeliczniki.lyzeczka_ml} ml`;
            break;
    }

    document.getElementById('kuch-wynik-tekst').textContent = wynikText;
    document.getElementById('kuch-wynik').classList.remove('hidden');
});