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
    const rsp = await response.json();
    let predictionText = document.getElementById('predictionText')
    predictionText.innerText = rsp.prediction;
    let probability = rsp.probability;

    new Chart(document.getElementById("bar-chart-horizontal"), {
        type: 'horizontalBar',
        data: {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [
                {
                    backgroundColor: '#520e47',
                    data: probability
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    barThickness: 40,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: { display: false },
            title: {
                display: true,
                text: 'Probability',
                fontSize: 20,
                fontColor: '#520e47'
            }
        }
    });
}