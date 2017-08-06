const { remote, ipcRenderer } = require('electron')
var rowIndex = 0;
var cellIndex = 0;
const liveZone = [0, 8, 4, 7, 0, 9, 6, 2, 4, 0];
const red = "#FF0000"
const yellow = "#ffff00"
const grey = "#ccccb3"
const green = "#008744"
const Maxlevel = 9


for (rowIndex = 0; rowIndex < 10; rowIndex++) {
    var cell = document.getElementById('board').rows[rowIndex].cells[liveZone[rowIndex]];
    cell.style.transition = 'background 1000ms ease-in-out'
    if (rowIndex == 9) {
        cell.style.background = yellow
        continue;
    }

    cell.style.background = grey

}

ipcRenderer.on('change-colour', (event, currLevel, colour) => {

    var cell = document.getElementById('board').rows[Maxlevel - currLevel].cells[liveZone[Maxlevel - currLevel]];

    if (colour == "green") {
        cell.style.background = green
    } else if (colour == "yellow") {
        cell.style.background = yellow
    } else if (colour == "red") {
        cell.style.background = red
    }
})