document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wishForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
      alert("Please fill in both fields before submitting!");
      return;
    }

    // Prepare form data for Netlify
    const formData = new FormData(form);

    try {
      // Send form data to Netlify
      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Success animation
        successMessage.classList.add("show");
        form.reset();

        // Hide success message after few seconds
        setTimeout(() => {
          successMessage.classList.remove("show");
        }, 4000);
      } else {
        alert("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Check your connection.");
    }
  });
});
