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
