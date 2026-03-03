/* =============================================
   ANIME PORTFOLIO — FULL JAVASCRIPT v2 (POWER LEVEL MAX)
   ============================================= */

/* =============================================
   0. LENIS SMOOTH SCROLL
   ============================================= */
let lenis;
try {
    if (window.innerWidth > 768) {
        lenis = new Lenis({
            duration: 1.3,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });
        function rafLoop(time) {
            lenis.raf(time);
            requestAnimationFrame(rafLoop);
        }
        requestAnimationFrame(rafLoop);
    }
} catch (e) {
    // Lenis not available
}

/* =============================================
   1. ANIME INTRO LOADER
   ============================================= */
(function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const bar = document.getElementById('loader-bar');
    const percent = document.getElementById('loader-percent');
    const terminal = document.getElementById('loader-terminal');
    const particles = document.getElementById('loader-particles');

    // Spawn loader particles
    const pColors = ['#6c5ce7', '#ff2d9b', '#00f5ff', '#ffdd00', '#ff6b2b', '#39ff14'];
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'loader-particle';
        const size = Math.random() * 8 + 3;
        p.style.cssText = `
            width: ${size}px; height: ${size}px;
            background: ${pColors[Math.floor(Math.random() * pColors.length)]};
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 4 + 3}s;
            animation-delay: ${Math.random() * 3}s;
            box-shadow: 0 0 ${size * 2}px currentColor;
            opacity: 0.8;
        `;
        particles.appendChild(p);
    }

    // Terminal lines
    const lines = [
        '> SYSTEM BOOT...',
        '> LOADING ASSETS...',
        '> INITIALIZING ANIME ENGINE...',
        '> CONNECTING TO PORTFOLIO.SYS...',
        '> ACCESS GRANTED ✓',
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let currentText = '';

    function writeTerminal() {
        if (lineIdx >= lines.length) return;
        const line = lines[lineIdx];
        if (charIdx <= line.length) {
            currentText = line.substring(0, charIdx);
            terminal.textContent = currentText + '|';
            charIdx++;
            setTimeout(writeTerminal, 40);
        } else {
            lineIdx++;
            charIdx = 0;
            setTimeout(writeTerminal, 200);
        }
    }
    writeTerminal();

    // Progress bar
    let progress = 0;
    const totalTime = 2800;
    const interval = 30;
    const steps = totalTime / interval;
    const increment = 100 / steps;

    const barTimer = setInterval(() => {
        progress = Math.min(100, progress + increment * (Math.random() * 2.5 + 0.5));
        if (bar) { bar.style.width = progress + '%'; }
        if (percent) { percent.textContent = Math.floor(progress) + '%'; }
        if (progress >= 100) {
            clearInterval(barTimer);
            setTimeout(() => {
                loader.classList.add('loaded');
                document.body.style.overflow = '';
            }, 400);
        }
    }, interval);

    document.body.style.overflow = 'hidden';
})();

/* =============================================
   2. STICKY NAVIGATION
   ============================================= */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('sticky', window.scrollY > 0);
});

/* =============================================
   3. MOBILE NAVIGATION (HAMBURGER)
   ============================================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

/* =============================================
   4. ACTIVE NAV LINK ON SCROLL
   ============================================= */
const allSections = document.querySelectorAll('section, header');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});

/* =============================================
   5. TYPING ANIMATION
   ============================================= */
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
    const words = ['Flutter Developer', 'Mobile Engineer', 'Clean Architecture Expert', 'Firebase Specialist', 'UI/UX Enthusiast'];
    let wordIdx = 0, charI = 0, isDeleting = false;

    function typeLoop() {
        const word = words[wordIdx];
        const speed = isDeleting ? 60 : 110;
        typingEl.textContent = isDeleting
            ? word.substring(0, charI--)
            : word.substring(0, charI++);
        if (!isDeleting && charI > word.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        if (isDeleting && charI < 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            charI = 0;
            setTimeout(typeLoop, 400);
            return;
        }
        setTimeout(typeLoop, speed);
    }
    typeLoop();
}

/* =============================================
   6. ANIME BACKGROUND CANVAS — PARTICLES
   ============================================= */
const canvas = document.getElementById('anime-bg');
const ctx = canvas.getContext('2d');

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
initCanvas();
window.addEventListener('resize', () => { initCanvas(); initParticles(); });

const colors = ['#6c5ce7', '#ff2d9b', '#00f5ff', '#ffdd00', '#ff6b2b', '#39ff14', '#bd93f9', '#ff79c6'];

