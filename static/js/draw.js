const canvas = document.getElementById('canvas');

let predictBtn = document.getElementById('predictBtn');
predictBtn.addEventListener('click', predictDigit);

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clearCanvas);

const ctx = canvas.getContext('2d');
let coord = { x: 0, y: 0 };
let paint = false;

window.addEventListener('load', () => {
    resize();
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});

function resize() {
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
}

function getPosition(evt) {
    var rect = canvas.getBoundingClientRect();
    coord.x = evt.clientX - rect.left;
    coord.y = evt.clientY - rect.top;
}

function startPainting(evt) {
    paint = true;
    getPosition(evt);
}

function stopPainting() {
    paint = false;
}

function sketch(evt) {
    if (!paint) return;

    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';

    ctx.moveTo(coord.x, coord.y);
    getPosition(evt);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function predictDigit() {
    const dataURI = canvas.toDataURL('image/png');

    const response = await fetch('/predict', {
        method: 'POST',
        body: JSON.stringify({ filename: dataURI }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const rsp = await response.json();
    let predictionText = document.getElementById('predictionText')
    predictionText.innerText = rsp.prediction;
    let probability = rsp.probability;

    new Chart(document.getElementById("barChartHorizontal"), {
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