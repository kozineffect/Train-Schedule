    // Firebase database information
    var config = {
        apiKey: "AIzaSyAxfikHiZ_0vvTs2q_Gq556PB7lm5YMTdI",
        authDomain: "pdhtestit-d3d5c.firebaseapp.com",
        databaseURL: "https://pdhtestit-d3d5c.firebaseio.com",
        projectId: "pdhtestit-d3d5c",
        storageBucket: "pdhtestit-d3d5c.appspot.com",
        messagingSenderId: "322268534534"
     };
    
    // Initialize Firebase database
    firebase.initializeApp(config);

    // Set database to variable 
    var database = firebase.database();

    var tFrequency = 0;

    var firstTime = 0;

    var name = "";

    var destination ="";

    var firstTimeConverted;
    var currentTime;

window.onload = function(){

    $("#add-train").on("click", function(event) {
    
        event.preventDefault();
    
        name = $("#name-input").val();

        destination = $("#dest-input").val();
        
        firstTime = $("#initial-input").val();
        
        tFrequency = $("#freq-input").val();
        
        firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

        currentTime = moment();
        
        database.ref().push({
    
            name: name,
    
            destination: destination,
    
            firstTime: firstTime,
    
            tFrequency: tFrequency
        });
    });

    
        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
            
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            
            var tRemainder = diffTime % tFrequency;
            
            var tMinutesTillTrain = tFrequency - tRemainder;
            
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");

            $("#name-input").val("");

            $("#dest-input").val("");
            
            $("#initial-input").val("");
            
            $("#freq-input").val("");
            
            $("#servTable").append(`
            
            <tr>
                <td>${snapshot.val().name}</td>
                <td>${snapshot.val().destination}</td>
                <td>${snapshot.val().tFrequency}</td>
                <td>${nextTrain}</td>
                <td>${tMinutesTillTrain}</td>
            </tr>`
            
            );
            
            }, function(errorObject) {

            console.log("Errors handled: " + errorObject.code);
        
        });

    }