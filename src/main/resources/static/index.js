const BACKEND_URL = document.querySelector('meta[name="backend-url"]').getAttribute('content');


document.addEventListener("DOMContentLoaded", () => {
  const navTheme = document.getElementById("navbar-theme");
  const mobileTheme = document.getElementById("mobile-theme");

  function toggleDarkMode() {
    document.body.classList.toggle("darkmode");

    document.querySelectorAll("#navbar-theme i, #mobile-theme i").forEach(icon => {
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
    });
  }

  if (navTheme) navTheme.addEventListener("click", toggleDarkMode);
  if (mobileTheme) mobileTheme.addEventListener("click", toggleDarkMode);
});


const forms = document.getElementById("contact");
const inputs = document.getElementsByTagName("input");
const text = document.getElementsByTagName("textarea");
const errors = document.getElementsByClassName("error");


inputs[0].addEventListener('input', () => errors[0].textContent = "");
inputs[1].addEventListener('input', () => errors[1].textContent = "");
text[0].addEventListener('input', () => errors[2].textContent = "");


forms.addEventListener('submit', async (e) => {
  e.preventDefault();
  let validate = 1;

  const nameRegex = /^[A-Za-z\s]+$/;
  if(inputs[0].value.trim() === ""){
      errors[0].textContent="Name is required!";
      errors[0].style.color="red";
      validate = 0;
  } else if(!nameRegex.test(inputs[0].value)){
      errors[0].textContent="Should not contain any special characters or numbers";
      errors[0].style.color="red";
      validate=0;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(inputs[1].value.trim()==""){
      errors[1].textContent="Email is required!";
      errors[1].style.color="red";
      validate = 0;
  } else if(!emailRegex.test(inputs[1].value)){
    errors[1].textContent="Email is not valid";
    errors[1].style.color="red";
    validate=0;
  }

  if(text[0].value.trim()==""){
      errors[2].textContent="Kindly share your messages";
      errors[2].style.color="red";
      validate=0;
  } else{
      errors[2].textContent="";
  }

  if(validate===0) return;

  const details = {
      name: inputs[0].value.trim(),
      email: inputs[1].value.trim(),
      message: text[0].value.trim()
  };

  try {
    const response = await fetch(`${BACKEND_URL}/details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });

    if (response.ok) {
      showToast("Message sent successfully!", "success");
      e.target.reset();
    } else {
      showToast("⚠️ Failed to send message. Try again.", "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Server error. Please try again later.", "error");
  }

  function showToast(msg, type) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.className = "toast " + type;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => toast.classList.remove("show"), 3000);
    setTimeout(() => toast.remove(), 3500);
  }
});