function drawStar(ctx, cx, cy, spikes, outerR, innerR, angle) {
    let rot = (Math.PI / 2) * 3 + angle;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
    }
    ctx.closePath();
}

function drawSakura(ctx, x, y, size, angle) {
    for (let p = 0; p < 5; p++) {
        const a = angle + (p * Math.PI * 2) / 5;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(size, 0, size, size * 0.5, 0, 0, Math.PI * 2);
        ctx.restore();
    }
}

class Particle {
    constructor(type) {
        this.type = type;
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = -Math.random() * 0.9 - 0.3;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.06;
        this.life = 1;
        this.decay = Math.random() * 0.004 + 0.001;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angleSpeed;
        this.life -= this.decay;
        this.pulsePhase += 0.05;
        if (this.life <= 0 || this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
            this.reset();
            this.y = canvas.height + 20;
        }
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.35 + 0.75;
        ctx.globalAlpha = this.opacity * this.life * pulse;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;

        if (this.type === 'dot') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'star') {
            drawStar(ctx, this.x, this.y, 5, this.size * 2.5, this.size, this.angle);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else if (this.type === 'sakura') {
            drawSakura(ctx, this.x, this.y, this.size * 3, this.angle);
            ctx.fill();
        } else if (this.type === 'line') {
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.speedX * 30, this.y + this.speedY * 30);
            ctx.stroke();
        } else if (this.type === 'comet') {
            const grad = ctx.createLinearGradient(this.x, this.y,
                this.x - this.speedX * 50, this.y - this.speedY * 50);
            grad.addColorStop(0, this.color);
            grad.addColorStop(1, 'transparent');
            ctx.strokeStyle = grad;
            ctx.lineWidth = this.size * 1.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.speedX * 50, this.y - this.speedY * 50);
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}

let particlesArray = [];

function initParticles() {
    particlesArray = [];
    // Reduce density divisor and max count for better performance
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
    const types = ['dot', 'dot', 'dot', 'star', 'star', 'sakura', 'sakura', 'sakura', 'line', 'comet'];
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle(types[i % types.length]));
    }
}
initParticles();

function drawConnections() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.globalAlpha = ((100 - dist) / 100) * 0.12;
                ctx.strokeStyle = particlesArray[a].color;
                ctx.lineWidth = 0.4;
                ctx.shadowColor = particlesArray[a].color;
                ctx.shadowBlur = 4;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
    }
    ctx.globalAlpha = 1;
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* =============================================
   7. CUSTOM CURSOR
   ============================================= */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', e => {
    cursor.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
    cursor2.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
});

const interactables = document.querySelectorAll('a, button, .skill-item, .project-card, .stat-item, .timeline-item');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursor2.classList.add('cursor2-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursor2.classList.remove('cursor2-hover');
    });
});

/* =============================================
   8. CURSOR TRAIL — SAKURA ENERGY SPARKS
   ============================================= */
(function initCursorTrail() {
    const trail = document.getElementById('cursor-trail');
    if (!trail) return;

    const trailColors = ['#6c5ce7', '#ff2d9b', '#00f5ff', '#ffdd00', '#ff6b2b', '#39ff14'];
    let lastX = 0, lastY = 0;

    document.addEventListener('mousemove', e => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 8) return;
        lastX = e.clientX;
        lastY = e.clientY;

        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        const size = Math.random() * 10 + 4;
        const color = trailColors[Math.floor(Math.random() * trailColors.length)];
        dot.style.cssText = `
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        trail.appendChild(dot);
        setTimeout(() => dot.remove(), 700);
    });
})();

/* =============================================
   9. MOUSE PARALLAX ON HERO
   ============================================= */
(function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const heroSection = document.querySelector('#home');
    const layers = document.querySelectorAll('[data-parallax]');

    document.addEventListener('mousemove', e => {
        if (!heroSection) return;
        const rect = heroSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const rx = (e.clientX - cx) / cx;
        const ry = (e.clientY - cy) / cy;

        layers.forEach(el => {
            const factor = parseFloat(el.dataset.parallax) || 0;
            el.style.transform = `translate(${rx * factor * 60}px, ${ry * factor * 30}px)`;
        });
    });
})();

/* =============================================
   10. HERO IMAGE 3D TILT
   ============================================= */
(function initHeroTilt() {
    const tiltEl = document.getElementById('hero-img-tilt');
    if (!tiltEl) return;

    tiltEl.addEventListener('mousemove', e => {
        const rect = tiltEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / (rect.height / 2)) * -15;
        const ry = ((e.clientX - cx) / (rect.width / 2)) * 15;
        tiltEl.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.06,1.06,1.06)`;
    });

    tiltEl.addEventListener('mouseleave', () => {
        tiltEl.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        tiltEl.style.transition = 'transform 0.6s ease';
    });

    tiltEl.addEventListener('mouseenter', () => {
        tiltEl.style.transition = 'transform 0.1s ease';
    });
})();

