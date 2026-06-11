async function loadInstagramProfile() {

try {

```
const res = await fetch(
  "/api/instagram/profile",
  {
    credentials: "include"
  }
);

const data = await res.json();

if (!data.success) {
  console.log("Instagram profile not found");
  return;
}

const username =
  data.data.username || "Unknown User";

const userId =
  data.data.id || "Unknown ID";

// Stats Cards
document.getElementById("username").innerText =
  username;

document.getElementById("userId").innerText =
  userId;

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

```
console.error(
  "Profile Load Error:",
  err
);
```

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
        <p>No posts found.</p>
      </div>
    </div>
  `;

  return;
}

document.getElementById(
  "postCount"
).innerText = data.data.length;

container.innerHTML =
  data.data.map(post => {

    let media = "";

    if (
      post.media_type === "IMAGE" ||
      post.media_type === "CAROUSEL_ALBUM"
    ) {

      media = `
        <img
          src="${post.media_url}"
          class="post-image"
          alt="Instagram Post"
        >
      `;

    } else {

      media = `
        <div
          style="
            height:260px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:20px;
          "
        >
          🎬 Video / Reel
        </div>
      `;

    }

    return `

      <div class="glass post-card">

        ${media}

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
