const hallsData = [
    {
        id: 1,
        name: "قاعة الأفراح الملكية",
        location: "حي الشمال",
        capacity: "حتى 300 شخص",
        price: "5,000 ر.س",
        description: "قاعة فاخرة مجهزة بأحدث التقنيات الصوتية والمرئية، مثالية لحفلات الزفاف والمناسبات الكبيرة.",
        image: "img/hall-1.jpg",
        rating: 4.5,
        reviews: 124,
        featured: true
    },
    {
        id: 2,
        name: "قاعة النجوم الساحرة",
        location: "حي الوسط",
        capacity: "حتى 150 شخص",
        price: "3,500 ر.س",
        description: "قاعة أنيقة بتصميم عصري وإضاءة مبهرة، مناسبة للحفلات الصغيرة والمتوسطة.",
        image: "img/hall-2.jpg",
        rating: 4,
        reviews: 87,
        featured: false
    },
    {
        id: 3,
        name: "قاعة الضيافة العربية",
        location: "حي الجنوب",
        capacity: "حتى 200 شخص",
        price: "4,200 ر.س",
        description: "قاعة بتصميم عربي أصيل، تجمع بين الأصالة والحداثة، مثالية للاحتفالات التقليدية.",
        image: "img/hall-3.jpg",
        rating: 5,
        reviews: 156,
        featured: false
    }
];

