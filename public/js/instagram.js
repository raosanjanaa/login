
async function loadInstagramProfile() {
try {
const res = await fetch("/api/instagram/profile", {
credentials: "include"
});

```
const data = await res.json();

if (!data.success) {
  console.log("Instagram profile not found");
  return;
}

const username = data.data.username || "Unknown User";
const userId = data.data.id || "Unknown ID";

// Stats Cards
const usernameCard =
  document.getElementById("username");

const userIdCard =
  document.getElementById("userId");

if (usernameCard)
  usernameCard.innerText = username;

if (userIdCard)
  userIdCard.innerText = userId;

// Profile Card
const profileName =
  document.getElementById("igUsername");

const profileId =
  document.getElementById("igId");

if (profileName)
  profileName.innerText = username;

if (profileId)
  profileId.innerText = "ID: " + userId;
```

} catch (err) {
console.error(
"Profile Load Error:",
err
);
}
}

async function loadInstagramMedia() {
try {

```
const res = await fetch(
  "/api/instagram/media",
  {
    credentials: "include"
  }
);

const data = await res.json();

const container =
  document.getElementById(
    "mediaContainer"
  );

if (!container)
  return;

if (!data.success || !data.data) {

  container.innerHTML = `
    <div class="glass post-card">
      <div class="post-content">
        <p>No Instagram posts found.</p>
      </div>
    </div>
  `;

  return;
}

const postCount =
  document.getElementById(
    "postCount"
  );

if (postCount)
  postCount.innerText =
    data.data.length;

container.innerHTML =
  data.data.map(post => {

    let mediaContent = "";

    if (
      post.media_type === "IMAGE" ||
      post.media_type === "CAROUSEL_ALBUM"
    ) {

      mediaContent = `
        <img
          src="${post.media_url}"
          alt="Instagram Post"
          class="post-image"
        />
      `;

    } else {

      mediaContent = `
        <div
          class="post-image"
          style="
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:24px;
          "
        >
          🎬 Reel / Video
        </div>
      `;

    }

    return `

      <div class="glass post-card">

        ${mediaContent}

        <div class="post-content">

          <p class="post-caption">
            ${post.caption || "No caption"}
          </p>

          <a
            href="${post.permalink}"
            target="_blank"
            class="post-link"
          >
            Open Post →
          </a>

        </div>

      </div>

    `;

  }).join("");
```

} catch (err) {

```
console.error(
  "Media Load Error:",
  err
);

const container =
  document.getElementById(
    "mediaContainer"
  );

if (container) {

  container.innerHTML = `
    <div class="glass post-card">
      <div class="post-content">
        <p>Failed to load posts.</p>
      </div>
    </div>
  `;

}
```

}
}

window.addEventListener(
"DOMContentLoaded",
async () => {

```
await loadInstagramProfile();

await loadInstagramMedia();
```

}
);
