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
  const startDate = new Date('2025-07-08T11:00:00');
  const endDate = new Date('2025-07-31T11:00:00');
  const now = new Date();
  
  // 檢查是否在開放時間範圍內
  if (now >= startDate && now <= endDate) {
    // 已開放，顯示剩餘開放時間
    const diff = endDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector('.countdown-days').textContent = days;
    document.querySelector('.countdown-hours').textContent = hours;
    document.querySelector('.countdown-minutes').textContent = minutes;
    document.querySelector('.countdown-seconds').textContent = seconds;
    
    // 更新標題顯示開放中
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      heroSubtitle.innerHTML = '<span class="status-open">✅ 系統開放中</span> 將於 2025/07/31 11:00 關閉';
    }
  } else if (now < startDate) {
    // 尚未開放，顯示距離開放還有多久
    const diff = startDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector('.countdown-days').textContent = days;
    document.querySelector('.countdown-hours').textContent = hours;
    document.querySelector('.countdown-minutes').textContent = minutes;
    document.querySelector('.countdown-seconds').textContent = seconds;
    
    // 更新標題顯示尚未開放
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      heroSubtitle.innerHTML = '<span class="status-waiting">⏳ 系統即將開放</span> 開放時間：2025/07/08 11:00';
    }
  } else {
    // 已結束
    document.querySelector('.countdown-days').textContent = '0';
    document.querySelector('.countdown-hours').textContent = '0';
    document.querySelector('.countdown-minutes').textContent = '0';
    document.querySelector('.countdown-seconds').textContent = '0';
    
    // 更新標題顯示已結束
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      heroSubtitle.innerHTML = '<span class="status-closed">❌ 系統已關閉</span> 查詢期間已結束';
    }
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
  
  // 根據消息類型添加不同的圖標
  let icon = 'fa-info-circle';
  if (message.includes('已加入書籤')) {
    icon = 'fa-bookmark';
    notification.classList.add('bookmark-added');
  } else if (message.includes('已從書籤移除')) {
    icon = 'fa-bookmark-slash';
    notification.classList.add('bookmark-removed');
  }
  
  notification.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="notification-content">
      <span>${message}</span>
    </div>
    <button class="dismiss-notification" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  document.getElementById('notifications').appendChild(notification);
  
  // 添加動畫效果
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // 自動關閉通知
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Bookmark functionality
function toggleBookmark(regionId) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const index = bookmarks.indexOf(regionId);
  
  if (index === -1) {
    bookmarks.push(regionId);
    const regionName = document.querySelector(`.region-card[data-region="${regionId}"] h2`).textContent;
    showNotification(`<strong>${regionName}</strong> 已加入書籤！`);
  } else {
    bookmarks.splice(index, 1);
    const regionName = document.querySelector(`.region-card[data-region="${regionId}"] h2`).textContent;
    showNotification(`<strong>${regionName}</strong> 已從書籤移除！`);
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

  // Initialize menu active state
  setActiveMenuItem();

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

// 處理菜單項目的活動狀態
function setActiveMenuItem() {
  // 獲取當前頁面的路徑
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';
  
  // 移除所有活動狀態
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // 設置當前頁面的菜單項為活動狀態
  const menuItems = document.querySelectorAll('.nav-item a');
  menuItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === pageName || 
        (pageName === 'index.html' && href === 'index.html') ||
        (href.includes(pageName))) {
      item.closest('.nav-item').classList.add('active');
    }
  });
}