// FUNCȚIE PENTRU NAVIGARE LA PAGINI
function navigateToPage(pageId) {
    // Ascunde toate paginile
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Arată pagina selectată
    document.getElementById(pageId).classList.add('active');
    
    // Actualizează butonul activ în navbar
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        }
    });
    
    // Scroll la top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FUNCȚIONALITATE NAVIGARE PAGINI
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function() {
        const pageId = this.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// SLIDESHOW FUNCȚIONALITATE
class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        
        if (this.totalSlides > 0) {
            this.init();
        }
    }
    
    init() {
        // Arată prima slide
        this.showSlide(0);
        
        // Setup button listeners
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('importanta') && document.getElementById('importanta').classList.contains('active')) {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
    }
    
    showSlide(index) {
        // Elimină clasa 'active' din toate slide-urile
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'fade');
        });
        
        // Adaugă clasa 'active' și 'fade' la slide-ul curent
        if (this.slides[index]) {
            this.slides[index].classList.add('active', 'fade');
        }
        
        // Actualizează counter-ul
        const currentSlideSpan = document.querySelector('.current-slide');
        if (currentSlideSpan) {
            currentSlideSpan.textContent = index + 1;
        }
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.showSlide(this.currentIndex);
    }
    
    previousSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentIndex);
    }
}

// Inițializează slideshow-ul la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
    const slideshow = new Slideshow();
    
    // Smooth scroll pentru link-uri interne
    setupSmoothScroll();
    
    // Adaugă animații la elementele din viewport
    setupIntersectionObserver();
});

// SMOOTH SCROLL PENTRU LINK-URI INTERNE
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// INTERSECTION OBSERVER PENTRU ANIMAȚII LA SCROLL
function setupIntersectionObserver() {
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
    
    // Observă elementele care trebuie animate
    document.querySelectorAll('.gallery-item, .feature, .info-box, .source-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// HANDLE RESPONSIV MENIU MOBILE (OPȚIONAL - pentru viitor)
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    // Detectează dimensiunile ecranului
    if (window.innerWidth < 768) {
        // Opțional: adaugă comportament special pentru mobile
    }
}

// FUNCȚIE PENTRU DESCHIDEREA LINK-URILOR ÎN TAB NOU
document.querySelectorAll('.source-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Permite deschiderea în tab nou cu Ctrl+Click
        if (e.ctrlKey || e.metaKey) {
            window.open(this.href, '_blank');
        }
    });
});

// EVENT LISTENER PENTRU RESIZE (responsive)
window.addEventListener('resize', function() {
    setupMobileMenu();
});

// ANIMAȚIE SCROLL INDICATOR (OPȚIONAL)
window.addEventListener('scroll', function() {
    const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / 
                            (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    
    // Poți adăuga o bară de progres vizuală dacă dorești
});

// DEBUGGING: Log pentru a verifica că scriptul este încărcat
console.log('Script dobrogea.js încărcat cu succes!');
console.log('Numărul de pagini:', document.querySelectorAll('.page').length);
console.log('Numărul de slide-uri:', document.querySelectorAll('.slide').length);
