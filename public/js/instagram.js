async function loadInstagram() {

    try {

        const response =
        await fetch(
            "/api/instagram"
        );

        const data =
        await response.json();

        console.log(data);

        if (data.username) {

            document.getElementById(
                "igUsername"
            ).innerText =
            data.username;

            document.getElementById(
                "igFollowers"
            ).innerText =
            "Followers: " +
            (data.followers_count || 0);

            document.getElementById(
                "igFollowing"
            ).innerText =
            "Following: " +
            (data.follows_count || 0);

            document.getElementById(
                "igId"
            ).innerText =
            "ID: " +
            data.id;

            if (
                data.profile_picture_url
            ) {

                document.getElementById(
                    "igProfileImage"
                ).src =
                data.profile_picture_url;
            }

        }

    } catch (err) {

        console.error(err);

    }

}

loadInstagram();