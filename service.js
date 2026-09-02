(() => {
  const price = document.querySelector('[data-price]');
  if (!price) return;

  const target = Number(price.dataset.price);
  const targetMax = price.dataset.priceMax ? Number(price.dataset.priceMax) : null;
  let started = false;

  const formatPrice = (minimum, maximum) => {
    if (maximum === null) return minimum.toFixed(2);
    return `${minimum.toFixed(2)} – ${maximum.toFixed(2)}`;
  };

  const run = () => {
    if (started) return;
    started = true;
    const startValue = 1000;
    const duration = 5000;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const minimum = startValue + (target - startValue) * eased;
      const maximum = targetMax === null
        ? null
        : startValue + (targetMax - startValue) * eased;

      price.textContent = formatPrice(minimum, maximum);

      if (progress < 1) requestAnimationFrame(tick);
      else price.textContent = formatPrice(target, targetMax);
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