// منتقي تدرجات لونية بسيط
function setupGradientPicker() {
    const host = document.querySelector('.theme-switcher') || document.body;
    const btn = document.createElement('div');
    btn.id = 'gradientPickerBtn';
    btn.title = 'اختيار تدرج لوني';
    Object.assign(btn.style, {
        width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer',
        border: '2px solid rgba(0,0,0,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #8e2de2, #4a00e0)'
    });
    if (host.classList.contains('theme-switcher')) {
        host.appendChild(btn);
    } else {
        Object.assign(btn.style, { position: 'fixed', right: '20px', bottom: '90px', zIndex: '1000' });
        document.body.appendChild(btn);
    }

    const panel = document.createElement('div');
    panel.id = 'gradientPickerPanel';
    Object.assign(panel.style, {
        position: 'fixed', right: '20px', bottom: '120px', background: 'var(--card-bg)', color: 'inherit',
        borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.18)', padding: '10px', display: 'none',
        minWidth: '220px', zIndex: '1000', direction: 'rtl', border: '1px solid var(--border-color)'
    });

    const title = document.createElement('div');
    title.textContent = 'اختر تدرجاً لونياً';
    Object.assign(title.style, { fontWeight: '700', marginBottom: '8px' });
    panel.appendChild(title);

    const gradients = [
        'linear-gradient(135deg, #5b6cff, #7e9bff)',
        'linear-gradient(135deg, #8e2de2, #4a00e0)',
        'linear-gradient(135deg, #ff512f, #dd2476)',
        'linear-gradient(135deg, #00c6ff, #0072ff)',
        'linear-gradient(135deg, #11998e, #38ef7d)',
        'linear-gradient(135deg, #f7971e, #ffd200)'
    ];

    const grid = document.createElement('div');
    Object.assign(grid.style, { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '8px' });
    gradients.forEach(g => {
        const sw = document.createElement('button');
        sw.type = 'button';
        Object.assign(sw.style, {
            width: '56px', height: '34px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: g
        });
        sw.addEventListener('click', () => {
            try { localStorage.setItem('customGradient', g); } catch (e) {}
            document.documentElement.style.setProperty('--gradient', g);
            panel.style.display = 'none';
        });
        grid.appendChild(sw);
    });
    panel.appendChild(grid);

    const actions = document.createElement('div');
    Object.assign(actions.style, { display: 'flex', gap: '8px', justifyContent: 'space-between' });
    const reset = document.createElement('button'); reset.type = 'button'; reset.textContent = 'إعادة الافتراضي';
    Object.assign(reset.style, { padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', cursor: 'pointer' });
    reset.addEventListener('click', () => {
        try { localStorage.removeItem('customGradient'); } catch (e) {}
        document.documentElement.style.removeProperty('--gradient');
        panel.style.display = 'none';
    });
    const close = document.createElement('button'); close.type = 'button'; close.textContent = 'إغلاق';
    Object.assign(close.style, { padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', cursor: 'pointer' });
    close.addEventListener('click', () => { panel.style.display = 'none'; });
    actions.appendChild(reset); actions.appendChild(close);
    panel.appendChild(actions);

    document.body.appendChild(panel);

    const toggle = (e) => {
        e.stopPropagation();
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };
    btn.addEventListener('click', toggle);
    panel.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', () => { panel.style.display = 'none'; });
}

// زر عائم للعودة للأعلى
function setupScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    Object.assign(btn.style, {
        position: 'fixed',
        right: '80px',
        bottom: '20px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--primary, #5b6cff)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        zIndex: '1000',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center'
    });
    document.body.appendChild(btn);

    const onScroll = () => {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// مؤثر كشف عام يضيف reveal-in للعناصر المعلمة
function setupRevealAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    // تعليم عناصر شائعة كقابلة للظهور
    const candidates = document.querySelectorAll(
        '.section-header, .card, #gallery .gallery-grid > div, .content-card'
    );
    candidates.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// توسيع بيانات القاعات بعناصر إضافية لعرض بطاقات أكثر
(function seedMoreHalls() {
    hallsData.push(
        {
            id: 4,
            name: "قاعة اللؤلؤة",
            location: "حي الشرق",
            capacity: "حتى 120 شخص",
            price: "2,800 ر.س",
            description: "خيار اقتصادي أنيق مع إضاءة دافئة ومساحة مريحة للاحتفالات الصغيرة.",
            image: "img/hall-4.jpg",
            rating: 4,
            reviews: 62,
            featured: false
        },
        {
            id: 5,
            name: "قاعة السرايا",
            location: "حي الغرب",
            capacity: "حتى 220 شخص",
            price: "4,600 ر.س",
            description: "تصميم كلاسيكي مع نظام صوتي احترافي ومساحات ضيافة منفصلة.",
            image: "img/hall-5.jpg",
            rating: 4.5,
            reviews: 88,
            featured: true
        },
        {
            id: 6,
            name: "قاعة البساتين",
            location: "حي الشمال",
            capacity: "حتى 80 شخص",
            price: "2,200 ر.س",
            description: "قاعة حميمة بإطلالة نباتية ولمسات طبيعية تليق بالتجمعات العائلية.",
            image: "img/hall-6.jpg",
            rating: 4,
            reviews: 41,
            featured: false
        }
    );
})();

// دالة لتمييز رابط التنقل النشط بحسب الصفحة الحالية
function setupActiveNav() {
    const links = document.querySelectorAll('nav a');
    if (!links.length) return;
    const current = location.pathname.split('/').pop() || 'home.html';
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (href === current) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
}

// بيانات الفرق
const teamsData = [
    {
        id: 1,
        name: "فرقة النجوم الموسيقية",
        type: "عربي وغربي",
        size: "6 أعضاء",
        price: "2,500 ر.س",
        description: "فرقة موسيقية محترفة تقدم مجموعة متنوعة من الأغاني العربية والعالمية، مع عازفين متميزين.",
        image: "img/team-1.jpg",
        rating: 4.5,
        reviews: 98,
        featured: true
    },
    {
        id: 2,
        name: "فرقة الإيقاع الحالم",
        type: "تقليدي وعربي",
        size: "4 أعضاء",
        price: "1,800 ر.س",
        description: "فرقة متخصصة في الموسيقى التقليدية والتراثية، تضفي أجواءً مميزة على حفلاتك.",
        image: "img/team-2.jpg",
        rating: 4,
        reviews: 64,
        featured: false
    },
    {
        id: 3,
        name: "دي جي الحفلات",
        type: "مختلط",
        size: "2 أعضاء",
        price: "1,200 ر.س",
        description: "دي جي محترف مع مساعد، يقدم مجموعة واسعة من الموسيقى المناسبة لجميع الأذواق والأعمار.",
        image: "img/team-3.jpg",
        rating: 5,
        reviews: 132,
        featured: false
    }
];

// دالة لإنشاء بطاقات القاعات
function renderHalls(halls) {
    const container = document.getElementById('hallsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    halls.forEach(hall => {
        const ratingStars = generateRatingStars(hall.rating);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img">
                <img src="${hall.image}" alt="${hall.name}" loading="lazy" style="cursor:pointer" aria-label="حجز ${hall.name}">
                ${hall.featured ? '<div class="card-badge pulse">الأكثر حجزاً</div>' : ''}
            </div>
            <div class="card-content">
                <h3>${hall.name}</h3>
                <div class="card-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${hall.location}</span>
                    <span><i class="fas fa-users"></i> ${hall.capacity}</span>
                </div>
                <p>${hall.description}</p>
                <div class="card-footer">
                    <div class="rating">
                        ${ratingStars}
                        <span>(${hall.reviews})</span>
                    </div>
                    <div class="card-price">${hall.price}</div>
                </div>
            </div>
        `;
        
        // عند النقر على صورة القاعة الانتقال لنموذج الحجز مع حفظ البيانات
        const img = card.querySelector('.card-img img');
        if (img) {
            img.addEventListener('click', () => {
                try {
                    localStorage.setItem('selectedHall', JSON.stringify(hall));
                } catch (e) {}
                location.href = 'booking.html';
            });
        }

        container.appendChild(card);
    });

    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = halls.length;
    }
}

// دالة لإنشاء بطاقات الفرق
function renderTeams(teams) {
    const container = document.getElementById('teamsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    teams.forEach(team => {
        const ratingStars = generateRatingStars(team.rating);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img">
                <img src="${team.image}" alt="${team.name}" loading="lazy">
                ${team.featured ? '<div class="card-badge pulse">مميز</div>' : ''}
            </div>
            <div class="card-content">
                <h3>${team.name}</h3>
                <div class="card-meta">
                    <span><i class="fas fa-music"></i> ${team.type}</span>
                    <span><i class="fas fa-users"></i> ${team.size}</span>
                </div>
                <p>${team.description}</p>
                <div class="card-footer">
                    <div class="rating">
                        ${ratingStars}
                        <span>(${team.reviews})</span>
                    </div>
                    <div class="card-price">${team.price}</div>
                </div>
            </div>
        `;
        // عند النقر على صورة الفرقة الانتقال لنموذج الحجز مع حفظ البيانات
        const timg = card.querySelector('.card-img img');
        if (timg) {
            timg.style.cursor = 'pointer';
            timg.setAttribute('aria-label', `حجز ${team.name}`);
            timg.addEventListener('click', () => {
                try {
                    localStorage.setItem('selectedTeam', JSON.stringify(team));
                } catch (e) {}
                location.href = 'booking.html';
            });
        }

        container.appendChild(card);
    });
}

// دالة لإنشاء نجوم التقييم
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// دالة لتطبيق الفلترة على القاعات
function filterHalls() {
    const capacityFilter = document.getElementById('capacity') ? document.getElementById('capacity').value : '';
    const districtFilter = document.getElementById('district') ? document.getElementById('district').value : '';
    const priceFilter = document.getElementById('price') ? document.getElementById('price').value : '';
    const dateFilter = document.getElementById('date') ? document.getElementById('date').value : '';

    const parseNumber = (str) => Number(String(str).replace(/[^\d]/g, '')) || 0;
    const capacityNumber = (text) => parseNumber(text);

    const priceBucket = (num) => {
        if (num <= 3000) return 'low';
        if (num > 3000 && num <= 4500) return 'medium';
        return 'high';
    };

    const mapDistrict = (loc) => {
        if (/الشمال/.test(loc)) return 'north';
        if (/الجنوب/.test(loc)) return 'south';
        if (/الشرق/.test(loc)) return 'east';
        if (/الغرب/.test(loc)) return 'west';
        if (/الوسط/.test(loc)) return 'center';
        return '';
    };

    const filteredHalls = hallsData.filter(hall => {
        const hallCapacity = capacityNumber(hall.capacity);
        const hallPriceNum = parseNumber(hall.price);
        const hallPriceBucket = priceBucket(hallPriceNum);
        const hallDistrict = mapDistrict(hall.location);

        const capacityPass = capacityFilter
            ? (capacityFilter === '50' ? hallCapacity <= 50
                : capacityFilter === '100' ? hallCapacity > 50 && hallCapacity <= 100
                : capacityFilter === '200' ? hallCapacity > 100 && hallCapacity <= 200
                : hallCapacity > 200)
            : true;

        const districtPass = districtFilter ? hallDistrict === districtFilter : true;
        const pricePass = priceFilter ? hallPriceBucket === priceFilter : true;
        const datePass = true; // لا توجد تواريخ في البيانات الحالية

        return capacityPass && districtPass && pricePass && datePass;
    });

    renderHalls(filteredHalls);
}

// دالة لتطبيق الفلترة على الفرق
function filterTeams() {
    const typeFilter = document.getElementById('music-type') ? document.getElementById('music-type').value : '';
    const sizeFilter = document.getElementById('team-size') ? document.getElementById('team-size').value : '';
    const priceFilter = document.getElementById('team-price') ? document.getElementById('team-price').value : '';
    const dateFilter = document.getElementById('team-date') ? document.getElementById('team-date').value : '';

    const parseNumber = (str) => Number(String(str).replace(/[^\d]/g, '')) || 0;
    const priceBucket = (num) => {
        if (num <= 1500) return 'low';
        if (num > 1500 && num <= 2200) return 'medium';
        return 'high';
    };

    const filteredTeams = teamsData.filter(team => {
        const teamPriceNum = parseNumber(team.price);
        const teamPriceBucket = priceBucket(teamPriceNum);
        const teamSizeNum = parseNumber(team.size);
        const typeText = team.type;

        const typePass = typeFilter
            ? (typeFilter === 'arabic' ? /عربي/.test(typeText)
                : typeFilter === 'western' ? /غربي/.test(typeText)
                : typeFilter === 'mix' ? /مختلط/.test(typeText)
                : /تقليدي/.test(typeText))
            : true;

        const sizePass = sizeFilter
            ? (sizeFilter === 'solo' ? teamSizeNum === 1
                : sizeFilter === 'small' ? teamSizeNum >= 2 && teamSizeNum <= 4
                : sizeFilter === 'medium' ? teamSizeNum >= 5 && teamSizeNum <= 7
                : teamSizeNum >= 8)
            : true;

        const pricePass = priceFilter ? teamPriceBucket === priceFilter : true;
        const datePass = true;

        return typePass && sizePass && pricePass && datePass;
    });

    renderTeams(filteredTeams);
}

// دالة لإعادة تعيين الفلاتر
function resetFilters() {
    document.getElementById('capacity').value = '';
    document.getElementById('district').value = '';
    document.getElementById('price').value = '';
    document.getElementById('date').value = '';
    renderHalls(hallsData);
}

// دالة لإعادة تعيين فلاتر الفرق
function resetTeamFilters() {
    document.getElementById('music-type').value = '';
    document.getElementById('team-size').value = '';
    document.getElementById('team-price').value = '';
    document.getElementById('team-date').value = '';
    renderTeams(teamsData);
}

// دالة لتبديل الثيمات
function setupThemeSwitcher() {
    const themeCircles = document.querySelectorAll('.theme-circle');
    // قائمة الثيمات المعروفة لضمان إزالة/إضافة الثيم حتى عند عدم وجود دوائر
    const allThemes = ['theme-light', 'theme-dark', 'theme-blue', 'theme-green'];

    const applyTheme = (theme) => {
        if (!theme) return;
        // إضافة انتقال ناعم مؤقت
        document.documentElement.classList.add('theme-changing');
        // إزالة جميع الثيمات المعروفة من كل من body و html لضمان نظافة الحالة
        allThemes.forEach(t => {
            document.body.classList.remove(t);
            document.documentElement.classList.remove(t);
        });
        // إضافة الثيم إلى عنصر html لضمان تطبيقه على جميع الوسوم
        document.documentElement.classList.add(theme);
        // تطبيق تدرج مخصص إن وُجد
        try {
            const cg = localStorage.getItem('customGradient');
            if (cg) {
                document.documentElement.style.setProperty('--gradient', cg);
            } else {
                document.documentElement.style.removeProperty('--gradient');
            }
        } catch (e) {}
        // إزالة صنف الانتقال بعد فترة قصيرة
        setTimeout(() => document.documentElement.classList.remove('theme-changing'), 300);
    };

    themeCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // إزالة الفئة النشطة من جميع الدوائر
            themeCircles.forEach(c => c.classList.remove('active'));
            
            // إضافة الفئة النشطة للدائرة المختارة
            this.classList.add('active');
            
            // تغيير ثيم الصفحة
            applyTheme(theme);
            
            // حفظ الثيم المختار في localStorage
            localStorage.setItem('selectedTheme', theme);
        });
    });
    
    // تحميل الثيم المحفوظ إذا وجد
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
        
        // تحديث الدوائر النشطة
        themeCircles.forEach(circle => {
            circle.classList.remove('active');
            if (circle.getAttribute('data-theme') === savedTheme) {
                circle.classList.add('active');
            }
        });
    } else if (themeCircles.length) {
        const activeCircle = Array.from(themeCircles).find(c => c.classList.contains('active')) || themeCircles[0];
        const initialTheme = activeCircle.getAttribute('data-theme');
        applyTheme(initialTheme);
        themeCircles.forEach(circle => circle.classList.remove('active'));
        activeCircle.classList.add('active');
    }
}

