
(() => {

})();
const icons = document.querySelectorAll('.icons');

for (let i = 0; i < icons.length; i++) {
    let cursorInside;
    const element = icons[i];
    element.onmouseenter = () => cursorInside = true;
    element.onmouseleave = () => cursorInside = false;

    element.onmouseover = () => {
        element.classList.add('iconRoll');
        setTimeout(() => {
            element.onanimationend = () => {
                if (cursorInside == true) {
                    element.classList.remove('iconRoll');
                    setTimeout(() => {
                        element.classList.add('iconRoll');
                    }, 0);
                } else {
                    element.classList.remove('iconRoll');
                };
            };
        }, 0);
    };
};

let typingInterval;
const typeUsername = () => {
    clearInterval(typingInterval);
    const usernameElem = document.getElementById('username');
    usernameElem.innerHTML = '';
    const username = 'Danspotnytool';
    let typeNum = username.length;
    let typedNum = 0;

    typingInterval = setInterval(() => {
        usernameElem.innerHTML += `${username[typedNum]}`;
        typedNum += 1;
        if (typedNum === typeNum) {
            clearInterval(typingInterval);
        };
    }, 200);
};
setTimeout(() => {
    typeUsername();
}, 100);



const posterText = document.getElementById('posterTextCard');
const posterTextObserved = (entries) => {
    entries = entries[0];
    if (entries.isIntersecting) {
        typeUsername();
    };
};
const observePostertext = new IntersectionObserver(posterTextObserved, {
    threshold: 0
});
observePostertext.observe(posterText);




const areasToBeObserved = document.querySelectorAll('.area:not(#experiences)');
const partInputs = document.querySelectorAll('.options label:not([for="experiencesPart"]) ~ .partInput');
for (let i = 0; i < areasToBeObserved.length; i++) {
    const element = areasToBeObserved[i];
    const elementObserved = (entries) => {
        entries = entries[0];
        if (entries.isIntersecting) {
            partInputs[i].style.background = "var(--color)";
            if (entries.target.id == 'home') {
                document.querySelector('#poster video').play();
            };
        } else {
            partInputs[i].style.background = "hsla(0, 0%, 100%, 0.5)";
            if (entries.target.id == 'home') {
                document.querySelector('#poster video').pause();
            };
        };
    };
    const observeElement = new IntersectionObserver(elementObserved, {
        threshold: 0
    });
    observeElement.observe(element);
};



{
    const experiencesOption = document.querySelectorAll('.options .partInput div');
    const experiencesCards = document.querySelectorAll('.experiencesBox .experienceCard');

    for (let i = 0; i < experiencesCards.length; i++) {
        const element = experiencesCards[i];
        const elementObserved = (entries) => {
            entries = entries[0];
            if (entries.isIntersecting) {
                experiencesOption[i].style.background = "var(--color)";
            } else {
                experiencesOption[i].style.background = "none";
            };
        };
        const observeElement = new IntersectionObserver(elementObserved, {
            threshold: 0
        });
        observeElement.observe(element);
    };
};



const parts = document.querySelectorAll('.options label');
for (let i = 0; i < parts.length; i++) {
    let element = parts[i];
    element.id = `option${i}`;
    element.onclick = () => {
        switch (element.id) {
            case 'option0':
                smoothScroll('homeScroll');
                break;
            case 'option1':
                smoothScroll('experiences');
                break;
            case 'option2':
                smoothScroll('certificates');
                break;
            case 'option3':
                smoothScroll('socials');
                break;
            default:
                smoothScroll('contact');
                break;
        };
    };
};



// Code came from Stackoverflow.
const currentYPosition = () => {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
};

const elmYPosition = (elementId) => {
    var element = document.getElementById(elementId);
    var y = element.offsetTop;
    var node = element;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    };
    return y;
};

const smoothScroll = (elementId) => {
    var startY = currentYPosition();
    var stopY = elmYPosition(elementId);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    };
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        };
        return;
    };
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    };
};



const certificatesInput = document.querySelectorAll('input[name="certificatesInput"]');
const certificatesCard = document.querySelectorAll('#certificates .panel div');
for (let i = 0; i < certificatesCard.length; i++) {
    const element = certificatesCard[i];
    element.onclick = () => {
        if (certificatesInput[i].checked) {
            certificatesInput[i].checked = false;
        } else {
            certificatesInput[i].checked = true;
        };
    };
};


{
    let location = window.location;
    let newLocation = location.hostname; // localhost
    let port = parseInt(socketPort); // 6600
    let newUri;
    if (location.protocol === "https:") {
        newUri = "wss:";
    } else {
        newUri = "ws:";
    };
    newUri += `//${newLocation}:${port}`;  // ws://localhost:6600

    console.log(newUri);
    const ws = new WebSocket(newUri);

    ws.onopen = (ws) => {
        console.log('connected to the server');
    };

    ws.onclose = () => {
        console.log('disconnected from the server');
    };
};