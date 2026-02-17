// ============================================
// Scheme Monitoring System - Main JavaScript
// ============================================

// Global State Management
const AppState = {
  user: {
    name: "Admin User",
    role: "System Administrator",
    avatar: "AU",
  },
  notifications: [],
  sidebarOpen: true,
};

// ============================================
// Utility Functions
// ============================================

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with commas
function formatNumber(num) {
  return new Intl.NumberFormat("en-IN").format(num);
}

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Format date and time
function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Show toast notification
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

function getToastIcon(type) {
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };
  return icons[type] || icons.info;
}

// ============================================
// Navigation & Sidebar
// ============================================

// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  sidebar.classList.toggle("active");
  AppState.sidebarOpen = !AppState.sidebarOpen;
}

// Handle navigation item clicks
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    const submenu = item.querySelector(".nav-submenu");

    if (submenu) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        item.classList.toggle("active");
        submenu.classList.toggle("active");
      });
    }
  });
}

// Set active navigation item
function setActiveNav(path) {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });
}

// Scroll active navigation item into view
function scrollActiveNavIntoView() {
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    activeLink.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}




// ============================================
// Form Validation
// ============================================

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const inputs = form.querySelectorAll("[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
}

// Clear form
function clearForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
    const inputs = form.querySelectorAll(".error");
    inputs.forEach((input) => input.classList.remove("error"));
  }
}

// ============================================
// Table Functions
// ============================================

// Sort table
function sortTable(tableId, columnIndex, ascending = true) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent.trim();
    const bValue = b.cells[columnIndex].textContent.trim();

    if (ascending) {
      return aValue.localeCompare(bValue, undefined, { numeric: true });
    } else {
      return bValue.localeCompare(aValue, undefined, { numeric: true });
    }
  });

  rows.forEach((row) => tbody.appendChild(row));
}

// Filter table
function filterTable(tableId, searchTerm) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    if (text.includes(searchTerm.toLowerCase())) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Export table to CSV
function exportTableToCSV(tableId, filename = "export.csv") {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = table.querySelectorAll("tr");
  const csv = [];

  rows.forEach((row) => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols).map((col) => {
      return '"' + col.textContent.trim().replace(/"/g, '""') + '"';
    });
    csv.push(rowData.join(","));
  });

  downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// ============================================
// Chart Helpers (for future integration)
// ============================================

// Prepare chart data
function prepareChartData(data, labelKey, valueKey) {
  return {
    labels: data.map((item) => item[labelKey]),
    values: data.map((item) => item[valueKey]),
  };
}

// ============================================
// API Helpers (Django Integration)
// ============================================

// Get CSRF token
function getCSRFToken() {
  return document.querySelector("[name=csrfmiddlewaretoken]")?.value || "";
}

// API request wrapper
async function apiRequest(url, method = "GET", data = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    showToast("An error occurred. Please try again.", "error");
    throw error;
  }
}

// ============================================
// File Upload Helpers
// ============================================

function handleFileUpload(inputElement, callback) {
  inputElement.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        callback(event.target.result, file);
      };
      reader.readAsDataURL(file);
    }
  });
}

// ============================================
// Search Functionality
// ============================================

function initSearch() {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((e) => {
        const searchTerm = e.target.value;
        // Implement search logic here
        console.log("Searching for:", searchTerm);
      }, 300),
    );
  }
}

// ============================================
// Notification System
// ============================================

function loadNotifications() {
  // This would typically fetch from an API
  // For now, using mock data
  AppState.notifications = [
    {
      id: 1,
      title: "New UC Pending",
      message: "Utilization Certificate for Scheme XYZ requires approval",
      time: new Date(),
      read: false,
      type: "warning",
    },
    {
      id: 2,
      title: "Inspection Completed",
      message: "Field inspection for Block ABC has been completed",
      time: new Date(Date.now() - 3600000),
      read: false,
      type: "success",
    },
  ];

  updateNotificationBadge();
}

function updateNotificationBadge() {
  const badge = document.querySelector(".notification-badge");
  const unreadCount = AppState.notifications.filter((n) => !n.read).length;

  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? "block" : "none";
  }
}

// ============================================
// Data Export Functions
// ============================================

function exportToPDF(elementId, filename = "report.pdf") {
  // Placeholder for PDF export
  // In production, integrate with jsPDF or similar library
  showToast(
    "PDF export functionality will be integrated with Django backend",
    "info",
  );
}

function exportToExcel(data, filename = "report.xlsx") {
  // Placeholder for Excel export
  // In production, integrate with SheetJS or similar library
  showToast(
    "Excel export functionality will be integrated with Django backend",
    "info",
  );
}

