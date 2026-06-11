
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

  if (!data.success || !data.data)
    return;

  document.getElementById(
    "postCount"
  ).innerText = data.data.length;

  container.innerHTML =
    data.data.map(post => `

      <div class="glass post-card">

        ${
          post.media_url
          ?
          `<img
             src="${post.media_url}"
             alt="Instagram Post"
             class="post-image"
           />`
          :
          ""
        }

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

    `).join("");

}

(async () => {
  await loadInstagramProfile();
  await loadInstagramMedia();
})();

document.addEventListener(
 "mousemove",
 e=>{

  document.body.style.setProperty(
   "--x",
   e.clientX+"px"
  );

  document.body.style.setProperty(
   "--y",
   e.clientY+"px"
  );

 });
 document.querySelectorAll(".glass")
.forEach(card=>{

card.addEventListener(
"mousemove",
e=>{

const rect=
card.getBoundingClientRect();

const x=
e.clientX-rect.left;

const y=
e.clientY-rect.top;

const rotateY=
(x/rect.width-.5)*20;

const rotateX=
(y/rect.height-.5)*-20;

card.style.transform=
`perspective(1000px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)`;

});

card.addEventListener(
"mouseleave",
()=>{

card.style.transform=
"perspective(1000px) rotateX(0) rotateY(0)";

});

});