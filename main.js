
// ===== Professional Upgrade JS =====
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('pageLoader');
  setTimeout(() => loader?.classList.add('hidden'), 450);

  const nav = document.getElementById('mainNav');
  const progress = document.getElementById('scrollProgress');
  const backTop = document.getElementById('backToTop');
  const updateScroll = () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    nav?.classList.toggle('nav-scrolled', scrolled > 40);
    backTop?.classList.toggle('show', scrolled > 350);
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll);
  backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) { event.preventDefault(); event.stopPropagation(); }
      else if (!form.action) { event.preventDefault(); alert('تم استلام الطلب بنجاح. سنتواصل معك قريباً.'); form.reset(); }
      form.classList.add('was-validated');
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 55));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString('ar') + suffix;
      }, 24);
      countObserver.unobserve(el);
    });
  }, {threshold:.45});
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  const darkToggle = document.getElementById('darkModeToggle');
  const storedMode = localStorage.getItem('saboul-dark-mode');
  if (storedMode === 'true') document.body.classList.add('dark-mode');
  const syncDarkIcon = () => { if (darkToggle) darkToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'; };
  syncDarkIcon();
  darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('saboul-dark-mode', document.body.classList.contains('dark-mode'));
    syncDarkIcon();
  });

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar a.nav-link').forEach(a => {
    const href = a.getAttribute('href')?.split('#')[0];
    if (href === current) a.classList.add('active');
  });

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

  const searchInput = document.getElementById('serviceSearch');
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('[data-search-card]').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  const modalImg = document.getElementById('lightboxImage');
  document.querySelectorAll('.gallery-item img, .album-img').forEach(img => {
    img.parentElement?.classList.add('gallery-item');
    img.addEventListener('click', () => {
      if (!modalImg) return;
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'صورة من الألبوم';
      new bootstrap.Modal(document.getElementById('imageLightbox')).show();
    });
  });
});
