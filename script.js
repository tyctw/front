// Sidebar functionality
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
  
  // Toggle the menu icon animation
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.classList.toggle('active');
  
  // When sidebar is active, slightly dim the main content
  const mainContent = document.querySelector('.main-content');
  if (sidebar.classList.contains('active')) {
    mainContent.style.filter = 'brightness(0.8)';
  } else {
    mainContent.style.filter = '';
  }
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
  document.body.style.overflow = 'hidden';
}

function closeHelp() {
  const modal = document.getElementById('helpModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Important dates modal functionality
function showImportantDates() {
  const modal = document.getElementById('importantDatesModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImportantDates() {
  const modal = document.getElementById('importantDatesModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const helpModal = document.getElementById('helpModal');
  const datesModal = document.getElementById('importantDatesModal');
  
  if (event.target === helpModal) {
    closeHelp();
  }
  
  if (event.target === datesModal) {
    closeImportantDates();
  }
}

// Handle escape key for modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeHelp();
    closeImportantDates();
  }
});

// Countdown timer functionality
function updateCountdown() {
  const examDate = new Date('2025-07-08T08:30:00');
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

// Page loader
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after page is fully loaded
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    loader.classList.add('hidden');
    // Remove loader from DOM after animation completes
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 800);
  
  // Initialize all features
  initializeApp();
});

// Initialize all features
function initializeApp() {
  // Initialize time updates
  updateTime();
  setInterval(updateTime, 1000);

  // Initialize animation for region cards
  const cards = document.querySelectorAll('.region-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
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

  // Initialize bookmarks
  updateBookmarkButtons();

  // Initialize notifications
  if (!localStorage.getItem('welcomeShown')) {
    showNotification('歡迎使用會考查詢系統！');
    localStorage.setItem('welcomeShown', 'true');
  }

  // Add reminders for important dates
  const importantDates = [
    { date: '2025-07-08', message: '就學區免試入學放榜' }
  ];

  importantDates.forEach(item => {
    const date = new Date(item.date);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      showNotification(item.message);
    }
  });

  // Add touch event handling for better mobile interaction
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, false);

  document.addEventListener('touchmove', e => {
    touchEndY = e.touches[0].clientY;
  }, false);

  document.addEventListener('touchend', () => {
    const diff = touchStartY - touchEndY;
    const sidebar = document.getElementById('sidebar');
    
    // Swipe down to close sidebar
    if (diff < -50 && sidebar.classList.contains('active')) {
      toggleSidebar();
    }
  }, false);

  // Optimize scroll performance on mobile
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Handle scroll-based UI updates here
        ticking = false;
      });
      ticking = true;
    }
  });

  // Add mobile-friendly focus handling
  document.querySelectorAll('a, button, input').forEach(el => {
    el.addEventListener('touchstart', function() {
      this.classList.add('touch-focus');
    });
    
    el.addEventListener('touchend', function() {
      this.classList.remove('touch-focus');
    });
  });

  // Add active state to current page in navigation
  function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath || 
          (currentPath === '/' && link.getAttribute('href') === 'index.html') ||
          (currentPath === '/index.html' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
        // Add highlight effect to parent li
        if (link.parentElement.tagName === 'LI') {
          link.parentElement.classList.add('active');
        }
      }
    });
    
    mobileNavItems.forEach(item => {
      if (item.getAttribute('href') === currentPath || 
          (currentPath === '/' && item.getAttribute('href') === 'index.html') ||
          (currentPath === '/index.html' && item.getAttribute('href') === 'index.html')) {
        item.classList.add('active');
      }
    });
  }
  
  setActiveNavItem();
  
  // Add smooth transition when clicking menu items
  document.querySelectorAll('.nav-links a, .mobile-nav-item').forEach(link => {
    if (link.getAttribute('href').startsWith('http')) return; // Skip external links
    
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#' || this.hasAttribute('onclick')) return;
      
      e.preventDefault();
      const target = this.getAttribute('href');
      
      // Add exit animation
      document.body.classList.add('page-transition');
      
      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = target;
      }, 300);
    });
  });
  
  // Add animation class to body for page transitions
  if (!document.body.classList.contains('loaded')) {
    document.body.classList.add('loaded');
  }
}