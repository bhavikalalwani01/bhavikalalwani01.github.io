// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar color change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#1a252f';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.backgroundColor = '#2c3e50';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Typing effect for hero section
function typeEffect() {
    const text = "Software Developer";
    const speed = 100;
    let i = 0;
    const heroText = document.querySelector('.hero-content p');
    heroText.textContent = ''; // Clear existing text

    function typing() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}
typeEffect();

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const message = this.querySelector('#message').value;

        // Validate all fields are filled
        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        // If all validations pass
        console.log('Form submitted:', { name, email, message });
        this.reset();
        showAlert('Thank you for your message!', 'success');
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Alert helper function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Add alert styles
    alertDiv.style.padding = '10px';
    alertDiv.style.margin = '10px 0';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.textAlign = 'center';

    // Add color styles based on alert type
    if (type === 'error') {
        alertDiv.style.backgroundColor = '#ffe6e6';
        alertDiv.style.color = '#ff0000';
        alertDiv.style.border = '1px solid #ff0000';
    } else {
        alertDiv.style.backgroundColor = '#e6ffe6';
        alertDiv.style.color = '#008000';
        alertDiv.style.border = '1px solid #008000';
    }

    // Insert alert before the form
    const form = document.querySelector('#contact-form');
    form.parentNode.insertBefore(alertDiv, form);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}