
const login = document.getElementById('login');
const form = document.getElementById('form');

// To check if the user is logged or not.
let isLogged = false;

// To prevent the page from refreshing when then login button is clicked.
form.onsubmit = (event) => {
    event.preventDefault();
};

class Message {
    constructor(type, contents) {
        this.type = type;
        this.contents = contents;
    };
};

let chart;

const connect = (logged) => {
    const ws = new WebSocket('ws://localhost:5500');
    const originalSend = ws.send;

    // Listen everytime a request or ws.send is happening.
    ws.send = (...args) => {
        console.log('something was sent');
        return originalSend.apply(ws, args);
    };

    // Listen to websocket connection.
    ws.onopen = () => {
        console.log('Connected to the server');

        // To be removed later.
        setTimeout(() => {
            const username = document.getElementById('username');
            const password = document.getElementById('password');

            try {
                username.value = 'danspotnytool';
                password.value = 'independent';
            } catch (error) {

            };

            login.click();
        }, 10);

        // Listen to login button click.
        login.onclick = () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const message = new Message('loginRequest', {
                username: username,
                password: password
            });

            // Check if there's an input or none.
            login.disabled = true;
            if (username == '' && password == '') {
                login.disabled = false;
            } else {
                ws.send(JSON.stringify(message));
            };
        };
    };



    // Listen to server messages, identifying that type message,
    // and what the responce should be.
    ws.onmessage = ({data}) => {
        data = JSON.parse(data);
        switch (data.type) {
            case 'loginRequest':
                // Check if the login request is successfull or not.
                switch (data.contents.status) {
                    case 'success':
                        console.log('success');
                        isLogged = true;
                        if (history.pushState) {
                            const username = document.getElementById('username').value;
                            const password = document.getElementById('password').value;
                            const withLoginQueries = window.location.protocol
                                                     + "//" + window.location.host 
                                                     + window.location.pathname 
                                                     + `?username=${username}&password=${password}`;
                            window.history.pushState({path:withLoginQueries},'', withLoginQueries);
                        };
                        displayDashboard();
                        break;
                    default:
                        console.log('failed');
                        login.disabled = false;
                        break;
                };
                break;
            case 'dashboardUpdate':
                updateChart(data.contents);
                break;
            default:
                // Nothing here, keep reading.
                console.log('LMAO, What kind of request is this?');
                break;
        };
    };

    // Listen to websocket disconnection.
    ws.onclose = () => {
        console.error('Disconnected from the server');
        customAlert.withButton('refresh', "window.location.reload();", 'Disconnected from the server')
    };
};
// Connect to the server.
connect();

// Custom alert for future use.
const customAlert = {
    withButton: (button, buttonFunction, content) => {
        if (document.getElementById('customAlert')) {
            closeAlert();
        };
        const customAlert = document.createElement('div');
        customAlert.id = 'customAlert';
        customAlert.setAttribute('data-content', 'x');
        customAlert.classList.add('alert');

        const closeButton = document.createElement('span');
        closeButton.classList.add('closeButton');
        closeButton.innerHTML = 'x';

        customAlert.innerHTML = `
            <span></span>
            <button onclick="${buttonFunction}; this.disabled = true;"></button>
        `;

        document.body.appendChild(customAlert);
        customAlert.appendChild(closeButton);

        document.querySelector('#customAlert span').innerText = `${content}`;
        document.querySelector('#customAlert button').innerText = `${button}`;


        closeButton.onclick = () => {
            closeAlert();
        };
    },
    nobutton: (content) => {
        if (document.getElementById('customAlert')) {
            closeAlert();
        };
        const customAlert = document.createElement('div');
        customAlert.id = 'customAlert';
        customAlert.classList.add('alert');

        const closeButton = document.createElement('span');
        closeButton.classList.add('closeButton');
        closeButton.innerHTML = 'x';

        customAlert.innerHTML = `
            <span></span>
        `;

        document.body.appendChild(customAlert);
        customAlert.appendChild(closeButton);

        document.querySelector('#customAlert span').innerText = `${content}`;

        closeButton.onclick = () => {
            closeAlert();
        };
    }
};

// This function will triger when the x button on the alert panel to close it.
const closeAlert = () => {
    if (document.getElementById('customAlert')) {
        document.getElementById('customAlert').remove();
    };
};

const displayLoading = () => {
    const loadingBar = document.createElement('div');
    loadingBar.id = 'loadingBar';
    const loadingProgress = document.createElement('div');
    loadingProgress.style.width = "0%";
    loadingProgress.id = 'lodingProgress';

    document.body.appendChild(loadingBar);
    loadingBar.appendChild(loadingProgress);
};

const displayDashboard = () => {
    console.log('dashboard');

    document.body.innerHTML = `
        <div id="dashboardArea">
            <input type="checkbox" id="sidePanelButton">
            <div id="sidePanel"></div>
            <div id="dashboardPanel">
                <div id="chartPanel">
                    <canvas id="chart"></chart>
                </div>
            </div>
        </div>
    `;
    // Displaying the chart.
    displayChart();
};

const displayChart = () => {
    const canvas = document.getElementById('chart').getContext('2d');
    chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",],
            datasets: [{
                label: 'Visitor count',
                data: [],
                backgroundColor: [
                    'hsl(190, 100%, 90%)'
                ],
                borderColor: [
                    'hsl(190, 100%, 50%)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Template for visitor counts (should update everytime a user connects or disconnect).
const visitorCounts = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const updateChart = (data) => {
    visitorCounts.shift();
    visitorCounts.push(data);
    chart.data.datasets[0].data = visitorCounts;
    chart.update();
};

