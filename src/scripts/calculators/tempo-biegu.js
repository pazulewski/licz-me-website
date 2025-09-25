function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-tempa-biegu-form', () => {
    const dystans = parseFloat(document.getElementById('bieg-dystans').value);
    const h = parseInt(document.getElementById('bieg-godziny').value) || 0;
    const m = parseInt(document.getElementById('bieg-minuty').value) || 0;
    const s = parseInt(document.getElementById('bieg-sekundy').value) || 0;
    const tempoM = parseInt(document.getElementById('bieg-tempo-min').value) || 0;
    const tempoS = parseInt(document.getElementById('bieg-tempo-sek').value) || 0;
    const czasWSek = h * 3600 + m * 60 + s;
    const tempoWSek = tempoM * 60 + tempoS;
    let wynik = '';
    if (!isNaN(dystans) && czasWSek > 0) {
        const tempoNaKm = czasWSek / dystans;
        const tempoMinuty = Math.floor(tempoNaKm / 60);
        const tempoSekundy = Math.round(tempoNaKm % 60);
        wynik = `Twoje tempo to: ${tempoMinuty}'${tempoSekundy.toString().padStart(2, '0')}"/km`;
    } else if (!isNaN(dystans) && tempoWSek > 0) {
        const calkowityCzas = dystans * tempoWSek;
        const czasGodziny = Math.floor(calkowityCzas / 3600);
        const czasMinuty = Math.floor((calkowityCzas % 3600) / 60);
        const czasSekundy = Math.round(calkowityCzas % 60);
        wynik = `Pokonasz dystans w: ${czasGodziny}h ${czasMinuty}m ${czasSekundy}s`;
    } else if (czasWSek > 0 && tempoWSek > 0) {
        const obliczonyDystans = czasWSek / tempoWSek;
        wynik = `Przebiegniesz: ${obliczonyDystans.toFixed(2)} km`;
    } else {
        wynik = "Wypełnij dwa z trzech pól.";
    }
    document.getElementById('bieg-wynik-tekst').textContent = wynik;
    document.getElementById('bieg-wynik').classList.remove('hidden');
});