// ============================================
// Date Range Picker Helper
// ============================================

function initDateRangePicker(startInputId, endInputId) {
  const startInput = document.getElementById(startInputId);
  const endInput = document.getElementById(endInputId);

  if (startInput && endInput) {
    startInput.addEventListener("change", () => {
      endInput.min = startInput.value;
    });

    endInput.addEventListener("change", () => {
      startInput.max = endInput.value;
    });
  }
}

// ============================================
// Progress Bar Animation
// ============================================

function animateProgressBar(elementId, targetPercentage) {
  const progressBar = document.getElementById(elementId);
  if (!progressBar) return;

  let currentPercentage = 0;
  const increment = targetPercentage / 50;

  const interval = setInterval(() => {
    currentPercentage += increment;
    if (currentPercentage >= targetPercentage) {
      currentPercentage = targetPercentage;
      clearInterval(interval);
    }
    progressBar.style.width = currentPercentage + "%";
  }, 20);
}

// ============================================
// Initialization
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize navigation
  initNavigation();
  scrollActiveNavIntoView();

  // Initialize search
  initSearch();

  // Load notifications
  loadNotifications();

  // Setup menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleSidebar);
  }

  // Close sidebar on mobile when clicking outside
  document.addEventListener("click", (e) => {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");

    if (
      window.innerWidth <= 1024 &&
      sidebar &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      sidebar.classList.contains("active")
    ) {
      sidebar.classList.remove("active");
    }
  });

  // Initialize tooltips (if needed)
  initTooltips();

  console.log("Scheme Monitoring System initialized");
});

// ============================================
// Tooltip Initialization
// ============================================

function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
  });
}

function showTooltip(e) {
  const text = e.target.getAttribute("data-tooltip");
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = text;
  tooltip.id = "active-tooltip";

  document.body.appendChild(tooltip);

  const rect = e.target.getBoundingClientRect();
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";
  tooltip.style.left =
    rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
}

function hideTooltip() {
  const tooltip = document.getElementById("active-tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

// ============================================
// Export functions for use in other scripts
// ============================================

window.SchemeMonitoring = {
  formatCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
  showToast,
  validateForm,
  clearForm,
  sortTable,
  filterTable,
  exportTableToCSV,
  exportToPDF,
  exportToExcel,
  apiRequest,
  getCSRFToken,
  animateProgressBar,
};

// ============================================
// Enhanced Header Interactivity
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupGlobalSearch();
    setupNotifications();
});

function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');
    
    if (!searchInput || !searchDropdown) return;

    const searchableItems = [
        { title: 'Fund Allocation', url: 'financial/fund_allocation.html', icon: '💰', category: 'Financial' },
        { title: 'Expenditure', url: 'financial/expenditure.html', icon: '📉', category: 'Financial' },
        { title: 'UC Generation', url: 'financial/uc_generation.html', icon: '📄', category: 'Financial' },
        { title: 'Beneficiary Registration', url: 'beneficiary/registration.html', icon: '👥', category: 'Beneficiary' },
        { title: 'Field Inspection', url: 'inspection/field_inspection.html', icon: '🔍', category: 'Inspection' },
        { title: 'MIS Reports', url: 'reports/mis_reports.html', icon: '📑', category: 'Reports' },
        { title: 'PFMS Status', url: 'financial/pfms_status.html', icon: '🏦', category: 'Financial' },
        { title: 'Category Coverage', url: 'beneficiary/category_coverage.html', icon: '📊', category: 'Beneficiary' }
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchDropdown.classList.remove('show');
            return;
        }

        const results = searchableItems.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            searchDropdown.innerHTML = results.map(item => `
                <a href="${item.url}" class="search-result-item">
                    <span class="search-result-icon">${item.icon}</span>
                    <div style="display:flex; flex-direction:column;">
                        <span class="search-result-text">${item.title}</span>
                        <span style="font-size:0.7rem; color:#666;">${item.category}</span>
                    </div>
                </a>
            `).join('');
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.innerHTML = '<div class="search-result-item" style="cursor: default; color: #666;">No results found</div>';
            searchDropdown.classList.add('show');
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });
}

function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (!notificationBtn || !notificationDropdown) return;

    // Toggle Popup
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
        
        // Hide badge when opened
        if (notificationDropdown.classList.contains('show')) {
            const badge = notificationBtn.querySelector('.notification-badge');
            if (badge) badge.style.display = 'none';
        }
    });

    // Mark all as read
    const markReadBtn = notificationDropdown.querySelector('.mark-read-btn');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const items = notificationDropdown.querySelectorAll('.notification-item');
            items.forEach(item => item.classList.remove('unread'));
            showToast("All notifications marked as read", "success");
        });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
    });
}


