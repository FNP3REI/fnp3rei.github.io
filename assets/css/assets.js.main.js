document.getElementById('year').textContent = new Date().getFullYear();


// --- CONTACT FORM LOGIC USING FORMSPREE + AJAX ---
const contactForm = document.getElementById("my-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    // Block Formspree redirect
    event.preventDefault();

    const status = document.getElementById("my-form-status");
    const button = document.getElementById("my-form-button");
    const data = new FormData(event.target);

    // Sending status
    button.disabled = true;
    button.innerText = "Sending...";

    fetch("https://formspree.io", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          //Mesage sent ok
          status.innerHTML = "✅ Thanks! Your message has been sent.";
          status.style.color = "green";
          // Clear form after sending message

          contactForm.reset();
        } else {
          // Message error
          status.innerHTML =
            "❌ Oops! There was a problem submitting your form.";
          status.style.color = "red";
        }
      })
      .catch((error) => {
        status.innerHTML = "❌ Oops! Connection error.";
        status.style.color = "red";
      })
      .finally(() => {
        // Enable buttom again
        button.disabled = false;
        button.innerText = "Send Message";
      });
  });
}

