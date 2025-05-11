document.addEventListener('DOMContentLoaded', function() {
    // Nawigacja mobilna - hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Zamknij menu po kliknięciu linku w wersji mobilnej
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Efekt scrollowania dla header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll dla wszystkich linków
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animacje przy scrollowaniu
    const animateElements = () => {
        const elements = document.querySelectorAll('.about-image, .cottage-card, .amenity-category, .surroundings-map, .booking-info, .contact-image, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicjalizacja animacji
    const animatedElements = document.querySelectorAll('.about-image, .cottage-card, .amenity-category, .surroundings-map, .booking-info, .contact-image, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Wywołaj animacje na starcie i przy scrollu
    animateElements();
    window.addEventListener('scroll', animateElements);

    // Lightbox dla galerii
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const imgSrc = img.getAttribute('src');
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="${img.alt}">
                    <span class="close">&times;</span>
                </div>
            `;
            
            lightbox.classList.add('active');
            
            // Zamknij lightbox
            const closeBtn = lightbox.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        });
    });

    // Zamknij lightbox po kliknięciu na tło
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const galleryItemsAll = document.querySelectorAll('.gallery-item');
  const toggleBtn = document.getElementById('toggleGallery');
  let galleryExpanded = false;

  // Na starcie ukryj wszystkie zdjęcia od 5. do 20.
  galleryItemsAll.forEach((item, index) => {
    if (index >= 4) {
      item.classList.add('hidden');
    }
  });

  toggleBtn.addEventListener('click', () => {
    galleryExpanded = !galleryExpanded;

    galleryItemsAll.forEach((item, index) => {
      if (index >= 4) {
        item.classList.toggle('hidden', !galleryExpanded);
      }
    });

    toggleBtn.innerHTML = galleryExpanded
      ? 'Pokaż mniej zdjęć <i class="fas fa-chevron-up"></i>'
      : 'Pokaż więcej zdjęć <i class="fas fa-chevron-down"></i>';
  });
});
