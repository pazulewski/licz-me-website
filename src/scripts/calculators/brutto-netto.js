document.addEventListener('DOMContentLoaded', function() {
    const bnForm = document.getElementById('kalkulator-brutto-netto-form');
    if (bnForm) {
        const kwotaInput = document.getElementById('bn-kwota');
        const wynikDiv = document.getElementById('bn-wynik');
        const wynikText = document.getElementById('bn-wynik-tekst');
        const trybSelect = document.getElementById('bn-tryb');
        bnForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const kwota = parseFloat(kwotaInput.value);
            const tryb = trybSelect.value;
            if (isNaN(kwota) || kwota <= 0) return;
            let wynik = 0, opis = '';
            if (tryb === 'brutto-netto') {
                const s_emerytalna = kwota * 0.0976, s_rentowa = kwota * 0.015, s_chorobowa = kwota * 0.0245;
                const zus = s_emerytalna + s_rentowa + s_chorobowa;
                const podstawa_zdrowotna = kwota - zus;
                const s_zdrowotna = podstawa_zdrowotna * 0.09;
                const podstawa_opodatkowania = Math.round(podstawa_zdrowotna - 250);
                const zaliczka_pit = (podstawa_opodatkowania * 0.12) - 300;
                wynik = kwota - zus - s_zdrowotna - Math.max(0, zaliczka_pit);
                opis = `Twoje wynagrodzenie netto wynosi: <strong>${wynik.toFixed(2)} PLN</strong>`;
            } else {
                let bruttoGuess = kwota * 1.4;
                for (let i = 0; i < 30; i++) {
                    const s_emerytalna = bruttoGuess * 0.0976, s_rentowa = bruttoGuess * 0.015, s_chorobowa = bruttoGuess * 0.0245;
                    const zus = s_emerytalna + s_rentowa + s_chorobowa;
                    const podstawa_zdrowotna = bruttoGuess - zus;
                    const s_zdrowotna = podstawa_zdrowotna * 0.09;
                    const podstawa_opodatkowania = Math.round(podstawa_zdrowotna - 250);
                    const zaliczka_pit = (podstawa_opodatkowania * 0.12) - 300;
                    const nettoCalculated = bruttoGuess - zus - s_zdrowotna - Math.max(0, zaliczka_pit);
                    if (Math.abs(nettoCalculated - kwota) < 0.01) break;
                    bruttoGuess = bruttoGuess * (kwota / nettoCalculated);
                }
                wynik = bruttoGuess;
                opis = `Szacunkowe wynagrodzenie brutto wynosi: <strong>${wynik.toFixed(2)} PLN</strong>`;
            }
            wynikText.innerHTML = opis;
            wynikDiv.classList.remove('hidden');
        });
    }
});