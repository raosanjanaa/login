async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    const profile = await response.json();

    const dashboard = document.getElementById("dashboard");

    if (!dashboard) return;

    if (!profile.id) {
      dashboard.innerHTML = `
        <div class="welcome-card">
          <h2>Welcome</h2>
          <p>Login with Facebook or Instagram to continue.</p>
        </div>
      `;
      return;
    }

    dashboard.innerHTML = `
      <div class="profile-card">

        <img
          src="${profile.picture?.data?.url || 'https://via.placeholder.com/150'}"
          alt="Profile Picture"
          class="profile-image"
        >

        <h2>${profile.name}</h2>

        <p>${profile.email || "Email not available"}</p>

        <p>ID: ${profile.id}</p>

      </div>
    `;
  } catch (error) {
    console.error("Profile Load Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
});