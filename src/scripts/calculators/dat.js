const dateForm = document.getElementById('kalkulator-dat-form');
if (dateForm) {
    document.getElementById('daty-koniec').value = new Date().toISOString().split('T')[0];
    dateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const start = document.getElementById('daty-start').value;
        const koniec = document.getElementById('daty-koniec').value;
        if (!start || !koniec) return;
        const startDate = new Date(start);
        const endDate = new Date(koniec);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById('daty-wynik-tekst').textContent = `${diffDays} dni`;
        document.getElementById('daty-wynik').classList.remove('hidden');
    });
}