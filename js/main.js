// ─── Particle Background ────────────────────────────────────────────
class ParticleNetwork {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 12000);
    for (let i = 0; i < Math.max(count, 40); i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        p.x -= dx * 0.02;
        p.y -= dy * 0.02;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 255, 65, ${p.opacity})`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const dx2 = this.particles[j].x - p.x;
        const dy2 = this.particles[j].y - p.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (dist2 < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 255, 65, ${0.06 * (1 - dist2 / 150)})`;
          this.ctx.stroke();
        }
      }
    });
    requestAnimationFrame(() => this.animate());
  }
}

// ─── Data ───────────────────────────────────────────────────────────
const SKILLS = [
  { name: 'Penetration Testing', icon: 'fas fa-crosshairs' },
  { name: 'Malware Analysis', icon: 'fas fa-skull' },
  { name: 'Reverse Engineering', icon: 'fas fa-microchip' },
  { name: 'Incident Response', icon: 'fas fa-shield-halved' },
  { name: 'Web Security', icon: 'fas fa-globe' },
  { name: 'Network Security', icon: 'fas fa-network-wired' },
  { name: 'Cryptography', icon: 'fas fa-lock' },
  { name: 'Cloud Security', icon: 'fas fa-cloud' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'C / C++', icon: 'fas fa-code' },
  { name: 'Bash', icon: 'fas fa-terminal' },
  { name: 'Go', icon: 'fa-brands fa-golang' },
  { name: 'Wireshark', icon: 'fas fa-chart-line' },
  { name: 'Metasploit', icon: 'fas fa-bolt' },
  { name: 'Burp Suite', icon: 'fas fa-syringe' },
  { name: 'GHIDRA', icon: 'fas fa-eye' },
  { name: 'Docker', icon: 'fab fa-docker' },
  { name: 'Kubernetes', icon: 'fas fa-cubes' },
  { name: 'SIEM / Splunk', icon: 'fas fa-chart-bar' },
  { name: 'OSINT', icon: 'fas fa-search' },
];

const PROJECTS = [
  {
    name: 'VulnHunter',
    desc: 'Automated vulnerability scanner that combines static analysis with runtime fuzzing to discover zero-day vulnerabilities in web applications and APIs.',
    tags: ['recon', 'exploit'],
    lang: 'Python',
    langColor: '#3572A5',
    stars: 847,
    repo: 'cyberforge/vulnhunter',
    icon: 'fas fa-bug',
  },
  {
    name: 'PhishNet',
    desc: 'Machine learning-based phishing detection engine that analyzes email headers, links, and content patterns with 99.2% accuracy.',
    tags: ['defense', 'tooling'],
    lang: 'Python',
    langColor: '#3572A5',
    stars: 563,
    repo: 'cyberforge/phishnet',
    icon: 'fas fa-fish',
  },
  {
    name: 'BinGlow',
    desc: 'Binary instrumentation framework for dynamic analysis of Windows and Linux executables — used for malware unpacking and behavior profiling.',
    tags: ['exploit', 'tooling'],
    lang: 'C',
    langColor: '#555555',
    stars: 312,
    repo: 'cyberforge/binglow',
    icon: 'fas fa-microchip',
  },
  {
    name: 'ShieldMaiden',
    desc: 'Host-based intrusion detection system with real-time alerting, file integrity monitoring, and automated threat response playbooks.',
    tags: ['defense'],
    lang: 'Go',
    langColor: '#00ADD8',
    stars: 728,
    repo: 'cyberforge/shieldmaiden',
    icon: 'fas fa-shield-halved',
  },
  {
    name: 'ReconProbe',
    desc: 'Passive reconnaissance toolkit that automates subdomain enumeration, certificate transparency log mining, and DNS intelligence gathering.',
    tags: ['recon'],
    lang: 'Go',
    langColor: '#00ADD8',
    stars: 421,
    repo: 'cyberforge/reconprobe',
    icon: 'fas fa-search',
  },
  {
    name: 'C2Relay',
    desc: 'Stealthy command & control framework for red team engagements featuring encrypted peer-to-peer communication and traffic obfuscation.',
    tags: ['exploit', 'tooling'],
    lang: 'Rust',
    langColor: '#DEA584',
    stars: 256,
    repo: 'cyberforge/c2relay',
    icon: 'fas fa-satellite-dish',
  },
  {
    name: 'LogSentinel',
    desc: 'Distributed log analysis platform that ingests millions of events per second with built-in correlation rules for threat hunting.',
    tags: ['defense'],
    lang: 'Rust',
    langColor: '#DEA584',
    stars: 439,
    repo: 'cyberforge/logsentinel',
    icon: 'fas fa-file-lines',
  },
  {
    name: 'SubOver',
    desc: 'Subdomain takeover detection tool that checks 200+ cloud service providers for dangling DNS records and vulnerable endpoints.',
    tags: ['recon', 'tooling'],
    lang: 'Python',
    langColor: '#3572A5',
    stars: 195,
    repo: 'cyberforge/subover',
    icon: 'fas fa-earth-americas',
  },
];

