// Mobile Nav Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.getElementById('mainNav'); 

if (mobileNavToggle && mainNav) {
  const barsIcon = mobileNavToggle.querySelector('.icon-menu-open'); 
  const timesIcon = mobileNavToggle.querySelector('.icon-menu-close');

  mobileNavToggle.addEventListener('click', () => {
    const isNavOpen = mainNav.classList.toggle('active');
    mobileNavToggle.setAttribute('aria-expanded', isNavOpen);
    
    if (barsIcon && timesIcon) { 
      barsIcon.style.display = isNavOpen ? 'none' : 'block';
      timesIcon.style.display = isNavOpen ? 'block' : 'none';
    }
  });
}

// Popup controls (Existing code)
const openEstimatePopup = document.getElementById("openEstimatePopup");
const openEstimatePopupFooter = document.getElementById("openEstimatePopupFooter");
const estimateModal = document.getElementById("estimateModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const estimateForm = document.getElementById("estimateForm");

// Success Modal controls (Existing code)
const successModal = document.getElementById("successModal");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");

function openModal(modal) { // Existing code
  if (modal) { // Added null check from previous step
    modal.style.display = "block";
    setTimeout(() => {
        const firstFocusableElement = modal.querySelector('input, select, button, [href]');
        if (firstFocusableElement) firstFocusableElement.focus();
    }, 10);
  }
}

function closeModal(modal) { // Existing code
  if (modal) modal.style.display = "none"; // Added null check
}

// Open estimate popup (Existing code)
if (openEstimatePopup) openEstimatePopup.onclick = () => openModal(estimateModal);
if (openEstimatePopupFooter) openEstimatePopupFooter.onclick = () => openModal(estimateModal);
if (closeModalBtn) closeModalBtn.onclick = () => closeModal(estimateModal);

// Success Modal close (Existing code)
if (closeSuccessBtn) closeSuccessBtn.onclick = () => closeModal(successModal);

// Form submit: show success popup and close form (Existing code)
if (estimateForm) {
  estimateForm.onsubmit = function(e) {
    e.preventDefault();
    closeModal(estimateModal);
    openModal(successModal);
    estimateForm.reset();
  };
}

// Close modal or mobile nav if clicking outside (Modified)
window.onclick = function(e) {
  if (estimateModal && e.target === estimateModal) closeModal(estimateModal);
  if (successModal && e.target === successModal) closeModal(successModal);

  if (mainNav && mainNav.classList.contains('active')) {
    if (!mainNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      mainNav.classList.remove('active');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      
      const barsIcon = mobileNavToggle.querySelector('.icon-menu-open');
      const timesIcon = mobileNavToggle.querySelector('.icon-menu-close');
      if (barsIcon && timesIcon) {
        barsIcon.style.display = 'block';
        timesIcon.style.display = 'none';
      }
    }
  }
};

// FAQ Accordion (Existing code)
const faqList = document.getElementById("faqList");
if (faqList) {
  const faqQuestions = faqList.querySelectorAll(".faq-question");
  faqQuestions.forEach((btn, idx) => {
    btn.onclick = function () {
      const faqItem = this.parentElement;
      const isOpen = faqItem.classList.contains("open");
      faqList.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("open");
        item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        faqItem.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    };
  });
}

// Highlight Active Navigation Link (New)
function highlightActiveNavlink() {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === undefined) {
    currentPage = "index.html"; 
  }
  const navLinks = document.querySelectorAll('#mainNav ul li a');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add('active-nav-link');
    } else {
      link.classList.remove('active-nav-link');
    }
  });
}
window.addEventListener('DOMContentLoaded', highlightActiveNavlink);