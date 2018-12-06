//Link the giphy API
//Make an array for the buttons
//Loop over the array to create buttons
//Add buttons to the page
//When a button is clicked, list still images that result from the search (10 images)
//When the image is clicked, animate the image. If if is clicked again, turn it back to still. 
//Set up the add button
//Take input from there and add it to your button array
// http://url...?name1=value1&name2=value2&name3=value3......

//Array for the buttons
let buttonTopics = [
    "cat",
    "princess",
    "pizza",
]

let search;

let imgURL;

let imgURLAnimate; 

let image;

let imageAnimate;

let imageDiv; 

function makeButtons() {
    $("#display-buttons").empty();

    for (i = 0; i < buttonTopics.length; i++) {
        let a = $("<button>");
        // Adding a class of display-btn to our button
        a.addClass("display-btn btn btn-info");
        // Adding a data-attribute with a value of the button at index i
        a.attr("data-name", buttonTopics[i]);
        // Providing the button's text with a value of the button at index i
        a.text(buttonTopics[i]);
        // Adding the button to the HTML
        $("#display-buttons").append(a);

        console.log(buttonTopics[i]);
    }
}

function displayImages() {

    search = $(this).attr("data-name");

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=M8FMPuxbnOUtGkkKdRsXL2abVbXiU61p" + "&limit=10" + "&rating=g" + "&rating=pg"

    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && $.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#display-images").empty();

        for (i = 0; i < 10; i++) {
            //Div to hold the image:
            imageDiv = $("<div class='image'>");

            //Store the rating data
            let rating = response.data[i].rating;

            //Display rating
            let rp = $("<p>").text("Rating: " + rating);
            imageDiv.append(rp);

            //Get URL for images
            imgURL = response.data[i].images.original_still.url;
            imgURLAnimate = response.data[i].images.original.url;

            imageDiv.addClass("still"); 

            //This does NOT work:
            // imgURL.attr("data-state", "still");
            // let still = $("imgURL").addClass("still"); 
            // imageDiv.append(still);

            //Create element to hold image
            image = $("<img>").attr("src", imgURL);

            image.addClass("image-gif"); 
            image.attr("data-animate", imgURLAnimate);
            image.attr("data-still", imgURL);
            image.attr("data-state", "still");

            // let imageAnimate = $("<img>").attr("src", imgURLAnimate);

            //Display the image
            imageDiv.append(image);
            // imageDiv.append(imageAnimate);

            $("#display-images").prepend(imageDiv);

            
        }

    });

}

$(document).on("click", ".image-gif", function () {

    console.log("animate image");

    console.log(this);

    let state = $(this).attr("data-state");

    //This works to get rid of the image
    // $(".image").click(function(e) {
    //     $(e.target).remove(); 
    // });

    if (state === "still") {
        (console.log("it's still!"));
        $(this).attr("data-state")
        imageAnimate = image.attr("src", imgURLAnimate);
        // imageDiv.html(imageAnimate);
        $("#display-images").prepend(imageDiv);
    }

    // } else if ("class" === imageAnimate) {
    //     image = $("<img>").attr("src", imgURL);
    //     imageDiv.append(image);
    //     $("#display-images").prepend(imageDiv);
    // }

});

$("#find-search").on("click", function (event) {
    event.preventDefault();

    //Get input from textbox
    let value = $("#button-input").val().trim();

    //Add search from textbox to array
    buttonTopics.push(value);
    console.log(buttonTopics, "array");

    makeButtons();
})


$(document).on("click", ".display-btn", displayImages);

makeButtons(); 