async function loadInstagramProfile() {

  try {

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

    document.getElementById(
      "username"
    ).innerText = username;

    document.getElementById(
      "userId"
    ).innerText = userId;

    const igUsername =
      document.getElementById(
        "igUsername"
      );

    const igId =
      document.getElementById(
        "igId"
      );

    if (igUsername) {
      igUsername.innerText =
        username;
    }

    if (igId) {
      igId.innerText =
        "ID: " + userId;
    }

  } catch (err) {

    console.error(
      "Profile Load Error:",
      err
    );

  }

}

async function loadInstagramMedia() {

  try {

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

    if (
      !data.success ||
      !data.data ||
      data.data.length === 0
    ) {

      container.innerHTML = `
        <div class="glass post-card">
          <div class="post-content">
            <p>No Instagram posts found.</p>
          </div>
        </div>
      `;

      return;

    }

    document.getElementById(
      "postCount"
    ).innerText =
      data.data.length;

    container.innerHTML =
      data.data.map(post => {

        const imageUrl =
          post.media_url ||
          post.thumbnail_url;

        let mediaHtml = "";

        if (imageUrl) {

          mediaHtml = `
            <img
              src="${imageUrl}"
              alt="Instagram Post"
              class="post-image"
              loading="lazy"
            >
          `;

        } else {

          mediaHtml = `
            <div
              class="post-image"
              style="
                display:flex;
                justify-content:center;
                align-items:center;
                font-size:22px;
                font-weight:600;
              "
            >
              🎬 Reel
            </div>
          `;

        }

        return `

          <div class="glass post-card">

            ${mediaHtml}

            <div class="post-content">

              <p class="post-caption">
                ${post.caption || "No caption available"}
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

    console.error(
      "Media Load Error:",
      err
    );

  }

}

window.addEventListener(
  "DOMContentLoaded",
  async () => {

    await loadInstagramProfile();

    await loadInstagramMedia();

  }
);