const RESEARCH = [
  {
    title: 'Bypassing Modern EDRs with Reflective DLL Injection',
    desc: 'Deep dive into process injection techniques that evade CrowdStrike, SentinelOne, and Microsoft Defender for Endpoint.',
    category: 'Exploit Development',
    date: 'Mar 15, 2026',
    readTime: '12 min read',
    url: '#',
  },
  {
    title: 'Machine Learning for Malware Classification: A Practical Guide',
    desc: 'Building and training ML models to classify PE files with 97% accuracy using static and dynamic feature extraction.',
    category: 'Defense / ML',
    date: 'Feb 28, 2026',
    readTime: '18 min read',
    url: '#',
  },
  {
    title: 'Cloud Security Assessment Methodology — AWS Edition',
    desc: 'Step-by-step methodology for auditing AWS environments including IAM analysis, S3 bucket reviews, and Lambda privilege escalation paths.',
    category: 'Cloud Security',
    date: 'Jan 12, 2026',
    readTime: '15 min read',
    url: '#',
  },
  {
    title: 'Zero-Day Discovery: From Fuzzing to Responsible Disclosure',
    desc: 'Walkthrough of finding a buffer overflow in a popular FTP server, developing the exploit, and coordinating disclosure with the vendor.',
    category: 'Vulnerability Research',
    date: 'Dec 5, 2025',
    readTime: '20 min read',
    url: '#',
  },
  {
    title: 'Building a Home SOC: ELK Stack, Suricata & TheHive',
    desc: 'Complete guide to setting up a security operations center at home using open-source tools — from ingestion to incident response.',
    category: 'Blue Team',
    date: 'Nov 18, 2025',
    readTime: '25 min read',
    url: '#',
  },
  {
    title: 'Breaking CAPTCHAs with Computer Vision (And Why They Fail)',
    desc: 'Using OCR and CNN-based approaches to solve text-based CAPTCHAs and discussing implications for web security.',
    category: 'Offensive Security',
    date: 'Oct 30, 2025',
    readTime: '10 min read',
    url: '#',
  },
];

// ─── DOM ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particles
  new ParticleNetwork();

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Render skills
  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = SKILLS.map(skill => `
    <div class="skill-card">
      <i class="${skill.icon}"></i>
      <span>${skill.name}</span>
    </div>
  `).join('');

  // Render projects
  const projectsGrid = document.getElementById('projectsGrid');
  const filterTabs = document.getElementById('filterTabs');

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all'
      ? PROJECTS
      : PROJECTS.filter(p => p.tags.includes(filter));

    projectsGrid.innerHTML = filtered.map(p => {
      const stars = p.stars >= 1000 ? (p.stars / 1000).toFixed(1) + 'k' : p.stars;
      return `
        <div class="project-card" data-tags="${p.tags.join(',')}">
          <div class="project-header">
            <i class="${p.icon}"></i>
            <span class="repo-stars">
              <i class="fas fa-star"></i> ${stars}
            </span>
          </div>
          <h3 class="project-name">
            <a href="https://github.com/${p.repo}" target="_blank">${p.name}</a>
          </h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-lang">
            <span class="lang-dot" style="background:${p.langColor}"></span>
            ${p.lang}
          </div>
        </div>
      `;
    }).join('');
  }

  renderProjects();

  // Filter tabs
  filterTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });

  // Render research
  const researchGrid = document.getElementById('researchGrid');
  researchGrid.innerHTML = RESEARCH.map(r => `
    <div class="research-card">
      <span class="research-category">${r.category}</span>
      <h3><a href="${r.url}">${r.title}</a></h3>
      <p>${r.desc}</p>
      <div class="research-meta">
        <span>${r.date}</span>
        <a href="${r.url}" class="read-more">${r.readTime} <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  `).join('');

  // Counter animation
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target) {
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 40);
  }

  // Smooth scroll offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth',
        });
      }
    });
  });
});
