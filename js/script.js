/* ============================================================
   Angel Mavuyangwa Portfolio — script.js
   All interactive behaviour in one clean file
   ============================================================ */

'use strict';

// ── NAVBAR ─────────────────────────────────────────────────
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const links     = document.getElementById('navbarLinks');
  if (!navbar) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    links.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close nav on link click (mobile)
  links?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      links.classList.remove('active');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (links?.classList.contains('active') &&
        !links.contains(e.target) &&
        !hamburger?.contains(e.target)) {
      hamburger?.classList.remove('active');
      links.classList.remove('active');
    }
  });
})();

// ── TYPEWRITER ─────────────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'Software Developer',
    'Business Analyst',
    'Data Science Enthusiast',
    'Full-Stack Engineer',
    'ML Practitioner',
  ];
  let wIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const word    = words[wIdx];
    const current = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
    el.textContent = current;

    let delay = deleting ? 60 : 95;
    if (!deleting && cIdx > word.length) { delay = 1800; deleting = true; }
    if (deleting && cIdx < 0)           { deleting = false; wIdx = (wIdx + 1) % words.length; delay = 350; }
    setTimeout(tick, delay);
  }
  tick();
})();

// ── SCROLL-REVEAL ───────────────────────────────────────────
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();

// ── SKILL BARS ──────────────────────────────────────────────
(function initSkillBars() {
  const fills = document.querySelectorAll('.progress-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width || '0%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(fill => observer.observe(fill));
})();

// ── PROJECT FILTER ──────────────────────────────────────────
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        // small bounce-in
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });
    });
  });
})();

// ── CV MODAL ────────────────────────────────────────────────
(function initCvModal() {
  const modal     = document.getElementById('cvModal');
  const closeBtn  = document.getElementById('closeModalBtn');
  const triggerBtns = document.querySelectorAll('.download-cv-btn');

  if (!modal) return;

  function openModal()  { modal.classList.add('show'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('show'); document.body.style.overflow = ''; }

  triggerBtns.forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // CV option selection → download correct PDF
  modal.querySelectorAll('.cv-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.cv;
      downloadCv(type);
      closeModal();
    });
  });

  function downloadCv(type) {
    // Map each role to its specific PDF file
    const cvFiles = {
      'business-analyst': 'MAVUYANGWA_ANGEL_CV.pdf',
      'software-dev': 'MAVUYANGWA_ANGEL_SHILUVA_CV.pdf',
      'data-science': 'ANGEL SHILUVA MAVUYANGWA.pdf'
    };
    
    const cvFile = cvFiles[type] || 'ANGEL SHILUVA MAVUYANGWA.pdf';
    const displayName = {
      'business-analyst': 'Business_Analyst_CV',
      'software-dev': 'Software_Developer_CV',
      'data-science': 'Data_Science_CV'
    };
    
    const a = document.createElement('a');
    a.href = cvFile;
    a.download = `Angel_Mavuyangwa_${displayName[type] || 'CV'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showDownloadNotification(displayName[type] || 'CV');
  }

  function showDownloadNotification(cvType) {
    const existing = document.querySelector('.download-notification');
    if (existing) existing.remove();

    const note = document.createElement('div');
    note.className = 'download-notification';
    note.innerHTML = `
      <span class="icon" data-icon="checkCircle" style="width:18px;height:18px;display:flex;align-items:center;"></span>
      ${cvType} downloading…
    `;
    document.body.appendChild(note);

    // inject SVG into the dynamically created icon
    if (typeof ICONS !== 'undefined') {
      note.querySelectorAll('[data-icon]').forEach(el => {
        const key = el.getAttribute('data-icon');
        if (ICONS[key]) { el.innerHTML = ICONS[key]; el.setAttribute('aria-hidden', 'true'); }
      });
    }

    setTimeout(() => note.remove(), 3000);
  }
})();

// ── CONTACT FORM ────────────────────────────────────────────
(function initContactForm() {
  const submitBtn     = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const formMsg       = document.getElementById('formMessage');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const firstName = document.getElementById('firstName')?.value.trim();
    const lastName  = document.getElementById('lastName')?.value.trim();
    const email     = document.getElementById('email')?.value.trim();
    const subject   = document.getElementById('subject')?.value;
    const message   = document.getElementById('message')?.value.trim();

    if (!firstName || !lastName || !email || !message) {
      showFormMsg('Please fill in all required fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFormMsg('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending…';
    const spinnerIcon = submitBtn.querySelector('.icon');
    if (spinnerIcon) { spinnerIcon.style.animation = 'spin 1s linear infinite'; }

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtnText.textContent = 'Send Message';
      if (spinnerIcon) spinnerIcon.style.animation = '';

      // Build mailto link as a practical fallback
      const body = encodeURIComponent(
        `Hi Angel,\n\n${message}\n\nBest regards,\n${firstName} ${lastName}`
      );
      const sub  = encodeURIComponent(subject || 'Portfolio Enquiry');
      window.location.href = `mailto:angelshiluva2004@gmail.com?subject=${sub}&body=${body}`;

      showFormMsg('Thanks! Your email client should open shortly.', 'success');
      clearForm();
    }, 1200);
  });

  function showFormMsg(text, type) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className   = `form-message ${type}`;
    formMsg.style.display = 'block';
    setTimeout(() => { formMsg.style.display = 'none'; }, 5000);
  }

  function clearForm() {
    ['firstName','lastName','email','message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const sel = document.getElementById('subject');
    if (sel) sel.selectedIndex = 0;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();

// ── SMOOTH ANCHOR SCROLL ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});