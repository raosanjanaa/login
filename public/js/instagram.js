
async function loadInstagramProfile() {
  const res = await fetch("/api/instagram/profile", {
    credentials: "include"
  });

  const data = await res.json();

  if (!data.success) return;

  document.getElementById("username").innerText =
    data.data.username;

  document.getElementById("userId").innerText =
    "ID: " + data.data.id;
}

async function loadInstagramMedia() {
  const res = await fetch("/api/instagram/media", {
    credentials: "include"
  });

  const data = await res.json();

  const container = document.getElementById("mediaContainer");

  if (!data.success || !data.data) return;

  container.innerHTML = data.data.map(post => `
    <div class="post">
      ${post.media_type === "IMAGE"
        ? `<img src="${post.media_url}" width="200"/>`
        : `<a href="${post.permalink}" target="_blank">View Post</a>`
      }
      <p>${post.caption || ""}</p>
    </div>
  `).join("");
}

(async () => {
  await loadInstagramProfile();
  await loadInstagramMedia();
})();