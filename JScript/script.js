        // Inicializar iconos Lucide
        lucide.createIcons();

        // --- Lógica Scroll Reveal ---
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            revealElements.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Trigger inicial

        // --- Lógica Efecto Tilt (Inclinación 3D) ---
        function handleTilt(e, container) {
            const card = container.querySelector('.tilt-card');
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X dentro del elemento
            const y = e.clientY - rect.top;  // Posición Y dentro del elemento
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calcular rotación (limitada a 5 grados para sutileza)
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        function resetTilt(container) {
            const card = container.querySelector('.tilt-card');
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }

        // --- Lógica Modo Cine (Modal) ---
        const modal = document.getElementById('cinemaModal');
        const cinemaFrame = document.getElementById('cinemaFrame');

        function openCinemaMode(url) {
            // Agregar autoplay al URL para que arranque al abrir
            const autoPlayUrl = url.includes('?') ? `${url}&autostart=1` : `${url}?autostart=1`;
            
            cinemaFrame.src = autoPlayUrl;
            modal.classList.remove('hidden');
            // Pequeño delay para permitir la transición de opacidad
            setTimeout(() => {
                modal.classList.remove('opacity-0');
            }, 10);
            document.body.style.overflow = 'hidden'; // Bloquear scroll
        }

        function closeCinemaMode() {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                cinemaFrame.src = ''; // Limpiar src para detener video/audio
            }, 300);
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
