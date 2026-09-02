(() => {
  const form = document.querySelector('#inquiry-form');
  const sendButton = document.querySelector('#send-button');
  const planInputs = [...form.querySelectorAll('input[name="plan"]')];
  const planError = document.querySelector('#plan-error');

  const hasSelectedPlan = () => planInputs.some((input) => input.checked);

  const updateState = () => {
    const complete = form.checkValidity() && hasSelectedPlan();
    sendButton.disabled = !complete;
    if (hasSelectedPlan()) planError.textContent = '';
  };

  form.addEventListener('input', updateState);
  form.addEventListener('change', updateState);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!hasSelectedPlan()) {
      planError.textContent = 'Please select at least one service.';
      planInputs[0].focus();
      return;
    }

    if (!form.reportValidity()) return;

    const recipient = document.querySelector('#recipient').value;
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const message = document.querySelector('#message').value.trim();
    const plans = planInputs.filter((input) => input.checked).map((input) => input.value);

    const subject = `Trinicle Marketing inquiry — ${plans.join(', ')}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      'Interested in:',
      ...plans.map((plan) => `- ${plan}`),
      '',
      'Message:',
      message
    ].join('\n');

    window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  updateState();
})();
