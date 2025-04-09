document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".split-child");
    const imageComponents = document.querySelectorAll(".image-component");
  
    // Text entrance animation
    gsap.to(texts, {
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  
    imageComponents.forEach((component) => {
      let originalX = 0;
      let originalY = 0;
      let moveTween;
  
      component.addEventListener("mouseenter", (e) => {
        // Store original position
        const rect = component.getBoundingClientRect();
        originalX = rect.left;
        originalY = rect.top;
  
        component.classList.add("active");
  
        // Fade all other images
        imageComponents.forEach((other) => {
          if (other !== component) {
            other.classList.add("faded");
          }
        });
  
        // Add mousemove listener to track pointer
        component.addEventListener("mousemove", followPointer);
      });
  
      function followPointer(e) {
        const bounds = component.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const offsetX = (e.clientX - centerX) / 10; // adjust sensitivity
        const offsetY = (e.clientY - centerY) / 10;
  
        if (moveTween) moveTween.kill();
  
        moveTween = gsap.to(component, {
          x: offsetX,
          y: offsetY,
          duration: 0.3,
          ease: "power2.out"
        });
      }
  
      component.addEventListener("mouseleave", () => {
        component.classList.remove("active");
  
        // Remove faded class from all
        imageComponents.forEach((other) => {
          other.classList.remove("faded");
        });
  
        // Remove mousemove listener
        component.removeEventListener("mousemove", followPointer);
  
        // Animate back to original position
        gsap.to(component, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    });
  });
  