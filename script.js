// Sidebar functionality
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Time display functionality
function updateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  };
  const timeString = now.toLocaleString('zh-TW', options);
  document.querySelector('.time-text').textContent = timeString;
}

// Modal functionality
function showHelp() {
  const modal = document.getElementById('helpModal');
  modal.classList.add('active');
}

function closeHelp() {
  const modal = document.getElementById('helpModal');
  modal.classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('helpModal');
  if (event.target === modal) {
    closeHelp();
  }
}

// Handle escape key for modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeHelp();
  }
});

// Countdown timer functionality
function updateCountdown() {
  const examDate = new Date('2025-05-17T08:30:00');
  const now = new Date();
  const diff = examDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector('.countdown-days').textContent = days;
    document.querySelector('.countdown-hours').textContent = hours;
    document.querySelector('.countdown-minutes').textContent = minutes;
    document.querySelector('.countdown-seconds').textContent = seconds;
  }
}

// Search functionality
function searchRegions() {
  const searchInput = document.getElementById('regionSearch');
  const filter = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.region-card');

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(filter)) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.5s ease-out';
    } else {
      card.style.display = 'none';
    }
  });
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-info-circle"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  document.getElementById('notifications').appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// Bookmark functionality
function toggleBookmark(regionId) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const index = bookmarks.indexOf(regionId);
  
  if (index === -1) {
    bookmarks.push(regionId);
    showNotification('已加入書籤！');
  } else {
    bookmarks.splice(index, 1);
    showNotification('已移除書籤！');
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  updateBookmarkButtons();
}

function updateBookmarkButtons() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    const regionId = btn.getAttribute('data-region');
    btn.classList.toggle('active', bookmarks.includes(regionId));
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize time updates
  updateTime();
  setInterval(updateTime, 1000);

  // Initialize modal functionality
  // Initialize sidebar functionality
  // Initialize existing functionality
  const cards = document.querySelectorAll('.region-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Initialize statistics
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = stat.getAttribute('data-target');
    if (target !== '尚未公布') {
      let count = 0;
      const updateCount = () => {
        const increment = target / 200;
        if (count < target) {
          count += increment;
          stat.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.innerText = target;
        }
      };
      updateCount();
    }
  });

  // Add intersection observer for animation triggers
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.region-card').forEach(card => {
    observer.observe(card);
  });

  // Initialize countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Initialize notifications
  if (!localStorage.getItem('welcomeShown')) {
    showNotification('歡迎使用會考查詢系統！');
    localStorage.setItem('welcomeShown', 'true');
  }

  // Add reminders for important dates
  const importantDates = [
    { date: '2025-05-17', message: '會考第一天開始' },
    { date: '2025-05-18', message: '會考第二天開始' }
  ];

  importantDates.forEach(item => {
    const date = new Date(item.date);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      showNotification(item.message);
    }
  });
});