(() => {
  const price = document.querySelector('[data-price]');
  if (!price) return;
  const target = Number(price.dataset.price);
  let started = false;
  const run = () => {
    if (started) return;
    started = true;
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
    if (entries.some(entry => entry.isIntersecting)) {
      run();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(price);
})();