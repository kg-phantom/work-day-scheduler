function auditDay() {
    var today = moment().format("dddd, MMMM Do");
    $("#currentDay").append("<p>").text(today);
};

var events = JSON.parse(localStorage.getItem("saved events"));

if(!events) {
    events = ["", "", "", "", "", "", "", "", ""];
}

function auditEvents() {
    console.log("test");
};

function loadEvents() {
    for(var i = 0; i < events.length; i++) {
        var eventId = JSON.parse($(".row").attr("id")) + i;

        // prints events to corresponding time block
        $("div#" + eventId).find("textarea").text(events[i]);
    };
};

$("i").on("click", function() {
    var eventDescription = $(this).parents(".row").find("textarea").val();

    // insert event in corresponding index in events array
    events.splice($(this).parents(".row").attr("id"), 1, eventDescription);
    localStorage.setItem("saved events", JSON.stringify(events));
})

loadEvents();

setInterval(auditDay(), (1000 * 60 * 60));

setInterval(auditEvents(), (1000 * 60 * 30));