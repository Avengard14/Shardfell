// ================================
// VARIABLES GLOBALES
// ================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const scrolls = document.querySelectorAll('.scroll');
const CONFIG = {
    name: {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZÀ-ÿ\s\-']{2,}$/
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    message: {
        minLength: 10,
        maxLength: 1000,
        minWords: 3
    }
};
let currentCategory = null;
let currentSlideIndex = 0;
const gameData = {
    characters: {
        title: "Personnages",
        items: [
            { icon: "🧙‍♂️", title: "Mage", description: "Un puissant magicien.", stats: { Niveau: 80, Magie: "★★★" } },
            { icon: "⚔️", title: "Guerrier", description: "Un maître du combat rapproché.", stats: { Niveau: 70, Force: "★★★★" } }
        ]
    },
      equipment: {  // <-- Vérifie que cette clé existe et est bien orthographiée
    title: "Équipements",
    items: [
      { icon: "🛡️", title: "Bouclier", description: "Protège contre les coups.", stats: { Défense: "★★★★★" } },
      { icon: "⚔️", title: "Épée Runique", description: "Imprégnée de magie ancienne.", stats: { Attaque: "★★★★★" } }
    ]
  },
    bestiary: {
        title: "Bestiaire",
        items: [
            { icon: "🐉", title: "Dragon", description: "Terrifiant, varier. Ce sont les descendant des batisseur du monde.", stats: { Puissance: "★★★★★" } },
            { icon: "🐺", title: "Loup spectral", description: "Rapide et insaisissable. Capable de se mouvoir dans l'ombre.", stats: { Vitesse: "★★" } }
        ]
    },
    world: {
        title: "univers",
        items: [
            { icon: "🪖", title: "Bunker", description: "Là où tout va commencer.", stats: { Difficulté: "★★★" } },
            { icon: "💀", title: "Necropolis", description: "Ville a la frontière entre les vivant et les mort", stats: { Difficulté: "★★★★" } }
        ]
    }
};

// ================================
// INITIALISATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollInteractions();
    initAccessibility();
    initScrollAnimations();
    initParallaxEffect();
    initContactForm();
    initGamePage();
    console.log('🏰 Shardfell - Hall initialisé avec succès!');
});

// ================================
// NAVIGATION MOBILE
// ================================
function initMobileMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : '';
}

function closeMobileMenu() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// ================================
// INTERACTIONS DES PARCHEMINS
// ================================
function initScrollInteractions() {
    if (!scrolls.length) return;
    scrolls.forEach(scroll => {
        scroll.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (navigator.vibrate) navigator.vibrate(50);
            this.style.transform = 'translateY(-2px) rotate(0.5deg)';
            setTimeout(() => { this.style.transform = ''; }, 150);
            handleScrollClick(action);
        });
        if (window.innerWidth > 768) {
            scroll.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) rotate(1deg)';
                this.style.zIndex = '10';
            });
            scroll.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });
        }
        scroll.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--gold)';
            this.style.outlineOffset = '2px';
        });
        scroll.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ================================
// GESTION DES ACTIONS
// ================================
function handleScrollClick(action) {
    console.log(`🎯 Action sélectionnée: ${action}`);
    switch(action) {
        case 'inscription': showInscriptionAction(); break;
        case 'game': showGameAction(); break;
        case 'contact': showContactAction(); break;
        default: console.warn('Action non reconnue:', action);
    }
}

function showInscriptionAction() {
    console.log('📜 Redirection vers inscription...');
    showNotification('Redirection vers la page d\'inscription...', 'info');
}

function showGameAction() {
    console.log('⚔️ Redirection vers le jeu...');
    showNotification('Découverte de l\'univers de Shardfell...', 'success');
}

function showContactAction() {
    console.log('💌 Redirection vers contact...');
    showNotification('Ouverture du formulaire de contact...', 'info');
}

