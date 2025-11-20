gsap.registerPlugin(ScrollTrigger);

particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#00ff88', '#0066ff', '#ff0088'] },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1 }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1 }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff88',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

const typingText = document.querySelector('.typing-text');
const heroNameEl = document.querySelector('.name-line');

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-number').forEach(animateCounter);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.6
    });
});

const wheelGallery = document.querySelector('.wheel-gallery');
if (wheelGallery) {
    const handles = wheelGallery.querySelectorAll('.wheel-handle');
    const photoImg = document.querySelector('.wheel-photo-img');
    const caption = document.querySelector('.wheel-photo-caption');

    const wheelStatesByLang = {
        en: [
            {
                src: 'assets/pics/1.jpg',
                caption: 'Trying to look serious and responsible. Probably just opened VS Code and stared at it for 20 minutes.'
            },
            {
                src: 'assets/pics/2.jpg',
                caption: 'Chaos mode unlocked: 27 tabs, 3 side projects, 0 finished tasks. But vibes are immaculate.'
            },
            {
                src: 'assets/pics/3.jpg',
                caption: 'Study grind: coffee, lecture notes and the same YouTube tutorial on repeat until it finally clicks.'
            },
            {
                src: 'assets/pics/4.jpg',
                caption: 'AFK life. No code, just friends, random walks and pretending not to think about deadlines.'
            }
        ],
        kz: [
            {
                src: 'assets/pics/1.jpg',
                caption: 'Салмақты, жауапты болып көрінгім келеді. Бірақ шындықта VS Code-ты ашып, 20 минут мониторға қарап отырмын.'
            },
            {
                src: 'assets/pics/2.jpg',
                caption: 'Хаос режимі: 27 вкладка, 3 сайд-проект, біткен жұмыс – 0. Бірақ вайб күшті.'
            },
            {
                src: 'assets/pics/3.jpg',
                caption: 'Оқу режимі: кофе, конспект және бір YouTube видеоны мың рет қайталап көру.'
            },
            {
                src: 'assets/pics/4.jpg',
                caption: 'AFK өмір: код жоқ, тек достар, қыдыру және дедлайнды ұмытып көрген сияқты болу.'
            }
        ]
    };

    let activeIndex = 0;
    let currentLangForWheel = 'en';
    let wheelStates = wheelStatesByLang[currentLangForWheel];

    function setWheelState(index) {
        const total = wheelStates.length;
        activeIndex = ((index % total) + total) % total;
        const state = wheelStates[activeIndex];

        if (photoImg) {
            photoImg.src = state.src;
            photoImg.alt = 'Marlen mood photo';
        }

        if (caption) {
            caption.textContent = state.caption;
        }

        wheelGallery.style.setProperty('--wheel-angle', (activeIndex * 90) + 'deg');

        handles.forEach((handle, i) => {
            if (i === activeIndex) {
                handle.classList.add('is-active');
            } else {
                handle.classList.remove('is-active');
            }
        });
    }

    handles.forEach(handle => {
        handle.addEventListener('click', () => {
            const index = parseInt(handle.getAttribute('data-index') || '0', 10);
            setWheelState(index);
        });
    });

    wheelGallery.addEventListener('wheel', event => {
        event.preventDefault();
        if (event.deltaY > 0 || event.deltaX > 0) {
            setWheelState(activeIndex + 1);
        } else {
            setWheelState(activeIndex - 1);
        }
    }, { passive: false });

    wheelGallery.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            setWheelState(activeIndex + 1);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            setWheelState(activeIndex - 1);
        }
    });

    wheelGallery.setAttribute('tabindex', '0');
    setWheelState(0);

    function setWheelLanguage(lang) {
        if (wheelStatesByLang[lang]) {
            currentLangForWheel = lang;
            wheelStates = wheelStatesByLang[currentLangForWheel];
            setWheelState(activeIndex);
        }
    }

    window.__setWheelLanguage = setWheelLanguage;
}

