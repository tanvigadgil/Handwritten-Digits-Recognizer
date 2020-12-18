let predictBtn = document.getElementById('predict')
predictBtn.addEventListener('click', predictDigit)

function predictDigit(filename) {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', '/predict', true)
    xhr.onload() = function() {
        let prediction = this.response
        let predictionText = document.getElementById('predictText')
        `<h1>Prediction: ${prediction}</h1>`
    }

    xhr.send(filename)
}