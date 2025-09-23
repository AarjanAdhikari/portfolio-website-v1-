const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")
const themeToggle = document.querySelector("#theme-toggle")

// Theme toggle functionality
function loadTheme() {
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "light") {
    document.body.classList.add("light-mode")
  } else {
    document.body.classList.remove("light-mode")
  }
}

// Toggle theme when button is clicked
themeToggle.onclick = () => {
  document.body.classList.toggle("light-mode")

  // Save user preference to localStorage
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light")
  } else {
    localStorage.setItem("theme", "dark")
  }
}

// Load saved theme when page loads
document.addEventListener("DOMContentLoaded", loadTheme)

// Existing menu functionality
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x")
  navbar.classList.toggle("active")
}

const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
  const top = window.scrollY

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 100
    const height = sec.offsetHeight
    const id = sec.getAttribute("id")

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
      })
      document.querySelector("header nav a[href*=" + id + "]").classList.add("active")
      sec.classList.add("show-animate")
    } else {
      sec.classList.remove("show-animate")
    }
  })

  const header = document.querySelector("header")
  header.classList.toggle("sticky", window.scrollY > 100)

  const footer = document.querySelector("footer")
  const footerOffset = footer.offsetTop
  const footerHeight = footer.offsetHeight

  if (window.innerHeight + window.scrollY >= footerOffset) {
    footer.classList.add("show-animate")
  } else {
    footer.classList.remove("show-animate")
  }

  // Remove active class from navbar when a link is clicked
  menuIcon.classList.remove("bx-x")
  navbar.classList.remove("active")
}

// Spotlight cursor effect exactly like Brittany Chiang's site
document.addEventListener('DOMContentLoaded', function() {
  // Create the spotlight element
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.appendChild(spotlight);
  
  // Track mouse movement
  document.addEventListener('mousemove', function(e) {
    // Update spotlight position to follow cursor
    spotlight.style.background = `radial-gradient(
      circle at ${e.clientX}px ${e.clientY}px,
      rgba(0, 171, 240, 0.15) 0%,
      rgba(0, 171, 240, 0.05) 5%,
      rgba(0, 0, 0, 0) 15%
    )`;
  });
  
  // Handle light mode
  function updateSpotlightColor() {
    const isLightMode = document.body.classList.contains('light-mode');
    const color = isLightMode ? '7, 119, 182' : '0, 171, 240'; // RGB values for your theme colors
    
    document.addEventListener('mousemove', function(e) {
      spotlight.style.background = `radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(${color}, 0.15) 0%,
        rgba(${color}, 0.05) 5%,
        rgba(0, 0, 0, 0) 15%
      )`;
    });
  }
  
  // Update spotlight when theme changes
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', updateSpotlightColor);
  
  // Initial setup
  updateSpotlightColor();
});

// Contact form handler with EmailJS
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const notificationModal = document.getElementById('notification-modal');
  const notificationMessage = document.querySelector('.notification-message');
  const notificationClose = document.querySelector('.notification-close');
  
  // Close notification when the close button is clicked
  if (notificationClose) {
    notificationClose.addEventListener('click', function() {
      notificationModal.classList.remove('show');
      setTimeout(() => {
        notificationModal.classList.remove('success', 'error');
      }, 300);
    });
  }
  
  // Show notification function
  function showNotification(message, type) {
    notificationMessage.textContent = message;
    notificationModal.classList.add('show', type);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      notificationModal.classList.remove('show');
      setTimeout(() => {
        notificationModal.classList.remove('success', 'error');
      }, 300);
    }, 5000);
  }
  
  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get submit button and add loading state
      const submitBtn = contactForm.querySelector('.btn');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      // Send email using EmailJS
      emailjs.sendForm(
        'service_2ghv4dm', // Replace with YOUR actual Service ID
        'template_6cpgog1', // Replace with YOUR actual Template ID
        contactForm,
        '5ugGYDiH5mTRLsR4n' // Replace with YOUR actual User ID
      )
      .then(function() {
        // Success
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      })
      .catch(function(error) {
        // Error
        console.error('EmailJS error:', error);
        showNotification('Something went wrong. Please try again later.', 'error');
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      });
    });
  }
});
