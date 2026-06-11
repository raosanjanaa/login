async function loadInstagramProfile() {
  try {
    const res = await fetch("/api/instagram/profile", {
      credentials: "include"
    });

    const data = await res.json();

    if (!data.success) {
      console.log("Instagram profile not found");
      return;
    }

    const username = data.data.username || "Unknown User";
    const userId = data.data.id || "Unknown ID";

    // Stats cards
    const usernameCard = document.getElementById("username");
    const userIdCard = document.getElementById("userId");

    if (usernameCard) {
      usernameCard.innerText = username;
    }

    if (userIdCard) {
      userIdCard.innerText = userId;
    }

    // Profile section
    const igUsername = document.getElementById("igUsername");
    const igId = document.getElementById("igId");

    if (igUsername) {
      igUsername.innerText = username;
    }

    if (igId) {
      igId.innerText = "ID: " + userId;
    }

  } catch (err) {
    console.error("Profile Load Error:", err);
  }
}

async function loadInstagramMedia() {
  try {
    const res = await fetch("/api/instagram/media", {
      credentials: "include"
    });

    const data = await res.json();

    const container =
      document.getElementById("mediaContainer");

    if (!container) return;

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

    const postCount =
      document.getElementById("postCount");

    if (postCount) {
      postCount.innerText = data.data.length;
    }

    container.innerHTML = data.data.map(post => {

      let media = "";

      if (
        post.media_type === "IMAGE" ||
        post.media_type === "CAROUSEL_ALBUM"
      ) {
        media = `
          <img
            src="${post.media_url}"
            alt="Instagram Post"
            class="post-image"
          >
        `;
      } else {
        media = `
          <div class="post-image" style="
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:22px;
          ">
            🎬 Reel / Video
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

  } catch (err) {
    console.error("Media Load Error:", err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadInstagramProfile();
  await loadInstagramMedia();
});
