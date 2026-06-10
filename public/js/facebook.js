async function loadProfile() {
  try {
    const res = await fetch("/api/profile", {
      credentials: "include"
    });

    const result = await res.json();

    console.log("PROFILE:", result);

    if (!result.success || !result.data) {
      console.log("No session, staying on page");
      return;
    }

    const profile = result.data;

    document.getElementById("profileName").innerText =
      profile.name || "No Name";

    document.getElementById("profileEmail").innerText =
      profile.email || "No Email";

    document.getElementById("profileId").innerText =
      "ID: " + profile.id;

    const img =
      profile.picture?.data?.url ||
      profile.picture?.url;

    if (img) {
      document.getElementById("profileImage").src = img;
    }

  } catch (err) {
    console.error(err);
  }
}

async function checkSession() {
  const res = await fetch("/api/check-facebook-session", {
    credentials: "include"
  });

  const data = await res.json();

  if (!data.authenticated) {
    window.location.href = "/";
    return false;
  }

  return true;
}

async function loadPages() {
  try {
    const res = await fetch("/api/pages", {
      credentials: "include"
    });

    const data = await res.json();

    const container = document.getElementById("pagesContainer");

    if (!data.data || data.data.length === 0) {
      container.innerHTML = `<p>No Facebook Pages Found</p>`;
      return;
    }

    container.innerHTML = data.data.map(page => `
      <div class="page-card">
        <h3>${page.name}</h3>
        <p>${page.id}</p>
      </div>
    `).join("");

    document.getElementById("pageCount").innerText =
      data.data.length;

  } catch (err) {
    console.error(err);
  }
}

(async () => {
  const ok = await checkSession();

  if (ok) {
    await loadProfile();
    await loadPages();
  }
})();