const I18N = {
    en: {
        'page.title': 'Marlen Meirbek',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'hero.subtitle': 'Welcome to my tiny corner of the internet',
        'hero.description': 'Trying to build legendary digital experiences while still googling "how to center a div". Enjoy some chaos, bad jokes and a shiny 3D diamond.',
        'hero.name': 'Marlen Meirbek',
        'hero.btn.primary': 'Spin the wheel',
        'hero.btn.secondary': 'Contact me',
        'hero.nickname': 'student from Satbayev',
        'about.title': 'About me',
        'about.subtitle': 'Not a senior. Still learning.',
        'about.p1': 'I\'m not a 10x rockstar ninja dev. I\'m a student from Satbayev University who fell in love with glowing pixels, broken CSS and Three.js diamonds that spin a bit too much.',
        'about.p2': 'This page is a mix of experiments, memes and honest vibes. No fake 10 years of experience, no 500 shipped projects — only learning in public and pressing F5 until it finally works.',
        'about.stats.projects': 'Real projects shipped',
        'about.stats.impostor': '% Learning in progress',
        'about.stats.online': '24/7 online & overthinking',
        'wheel.center': 'Turn the wheel to change the vibe',
        'wheel.handle.serious': 'Serious mode',
        'wheel.handle.chaos': 'Chaos mode',
        'wheel.handle.study': 'Study grind',
        'wheel.handle.afk': 'AFK life',
        'wheel.caption.initial': 'Spinning between medicine, code and random ideas at 3AM. Use the wheel to switch between four completely different main character energies.',
        'skills.title': 'Skill issues',
        'skills.card1.title': 'HTML & CSS (copy‑paste)',
        'skills.card1.text': 'Can break layout in 3 seconds, can fix it in 3 hours.',
        'skills.card2.title': 'Googling & StackOverflow',
        'skills.card2.text': 'Real skill: knowing which error message to copy into search.',
        'skills.card3.title': 'Three.js diamond enjoyer',
        'skills.card3.text': 'Makes shiny rotating things. Pretends it was intentional.',
        'skills.card4.title': 'Procrastination',
        'skills.card4.text': 'Starts side project. Never finishes. But the Figma looks fire.',
        'skills.card5.title': 'Learning mode',
        'skills.card5.text': 'Currently leveling up JS, Three.js and everything in between.',
        'skills.card6.title': 'Admitting I know nothing',
        'skills.card6.text': 'Step 1 to becoming a legend: accept that you are not there yet.',
        'contact.title': 'Contact',
        'contact.subtitle': 'Want to say hi?',
        'contact.text': 'No LinkedIn, no fancy forms. Just real contacts that I actually check. Pick what works for you and say hi.',
        'contact.number': 'Number',
        'contact.whatsapp': 'WhatsApp',
        'contact.instagram': 'Instagram',
        'footer.made': 'Made with love by Akadil'
    },
    kz: {
        'page.title': 'Марлен Мейірбек — Сәтбаев университетінің студенті',
        'nav.home': 'Басты бет',
        'nav.about': 'Мен туралы',
        'nav.skills': 'Скилл мәселелері',
        'nav.contact': 'Байланыс',
        'hero.subtitle': 'Интернеттегі өз кішкентай бұрышыма қош келдің',
        'hero.description': 'Мен Марлен Мейірбек – Сәтбаев университетінде оқитын студентпін. Әлі күнге дейін "div-ті қалай ортасына қою" деп гуглдап жүрсем де, сонымен қатар әдемі цифрлық вайбтар құрып жүрмін. Мұнда аздап хаос, мемдер және жарқыраған 3D гауһар бар.',
        'hero.name': 'Марлен Мейірбек',
        'hero.btn.primary': 'Рөлді бұра',
        'hero.btn.secondary': 'Байланысқа шығу',
        'hero.nickname': 'Сәтбаевтағы студент',
        'about.title': 'Мен туралы',
        'about.subtitle': 'Senior емеспін. Жәй ғана студентпін.',
        'about.p1': 'Мен 10x супер-программист емеспін. Сәтбаевта оқитын, жарқыраған пиксельдерге, сынды CSS-ке және шамадан тыс айналатын Three.js гауһарларға ғашық студентпін.',
        'about.p2': 'Бұл бет – эксперименттер, мемдер және шынайы вайбтардың миксі. Мұнда "10 жыл стаж" деген өтірік те, 500 бітіп қойған проект те жоқ – тек ашық форматта оқу және F5 басып отырып, ақыры жұмыс істегенше күту.',
        'about.stats.projects': 'Біткен шынайы проекттер',
        'about.stats.impostor': '% Оқу прогресі',
        'about.stats.online': '24/7 онлайн, бәрін ойлап жүр',
        'wheel.center': 'Вайбты ауыстыру үшін рөлді бұра',
        'wheel.handle.serious': 'Серьёзный режим',
        'wheel.handle.chaos': 'Хаос режимі',
        'wheel.handle.study': 'Оқу режимі',
        'wheel.handle.afk': 'AFK өмір',
        'wheel.caption.initial': 'Медицина, код және түнгі 3-тегі рандом ойлардың арасында айналып жүрмін. Рөлді бұрып, төрт түрлі main character вайбының бірін таңда.',
        'skills.title': 'Скилл мәселелері',
        'skills.card1.title': 'HTML & CSS (copy‑paste режимі)',
        'skills.card1.text': 'Верстканы 3 секундта сындырамын, бірақ оны 3 сағатта жөндеймін.',
        'skills.card2.title': 'Googling & StackOverflow',
        'skills.card2.text': 'Нақты скилл: қандай error текстін көшіріп, іздеу керек екенін білу.',
        'skills.card3.title': 'Three.js diamond enjoyer',
        'skills.card3.text': 'Жай ғана жарқыраған айналатын нәрселер жасаймын. Бәрі жоспарланғандай болған сияқты түр көрсетемін.',
        'skills.card4.title': 'Procrastination',
        'skills.card4.text': 'Жаңа сайд-проектті бастаймын, бірақ бітірмеймін. Бірақ Figma макет отты.',
        'skills.card5.title': 'Learning mode',
        'skills.card5.text': 'Қазір JS, Three.js және арадағының бәрін оқып, көтеріп жүрмін.',
        'skills.card6.title': 'Ештеңе білмейтінімді мойындау',
        'skills.card6.text': 'Легенда болудың 1-қадамы: әлі ол деңгейде еместігіңді қабылдау.',
        'contact.title': 'Байланыс',
        'contact.subtitle': 'Сәлем айтқың келе ме?',
        'contact.text': 'Мұнда LinkedIn де, ұзын форма да жоқ. Шынымен қарап жүретін контактілер ғана. Саған ыңғайлысын таңдап, жазып жібер.',
        'contact.number': 'Нөмір',
        'contact.whatsapp': 'WhatsApp',
        'contact.instagram': 'Instagram',
        'footer.made': 'Бұл сайтты махаббатпен жасаған – Akadil'
    }
};

function applyLanguage(lang) {
    const dict = I18N[lang] || I18N.en;

    document.documentElement.lang = lang === 'kz' ? 'kk' : 'en';

    if (dict['page.title']) {
        document.title = dict['page.title'];
    }

    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        const value = dict[key];
        if (typeof value === 'string') {
            element.textContent = value;
        }
    });

    if (heroNameEl && dict['hero.name']) {
        heroNameEl.textContent = dict['hero.name'];
    }

    if (typingText && dict['hero.nickname']) {
        typingText.textContent = dict['hero.nickname'];
    }

    if (typeof window.__setWheelLanguage === 'function') {
        window.__setWheelLanguage(lang);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            langButtons.forEach(b => b.classList.toggle('is-active', b === button));
            applyLanguage(lang);
        });
    });

    applyLanguage('en');
});
