document.addEventListener("DOMContentLoaded", function () {
  const showPunchlineBtn = document.getElementById("showPunchlineBtn"); // Get the show punchline button element.
  const stars = document.querySelectorAll(".star"); //  Get all star rating elements.
  const ratingMessage = document.getElementById("ratingMessage"); // Get the rating message element.
  const RATE_JOKE_URL = "/rate-joke";
  const RATING_MESSAGE_TIMEOUT = 2000; // Define a constant for the timeout value
  // Event listener for the show punchline button click event.
  // Displays the joke punchline and hides the button.
  if (showPunchlineBtn) {
    showPunchlineBtn.addEventListener("click", function () {
      document.getElementById("jokePunchline").style.display = "block";
      this.style.display = "none";
    });
  }
  // Function to update and hide the rating message
  function updateRatingMessage(message) {
    ratingMessage.textContent = message;
    ratingMessage.style.display = "block";
    setTimeout(() => {
      ratingMessage.style.display = "none";
    }, RATING_MESSAGE_TIMEOUT); // Adjust timing as needed
  }
  // * Event listener for each star rating element click event.
  // * Sets the rating value, adds active class to clicked star and previous ones,
  // * and sends the rating to the server using Axios.
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const clickedRatingValue = this.getAttribute("data-value"); // Get the rating value from the clicked star element.
      document.getElementById("ratingValue").innerText = clickedRatingValue; // Update the rating value display.
      // Add active class to clicked star and previous ones.
      stars.forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
      let prevSibling = this.previousElementSibling;
      while (prevSibling) {
        prevSibling.classList.add("active");
        prevSibling = prevSibling.previousElementSibling;
      }
      axios
        .post(RATE_JOKE_URL, {
          // Send the rating to the server using Axios
          jokeId: "<%= joke.id %>",
          rating: clickedRatingValue,
        })
        .then((response) => {
          updateRatingMessage("Thank you for rating this joke!");
          console.log("Rating submitted:", response.data);
        })
        .catch((error) => {
          updateRatingMessage("Failed to submit rating. Please try again.");
          console.error("Error submitting rating:", error);
        });
    });
  });
});
