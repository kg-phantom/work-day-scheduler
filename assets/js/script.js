var events = JSON.parse(localStorage.getItem("saved events"));

if(!events) {
    events = ["", "", "", "", "", "", "", "", ""];
};

// set corresponding time attributes for each textarea
for(var i = 0; i < events.length; i++) {
    var eventId = JSON.parse($(".row").attr("id")) + i;
    $("div#" + eventId).find("textarea").attr("time", JSON.stringify(moment().set("hour", (9 + i)).startOf("hour")));
};

function auditDay() {
    var today = moment().format("dddd, MMMM Do");
    $("#currentDay").append("<p>").text(today);

    // reset events if it is a new day
    if(today != JSON.parse(localStorage.getItem("day"))) {
        localStorage.setItem("day", JSON.stringify(today));
        $("textarea").each().text("");
        events = ["", "", "", "", "", "", "", "", ""];
        localStorage.setItem("saved events", JSON.stringify(events));
    }
};

function auditEvents() {
    var now = moment().startOf("hour");
    for(var i = 0; i < events.length; i++) {
        var eventId = JSON.parse($(".row").attr("id")) + i;
        var eventTime = JSON.parse($("div#" + eventId).find("textarea").attr("time"));
        
        // color codes each time block to display if they are in the past, present or future
        if(now.isAfter(eventTime)) {
            $("div#" + eventId).find("textarea").addClass("past")
        }
        else if(now.isSame(eventTime)) {
            $("div#" + eventId).find("textarea").addClass("present");
        }
        else if(now.isBefore(eventTime)) {
            $("div#" + eventId).find("textarea").addClass("future");
        }
    }
};

function loadEvents() {
    for(var i = 0; i < events.length; i++) {
        var eventId = JSON.parse($(".row").attr("id")) + i;

        // prints events to corresponding time block
        $("div#" + eventId).find("textarea").text(events[i]);
    };
};

$("i").on("click", function() {
    var eventDescription = $(this).parents(".row").find("textarea").val().trim();

    // insert event in corresponding index in events array
    events.splice($(this).parents(".row").attr("id"), 1, eventDescription);
    localStorage.setItem("saved events", JSON.stringify(events));
})

loadEvents();

auditEvents();

// auditDay() every 30mins
setInterval(auditDay(), (1000 * 60 * 30));

// auditEvents() every 15mins
setInterval(auditEvents(), (1000 * 60 * 15));