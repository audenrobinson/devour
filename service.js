(() => {
  const prices = [...document.querySelectorAll('[data-price]')];
  if (!prices.length) return;

  const animatePrice = (price) => {
    if (price.dataset.started === 'true') return;
    price.dataset.started = 'true';

    const target = Number(price.dataset.price);
    const startValue = 1000;
    const duration = 5000;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (target - startValue) * eased;
      price.textContent = value.toFixed(2);

      if (progress < 1) requestAnimationFrame(tick);
      else price.textContent = target.toFixed(2);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animatePrice(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  prices.forEach((price) => observer.observe(price));
})();
