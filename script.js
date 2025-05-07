script.js
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const body = document.body

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
      // Prevent background scrolling when menu is open
      body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
  })

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Hero Section Scroll Effect
  const hero = document.querySelector(".hero")
  if (hero) {
    const heroContent = hero.querySelector(".hero-content")
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const heroHeight = hero.offsetHeight
      const opacity = 1 - (scrollPosition / heroHeight) * 1.5

      if (opacity >= 0) {
        hero.querySelector(".hero-content").style.opacity = opacity
      }
    })
  }

  // Testimonials Slider
  const testimonialsSlider = document.querySelector(".testimonials-slider")
  const testimonials = document.querySelectorAll(".testimonial")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const sliderDots = document.querySelector(".slider-dots")

  if (testimonialsSlider && testimonials.length > 0) {
    let currentIndex = 0
    let autoSlideInterval
    let touchStartX = 0
    let touchEndX = 0

    // Create dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement("span")
      dot.classList.add("dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      sliderDots.appendChild(dot)
    })

    // Update dots
    function updateDots() {
      document.querySelectorAll(".dot").forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
    }

    // Go to specific slide
      function goToSlide(index) {
      currentIndex = index
      const scrollPosition = testimonials[index].offsetLeft
      testimonialsSlider.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
      updateDots()
      resetAutoSlide()
    }

    // Next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % testimonials.length
      goToSlide(currentIndex)
    }

    // Previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
      goToSlide(currentIndex)
    }
    // Reset auto slide timer
    function resetAutoSlide() {
      clearInterval(autoSlideInterval)
      autoSlideInterval = setInterval(nextSlide, 5000)
    }

    // Touch events for mobile swiping
    testimonialsSlider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )
      testimonialsSlider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )
function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide() // Swipe left
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide() // Swipe right
      }
    }


    // Event listeners
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)

    // Auto slide
    setInterval(nextSlide, 5000)
  }

  // Booking Form Submission
  const bookingForm = document.getElementById("booking-form")
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for booking! We will contact you shortly to confirm your reservation.")
      bookingForm.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          const headerOffset = 80
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Animate sections on scroll
  const sections = document.querySelectorAll("section")

  function checkSections() {
    const triggerBottom = window.innerHeight * 0.8

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top

      if (sectionTop < triggerBottom) {
        section.classList.add("show")
      }
    })
  }

  // Add initial styles for animation
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })
// Check sections on initial load
  checkSections()

  // Add scroll event listener with throttling for better performance
  let scrollTimeout
  document.addEventListener("scroll", () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        checkSections()
        scrollTimeout = null
      }, 100)
    }
  })
 // Fix for menu navigation on mobile
  const menuNav = document.querySelector(".menu-nav")
  if (menuNav) {
    const menuLinks = menuNav.querySelectorAll("a")

    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        menuLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      })
    })
  }

  // Fix for gallery images on mobile
  const galleryItems = document.querySelectorAll(".gallery-item")
  if (galleryItems.length > 0 && window.innerWidth <= 600) {
    galleryItems.forEach((item) => {
      const caption = item.querySelector(".gallery-caption")
      if (caption) {
        caption.style.transform = "translateY(0)"
      }
    })
  }
})

  // Add class to show sections
  document.addEventListener("scroll", checkSections)

  // Check sections on initial load
  checkSections()
})
