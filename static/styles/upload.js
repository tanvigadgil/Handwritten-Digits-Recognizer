let predictBtn = document.getElementById('predictBtn')
predictBtn.addEventListener('click', predictDigit)

async function predictDigit(evt) {
    const response = await fetch('/predict', {
        method: 'POST',
        body: JSON.stringify({ filename: evt.target.getAttribute('data-filename') }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    let predictionText = document.getElementById('predictionText')
    predictionText.innerText = data.prediction;
}