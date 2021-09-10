function auditDay() {
    var today = moment().format("dddd, MMMM Do");
    $("#currentDay").append("<p>").text(today);
};

var events = JSON.parse(localStorage.getItem("saved events"));

if(!events) {
    events = ["", "", "", "", "", "", "", "", ""];
}

function auditEvents() {
    console.log("hi");
};

function loadEvents() {
    for(var i = 0; i < events.length; i++) {
        var eventId = JSON.parse($("i").attr("id")) + i;
        console.log(eventId);
    }
};

$("i").on("click", function() {
    var eventDescription = $(this).parents(".row").find("textarea").val();
    
    events.splice($(this).attr("id"), 1, eventDescription);
    localStorage.setItem("saved events", JSON.stringify(events));
})

// $("textarea").each(function() {
//     var i = 0;
//     $(this).text(events[i]);
//     i++;
// })

loadEvents();

setInterval(auditDay(), (1000 * 60 * 60));

setInterval(auditEvents(), (1000 * 60 * 30));