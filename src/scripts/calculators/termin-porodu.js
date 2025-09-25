function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-terminu-porodu-form', () => {
    const dataStr = document.getElementById('porod-data').value;
    if (!dataStr) return;
    const data = new Date(dataStr);
    data.setDate(data.getDate() + 7);
    data.setMonth(data.getMonth() - 3);
    data.setFullYear(data.getFullYear() + 1);
    document.getElementById('porod-wynik-data').textContent = data.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('porod-wynik').classList.remove('hidden');
});