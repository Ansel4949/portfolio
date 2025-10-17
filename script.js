document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const extraOffset = -40;
  let currentSection = 0;
  let isScrolling = false;

  
  function isDesktop() {
    return window.innerWidth > 768; 
  }

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

  function scrollToSection(index) {
    const targetPosition = sections[index].offsetTop - navbarHeight - extraOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    sections.forEach((sec, i) => sec.classList.toggle('active', i === index));
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }


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
