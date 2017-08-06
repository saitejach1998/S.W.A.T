const {remote, ipcRenderer} = require('electron')
var button = document.getElementById('startGame')
button.addEventListener('click', () => {
    ipcRenderer.send('init-game')
}, false)
