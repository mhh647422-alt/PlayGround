/* ================= رفيق — main.js ================= */
document.addEventListener('DOMContentLoaded', () => {
  // سنة الحقوق
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ظل الهيدر عند التمرير
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // قائمة الجوال
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  // أنيميشن الظهور
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // عدادات الأرقام
  const counters = document.querySelectorAll('.counter');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      cio.unobserve(el);
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const dur = 1600, t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => cio.observe(c));

  // فلترة أعمالنا
  const filters = document.querySelectorAll('.filter');
  const works = document.querySelectorAll('.work');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    works.forEach(w => w.classList.toggle('hide', f !== 'all' && w.dataset.cat !== f));
  }));

  // تحقق نموذج التواصل
  const form = document.getElementById('contactForm');
  if (form) {
    const err = document.getElementById('formError');
    const ok = document.getElementById('formSuccess');
    form.addEventListener('submit', e => {
      e.preventDefault();
      err.style.display = 'none';
      ok.style.display = 'none';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || message.length < 5) {
        err.style.display = 'block';
        return;
      }
      ok.style.display = 'block';
      form.reset();
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
