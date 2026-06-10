async function loadProfile() {
  try {
    const response = await fetch("/api/profile", {
      credentials: "include"
    });

    const profile = await response.json();

    console.log(profile);

    if (!profile.id) {
      return;
    }

    let imageUrl = "";

    if (
      profile.picture &&
      profile.picture.data &&
      profile.picture.data.url
    ) {
      imageUrl = profile.picture.data.url;
    }

    document.getElementById("dashboard").innerHTML = `
      <div class="profile-card">

        <img src="${imageUrl}" alt="Profile">

        <h2>${profile.name}</h2>

        <p>${profile.email || "Email not available"}</p>

        <p>User ID: ${profile.id}</p>

      </div>
    `;

  } catch (error) {
    console.log(error);
  }
}

loadProfile();