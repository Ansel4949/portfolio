document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const extraOffset = -40;
  let currentSection = 0;
  let isScrolling = false;

  function isDesktop() {
    return window.innerWidth > 768;
  }

  function scrollToSection(index) {
    const targetPosition = sections[index].offsetTop - navbarHeight - extraOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    sections.forEach((sec, i) => sec.classList.toggle('active', i === index));
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Desktop-only section scroll
  if (isDesktop()) {
    sections[currentSection].classList.add('active');

    document.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (isScrolling) return;

      isScrolling = true;

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
      } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
      }

      scrollToSection(currentSection);
    }, { passive: false });
  }

  // Normal behavior for mobile — no preventDefault
  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      document.removeEventListener('wheel', () => {}); // disable custom scroll
      document.body.style.overflow = 'auto'; // ensure scrolling is restored
    }
  });

  // Smooth scroll for nav links (both desktop & mobile)
  document.querySelectorAll('.nav-link, .btn-custom').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const targetPos = target.offsetTop - navbarHeight - extraOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
});