// ================================
// SYSTÈME DE NOTIFICATIONS
// ================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    Object.assign(notification.style, {
        position: 'fixed', top: '20px', right: '20px',
        background: type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' :
                   type === 'error' ? 'linear-gradient(45deg, #f44336, #d32f2f)' :
                   'linear-gradient(45deg, var(--gold), var(--gold-light))',
        color: type === 'info' ? 'var(--secondary-dark)' : 'white',
        padding: '1rem 1.5rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: '10000', transform: 'translateX(100%)', transition: 'transform 0.3s ease',
        maxWidth: '300px', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif'
    });
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => { if (document.body.contains(notification)) document.body.removeChild(notification); }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    return icons[type] || 'ℹ️';
}

// ================================
// SYSTÈME DE POP-UP MODAL
// ================================
function showPopup(title, message, type = 'info', duration = null) {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    popup.innerHTML = `
        <div class="popup-header">
            <h3 class="popup-title">${getNotificationIcon(type)} ${title}</h3>
            <button class="popup-close" aria-label="Fermer">×</button>
        </div>
        <div class="popup-body">
            <p class="popup-message">${message}</p>
        </div>
        <div class="popup-footer">
            <button class="popup-btn popup-btn-primary">OK</button>
        </div>
    `;
    Object.assign(overlay.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '20000', opacity: '0', transition: 'opacity 0.3s ease' });
    Object.assign(popup.style, { background: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', maxWidth: '400px', width: '90%', maxHeight: '80vh', overflow: 'hidden', transform: 'scale(0.7)', transition: 'transform 0.3s ease', fontFamily: 'Inter, sans-serif' });
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '1'; popup.style.transform = 'scale(1)'; }, 10);
    const closePopup = () => {
        overlay.style.opacity = '0';
        popup.style.transform = 'scale(0.7)';
        setTimeout(() => { if (document.body.contains(overlay)) document.body.removeChild(overlay); }, 300);
    };
    popup.querySelector('.popup-close').addEventListener('click', closePopup);
    popup.querySelector('.popup-btn-primary').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
    if (duration) setTimeout(closePopup, duration);
}

