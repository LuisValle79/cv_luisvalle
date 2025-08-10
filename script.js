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
        // Deshabilita el menú contextual del clic derecho
    document.addEventListener('contextmenu', event => event.preventDefault());
    }
}

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

const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');



    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    emailjs.send('service_jw20drg', 'template_y3c8ke5', data)
        .then((response) => {
            formMessage.innerHTML = '<p style="color: #4caf50;">Mensaje enviado con éxito!</p>';
            form.reset();
            console.log('Success:', response.status, response.text);
        }, (error) => {
            formMessage.innerHTML = '<p style="color: red;">Error al enviar el mensaje. Intenta de nuevo.</p>';
            console.error('Error:', error);
        });

    return false;
};

const toggleTheme = () => {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = `<i class="fas ${isDark ? 'fa-moon' : 'fa-sun'}"></i>`;
}

const setAutoTheme = () => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    document.body.setAttribute('data-theme', isNight ? 'dark' : 'light');
    document.querySelector('.theme-toggle').innerHTML = `<i class="fas ${isNight ? 'fa-sun' : 'fa-moon'}"></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
    emailjs.init('SAR5bihfrW9xpbm4o'); // Inicializar EmailJS con tu Public Key
    navSlide();
    smoothScroll();
    scrollAnimations();
    setAutoTheme();
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('contact-form').addEventListener('submit', handleSubmit);
});

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });
});




