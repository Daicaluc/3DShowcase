        lucide.createIcons();

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
        revealOnScroll(); 

        function handleTilt(e, container) {
            const card = container.querySelector('.tilt-card');
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        function resetTilt(container) {
            const card = container.querySelector('.tilt-card');
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }

        const modal = document.getElementById('cinemaModal');
        const cinemaFrame = document.getElementById('cinemaFrame');

        function openCinemaMode(url) {
            const autoPlayUrl = url.includes('?') ? `${url}&autostart=1` : `${url}?autostart=1`;
            
            cinemaFrame.src = autoPlayUrl;
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
            }, 10);
            document.body.style.overflow = 'hidden'; 
        }

        function closeCinemaMode() {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                cinemaFrame.src = '';
            }, 300);
            document.body.style.overflow = 'auto';
        }
