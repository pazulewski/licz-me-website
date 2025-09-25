function handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}

handleForm('kalkulator-1rm-form', () => {
    const ciezar = parseFloat(document.getElementById('rm-ciezar').value);
    const powtorzenia = parseInt(document.getElementById('rm-powtorzenia').value);
    if (isNaN(ciezar) || isNaN(powtorzenia) || ciezar <= 0 || powtorzenia <= 0) return;
    const rm = ciezar * (1 + (powtorzenia / 30));
    document.getElementById('rm-wynik-wartosc').textContent = rm.toFixed(1) + ' kg';
    document.getElementById('rm-wynik').classList.remove('hidden');
});