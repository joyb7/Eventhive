
  const messagesBtn = document.getElementById('messagesBtn');
  const messagesDropdown = document.getElementById('messagesDropdown');
  const notificationsBtn = document.getElementById('notificationsBtn');
  const notificationsDropdown = document.getElementById('notificationsDropdown');

  messagesBtn.addEventListener('click', () => {
    messagesDropdown.classList.toggle('hidden');
    notificationsDropdown.classList.add('hidden'); // close other
  });

  notificationsBtn.addEventListener('click', () => {
    notificationsDropdown.classList.toggle('hidden');
    messagesDropdown.classList.add('hidden'); // close other
  });

  // Optional: click outside to close
  document.addEventListener('click', (e) => {
    if (!messagesBtn.contains(e.target) && !messagesDropdown.contains(e.target)) {
      messagesDropdown.classList.add('hidden');
    }
    if (!notificationsBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
      notificationsDropdown.classList.add('hidden');
    }
  });

