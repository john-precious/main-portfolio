function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
  }
  


  //Home section
  const roles = ["Front-End Developer", "UI Designer", "Web Enthusiast"];
let i = 0, j = 0, currentRole = "", isDeleting = false;
const typedText = document.getElementById("typed-text");

function typeEffect() {
  if (i < roles.length) {
 if (!isDeleting && j <= roles[i].length) {
      currentRole = roles[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentRole = roles[i].substring(0, j--);
    }

    typedText.textContent = currentRole;

    if (j === roles[i].length) isDeleting = true;
    if (j === 0 && isDeleting) {
      isDeleting = false;
      i = (i + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }
}
typeEffect();


//project section
// Intersection Observer for animations
const projectCards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => {
  observer.observe(card);
});

// Video hover effect for touch devices
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('touchstart', function() {
    const video = this.querySelector('.project-video');
    if (video) {
      video.style.opacity = 1;
      this.querySelector('.project-image').style.opacity = 0;
    }
  });
});


//skills and testimonies section
 // Carousel Navigation
 const track = document.querySelector('.carousel-track');
 const slides = document.querySelectorAll('.carousel-slide');
 const dots = document.querySelectorAll('.nav-dot');
 let currentSlide = 0;

 // Initialize
 function goToSlide(index) {
     track.style.transform = `translateX(-${index * 100}%)`;
     currentSlide = index;

     // Update dots
     dots.forEach(dot => dot.classList.remove('active'));
     dots[index].classList.add('active');

     // Animate skills when skills slide is active
     if (index === 0) {
         animateSkills();
     }
 }

 // Dot click handlers
 dots.forEach(dot => {
     dot.addEventListener('click', function() {
         const slideIndex = parseInt(this.getAttribute('data-slide'));
         goToSlide(slideIndex);
     });
 });

 // Auto-rotate carousel (optional)
 let carouselInterval = setInterval(() => {
     const nextSlide = (currentSlide + 1) % slides.length;
     goToSlide(nextSlide);
 }, 8000);

 // Pause on hover
 const carouselContainer = document.querySelector('.carousel-container');
 carouselContainer.addEventListener('mouseenter', () => {
     clearInterval(carouselInterval);
 });

 carouselContainer.addEventListener('mouseleave', () => {
     carouselInterval = setInterval(() => {
         const nextSlide = (currentSlide + 1) % slides.length;
         goToSlide(nextSlide);
     }, 8000);
 });

 // Testimonial Navigation
 const testimonials = document.querySelectorAll('.testimonial');
 let currentTestimonial = 0;

 function showTestimonial(index) {
     testimonials.forEach(testimonial => testimonial.classList.remove('active', 'prev', 'next'));

     currentTestimonial = index;

     // Set classes for animation
     testimonials[index].classList.add('active');

     const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
     const nextIndex = (index + 1) % testimonials.length;

     testimonials[prevIndex].classList.add('prev');
     testimonials[nextIndex].classList.add('next');
 }

 document.querySelector('.testimonial-prev').addEventListener('click', () => {
     const newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
     showTestimonial(newIndex);
 });

 document.querySelector('.testimonial-next').addEventListener('click', () => {
     const newIndex = (currentTestimonial + 1) % testimonials.length;
     showTestimonial(newIndex);
 });

 // Auto-rotate testimonials (optional)
 let testimonialInterval = setInterval(() => {
     const newIndex = (currentTestimonial + 1) % testimonials.length;
     showTestimonial(newIndex);
 }, 5000);

 // Animate skills progress bars
 function animateSkills() {
     const skillItems = document.querySelectorAll('.skill-item');
     const progressBars = document.querySelectorAll('.skill-progress');

     skillItems.forEach((item, index) => {
         setTimeout(() => {
             item.classList.add('animate');
         }, index * 150);
     });

     progressBars.forEach(bar => {
         const level = bar.getAttribute('data-level');
         bar.style.width = `${level}%`;
     });
 }

 // Initialize on page load
 window.addEventListener('load', () => {
     animateSkills();
     showTestimonial(0);
 });



 //contact section
 document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success animation
      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.backgroundColor = '#4BB543';
      
      // Reset form after 2 seconds
      setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
          submitBtn.style.backgroundColor = '';
      }, 2000);
  });
  
  // Add animation to form elements on focus
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(control => {
      control.addEventListener('focus', function() {
          this.parentElement.style.transform = 'scale(1.02)';
      });
      
      control.addEventListener('blur', function() {
          this.parentElement.style.transform = 'scale(1)';
      });
  });
});


//FOOTER!!
// Show/hide back-to-top arrow on scroll
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});




