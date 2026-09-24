
document.addEventListener("DOMContentLoaded", function () {

    const feedbackForm =
        document.getElementById("feedbackForm");


    feedbackForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const rating =
            document.getElementById("rating").value;

        const feedback =
            document.getElementById("feedback").value.trim();

        const result =
            document.getElementById("feedbackResult");


        if (rating === "") {

            result.textContent =
                "Please select a rating.";

            return;
        }


        if (feedback === "") {

            result.textContent =
                "Please enter your feedback.";

            return;
        }


        const feedbackData = {

            rating: rating,

            feedback: feedback,

            date: new Date().toLocaleString()

        };


        let feedbackList =
            JSON.parse(
                localStorage.getItem("citizenFeedback")
            ) || [];


        feedbackList.push(feedbackData);


        localStorage.setItem(
            "citizenFeedback",
            JSON.stringify(feedbackList)
        );


        result.textContent =
            "Thank you! Your feedback has been submitted successfully.";


        feedbackForm.reset();

    });

});
