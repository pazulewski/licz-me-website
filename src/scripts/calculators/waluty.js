const currencyForm = document.getElementById('kalkulator-walut-form');
if (currencyForm) {
    let currencyData = null;
    const loadingEl = document.getElementById('waluty-ladowanie'), errorEl = document.getElementById('waluty-error');
    const selectZ = document.getElementById('waluty-z'), selectNa = document.getElementById('waluty-na');

    async function initCurrencyCalculator() {
        if (currencyData) return;
        loadingEl.classList.remove('hidden'); errorEl.classList.add('hidden');
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/PLN');
            if (!response.ok) throw new Error('Network response was not ok.');
            currencyData = await response.json();
            const { rates } = currencyData;
            const popularne = ['PLN', 'EUR', 'USD', 'GBP', 'CHF', 'CZK', 'UAH'];
            const filteredRates = Object.keys(rates).filter(w => popularne.includes(w));
            selectZ.innerHTML = ''; selectNa.innerHTML = '';
            filteredRates.forEach(w => {
                selectZ.innerHTML += `<option value="${w}">${w}</option>`;
                selectNa.innerHTML += `<option value="${w}">${w}</option>`;
            });
            selectZ.value = 'EUR'; selectNa.value = 'PLN';
            loadingEl.classList.add('hidden');
        } catch (error) {
            console.error("Błąd pobierania danych walutowych:", error);
            loadingEl.classList.add('hidden'); errorEl.classList.remove('hidden');
        }
    }

    currencyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currencyData) return;
        const kwota = parseFloat(document.getElementById('waluty-kwota').value);
        const z = selectZ.value, na = selectNa.value;
        if (isNaN(kwota)) return;
        const wynik = (kwota / currencyData.rates[z]) * currencyData.rates[na];
        document.getElementById('waluty-wynik-tekst').textContent = `${kwota.toFixed(2)} ${z} = ${wynik.toFixed(2)} ${na}`;
        document.getElementById('waluty-wynik').classList.remove('hidden');
    });

    initCurrencyCalculator();
}