/* =============================================
   11. SCROLL REVEAL — STAGGER ANIMATIONS
   ============================================= */
(function initScrollReveal() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        return;
    }
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
})();

/* =============================================
   12. ANIMATED STATS COUNTER
   ============================================= */
(function initCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    if (!statItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.target.classList.contains('counted')) return;
            entry.target.classList.add('counted');

            const counter = entry.target.querySelector('.counter');
            const fill = entry.target.querySelector('.stat-bar-fill');
            const target = parseInt(counter?.dataset.target || '0');
            const fillW = fill?.style.width || '80%';

            // Animate counter
            if (counter) {
                let current = 0;
                const duration = 1800;
                const step = target / (duration / 16);
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    counter.textContent = Math.floor(current);
                    if (current >= target) clearInterval(timer);
                }, 16);
            }

            // Animate bar
            if (fill) {
                fill.style.setProperty('--fill', fillW);
                fill.style.width = '0';
                setTimeout(() => { fill.style.width = fillW; }, 100);
            }
        });
    }, { threshold: 0.3 });

    statItems.forEach(el => observer.observe(el));
})();

/* =============================================
   13. SKILLS RADAR CHART
   ============================================= */
(function initRadar() {
    const canvas = document.getElementById('radar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Values: 0–1 for each skill category
    const skills = [
        { label: 'Flutter/Dart', value: 0.95, color: '#00f5ff' },
        { label: 'Architecture', value: 0.90, color: '#ff2d9b' },
        { label: 'Firebase', value: 0.85, color: '#ffdd00' },
        { label: 'APIs', value: 0.88, color: '#39ff14' },
        { label: 'UI/Animations', value: 0.80, color: '#6c5ce7' },
        { label: 'DevOps/Tools', value: 0.75, color: '#ff6b2b' },
    ];

    const N = skills.length;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxR = Math.min(cx, cy) * 0.72;
    const levels = 5;

    let animProgress = 0;
    let bgHue = 0;

    function getAngle(i) { return (Math.PI * 2 * i) / N - Math.PI / 2; }
    function getPoint(i, r) {
        const a = getAngle(i);
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }

    function drawRadar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background glow
        bgHue = (bgHue + 0.2) % 360;
        const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.2);
        bgGrad.addColorStop(0, `hsla(${bgHue},80%,30%,0.07)`);
        bgGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Web grid levels
        for (let l = 1; l <= levels; l++) {
            const r = maxR * (l / levels);
            ctx.beginPath();
            for (let i = 0; i < N; i++) {
                const p = getPoint(i, r);
                i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(108,92,231,${0.08 + l * 0.03})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        // Axis lines
        for (let i = 0; i < N; i++) {
            const outer = getPoint(i, maxR);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(outer.x, outer.y);
            ctx.strokeStyle = 'rgba(108,92,231,0.2)';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Outer dots
            ctx.beginPath();
            ctx.arc(outer.x, outer.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = skills[i].color;
            ctx.shadowColor = skills[i].color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Data polygon (animated fill)
        const prog = Math.min(animProgress, 1);
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
            const r = maxR * skills[i].value * prog;
            const p = getPoint(i, r);
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();

        // Fill gradient
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        grad.addColorStop(0, 'rgba(108,92,231,0.45)');
        grad.addColorStop(0.5, 'rgba(255,45,155,0.25)');
        grad.addColorStop(1, 'rgba(0,245,255,0.1)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke
        ctx.strokeStyle = 'rgba(108,92,231,0.8)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#6c5ce7';
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Data nodes
        for (let i = 0; i < N; i++) {
            const r = maxR * skills[i].value * prog;
            const p = getPoint(i, r);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = skills[i].color;
            ctx.shadowColor = skills[i].color;
            ctx.shadowBlur = 20;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Animate in
        if (animProgress < 1) {
            animProgress += 0.025;
            requestAnimationFrame(drawRadar);
        } else {
            // Continue pulsing loop
            requestAnimationFrame(drawRadar);
        }
    }

    // Only start when radar enters view
    const radarObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            radarObserver.disconnect();
            drawRadar();
        }
    }, { threshold: 0.3 });
    radarObserver.observe(canvas);
})();

/* =============================================
   14. EXPERIENCE TIMELINE — LINE DRAW ANIMATION
   ============================================= */
(function initTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            timeline.classList.add('line-animated');
            observer.disconnect();
        }
    }, { threshold: 0.1 });
    observer.observe(timeline);
})();

