// Simple Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // trigger once on load

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Javascript Tab System Hook
function switchTab(evt, tabName) {
    // Get all elements with class="tab-panel" and hide them
    var tabPanels = document.getElementsByClassName("tab-panel");
    for (var i = 0; i < tabPanels.length; i++) {
        tabPanels[i].className = tabPanels[i].className.replace(" active", "");
    }

    // Get all elements with class="tab-btn" and remove the class "active"
    var tabBtns = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabBtns.length; i++) {
        tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).className += " active";
    evt.currentTarget.className += " active";
}

// Contact Form AJAX Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update UI to "Sending..."
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";
        formStatus.style.display = "block";
        formStatus.style.color = "var(--text-main)";
        formStatus.innerText = "Wait a moment...";

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch("https://formsubmit.co/ajax/prakhar3823@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                formStatus.style.color = "#00ff88"; // Success Green
                formStatus.innerText = "Message sent successfully! ❤";
                contactForm.reset();
            } else {
                console.log(response);
                formStatus.style.color = "#ff4444"; // Error Red
                formStatus.innerText = res.message || "Something went wrong.";
            }
        })
        .catch(error => {
            console.log(error);
            formStatus.style.color = "#ff4444";
            formStatus.innerText = "Network error. Please try again.";
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit";
            setTimeout(() => {
                formStatus.style.display = "none";
            }, 5000);
        });
    });
}
