document.addEventListener("DOMContentLoaded", function () {
  const moods = document.querySelectorAll(".mood-emoji");
  const feedback = document.getElementById("mood-feedback");
  const streakDisplay = document.getElementById("streak-counter");
  const messages = {
    amazing: "That's fantastic! You're having an incredible day! ✨",
    great: "Wonderful! Keep that positive energy flowing! 💪",
    okay: "That's perfectly normal. Every day is different. 🤗",
    down: "It's okay to have tough days. You're not alone. 💙",
    struggling: "I see you're having a hard time. Please reach out for support. 🤝"
  };

  function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("lastMoodDate");
    let streak = parseInt(localStorage.getItem("moodStreak")) || 0;

    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate === yesterday.toDateString()) {
        streak++;
      } else {
        streak = 1;
      }
      localStorage.setItem("moodStreak", streak);
      localStorage.setItem("lastMoodDate", today);
    }
    streakDisplay.textContent = streak + " days";
  }

  moods.forEach(mood => {
    mood.addEventListener("click", function () {
      // Remove active from all
      moods.forEach(m => m.classList.remove("active"));
      // Add active to clicked
      this.classList.add("active");

      const moodName = this.getAttribute("data-mood");
      feedback.innerHTML = `<div class="alert alert-info border-0" style="background: rgba(102, 126, 234, 0.1);"><strong>${messages[moodName]}</strong></div>`;

      updateStreak();

      // Bounce animation for positive moods
      if (moodName === "amazing" || moodName === "great") {
        this.style.animation = "none";
        setTimeout(() => {
          this.style.animation = "bounce 0.6s ease-in-out";
        }, 10);
      }
    });
  });

  // Navbar scroll background change
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Animate counters in stats when visible
  const counters = document.querySelectorAll(".stat-number");
  function animateCounter(element) {
  const targetAttr = element.getAttribute("data-target");
  
  // If no data-target attribute, skip this element
  if (!targetAttr) {
    return;
  }
  
  // Check if it contains non-numeric characters (like "24/7")
  if (targetAttr.includes("/") || isNaN(Number(targetAttr))) {
    element.textContent = targetAttr; // Display full text like "24/7"
    return;
  }
  
  // For numeric values, animate as before
  const target = parseInt(targetAttr);
  let count = 0;
  let increment = Math.ceil(target / 100) || 1;
  
  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.textContent = target;
      clearInterval(interval);
    } else {
      element.textContent = count;
    }
  }, 20);
}

  function checkCounters() {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && !counter.dataset.animated) {
        animateCounter(counter);
        counter.dataset.animated = "true";
      }
    });
  }
  window.addEventListener("scroll", checkCounters);
  checkCounters();
});




function selectOption(clickedOption, value) {
    // Remove 'selected' class from all options
    const allOptions = document.querySelectorAll('.wellness-option');
    allOptions.forEach(function(option) {
        option.classList.remove('selected');
    });
    
    // Add 'selected' class to clicked option
    clickedOption.classList.add('selected');
    
    // Set the hidden input value
    document.getElementById('supportType').value = value;
}

// Form submission
document.getElementById('wellnessForm').addEventListener('submit', function(event) {
    // Stop the form from submitting normally
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const goal = document.getElementById('goalSelect').value;
    
    // Check if required fields are filled
    if (name === '' || email === '' || goal === '') {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    alert('Welcome to MindSpace, ' + name + '! Your wellness journey starts now.');
    
    // Reset the form
    document.getElementById('wellnessForm').reset();
    
    // Remove selected class from wellness options
    const allOptions = document.querySelectorAll('.wellness-option');
    allOptions.forEach(function(option) {
        option.classList.remove('selected');
    });
});