/* =============================================
   15. PROJECT CARD 3D TILT
   ============================================= */
(function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
            const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
            card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
})();

/* =============================================
   16. GLITCH TRIGGER — RANDOM HIT
   ============================================= */
(function initGlitch() {
    const glitchEl = document.querySelector('.glitch');
    if (!glitchEl) return;
    setInterval(() => {
        if (Math.random() < 0.3) {
            glitchEl.classList.add('glitch-hit');
            setTimeout(() => glitchEl.classList.remove('glitch-hit'), 200);
        }
    }, 2500);
})();

/* =============================================
   17. LOCALIZATION (AR / EN)
   ============================================= */
const translations = {
    en: {
        home: 'Home', about: 'About', skills: 'Skills', experience: 'Work',
        projects: 'Projects', contact: 'Contact', me: 'Me',
        hello: "Hello, It's Me", name: 'HATEM NASSER',
        im: "And I'm a",
        hero_desc: 'Flutter Mobile Application Developer with 2+ years of experience delivering production-ready, scalable applications. Expert in Clean Architecture, Firebase, and creating seamless user experiences.',
        hire_me: 'Hire Me', download_cv: 'Download CV',
        stat_projects: 'Projects Delivered', stat_years: 'Years Experience',
        stat_tech: 'Technologies', stat_clients: 'Happy Clients',
        my: 'My', technical: 'Technical',
        role_title: 'Flutter Mobile Application Developer',
        about_desc: 'I have a proven ability to deliver production-ready, scalable mobile applications using Flutter and Dart. My strong background includes Clean Architecture, state management (Bloc, Cubit, GetX), Firebase, REST APIs, and Google Maps integration.',
        location: 'Cairo, Egypt',
        education: 'B.Sc. Computer Science, Beni Suef University',
        project_home_title: 'Home Services App',
        project_home_desc: 'Cross-platform app for booking home services. Firebase Auth/Firestore, Google Maps tracking, electronic payments.',
        project_ecommerce_title: 'E-Commerce Application',
        project_ecommerce_desc: 'Full-featured e-commerce app with catalog, cart, checkout, and order tracking. Clean Architecture + REST APIs.',
        project_jobizaa_title: 'Jobizaa — Job Search',
        project_jobizaa_desc: 'Cross-platform job search app with REST API integration for listings and user profiles. Clean Architecture.',
        project_meals_title: 'Easy Meals Manager',
        project_meals_desc: 'Smart meal planning and management app to help users organize daily meals effectively.',
        full_name: 'Full Name', email_address: 'Email Address',
        mobile_number: 'Mobile Number', email_subject: 'Email Subject',
        your_message: 'Your Message', send_message: 'Send to WhatsApp',
        copyright: 'Copyright © 2026 by Hatem Nasser Esmail | All Rights Reserved.',
    },
    ar: {
        home: 'الرئيسية', about: 'من أنا', skills: 'المهارات', experience: 'الخبرات',
        projects: 'المشاريع', contact: 'تواصل', me: '',
        hello: 'مرحباً، أنا', name: 'حاتم ناصر',
        im: 'وأنا',
        hero_desc: 'مطور تطبيقات موبايل Flutter بخبرة تزيد عن سنتين في تسليم تطبيقات احترافية وقابلة للتطوير. خبير في Clean Architecture وFirebase.',
        hire_me: 'وظفني', download_cv: 'تحميل السيرة الذاتية',
        stat_projects: 'مشروع منجز', stat_years: 'سنوات خبرة',
        stat_tech: 'تقنية', stat_clients: 'عميل سعيد',
        my: 'مشاريعي', technical: 'المهارات',
        role_title: 'مطور تطبيقات Flutter',
        about_desc: 'أمتلك قدرة مثبتة على تسليم تطبيقات موبايل احترافية باستخدام Flutter وDart. خلفيتي تشمل Clean Architecture وإدارة الحالة وFirebase وREST APIs.',
        location: 'القاهرة، مصر',
        education: 'بكالوريوس علوم حاسوب، جامعة بني سويف',
        project_home_title: 'تطبيق الخدمات المنزلية',
        project_home_desc: 'تطبيق لحجز الخدمات المنزلية مع Firebase وخرائط Google ودفع إلكتروني.',
        project_ecommerce_title: 'تطبيق التجارة الإلكترونية',
        project_ecommerce_desc: 'تطبيق تسوق متكامل مع كتالوج وسلة شراء وتتبع الطلبات. Clean Architecture + REST APIs.',
        project_jobizaa_title: 'Jobizaa — بحث عن وظيفة',
        project_jobizaa_desc: 'تطبيق للبحث عن وظائف مع تكامل REST API. Clean Architecture.',
        project_meals_title: 'مدير الوجبات السهل',
        project_meals_desc: 'تطبيق ذكي لتخطيط الوجبات اليومية وتنظيمها.',
        full_name: 'الاسم الكامل', email_address: 'البريد الإلكتروني',
        mobile_number: 'رقم الجوال', email_subject: 'موضوع الرسالة',
        your_message: 'رسالتك', send_message: 'إرسال عبر واتساب',
        copyright: 'جميع الحقوق محفوظة © 2026 لـ حاتم ناصر إسماعيل',
    }
};

