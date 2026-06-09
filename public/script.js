function loginFacebook() {
  window.location.href =
    "http://localhost:5000/auth/facebook";
}

function loginInstagram() {
  window.location.href =
    "http://localhost:5000/auth/instagram";
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("fbBtn")
    .addEventListener("click", () => {
      window.location.href = "/auth/facebook";
    });

  document
    .getElementById("igBtn")
    .addEventListener("click", () => {
      window.location.href = "/auth/instagram";
    });
});