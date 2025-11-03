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
    btn.classList.add('gradient-picker-btn');
    if (host.classList.contains('theme-switcher')) {
        host.appendChild(btn);
    } else {
        document.body.appendChild(btn);
    }

    const panel = document.createElement('div');
    panel.id = 'gradientPickerPanel';
    panel.classList.add('gradient-panel');

    const title = document.createElement('div');
    title.textContent = 'اختر تدرجاً لونياً';
    title.classList.add('title');
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
    grid.classList.add('gradient-grid');
    gradients.forEach(g => {
        const sw = document.createElement('button');
        sw.type = 'button';
        sw.classList.add('gradient-swatch');
        sw.style.background = g;
        sw.onclick = () => {
            try { localStorage.setItem('customGradient', g); } catch (e) {}
            document.documentElement.style.setProperty('--gradient', g);
            panel.style.display = 'none';
        };
        grid.appendChild(sw);
    });
    panel.appendChild(grid);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const reset = document.createElement('button'); reset.type = 'button'; reset.textContent = 'إعادة الافتراضي';
    reset.classList.add('btn-plain');
    reset.onclick = () => {
        try { localStorage.removeItem('customGradient'); } catch (e) {}
        document.documentElement.style.removeProperty('--gradient');
        panel.style.display = 'none';
    };
    const close = document.createElement('button'); close.type = 'button'; close.textContent = 'إغلاق';
    close.classList.add('btn-plain');
    close.onclick = () => { panel.style.display = 'none'; };
    actions.appendChild(reset); actions.appendChild(close);
    panel.appendChild(actions);

    document.body.appendChild(panel);

    const toggle = (e) => {
        e.stopPropagation();
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };
    btn.onclick = toggle;
    panel.onclick = (e) => e.stopPropagation();
    document.onclick = () => { panel.style.display = 'none'; };
}

function setupScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.classList.add('scroll-top-btn');
    document.body.appendChild(btn);

    const onScroll = () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    };
    window.onscroll = onScroll;
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
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
function setupActiveNav() { // [جميع الصفحات التي تحتوي شريط تنقل]
    const links = document.querySelectorAll('nav a'); // [عام]
    if (!links.length) return; // [عام]
    const current = location.pathname.split('/').pop() || 'home.html'; // [عام] تحديد الصفحة الحالية
    links.forEach(a => { // [عام]
        const href = a.getAttribute('href'); // [عام]
        if (href === current) { // [عام]
            a.classList.add('active'); // [عام] تمييز الرابط النشط
        } else { // [عام]
            a.classList.remove('active'); // [عام] إزالة التمييز عن الباقي
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
function renderHalls(halls) { // [home.html,halls.html] توليد بطاقات القاعات داخل الحاوية
    const container = document.getElementById('hallsContainer'); // [home.html,halls.html] مرجع الحاوية
    if (!container) return; // [home.html,halls.html] إن لم توجد الحاوية لا نفعل شيئاً
    container.innerHTML = ''; // [home.html,halls.html] تفريغ المحتوى قبل إعادة الرسم
    
    halls.forEach(hall => { // [home.html,halls.html] تكرار على عناصر القاعات
        const ratingStars = generateRatingStars(hall.rating); // [home.html,halls.html] حساب نجوم التقييم
        
        const card = document.createElement('div'); // [home.html,halls.html] إنشاء عنصر البطاقة
        card.className = 'card'; // [home.html,halls.html] إضافة صنف البطاقة
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
        const img = card.querySelector('.card-img img'); // [home.html,halls.html] مرجع صورة البطاقة للنقر
        if (img) { // [home.html,halls.html]
            img.onclick = () => { // [home.html,halls.html] عند النقر الانتقال لصفحة الحجز
                const ok = confirm('هل تريد الحجز؟'); // [home.html,halls.html] تأكيد بسيط
                if (!ok) return; // [home.html,halls.html]
                try { // [home.html,halls.html]
                    localStorage.setItem('selectedHall', JSON.stringify(hall)); // [home.html,halls.html] حفظ القاعة المختارة
                    sessionStorage.setItem('lockBookingType', 'hall'); // [home.html,halls.html] قفل نوع الحجز إلى قاعة
                } catch (e) {}
                location.href = 'booking.html'; // [home.html,halls.html] الانتقال للنموذج
            };
        }

        container.appendChild(card);
    });

    const resultsCount = document.getElementById('resultsCount'); // [halls.html] عدد النتائج إن وُجد
    if (resultsCount) { // [halls.html]
        resultsCount.textContent = halls.length; // [halls.html]
    }
}

// دالة لإنشاء بطاقات الفرق
function renderTeams(teams) { // [home.html,teams.html] توليد بطاقات الفرق داخل الحاوية
    const container = document.getElementById('teamsContainer'); // [home.html,teams.html]
    if (!container) return; // [home.html,teams.html]
    container.innerHTML = ''; // [home.html,teams.html]
    
    teams.forEach(team => { // [home.html,teams.html]
        const ratingStars = generateRatingStars(team.rating); // [home.html,teams.html]
        
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
        const timg = card.querySelector('.card-img img'); // [home.html,teams.html]
        if (timg) { // [home.html,teams.html]
            timg.style.cursor = 'pointer'; // [home.html,teams.html]
            timg.setAttribute('aria-label', `حجز ${team.name}`); // [home.html,teams.html]
            timg.onclick = () => { // [home.html,teams.html]
                const ok = confirm('هل تريد الحجز؟'); // [home.html,teams.html]
                if (!ok) return; // [home.html,teams.html]
                try { // [home.html,teams.html]
                    localStorage.setItem('selectedTeam', JSON.stringify(team)); // [home.html,teams.html]
                    sessionStorage.setItem('lockBookingType', 'team'); // [home.html,teams.html]
                } catch (e) {}
                location.href = 'booking.html'; // [home.html,teams.html]
            };
        }

        container.appendChild(card);
    });
}

// دالة لإنشاء نجوم التقييم
function generateRatingStars(rating) { // [مشترك] إنشاء أيقونات النجوم حسب التقييم
    let stars = ''; // [مشترك]
    const fullStars = Math.floor(rating); // [مشترك]
    const hasHalfStar = rating % 1 !== 0; // [مشترك]
    
    for (let i = 0; i < fullStars; i++) { // [مشترك]
        stars += '<i class="fas fa-star"></i>'; // [مشترك]
    }
    
    if (hasHalfStar) { // [مشترك]
        stars += '<i class="fas fa-star-half-alt"></i>'; // [مشترك]
    }
    
    const emptyStars = 5 - Math.ceil(rating); // [مشترك]
    for (let i = 0; i < emptyStars; i++) { // [مشترك]
        stars += '<i class="far fa-star"></i>'; // [مشترك]
    }
    
    return stars; // [مشترك]
}


// دالة لتبديل الثيمات
function setupThemeSwitcher() { // [home.html وأي صفحة تحوي .theme-circle]
    const themeCircles = document.querySelectorAll('.theme-circle'); // [home.html]
    // قائمة الثيمات المعروفة لضمان إزالة/إضافة الثيم حتى عند عدم وجود دوائر
    const allThemes = ['theme-light', 'theme-dark', 'theme-blue', 'theme-green', 'theme-purpleblue', 'theme-redpink']; // [home.html]

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

    themeCircles.forEach(circle => { // [home.html]
        circle.addEventListener('click', function() { // [home.html]
            const theme = this.getAttribute('data-theme'); // [home.html]
            
            // إزالة الفئة النشطة من جميع الدوائر
            themeCircles.forEach(c => c.classList.remove('active')); // [home.html]
            
            // إضافة الفئة النشطة للدائرة المختارة
            this.classList.add('active'); // [home.html]
            
            // تغيير ثيم الصفحة
            applyTheme(theme); // [home.html]
            
            // حفظ الثيم المختار في localStorage
            localStorage.setItem('selectedTheme', theme); // [home.html]
        });
    });
    
    // تحميل الثيم المحفوظ إذا وجد
    const savedTheme = localStorage.getItem('selectedTheme'); // [home.html]
    if (savedTheme) { // [home.html]
        applyTheme(savedTheme); // [home.html]
        
        // تحديث الدوائر النشطة
        themeCircles.forEach(circle => { // [home.html]
            circle.classList.remove('active'); // [home.html]
            if (circle.getAttribute('data-theme') === savedTheme) { // [home.html]
                circle.classList.add('active'); // [home.html]
            }
        });
    } else if (themeCircles.length) { // [home.html]
        const activeCircle = Array.from(themeCircles).find(c => c.classList.contains('active')) || themeCircles[0]; // [home.html]
        const initialTheme = activeCircle.getAttribute('data-theme'); // [home.html]
        applyTheme(initialTheme); // [home.html]
        themeCircles.forEach(circle => circle.classList.remove('active')); // [home.html]
        activeCircle.classList.add('active'); // [home.html]
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
    btn.classList.add('quick-menu-btn');

    const menu = document.createElement('div');
    menu.id = 'quickMenu';
    menu.classList.add('quick-menu');

    const list = document.createElement('ul');

    existingLinks.forEach(a => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = a.getAttribute('href') || '#';
        link.textContent = (a.textContent || '').trim() || a.getAttribute('href') || '';
        link.classList.add('quick-menu-link');
        link.onclick = () => hideMenu();
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

    btn.onclick = toggleMenu;
    menu.onclick = (e) => e.stopPropagation();
    document.onclick = hideMenu;
    document.onkeydown = (e) => { if (e.key === 'Escape') hideMenu(); };
}
// تهيئة الصفحة عند التحميل
window.onload = function() { // [جميع الصفحات] نقطة تهيئة عامة عند تحميل أي صفحة
    // عرض القاعات والفرق (إن وُجدت الحاويات)
    if (document.getElementById('hallsContainer')) { // [home.html,halls.html] تحقق من وجود حاوية القاعات
        renderHalls(hallsData); // [home.html,halls.html] توليد بطاقات القاعات
        window.__hallsQ = ''; // [home.html,halls.html] متغير عام احتياطي للاستعلام
    }
    if (document.getElementById('teamsContainer')) { // [home.html,teams.html] تحقق من وجود حاوية الفرق
        renderTeams(teamsData); // [home.html,teams.html] توليد بطاقات الفرق
    }
    
    // تعطيل ميزات الثيم والتدرجات حسب الطلب

    // تمييز رابط التنقل النشط
    setupActiveNav(); // [جميع الصفحات التي تحتوي nav] تحديد الرابط النشط في القائمة
    
    // تفعيل مبدّل الثيمات إن وُجدت دوائره في الصفحة
    setupThemeSwitcher(); // [الصفحات التي تحوي .theme-circle مثل home.html] تفعيل مبدل الثيم
    
    // تعطيل قائمة سريعة حسب الطلب
    
    // زر العودة للأعلى
    setupScrollToTop(); // [جميع الصفحات] إظهار زر العودة للأعلى عند التمرير
    
    // مؤثرات ظهور عامة
    setupRevealAnimations(); // [home.html, teams.html, وغيرها] تفعيل مراقب ظهور العناصر
    
    // تمت إزالة وظائف الفلترة وروابطها لعدم الحاجة إليها

    // تحديث عرض قيمة شريط السعر في صفحة القاعات إن وُجد
    const priceRange = document.getElementById('priceRange'); // [halls.html] عنصر شريط السعر (إن وجد)
    const currentPrice = document.getElementById('currentPrice'); // [halls.html] عنصر عرض السعر الحالي
    if (priceRange && currentPrice) { // [halls.html] تحقق من وجود العناصر
        const updatePriceLabel = () => { // [halls.html] دالة تحديث النص المعروض
            currentPrice.textContent = priceRange.value + ' ر.س'; // [halls.html] تحديث قيمة السعر المعروض
        };
        updatePriceLabel(); // [halls.html] تحديث أولي عند التحميل
        priceRange.oninput = updatePriceLabel; // [halls.html] تحديث عند سحب المؤشر
    }
    
    // تفعيل أزرار عامة عبر الصفحات
    // 1) زر البحث في الصفحة الرئيسية
    const searchBtn = document.querySelector('.search-btn'); // [home.html] زر ابحث الآن في الهيرو
    if (searchBtn) { // [home.html]
        searchBtn.onclick = () => { // [home.html]
            location.href = 'halls.html'; // [home.html] الانتقال إلى صفحة القاعات
        };
    }

    // 2) زر الاشتراك في الفوتر
    const subscribeBtn = document.querySelector('.subscribe-form .btn.btn-primary'); // [جميع الصفحات التي تحتوي فورم اشتراك]
    if (subscribeBtn) { // [صفحات تحتوي فوتر باشتراك]
        subscribeBtn.onclick = () => { // [صفحات تحتوي فوتر باشتراك]
            const emailInput = document.querySelector('.subscribe-form input[type="email"]'); // [صفحات تحتوي فوتر باشتراك]
            const email = (emailInput && emailInput.value || '').trim(); // [صفحات تحتوي فوتر باشتراك]
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // [صفحات تحتوي فوتر باشتراك]
            if (!valid) { // [صفحات تحتوي فوتر باشتراك]
                alert('يرجى إدخال بريد إلكتروني صحيح'); // [صفحات تحتوي فوتر باشتراك]
                return; // [صفحات تحتوي فوتر باشتراك]
            }
            alert('تم الاشتراك بنجاح'); // [صفحات تحتوي فوتر باشتراك]
            if (emailInput) emailInput.value = ''; // [صفحات تحتوي فوتر باشتراك]
        };
    }

    // 3) أزرار الفلترة في صفحة القاعات (تصميم الشريط الجانبي)
    const hallsApplyBtn = document.querySelector('.apply-filters'); // [halls.html] زر تطبيق الفلاتر (تصميم تجريبي)
    if (hallsApplyBtn) { // [halls.html]
        hallsApplyBtn.onclick = (e) => { e.preventDefault(); return false; }; // [halls.html] تعطيل السلوك الافتراضي
    }
    const hallsResetBtn = document.querySelector('.reset-filters'); // [halls.html] زر إعادة التعيين (تصميم تجريبي)
    if (hallsResetBtn) { // [halls.html]
        hallsResetBtn.onclick = (e) => { e.preventDefault(); return false; }; // [halls.html] تعطيل السلوك الافتراضي
    }

    // 4) ترقيم الصفحات في صفحة القاعات
    const paginationButtons = document.querySelectorAll('.pagination button'); // [halls.html] أزرار الترقيم (إن وجدت)
    if (paginationButtons && paginationButtons.length) { // [halls.html]
        paginationButtons.forEach(btn => btn.onclick = (e) => { // [halls.html]
            e.preventDefault(); // [halls.html]
            alert('التبديل بين الصفحات (نموذج تجريبي)'); // [halls.html]
        });
    }

    // 5) استبدال أزرار المصادقة في الهيدر باسم المستخدم المسجل
    const headerAuth = document.querySelector('header .auth-buttons'); // [جميع الصفحات]
    if (headerAuth) { // [جميع الصفحات]
        let uname = '';
        try {
            uname = localStorage.getItem('username') 
                 || localStorage.getItem('userName') 
                 || localStorage.getItem('loggedInUser') 
                 || '';
        } catch(e) {}
        if (!uname) uname = 'المستخدم';
        const initials = (uname.trim().split(/\s+/).map(s=>s[0]).join('').slice(0,2) || 'م').toUpperCase();
        headerAuth.innerHTML = '';
        const chip = document.createElement('div');
        chip.className = 'user-chip';
        chip.setAttribute('aria-label', 'حساب المستخدم');
        chip.style.display = 'flex';
        chip.style.alignItems = 'center';
        chip.style.gap = '10px';
        chip.style.padding = '8px 12px';
        chip.style.borderRadius = '999px';
        chip.style.background = 'var(--card-bg)';
        chip.style.border = '1px solid var(--border-color)';
        chip.style.boxShadow = 'var(--shadow)';
        const avatar = document.createElement('div');
        avatar.textContent = initials;
        avatar.style.width = '32px';
        avatar.style.height = '32px';
        avatar.style.borderRadius = '50%';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.fontWeight = '700';
        avatar.style.background = 'var(--gradient)';
        avatar.style.color = '#fff';
        const nameEl = document.createElement('span');
        nameEl.textContent = uname;
        nameEl.style.fontWeight = '600';
        chip.appendChild(avatar);
        chip.appendChild(nameEl);
        headerAuth.appendChild(chip);
    }

    // 6) زر تغيير القاعة في صفحة الحجز
    const clearSelectedHallBtn = document.getElementById('clearSelectedHall'); // [booking.html] زر مسح القاعة المختارة
    if (clearSelectedHallBtn) { // [booking.html]
        clearSelectedHallBtn.onclick = () => { // [booking.html]
            try { localStorage.removeItem('selectedHall'); } catch (e) {} // [booking.html]
            location.reload(); // [booking.html]
        };
    }
    
    // إضافة تأثيرات للصور عند التمرير
    setupImageAnimations(); // [home.html والصفحات التي تحتوي .card-img img أو #gallery]
};

// دالة لإضافة تأثيرات للصور عند التمرير
function setupImageAnimations() { // [home.html وأي صفحة تحوي صور بطاقات/معرض]
    const observerOptions = { // [home.html]
        threshold: 0.1, // [home.html] نسبة الظهور المطلوبة لتفعيل التأثير
        rootMargin: '0px 0px -50px 0px' // [home.html] هامش يسهل تفعيل التأثير قبل الوصول الكامل
    };
    
    const observer = new IntersectionObserver(function(entries) { // [home.html]
        entries.forEach(entry => { // [home.html]
            if (entry.isIntersecting) { // [home.html]
                entry.target.style.opacity = '1'; // [home.html] إظهار الصورة
                entry.target.style.transform = 'translateY(0)'; // [home.html] إرجاعها لموضعها
            }
        });
    }, observerOptions); // [home.html]
    
    // تطبيق التأثير على جميع الصور (بطاقات + المعرض)
    document.querySelectorAll('.card-img img, #gallery img').forEach(img => { // [home.html وفرق/قاعات إذا وُجدت صور بطاقات]
        img.style.opacity = '0'; // [home.html]
        img.style.transform = 'translateY(20px)'; // [home.html]
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // [home.html]
        observer.observe(img); // [home.html]
    });
}