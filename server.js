
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 5500});

// All admins
const admins = [
    {
        username: 'danspotnytool',
        password: 'independent',
        superAdmin: 'true'
    },
];

// Template for visitor counts (should update everytime a user connects or disconnect).
const visitorCounts = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

// The count of visitors every 2 seconds.
// If someone connected, should add one.
// If someone disconnected, sould subract one.
let currentVisitors = 0;


// Template for a message
class Message {
    constructor(type, contents) {
        this.type = type;
        this.contents = contents;
    };
};

// Main
wss.on('connection', (ws) => {
    // Update thing the visitorCounts
    // Variable to be used for setInterval of dashboard chart update.
    let dashboardInterval;

    currentVisitors += 1;
    visitorCounts.shift();
    visitorCounts.push(currentVisitors);

    console.log('A new user connected to the server');

    ws.onmessage = ({data}) => {
        data = JSON.parse(data);
        switch (data.type) {
            case 'loginRequest':
                admins.forEach((element) => {
                    let message;
                    if (element.username === data.contents.username && element.password === data.contents.password) {
                        message = new Message('loginRequest', {status: 'success'});
                        updateDashboard();
                    } else {
                        message = new Message('loginRequest', {status: 'failed'});
                    };
                    ws.send(JSON.stringify(message));
                });
                break;
            default:
                break;
        };
    };

    ws.onerror = (error) => {
        console.error(error);
    };

    ws.onclose = () => {
        console.log('A user disconnected from the server');
        // decreasing the visitor count
        currentVisitors -= 1;
        visitorCounts.shift();
        visitorCounts.push(currentVisitors);

        clearInterval(dashboardInterval);
    };

    const updateDashboard = () => {
        dashboardInterval = setInterval(() => {

            const message = new Message('dashboardUpdate', currentVisitors);
            ws.send(JSON.stringify(message));
        }, 1000);
    };
});



// Brodcast to all connected users
wss.brodcast = (data) => {
    wss.clients.forEach((client) => {
        client.send(data);
    });
};


