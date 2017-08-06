const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron;

app.on('ready', () => {
    const {width, height} = electron.screen.getPrimaryDisplay().size     

    let questionWindow = new BrowserWindow({
        width: width/2,
        height: height,
    })

    questionWindow.addListener('close',() => {
        app.quit()
    })

    questionWindow.loadURL(`file://${__dirname}/qPage.html`);


    let gridWindow = new BrowserWindow({
        width: width/2,
        height: height,
    })

    gridWindow.addListener('close', () => {
        app.quit()
    })

    gridWindow.loadURL(`file://${__dirname}/grid.html`);

    let introWindow = new BrowserWindow({
        width: width,
        height: height
        
    })
    //console.log(electron.screen.getPrimaryDisplay().bounds.height)
    //console.log(electron.screen.getPrimaryDisplay().bounds.width)
    console.log(width)
    console.log(height)
    introWindow.loadURL(`file://${__dirname}/intro.html`);

    introWindow.addListener('close',() => {
        app.quit()
    })

    ipcMain.on('init-game', (event) => {
        introWindow.hide()
        gridWindow.show()
        gridWindow.setPosition(0,0,true)
        
        questionWindow.show()
        questionWindow.setPosition(width/2,0,true)
    })

    ipcMain.on('change-colour', (event, currlevel, colour) => {

        gridWindow.webContents.send('change-colour', currlevel, colour)

    })
    ipcMain.on('endgame', (event) => {
        gridWindow.hide()

        questionWindow.loadURL(`file://${__dirname}/end.html`)
        questionWindow.center()
    })
    
    



    })