// ================================
// ACCESSIBILITÉ
// ================================
function initAccessibility() {
    scrolls.forEach((scroll, index) => {
        scroll.setAttribute('tabindex', '0');
        scroll.setAttribute('role', 'button');
        const title = scroll.querySelector('.scroll-title')?.textContent || `Action ${index + 1}`;
        scroll.setAttribute('aria-label', `Parchemin ${index + 1}: ${title}`);
        scroll.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scroll.click(); } });
    });
    document.querySelectorAll('.nav-link').forEach(item => item.setAttribute('role', 'menuitem'));
    if (menuToggle) {
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ================================
// ANIMATIONS ET EFFETS
// ================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll, .info-panel, .about-section, .final-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.section-image');
    if (!parallaxElements.length) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                parallaxElements.forEach(element => {
                    const yPos = -(scrolled * 0.1);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ================================
// FORMULAIRE DE CONTACT
// ================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');
    const submitBtn = document.getElementById('submitBtn');
    const nameMessage = document.getElementById('nameMessage');
    const emailMessage = document.getElementById('emailMessage');
    const messageMessage = document.getElementById('messageMessage');

    function showValidationMessage(element, message, type) {
        if (!element) return;
        const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : '⚠️';
        element.innerHTML = `<span>${icon}</span> ${message}`;
        element.className = `validation-message ${type} show`;
    }

    function validateName(value) {
        if (!value.trim()) { nameInput.classList.remove('valid', 'warning'); nameInput.classList.add('error'); showValidationMessage(nameMessage, 'Le nom est requis', 'error'); return false; }
        if (value.length < CONFIG.name.minLength) { nameInput.classList.remove('valid', 'warning'); nameInput.classList.add('error'); showValidationMessage(nameMessage, `Le nom doit contenir au moins ${CONFIG.name.minLength} caractères`, 'error'); return false; }
        if (value.length > CONFIG.name.maxLength) { nameInput.classList.remove('valid', 'warning'); nameInput.classList.add('error'); showValidationMessage(nameMessage, `Le nom ne peut pas dépasser ${CONFIG.name.maxLength} caractères`, 'error'); return false; }
        if (!CONFIG.name.pattern.test(value)) { nameInput.classList.remove('valid', 'warning'); nameInput.classList.add('error'); showValidationMessage(nameMessage, 'Le nom contient des caractères non autorisés', 'error'); return false; }
        nameInput.classList.remove('error', 'warning'); nameInput.classList.add('valid'); showValidationMessage(nameMessage, 'Nom valide', 'success'); return true;
    }

    function validateEmail(value) {
        if (!value.trim()) { emailInput.classList.remove('valid', 'warning'); emailInput.classList.add('error'); showValidationMessage(emailMessage, 'L\'adresse email est requise', 'error'); return false; }
        if (!CONFIG.email.pattern.test(value)) { emailInput.classList.remove('valid', 'warning'); emailInput.classList.add('error'); showValidationMessage(emailMessage, 'Format d\'email invalide', 'error'); return false; }
        emailInput.classList.remove('error', 'warning'); emailInput.classList.add('valid'); showValidationMessage(emailMessage, 'Email valide', 'success'); return true;
    }

    function validateMessage(value) {
        const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
        if (!value.trim()) { messageInput.classList.remove('valid', 'warning'); messageInput.classList.add('error'); showValidationMessage(messageMessage, 'Le message est requis', 'error'); return false; }
        if (value.length < CONFIG.message.minLength) { messageInput.classList.remove('valid', 'warning'); messageInput.classList.add('error'); showValidationMessage(messageMessage, `Le message doit contenir au moins ${CONFIG.message.minLength} caractères`, 'error'); return false; }
        if (value.length > CONFIG.message.maxLength) { messageInput.classList.remove('valid', 'warning'); messageInput.classList.add('error'); showValidationMessage(messageMessage, `Le message ne peut pas dépasser ${CONFIG.message.maxLength} caractères`, 'error'); return false; }
        if (wordCount < CONFIG.message.minWords) { messageInput.classList.remove('valid', 'warning'); messageInput.classList.add('error'); showValidationMessage(messageMessage, `Le message doit contenir au moins ${CONFIG.message.minWords} mots`, 'error'); return false; }
        messageInput.classList.remove('error', 'warning'); messageInput.classList.add('valid'); showValidationMessage(messageMessage, 'Message valide', 'success'); return true;
    }

    function updateCharCounter() {
        if (!charCounter) return;
        const length = messageInput.value.length;
        const max = CONFIG.message.maxLength;
        const remaining = max - length;
        charCounter.textContent = `${length} / ${max} caractères (${remaining >= 0 ? remaining + ' restants' : Math.abs(remaining) + ' en trop!'})`;
        charCounter.classList.remove('warning', 'error', 'success');
        if (length > max) charCounter.classList.add('error');
        else if (length > max * 0.9) charCounter.classList.add('warning');
        else if (length >= CONFIG.message.minLength) charCounter.classList.add('success');
    }

    nameInput.addEventListener('blur', () => validateName(nameInput.value));
    nameInput.addEventListener('input', () => { if (nameInput.classList.contains('error') || nameInput.classList.contains('valid')) validateName(nameInput.value); });
    emailInput.addEventListener('blur', () => validateEmail(emailInput.value));
    emailInput.addEventListener('input', () => { if (emailInput.classList.contains('error') || emailInput.classList.contains('valid')) validateEmail(emailInput.value); });
    messageInput.addEventListener('blur', () => validateMessage(messageInput.value));
    messageInput.addEventListener('input', () => { updateCharCounter(); if (messageInput.classList.contains('error') || messageInput.classList.contains('valid')) validateMessage(messageInput.value); });
    updateCharCounter();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isMessageValid = validateMessage(messageInput.value);
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showPopup('Erreur de validation', 'Veuillez corriger les erreurs dans le formulaire avant de continuer.', 'error');
            if (submitBtn) { submitBtn.textContent = '❌ Veuillez corriger les erreurs'; setTimeout(() => { submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message'; }, 2000); }
            return;
        }
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'; }
        try {
            await new Promise((resolve, reject) => { setTimeout(() => { Math.random() > 0.2 ? resolve() : reject(new Error('Erreur de réseau simulée')); }, 2000); });
            showPopup('Message envoyé avec succès !', `Merci ${nameInput.value} ! Votre message a été envoyé avec succès.`, 'success');
            form.reset(); updateCharCounter();
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('valid', 'error', 'warning'));
            [nameMessage, emailMessage, messageMessage].forEach(msg => { if (msg) msg.classList.remove('show'); });
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            showPopup('Erreur lors de l\'envoi', 'Une erreur s\'est produite lors de l\'envoi de votre message.', 'error');
        } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message'; }
        }
    });
}

