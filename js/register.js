document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.fullName.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const confirm = form.confirmPassword.value;

    if (!name || !email || !password) {
      alert('Please complete all required fields.');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch (err) {
      users = [];
    }

    if (users.some(u => u.email === email)) {
      alert('An account with that email already exists.');
      return;
    }

    const user = { name, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', email);
    alert('Account created successfully.');
    window.location.href = '../index.html';
  });
});
