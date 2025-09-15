document.addEventListener('DOMContentLoaded', () => {
    // ---- Código del Contador ----
    const partyDate = new Date('october 4, 2025 20:00:00').getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = partyDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById('countdown-timer').innerHTML = "¡Ya es hoy!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').innerHTML = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    }, 1000);

    // ---- Código del Botón de Música ----
    const music = document.getElementById('background-music');
    const musicButton = document.getElementById('music-button');
    
    function updateMusicButtonIcon() {
        if (music.paused) {
            musicButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            musicButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    updateMusicButtonIcon();
    
    musicButton.addEventListener('click', () => {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
        updateMusicButtonIcon();
    });

    // ---- Lógica de Parallax para las Mariposas ----
    const animatedButterflies = document.querySelectorAll('.animated-butterfly');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxFactor = 0.3;

        animatedButterflies.forEach(butterfly => {
            const newY = scrollPosition * parallaxFactor;
            butterfly.style.transform = `translateY(${newY}px)`;
        });
    });

    // ---- Lógica del botón de scroll y animaciones de sección ----
    const sections = document.querySelectorAll('main section');
    const scrollBtn = document.getElementById('scroll-btn');
    const heroSection = document.querySelector('.hero');
    
    function getNextScrollTarget() {
        let currentSection = heroSection;
        let minDistance = Infinity;
    
        const allSections = [heroSection, ...sections];

        for (let i = 0; i < allSections.length; i++) {
            const rect = allSections[i].getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
                if (window.innerHeight / 2 - rect.top < minDistance) {
                    minDistance = window.innerHeight / 2 - rect.top;
                    currentSection = allSections[i];
                }
            }
        }
    
        const currentIndex = allSections.indexOf(currentSection);
    
        if (currentIndex < allSections.length - 1) {
            return allSections[currentIndex + 1];
        } else {
            return heroSection;
        }
    }
    
    // Función para crear mariposas voladoras
    function createFlyingButterflies(count = 3) {
        const buttonRect = scrollBtn.getBoundingClientRect();
        const startX = buttonRect.left + buttonRect.width / 2;
        const startY = buttonRect.top + buttonRect.height / 2;
        
        const butterflyImage = ['gifmariposa1.gif','gifmariposa2.gif'][Math.floor(Math.random() * 2)];

        for (let i = 0; i < count; i++) {
            const butterfly = document.createElement('img');
            butterfly.src = butterflyImage;
            butterfly.alt = 'Mariposa volando';
            butterfly.classList.add('flying-butterfly');
            
            // Posición inicial de la mariposa
            butterfly.style.left = `${startX}px`;
            butterfly.style.top = `${startY}px`;

            // Posición final aleatoria
            const endX = Math.random() * window.innerWidth;
            const endY = Math.random() * window.innerHeight * 0.5; // Vuelan hacia la mitad superior

            // Establece las variables CSS para la animación
            butterfly.style.setProperty('--startX', `${startX}px`);
            butterfly.style.setProperty('--startY', `${startY}px`);
            butterfly.style.setProperty('--endX', `${endX}px`);
            butterfly.style.setProperty('--endY', `${endY}px`);

            document.body.appendChild(butterfly);

            // Elimina la mariposa del DOM después de que la animación termine
            butterfly.addEventListener('animationend', () => {
                butterfly.remove();
            });
        }
    }

    // Llama a la función de mariposas voladoras al hacer clic
    scrollBtn.addEventListener('click', () => {
        createFlyingButterflies(); // Llama a la función para crear mariposas
        const nextSection = getNextScrollTarget();
        nextSection.scrollIntoView({ behavior: 'smooth' });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Lógica del botón de scroll (existente)
    window.addEventListener('scroll', () => {
        const lastSection = sections[sections.length - 1];
        const rect = lastSection.getBoundingClientRect();

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            scrollBtn.style.display = 'none';
        } else {
            scrollBtn.style.display = 'block';
        }
    });

});