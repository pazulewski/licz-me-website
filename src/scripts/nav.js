document.addEventListener('DOMContentLoaded', function() {
    const calculatorConfig = [
        // Konfiguracja nawigacji
        {
            category: 'Finanse i Podatki',
            items: [
                { url: '/kalkulator-brutto-netto', name: 'Brutto-Netto (UoP)' },
                { url: '/kalkulator-umowa-zlecenie', name: 'Umowa Zlecenie' },
                { url: '/kalkulator-kredytu-hipotecznego', name: 'Kredyt Hipoteczny' },
                { url: '/kalkulator-zdolnosci-kredytowej', name: 'Zdolność Kredytowa' },
                { url: '/kalkulator-lokat', name: 'Lokaty Bankowe' },
                { url: '/kalkulator-procentu-skladanego', name: 'Procent Składany' },
                { url: '/kalkulator-inflacji', name: 'Inflacja' },
                { url: '/kalkulator-vat', name: 'VAT' },
                { url: '/kalkulator-walut', name: 'Walutowy' }
            ]
        },
        {
            category: 'Zdrowie i Styl Życia',
            items: [
                { url: '/kalkulator-bmi', name: 'BMI' },
                { url: '/kalkulator-cpm', name: 'Zapotrzebowanie Kaloryczne' },
                { url: '/kalkulator-terminu-porodu', name: 'Termin Porodu' },
                { url: '/kalkulator-promili', name: 'Promile' }
            ]
        },
        {
            category: 'Sport i Fitness',
            items: [
                { url: '/kalkulator-1rm', name: '1RM (Maks. Ciężar)' },
                { url: '/kalkulator-tempa-biegu', name: 'Tempo Biegu' }
            ]
        },
        {
            category: 'Dom i Codzienność',
            items: [
                { url: '/kalkulator-spalania-paliwa', name: 'Spalanie Paliwa' },
                { url: '/kalkulator-dat', name: 'Różnica Dat' },
                { url: '/kalkulator-kuchenny', name: 'Kuchenny' }
            ]
        }
    ];

    // --- NAWIGACJA ---
    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
        const homeLink = document.createElement('a');
        homeLink.href = '/';
        homeLink.textContent = 'Strona Główna';
        homeLink.className = 'nav-link block py-2 px-4 text-slate-700 hover:bg-slate-100 font-bold';
        mainNav.appendChild(homeLink);

        calculatorConfig.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'nav-category';
            categoryDiv.textContent = category.category;
            mainNav.appendChild(categoryDiv);

            category.items.forEach(calc => {
                const link = document.createElement('a');
                link.href = calc.url;
                link.textContent = calc.name;
                link.className = 'nav-link block py-2 px-4 text-slate-700 hover:bg-slate-100';
                mainNav.appendChild(link);
            });
        });
    }

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuBtn && mobileMenu && menuOverlay) {
        const openMobileMenu = () => { mobileMenu.classList.remove('-translate-x-full'); menuOverlay.classList.remove('hidden'); };
        const closeMobileMenu = () => { mobileMenu.classList.add('-translate-x-full'); menuOverlay.classList.add('hidden'); };
        menuBtn.addEventListener('click', openMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});