// ================================
// GESTION DES ERREURS
// ================================
window.addEventListener('error', function(e) {
    console.error('🚨 Erreur détectée:', e.error);
    showNotification('Une erreur inattendue s\'est produite.', 'error');
});

// ================================
// RESPONSIVE HANDLERS
// ================================
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks?.classList.contains('active')) closeMobileMenu();
    if (window.innerWidth <= 768) scrolls.forEach(scroll => { scroll.style.transform = ''; scroll.style.zIndex = ''; });
});

// ================================
// EASTER EGGS
// ================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) konamiCode.shift();
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    console.log('🎮 Code Konami activé!');
    showNotification('🎮 Mode développeur activé! Bonus découvert!', 'success');
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => { document.body.style.filter = ''; }, 3000);
    document.body.classList.add('easter-egg-active');
    setTimeout(() => { document.body.classList.remove('easter-egg-active'); }, 5000);
}

// ================================
// PERFORMANCE MONITORING
// ================================
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Temps de chargement:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
        }, 0);
    });
}

// ================================
// INITIALISATION DE LA PAGE DE JEU
// ================================
function initGamePage() {
  if (!document.querySelector(".game-card")) return;
  console.log("⚡ initGamePage lancé");

  // Écouteur pour TOUS les boutons "S'informer"
  document.querySelectorAll(".card-button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".game-card");
      if (card && card.dataset.category) {
        console.log("Catégorie sélectionnée :", card.dataset.category); // Debug
        openModal(card.dataset.category);
      }
    });
  });

  // Écouteurs pour fermer la modale
  const closeBtn = document.getElementById("close-modal");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
}


// ================================
// MODAL POUR LA PAGE DE JEU
// ================================
function openModal(category) {
  const modal = document.getElementById("modal");
  if (!modal) {
    console.error("❌ Impossible de trouver #modal");
    return;
  }
  console.log("Ouverture de la modale pour :", category); // Debug
  currentCategory = category;
  currentSlideIndex = 0;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  renderCarousel();
}



function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.classList.remove("active"); // Retire la classe .active pour masquer la modale
  document.body.style.overflow = "";
}


function renderCarousel() {
  const modalTitle = document.getElementById("modal-title");
  const carouselContainer = document.querySelector(".carousel-container");
  const dotsContainer = document.getElementById("carousel-dots");
  const data = gameData[currentCategory];

  console.log("Données pour la catégorie:", currentCategory, data); // Debug

  if (!data || !modalTitle || !carouselContainer || !dotsContainer) {
    console.error("Données manquantes ou éléments non trouvés !");
    return;
  }

  modalTitle.textContent = data.title;
  carouselContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  data.items.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (index === currentSlideIndex ? " active" : "");
    slide.innerHTML = `
      <div class="slide-content">
        <div class="slide-icon">${item.icon}</div>
        <h3 class="slide-title">${item.title}</h3>
        <p class="slide-description">${item.description}</p>
        <div class="slide-stats">
          ${Object.entries(item.stats)
            .map(([key, value]) => `
              <div class="stat-item">
                <span class="stat-label">${key}:</span>
                <span class="stat-value">${value}</span>
              </div>
            `)
            .join("")}
        </div>
      </div>
    `;
    carouselContainer.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "carousel-dot" + (index === currentSlideIndex ? " active" : "");
    dot.dataset.slide = index;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}



function changeSlide(step) {
    const data = gameData[currentCategory];
    if (!data) return;
    currentSlideIndex = (currentSlideIndex + step + data.items.length) % data.items.length;
    renderCarousel();
}

function goToSlide(index) {
    currentSlideIndex = index;
    renderCarousel();
}