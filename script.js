        // Navigation Slide
        const navSlide = () => {
            const burger = document.querySelector('.burger');
            const nav = document.querySelector('.nav-links');
            const navLinks = document.querySelectorAll('.nav-links li');

            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
                burger.classList.toggle('toggle');
            });
        }

        // Smooth Scroll
        const smoothScroll = () => {
            const navLinks = document.querySelectorAll('.nav-links a');
            const headerHeight = document.querySelector('header').offsetHeight;

            for (const link of navLinks) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - headerHeight,
                            behavior: 'smooth'
                        });
                    }

                    const nav = document.querySelector('.nav-links');
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        document.querySelector('.burger').classList.remove('toggle');
                    }
                });
            }
        }

        // Scroll Animations
        const scrollAnimations = () => {
            const sections = document.querySelectorAll('section');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            sections.forEach(section => observer.observe(section));
        }

        // Form Submission
        const handleSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            alert('Mensaje enviado! (Simulación - No hay backend)');
            form.reset();
            return false;
        }

        // Theme Toggle
        const toggleTheme = () => {
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle');
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            themeToggle.innerHTML = `<i class="fas ${isDark ? 'fa-moon' : 'fa-sun'}"></i>`;
        }

        // Auto Theme based on time
        const setAutoTheme = () => {
            const hour = new Date().getHours();
            const isNight = hour >= 18 || hour < 6;
            document.body.setAttribute('data-theme', isNight ? 'dark' : 'light');
            document.querySelector('.theme-toggle').innerHTML = `<i class="fas ${isNight ? 'fa-sun' : 'fa-moon'}"></i>`;
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            navSlide();
            smoothScroll();
            scrollAnimations();
            setAutoTheme();
            document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
        });

        // Card Flip
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flip');
            });
        });
