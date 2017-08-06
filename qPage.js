const fs = require('fs')
const { ipcRenderer } = require('electron')
var questionNum = 0
var currLevel = 0
const hiddenZones = { '0': ['8', '9'], '1': ['1', '3'], '2': ['9', '0'], '3': ['1', '8'], '4': ['4', '4'], '5': ['5', '5'], '6': ['6', '6'], '7': ['7', '7'], '8': ['8', '8'], '9': ['9', '9'], '10': ['10', '10'], '11': ['11', '11'], '12': ['12', '12'], '13': ['13', '13'], '14': ['14', '14'], '15': ['15', '15'] }
const Maxlevel = 9
var json = JSON.parse(fs.readFileSync('questions.json', 'utf8'))
var submitButton = document.getElementById('Submit')
var submitred = document.getElementById('Submit-red')
var trail = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
var consQ = 0;
var isLadder = false;

getCurrentQuestion = (questionNo) => {
    var question = document.getElementById('question')
    question.textContent = json['Q'][questionNo]['question']

    imagediv = document.getElementById('picture')
    if ('imageLink' in json['Q'][questionNo]) {
        imagediv.style.display = 'block'
        var image = document.getElementById('image')
        image.src = "./pictures/" + questionNo + ".jpg"
    } else {
        imagediv.style.display = 'none'
    }
    document.getElementById('userAnswer').focus()
}





submitred.addEventListener('click', () => {
    let redAnswer = document.getElementById('randomAnswer')
    if ((redAnswer.value == hiddenZones[15 - questionNum][0] || redAnswer.value == hiddenZones[15 - questionNum][1])) {
        swal(
            'Good job!',
            'You got it right!',
            'success'
        )
        trail[currLevel]++
        userAnswer = document.getElementById('userAnswer')
        userAnswer.value = null
        userAnswer.focus()
        ipcRenderer.send('change-colour', currLevel, 'yellow')
    } else {
        swal(
            'Hard Luck...',
            'Better luck Next time!',
            'error'
        )
        isLadder = false
        getCurrentQuestion(++questionNum)
        ipcRenderer.send('change-colour', currLevel, 'yellow')


    }
    document.getElementById('red-zone').style.display = 'none'
    document.getElementById('quiz').style.display = 'block'
    redAnswer.value = null;

}, false)

submitButton.addEventListener('click', () => {


    let userAnswer = document.getElementById('userAnswer')
    if (userAnswer.value == json['Q'][questionNum]['answer']) {
        //alert('answered')
        swal(
            'Good job!',
            'You got it right!',
            'success'
        )
        ipcRenderer.send('change-colour', currLevel, "green")
        currLevel++;
        questionNum++;
        consQ++
        if (isLadder == true) {
            ipcRenderer.send('change-colour', currLevel, 'green')
            currLevel++
            isLadder = 0
            consQ = 0
        }
        if (consQ % 4 == 0 && consQ > 1)
            isLadder = 1
        if (currLevel >= 10 || questionNum == 15) {
            ipcRenderer.send('endgame')

        }
        ipcRenderer.send('change-colour', currLevel, 'yellow')
        getCurrentQuestion(questionNum)
        if (isLadder == 1)
        // alert('You Have won a ladder question.')
            swal(
            'Yay..',
            'You won a ladder question',

            'question'
        )
        userAnswer.value = null

    } else {
        consQ = 0
        if (trail[currLevel] == 0) {
            //alert('You have entered an incorrect answer.Prepare to test your luck')
            swal(
                'Oops...',
                'You got it wrong!',
                'error'
            )

            ipcRenderer.send('change-colour', currLevel, 'red')
            document.getElementById('red-zone').style.display = 'block'
            document.getElementById('quiz').style.display = 'none'
            document.getElementById('randomanswer').focus()
            userAnswer.value = null
        } else {
            swal(
                'Oops...',
                'You got it wrong!\n Prepare to test your luck',
                'error'
            )
            getCurrentQuestion(++questionNum)
        }



    }
}, false)

getCurrentQuestion(questionNum)