// Theme Management
let currentTheme = "dark"

function toggleTheme() {
  const body = document.body
  const container = document.querySelector(".portfolio-container")

  if (currentTheme === "dark") {
    body.classList.add("light-theme")
    container.classList.add("light-theme")
    currentTheme = "light"
  } else {
    body.classList.remove("light-theme")
    container.classList.remove("light-theme")
    currentTheme = "dark"
  }

  // Save theme preference
  localStorage.setItem("theme", currentTheme)
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    currentTheme = savedTheme
    if (currentTheme === "light") {
      document.body.classList.add("light-theme")
      document.querySelector(".portfolio-container").classList.add("light-theme")
    }
  }
}

// Scroll to Top Function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Add crazy entrance animations to all elements
        const elements = entry.target.querySelectorAll(
          ".glass-card, .achievement-card, .skill-card, .project-card, .contact-item",
        )
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.style.animation = `crazy-entrance 1s ease-out forwards`
          }, index * 100)
        })

        // Special handling for skills section
        if (entry.target.id === "skills") {
          animateSkillBars()
          animatePercentageCounters()
        }
      }
    })
  }, observerOptions)

  // Observe all sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => observer.observe(section))
}

function animateSkillBars() {
  const progressFills = document.querySelectorAll(".progress-fill")

  progressFills.forEach((fill, index) => {
    setTimeout(() => {
      const width = fill.getAttribute("data-width")
      fill.style.width = width + "%"
      fill.style.animation = `skill-bar-fill 3s ease-in-out, flowing-lights 2s linear infinite`
    }, index * 200)
  })
}

function animatePercentageCounters() {
  const counters = document.querySelectorAll(".percentage-counter")

  counters.forEach((counter, index) => {
    setTimeout(() => {
      const target = Number.parseInt(counter.textContent)
      let current = 0
      const increment = target / 50

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        counter.textContent = Math.floor(current) + "%"
      }, 40)

      // Add enhanced glow animation
      counter.style.animation = `percentage-glow 2.5s ease-in-out infinite`
    }, index * 200)
  })
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

function initializeParallax() {
  const floatingElements = document.querySelectorAll(".floating-element")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.3
      const rotation = scrolled * 0.1
      element.style.transform = `translateY(${rate * speed}px) rotate(${rotation}deg) scale(${1 + Math.sin(scrolled * 0.01) * 0.1})`
    })
  })
}

// Form Submission Handler
function initializeFormHandler() {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = contactForm.querySelector('input[type="text"]').value
      const email = contactForm.querySelector('input[type="email"]').value
      const message = contactForm.querySelector("textarea").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields.")
        return
      }

      // Simulate form submission with enhanced animation
      const submitBtn = contactForm.querySelector(".btn-form")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true
      submitBtn.style.animation = `btn-sending-pulse 2s ease-in-out infinite`

      setTimeout(() => {
        alert("Message sent successfully!")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.animation = `form-btn-glow 4s ease-in-out infinite`
      }, 2000)
    })
  }
}

function initializeHoverEffects() {
  const cards = document.querySelectorAll(
    ".glass-card, .glass-enhanced, .achievement-card, .skill-card, .project-card, .contact-item",
  )

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) rotateX(8deg) rotateY(8deg) scale(1.02)"
      card.style.boxShadow = "0 30px 100px rgba(0, 0, 0, 0.4)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg) scale(1)"
      card.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)"
    })
  })
}

function initializeTypingEffect() {
  const heroTitle = document.querySelector(".hero-title")
  const text = heroTitle.textContent
  heroTitle.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i)
      heroTitle.style.animation = `hero-title-glow 3s ease-in-out infinite`
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000)
}

function initializeCrazyGlassmorphism() {
  // Add dynamic glassmorphism effects to all glass elements
  const glassElements = document.querySelectorAll(".glass-card, .glass-enhanced, .navbar, .social-icon, .btn")

  glassElements.forEach((element, index) => {
    // Add random animation delays for staggered effects
    element.style.animationDelay = `${index * 0.1}s`

    // Add mouse tracking for 3D tilt effects
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    })
  })
}

function initializeScrollAnimations() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Animate navbar on scroll
    const navbar = document.querySelector(".navbar")
    if (scrolled > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.1)"
      navbar.style.backdropFilter = "blur(40px)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.08)"
      navbar.style.backdropFilter = "blur(30px)"
    }

    // Add parallax to section titles
    const titles = document.querySelectorAll(".section-title")
    titles.forEach((title, index) => {
      const speed = (index + 1) * 0.1
      title.style.transform = `translateY(${rate * speed}px)`
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadTheme()
  initializeAnimations()
  initializeSmoothScrolling()
  initializeParallax()
  initializeFormHandler()
  initializeHoverEffects()
  initializeTypingEffect()
  initializeCrazyGlassmorphism()
  initializeScrollAnimations()
})

// Handle window resize
window.addEventListener("resize", () => {
  // Recalculate any size-dependent animations
  const floatingElements = document.querySelectorAll(".floating-element")
  floatingElements.forEach((element) => {
    element.style.transform = "translateY(0px)"
  })
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals or return to top
    scrollToTop()
  }

  if (e.key === "t" || e.key === "T") {
    // Toggle theme with 't' key
    toggleTheme()
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll-heavy functions
const throttledParallax = throttle(initializeParallax, 16)
const throttledScrollAnimations = throttle(initializeScrollAnimations, 16)
window.addEventListener("scroll", throttledParallax)
window.addEventListener("scroll", throttledScrollAnimations)

const style = document.createElement("style")
style.textContent = `
  @keyframes crazy-entrance {
    0% { 
      transform: translateY(100px) rotateX(-90deg) scale(0.5); 
      opacity: 0; 
    }
    50% { 
      transform: translateY(-20px) rotateX(10deg) scale(1.1); 
      opacity: 0.8; 
    }
    100% { 
      transform: translateY(0) rotateX(0deg) scale(1); 
      opacity: 1; 
    }
  }
  
  @keyframes btn-sending-pulse {
    0%, 100% { 
      transform: scale(1); 
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); 
    }
    50% { 
      transform: scale(1.05); 
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); 
    }
  }
`
document.head.appendChild(style)