let currentLang = 'en';
const langBtn = document.getElementById('lang-toggle');

function applyTranslation(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key] !== undefined) el.placeholder = t[key];
    });
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.dataset.i18nValue;
        if (t[key] !== undefined) el.value = t[key];
    });
    if (langBtn) langBtn.textContent = lang === 'en' ? 'AR' : 'EN';
}

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        applyTranslation(currentLang);
    });
}

/* =============================================
   18. LIGHTBOX GALLERY
   ============================================= */
const galleries = {
    home: [
        'assets/homeeze/process 1.png',
        'assets/homeeze/process 2.png',
        'assets/homeeze/process 3.png',
        'assets/homeeze/process 4.png',
    ],
    ecommerce: [
        'assets/e-commers/Screenshot 2026-02-17 230056.png',
        'assets/e-commers/Screenshot 2026-02-17 230141.png',
        'assets/e-commers/Screenshot 2026-02-17 230216.png',
        'assets/e-commers/Screenshot 2026-02-17 230247.png',
        'assets/e-commers/Screenshot 2026-02-17 230312.png',
    ],
    jobizaa: [
        'assets/jobze/Start.jpg',
        'assets/jobze/Screenshot (109).png',
        'assets/jobze/Screenshot (110).png',
        'assets/jobze/Screenshot (111).png',
        'assets/jobze/Screenshot (112).png',
    ],
    meals: [
        'assets/Meals App/Home Screen.jpg',
        'assets/Meals App/Search Screen.jpg',
        'assets/Meals App/Filters Screen.jpg',
    ],
};

let currentGallery = [], currentSlide = 0;

function openLightbox(key) {
    currentGallery = galleries[key] || [];
    currentSlide = 0;
    showSlide(0);
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showSlide(idx) {
    if (!currentGallery.length) return;
    currentSlide = (idx + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-img').src = currentGallery[currentSlide];
    document.getElementById('caption').textContent = `${currentSlide + 1} / ${currentGallery.length}`;
}

function changeSlide(dir) { showSlide(currentSlide + dir); }

document.querySelector('.close-lightbox')?.addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
});

document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox')?.classList.contains('active')) return;
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'Escape') {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* =============================================
   19. WHATSAPP CONTACT FORM
   ============================================= */
function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
    t.style.cssText = `
        position:fixed; bottom:2.5rem; right:2.5rem;
        background: ${type === 'success' ? 'linear-gradient(135deg,#6c5ce7,#ff2d9b)' : 'linear-gradient(135deg,#ff6b2b,#ff2d9b)'};
        color:#fff; padding:1.4rem 2.2rem; border-radius:1rem;
        font-size:1.4rem; z-index:99999; box-shadow:0 10px 40px rgba(0,0,0,0.4);
        animation:fadeInUp 0.4s ease;
        display:flex; gap:1rem; align-items:center;
    `;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

document.getElementById('whatsapp-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('wa-name')?.value.trim();
    const email = document.getElementById('wa-email')?.value.trim();
    const number = document.getElementById('wa-number')?.value.trim();
    const subject = document.getElementById('wa-subject')?.value.trim();
    const message = document.getElementById('wa-message')?.value.trim();

    if (!name || !message) {
        showToast('Please fill in your name and message.', 'error');
        return;
    }

    const text = encodeURIComponent(
        `*New Portfolio Contact* 🚀\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${number}\n*Subject:* ${subject}\n\n*Message:*\n${message}`
    );
    window.open(`https://wa.me/201271964322?text=${text}`, '_blank');
    showToast('Opening WhatsApp... 🎉');
    e.target.reset();
});
// Export functions to window for HTML onclick handlers
window.openLightbox = openLightbox;
window.changeSlide = changeSlide;
