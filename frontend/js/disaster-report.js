document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkLogin();

        setupLocation();

        setupForm();

        setupLogout();

    }
);


/* CHECK LOGIN */

function checkLogin() {

    const user =
        localStorage.getItem("user");

    if (!user) {

        window.location.href =
            "login.html";

    }

}


/* GET LOCATION */

function setupLocation() {

    const locationBtn =
        document.getElementById(
            "locationBtn"
        );


    locationBtn.addEventListener(
        "click",
        function () {

            if (!navigator.geolocation) {

                alert(
                    "Geolocation is not supported by your browser."
                );

                return;
            }


            locationBtn.textContent =
                "📍 Getting Location...";


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    document.getElementById(
                        "latitude"
                    ).value =
                        position.coords.latitude;


                    document.getElementById(
                        "longitude"
                    ).value =
                        position.coords.longitude;


                    locationBtn.textContent =
                        "✅ Location Added";

                },

                function () {

                    locationBtn.textContent =
                        "📍 Use My Location";

                    alert(
                        "Unable to get your location."
                    );

                }

            );

        }
    );

}


/* SUBMIT REPORT */

function setupForm() {

    const form =
        document.getElementById(
            "disasterForm"
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );


            const report = {

                userId: user.id,

                disasterType:
                    document.getElementById(
                        "disasterType"
                    ).value,

                location:
                    document.getElementById(
                        "location"
                    ).value.trim(),

                latitude:
                    parseFloat(
                        document.getElementById(
                            "latitude"
                        ).value
                    ),

                longitude:
                    parseFloat(
                        document.getElementById(
                            "longitude"
                        ).value
                    ),

                peopleAffected:
                    parseInt(
                        document.getElementById(
                            "peopleAffected"
                        ).value
                    ),

                description:
                    document.getElementById(
                        "description"
                    ).value.trim(),

                urgency:
                    document.getElementById(
                        "urgency"
                    ).value

            };


            const message =
                document.getElementById(
                    "reportMessage"
                );


            message.textContent =
                "Submitting report...";


            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/disasters/report`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(report)
                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    message.textContent =
                        "✅ Report submitted successfully.";


                    form.reset();


                    setTimeout(
                        function () {

                            window.location.href =
                                "dashboard.html";

                        },
                        1500
                    );

                } else {

                    message.textContent =
                        data.message ||
                        "Failed to submit report.";

                }

            } catch (error) {

                console.error(error);

                message.textContent =
                    "Backend server is not connected yet.";

            }

        }
    );

}


/* LOGOUT */

function setupLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "user"
            );


            window.location.href =
                "index.html";

        }
    );

}