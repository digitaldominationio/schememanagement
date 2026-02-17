# Scheme Monitoring System - Static Frontend

A comprehensive **fully static** frontend for a government Scheme Monitoring System built with HTML, CSS, and vanilla JavaScript.

## 📋 Overview

This system provides a complete monitoring and management platform for government schemes with four main modules:

1. **Financial Monitoring** - Fund allocation, release, utilization tracking
2. **Beneficiary Management** - Registration, validation, coverage tracking
3. **Inspection & Verification** - Field inspections, compliance assessment
4. **Dashboards & MIS Reports** - Multi-level dashboards and automated report generation

## 🚀 Features

### Core Features

- ✅ Fully static HTML/CSS/JS (no backend required for demo)
- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ Modern UI with gradient designs and animations
- ✅ Multi-level navigation with sidebar
- ✅ Form validation
- ✅ Modal dialogs
- ✅ Data tables with sorting and filtering
- ✅ Export functionality (CSV, PDF, Excel placeholders)
- ✅ Toast notifications
- ✅ Progress bars and stat cards

## 📁 Project Structure

```
schememanagement/
├── index.html                # Entry point / Home page
├── static/
│   ├── css/
│   │   ├── main.css          # Main stylesheet with design system
│   │   └── components.css    # Additional UI components
│   └── js/
│       └── main.js           # Core JavaScript utilities
├── templates/
│   ├── dashboard.html        # Main dashboard
│   ├── financial/
│   │   └── fund_allocation.html
│   ├── beneficiary/
│   │   └── registration.html
│   ├── inspection/
│   │   └── field_inspection.html
│   └── reports/
│       └── mis_reports.html
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue gradient (#2563eb → #3b82f6)
- **Success**: Green gradient (#10b981 → #34d399)
- **Warning**: Orange gradient (#f59e0b → #fbbf24)
- **Danger**: Red gradient (#ef4444 → #f87171)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 700 weight
- **Body**: 400-600 weight

### Components

- Stat Cards with gradient accents
- Data Tables with hover effects
- Modal dialogs
- Form controls with validation
- Progress bars
- Badges and alerts
- Buttons with multiple variants

## 🚀 Getting Started

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser:

```bash
# Navigate to the project folder
cd c:\coding\schememanagement

# Open in default browser (Windows)
start index.html

# Or just double-click index.html in File Explorer
```

### Option 2: Use a Local Web Server (Recommended)

For better testing, use a local web server:

**Using Python:**

```bash
cd c:\coding\schememanagement
python -m http.server 8000
```

**Using Node.js (http-server):**

```bash
cd c:\coding\schememanagement
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## 📱 Responsive Design

### Breakpoints

- **Desktop**: > 1024px (Full sidebar, all features visible)
- **Tablet**: 768px - 1024px (Collapsible sidebar)
- **Mobile**: < 768px (Hidden sidebar with toggle, simplified layout)

## 💻 JavaScript API

The `main.js` file provides utility functions:

```javascript
// Formatting
SchemeMonitoring.formatCurrency(2500000)  // ₹25,00,000
SchemeMonitoring.formatNumber(124567)     // 1,24,567
SchemeMonitoring.formatDate(new Date())   // 16 Feb, 2026

// Notifications
SchemeMonitoring.showToast('Success!', 'success')

// Modals
SchemeMonitoring.openModal('modalId')
SchemeMonitoring.closeModal('modalId')

// Forms
SchemeMonitoring.validateForm('formId')
SchemeMonitoring.clearForm('formId')

// Tables
SchemeMonitoring.sortTable('tableId', columnIndex, ascending)
SchemeMonitoring.filterTable('tableId', searchTerm')
SchemeMonitoring.exportTableToCSV('tableId', 'filename.csv')
```

## 📊 Available Pages

1. **Home** (`index.html`) - Landing page with quick access to all modules
2. **Dashboard** (`templates/dashboard.html`) - Overview with stats and performance metrics
3. **Fund Allocation** (`templates/financial/fund_allocation.html`) - Track fund allocation
4. **Beneficiary Registration** (`templates/beneficiary/registration.html`) - Register and manage beneficiaries
5. **Field Inspection** (`templates/inspection/field_inspection.html`) - Record field inspections
6. **MIS Reports** (`templates/reports/mis_reports.html`) - Generate and view reports

## 🔧 Customization Guide

### Changing Colors

Edit CSS variables in `static/css/main.css`:

```css
:root {
  --primary-color: #2563eb; /* Change primary color */
  --success: #10b981; /* Change success color */
  /* ... other colors */
}
```

### Adding New Pages

1. Create new HTML file in appropriate folder
2. Copy the sidebar and header structure from an existing page
3. Add your custom content
4. Link it from the navigation menu

### Integrating Charts

Add Chart.js to your HTML pages:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Then create charts in your page JavaScript.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Future Enhancements

- [ ] Add Chart.js for data visualization
- [ ] Implement real PDF/Excel export with libraries
- [ ] Add print-friendly layouts
- [ ] Create dark mode support
- [ ] Add more interactive features
- [ ] Backend integration (Django/Flask/Node.js)

## 🤝 Contributing

This is a static frontend template. Customize as needed for your specific requirements.

## 📄 License

This project is provided as-is for government scheme monitoring purposes.

## 📞 Support

For issues or questions, please contact your system administrator.

---

**Built with ❤️ for efficient government scheme monitoring**

**100% Static | No Backend Required | Ready to Use**
