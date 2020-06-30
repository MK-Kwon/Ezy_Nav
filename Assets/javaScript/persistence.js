// https://firebase.google.com/docs/database/web/read-and-write
// Store Current Call Number in Firebase Database
function runFirebase(database) {
    let currentCallNumber = 0;

    database.ref("/currentCallNumber").once("value", function(snapshot) {
        currentCallNumber = snapshot.val().currentCallNumber;
        currentCallNumber++;
        database.ref("/currentCallNumber").set({
            currentCallNumber: currentCallNumber,
        });
    });
}
