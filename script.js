document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wishForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
      alert("Please fill in both fields before submitting!");
      return;
    }

    // (Optional) You could send this data to a backend or localStorage
    console.log("Wish submitted:", { name, message });

    // Show success animation
    successMessage.classList.add("show");

    // Reset form
    form.reset();

    // Hide success message after few seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 4000);
  });
});
