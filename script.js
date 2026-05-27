/* ============================= */
/* ===== NAVBAR SCROLL EFFECT == */
/* ============================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================= */
/* ===== MOBILE MENU TOGGLE ==== */
/* ============================= */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

/* ============================= */
/* ===== SCROLL ANIMATIONS ===== */
/* ============================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use delay if specified
            const delay = entry.target.dataset.aosDelay || 0;
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

/* ============================= */
/* ===== COUNTER ANIMATION ===== */
/* ============================= */
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.dataset.target;
            const counter = entry.target;
            let count = 0;
            const increment = target / 60;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* ============================= */
/* ===== PRODUCT FILTER ======== */
/* ============================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ============================= */
/* ===== SCROLL TO TOP BUTTON == */
/* ============================= */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================= */
/* ===== CONTACT FORM ========= */
/* ============================= */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.form-btn');
    const originalHTML = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    // Simulate sending (replace with real API call)
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
        }, 2500);
    }, 1500);
});

/* ============================= */
/* ===== ADD TO CART ANIMATION  */
/* ============================= */
const addBtns = document.querySelectorAll('.add-btn');
const cartCount = document.querySelector('.cart-count');
let cartItems = 3;

addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Animation feedback
        cartCount.style.transform = 'scale(1.4)';
        btn.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
            btn.innerHTML = '<i class="fas fa-plus"></i>';
        }, 600);
    });
});

/* ============================= */
/* ===== ACTIVE NAV ON SCROLL  */
/* ============================= */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

/* ============================= */
/* ===== PERFORMANCE: LAZY ===== */
/* ============================= */
// Add fadeIn keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

console.log('🛍️ ShopSphere loaded successfully!');