// زر قائمة سريعة للتنقل بين الصفحات
function setupQuickNavMenu() {
    const existingLinks = Array.from(document.querySelectorAll('nav a'));
    if (!existingLinks.length) return;

    const btn = document.createElement('button');
    btn.id = 'quickMenuBtn';
    btn.setAttribute('aria-label', 'فتح قائمة الصفحات');
    btn.innerHTML = '<span style="display:block;width:22px;height:2px;background:currentColor;margin:3px 0"></span>' +
                    '<span style="display:block;width:22px;height:2px;background:currentColor;margin:3px 0"></span>' +
                    '<span style="display:block;width:22px;height:2px;background:currentColor;margin:3px 0"></span>';
    Object.assign(btn.style, {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--primary, #5b6cff)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        zIndex: '1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    const menu = document.createElement('div');
    menu.id = 'quickMenu';
    Object.assign(menu.style, {
        position: 'fixed',
        right: '20px',
        bottom: '78px',
        background: 'var(--card, #ffffff)',
        color: 'inherit',
        minWidth: '220px',
        maxHeight: '60vh',
        overflowY: 'auto',
        borderRadius: '12px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
        padding: '8px',
        display: 'none',
        zIndex: '1000',
        direction: 'rtl'
    });

    const list = document.createElement('ul');
    Object.assign(list.style, { listStyle: 'none', margin: '0', padding: '0' });

    existingLinks.forEach(a => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = a.getAttribute('href') || '#';
        link.textContent = (a.textContent || '').trim() || a.getAttribute('href') || '';
        Object.assign(link.style, {
            display: 'block',
            padding: '10px 12px',
            borderRadius: '8px',
            color: 'inherit',
            textDecoration: 'none'
        });
        link.addEventListener('mouseenter', () => { link.style.background = 'rgba(0,0,0,0.06)'; });
        link.addEventListener('mouseleave', () => { link.style.background = 'transparent'; });
        link.addEventListener('click', () => hideMenu());
        li.appendChild(link);
        list.appendChild(li);
    });

    menu.appendChild(list);
    document.body.appendChild(btn);
    document.body.appendChild(menu);

    const showMenu = () => { menu.style.display = 'block'; };
    const hideMenu = () => { menu.style.display = 'none'; };
    const toggleMenu = (e) => {
        e.stopPropagation();
        if (menu.style.display === 'none') showMenu(); else hideMenu();
    };

    btn.addEventListener('click', toggleMenu);
    menu.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', hideMenu);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideMenu(); });
}
// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // عرض القاعات والفرق (إن وُجدت الحاويات)
    if (document.getElementById('hallsContainer')) {
        renderHalls(hallsData);
    }
    if (document.getElementById('teamsContainer')) {
        renderTeams(teamsData);
    }
    
    // إعداد تبديل الثيمات
    setupThemeSwitcher();
    // منتقي التدرجات اللونية
    setupGradientPicker();

    // تمييز رابط التنقل النشط
    setupActiveNav();
    
    // قائمة سريعة للتنقل
    setupQuickNavMenu();
    
    // زر العودة للأعلى
    setupScrollToTop();
    
    // مؤثرات ظهور عامة
    setupRevealAnimations();
    
    // إضافة مستمعي الأحداث للفلاتر
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const applyTeamFiltersBtn = document.getElementById('applyTeamFilters');
    const resetTeamFiltersBtn = document.getElementById('resetTeamFilters');

    if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', filterHalls);
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
    if (applyTeamFiltersBtn) applyTeamFiltersBtn.addEventListener('click', filterTeams);
    if (resetTeamFiltersBtn) resetTeamFiltersBtn.addEventListener('click', resetTeamFilters);

    // تحديث عرض قيمة شريط السعر في صفحة القاعات إن وُجد
    const priceRange = document.getElementById('priceRange');
    const currentPrice = document.getElementById('currentPrice');
    if (priceRange && currentPrice) {
        const updatePriceLabel = () => {
            currentPrice.textContent = priceRange.value + ' ر.س';
        };
        updatePriceLabel();
        priceRange.addEventListener('input', updatePriceLabel);
    }
    
    // تفعيل أزرار عامة عبر الصفحات
    // 1) زر البحث في الصفحة الرئيسية
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            try { sessionStorage.setItem('fromSearch', '1'); } catch (e) {}
            location.href = 'halls.html';
        });
    }

    // 2) زر الاشتراك في الفوتر
    const subscribeBtn = document.querySelector('.subscribe-form .btn.btn-primary');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const emailInput = document.querySelector('.subscribe-form input[type="email"]');
            const email = (emailInput && emailInput.value || '').trim();
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!valid) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            alert('تم الاشتراك بنجاح');
            if (emailInput) emailInput.value = '';
        });
    }

    // 3) أزرار الفلترة في صفحة القاعات (تصميم الشريط الجانبي)
    const hallsApplyBtn = document.querySelector('.apply-filters');
    if (hallsApplyBtn) {
        hallsApplyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('تم تطبيق الفلترة (نموذج تجريبي)');
        });
    }
    const hallsResetBtn = document.querySelector('.reset-filters');
    if (hallsResetBtn) {
        hallsResetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('تمت إعادة التعيين (نموذج تجريبي)');
        });
    }

    // 4) ترقيم الصفحات في صفحة القاعات
    const paginationButtons = document.querySelectorAll('.pagination button');
    if (paginationButtons && paginationButtons.length) {
        paginationButtons.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('التبديل بين الصفحات (نموذج تجريبي)');
        }));
    }

    // 5) أزرار المصادقة في الهيدر عندما لا تحتوي على onclick
    const headerAuth = document.querySelector('header .auth-buttons');
    if (headerAuth) {
        const loginBtn = headerAuth.querySelector('.btn.btn-outline');
        const signupBtn = headerAuth.querySelector('.btn.btn-primary');
        if (loginBtn && !loginBtn.getAttribute('onclick')) {
            loginBtn.addEventListener('click', () => { location.href = 'index.html'; });
        }
        if (signupBtn && !signupBtn.getAttribute('onclick')) {
            signupBtn.addEventListener('click', () => { location.href = 'signup.html'; });
        }
    }

    // 6) زر تغيير القاعة في صفحة الحجز
    const clearSelectedHallBtn = document.getElementById('clearSelectedHall');
    if (clearSelectedHallBtn) {
        clearSelectedHallBtn.addEventListener('click', () => {
            try { localStorage.removeItem('selectedHall'); } catch (e) {}
            location.reload();
        });
    }
    
    // إضافة تأثيرات للصور عند التمرير
    setupImageAnimations();
});

// دالة لإضافة تأثيرات للصور عند التمرير
function setupImageAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // تطبيق التأثير على جميع الصور (بطاقات + المعرض)
    document.querySelectorAll('.card-img img, #gallery img').forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(img);
    });
}