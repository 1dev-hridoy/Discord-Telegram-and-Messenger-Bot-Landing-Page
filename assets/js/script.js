// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
});

// Check for saved theme preference or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuButton.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuButton.classList.remove('open');
    }
});

// FAQ Accordion
const faqAccordion = document.getElementById('faq-accordion');
faqAccordion.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const content = e.target.nextElementSibling;
        content.classList.toggle('hidden');
        e.target.querySelector('i').classList.toggle('fa-chevron-up');
        e.target.querySelector('i').classList.toggle('fa-chevron-down');
    }
});

// Command search
const commandSearch = document.getElementById('command-search');
const commandsList = document.getElementById('commands-list');
const commands = commandsList.querySelectorAll('div');

commandSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    commands.forEach(command => {
        const commandName = command.querySelector('h3').textContent.toLowerCase();
        const commandDesc = command.querySelector('p').textContent.toLowerCase();
        if (commandName.includes(searchTerm) || commandDesc.includes(searchTerm)) {
            command.style.display = 'block';
        } else {
            command.style.display = 'none';
        }
    });
});

// Animated stats
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        obj.innerHTML = value.toLocaleString();
        if (value == end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

animateValue("servers-count", 0, 10000, 2000);
animateValue("users-count", 0, 1000000, 2000);
animateValue("commands-count", 0, 5000000, 2000);

// Form validation
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (emailInput.value.trim() === '') {
        alert('Please enter a valid email address.');
        return;
    }
    // Here you would typically send the email to your server
    alert('Thank you for subscribing!');
    emailInput.value = '';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// GSAP Animations
gsap.from(".hero h1", {duration: 1, x: -100, opacity: 0, ease: "power3.out"});
gsap.from(".hero p", {duration: 1, x: -100, opacity: 0, ease: "power3.out", delay: 0.2});
gsap.from(".hero a", {duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.4, stagger: 0.2});

// Scroll trigger animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.glassmorphism').forEach((element, i) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1
    });
});