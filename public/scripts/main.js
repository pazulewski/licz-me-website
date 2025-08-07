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

    // --- LOGIKA KALKULATORÓW ---
    function handleForm(formId, callback) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                callback();
            });
        }
    }

    // Pozostaje bez zmian... (logika dla istniejących kalkulatorów)
    // ...

    // --- NOWA LOGIKA DLA NOWYCH KALKULATORÓW ---

    // Kalkulator Zdolności Kredytowej
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
        
        // Uproszczony model: bank pozwala na ratę stanowiącą 50% dostępnych środków
        const maxRata = dostepneSrodki * 0.5;
        
        // Symulacja dla kredytu na 25 lat (300 rat) przy oprocentowaniu 8%
        const okres = 300;
        const oprocentowanie = 0.08 / 12;
        const zdolnosc = maxRata * ( (Math.pow(1 + oprocentowanie, okres) - 1) / (oprocentowanie * Math.pow(1 + oprocentowanie, okres)) );

        document.getElementById('zk-wynik-zdolnosc').textContent = `~ ${Math.round(zdolnosc / 1000) * 1000} PLN`;
        document.getElementById('zk-wynik').classList.remove('hidden');
    });

    // Kalkulator Procentu Składanego
    handleForm('kalkulator-procentu-skladanego-form', () => {
        const wklad = parseFloat(document.getElementById('ps-wklad').value) || 0;
        const doplata = parseFloat(document.getElementById('ps-doplata').value) || 0;
        const lata = parseInt(document.getElementById('ps-lata').value) || 0;
        const procent = parseFloat(document.getElementById('ps-procent').value) || 0;
        
        const r = procent / 100;
        const n = 12; // kapitalizacja miesięczna
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

    // Kalkulator Inflacji
    handleForm('kalkulator-inflacji-form', () => {
        const kwota = parseFloat(document.getElementById('inf-kwota').value) || 0;
        const lata = parseInt(document.getElementById('inf-lata').value) || 0;
        const inflacja = parseFloat(document.getElementById('inf-stopa').value) || 0;

        const stopa = inflacja / 100;
        const przyszlaWartosc = kwota / Math.pow(1 + stopa, lata);

        document.getElementById('inf-wynik-tekst').innerHTML = `Za ${lata} lat, dzisiejsze <strong>${kwota.toFixed(2)} PLN</strong> będzie warte tyle, co dzisiaj <strong>${przyszlaWartosc.toFixed(2)} PLN</strong>.`;
        document.getElementById('inf-wynik').classList.remove('hidden');
    });

    // Kalkulator Promili
    handleForm('kalkulator-promili-form', () => {
        const plec = document.getElementById('prom-plec').value;
        const waga = parseFloat(document.getElementById('prom-waga').value) || 0;
        const ilosc = parseFloat(document.getElementById('prom-ilosc').value) || 0;
        const procent = parseFloat(document.getElementById('prom-procent').value) || 0;
        const czas = parseFloat(document.getElementById('prom-czas').value) || 0;

        if (waga <= 0) return;

        const K = (plec === 'mezczyzna') ? 0.7 : 0.6; // Współczynnik
        const A = ilosc * (procent / 100) * 0.79; // Ilość czystego alkoholu w gramach
        
        let promile = A / (K * waga);
        
        // Spadek stężenia w czasie
        promile -= czas * 0.15; // Uśredniony spadek 0.15 promila na godzinę

        const wynik = Math.max(0, promile);

        document.getElementById('prom-wynik-wartosc').textContent = wynik.toFixed(2) + ' ‰';
        document.getElementById('prom-wynik').classList.remove('hidden');
    });

    // Kalkulator Kuchenny
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
