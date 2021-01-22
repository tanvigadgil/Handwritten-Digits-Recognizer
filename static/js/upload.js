let predictBtn = document.getElementById('predictBtn')
predictBtn.addEventListener('click', predictDigit)

async function predictDigit(evt) {
    const response = await fetch('/predict', {
        method: 'POST',
        body: JSON.stringify({ filename: evt.target.getAttribute('data-filename'), draw: false }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const rsp = await response.json();
    let predictionText = document.getElementById('predictionText')
    predictionText.innerText = rsp.prediction;
    let probability = rsp.probability;

    let chart = document.getElementById("barChartHorizontal");
    chart.height = 600;
    chart.width = 500;

    if(window.myChart != undefined) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(chart, {
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
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    barThickness: 40,
                    categoryPercentage: 0.4,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: { display: false },
            title: {
                display: true,
                text: 'Probability',
                fontSize: 25,
                fontColor: '#520e47'
            }
        }
    });
}