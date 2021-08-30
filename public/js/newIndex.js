
const headerPlace1 = document.getElementById('headerPlace1');
const headerPlace2 = document.getElementById('headerPlace2');

let isScrolledOnTop = true;

const topObserved = (entries) => {
    entries = entries[0];
    isScrolledOnTop = entries.isIntersecting;
    const header = document.getElementById('header');
    if (entries.isIntersecting) {
        header.style.height = `${headerPlace1.offsetHeight}px`;
        header.style.width = "100%";
        header.style.marginTop = `-${headerPlace1.offsetHeight}px`;
        header.style.position = "static";
        header.style.transition = "margin-left 0.3s";
    };
};
const observeTop = new IntersectionObserver(topObserved, {
    threshold: 0,
});
observeTop.observe(headerPlace2);

const headerObserved = (entries) => {
    entries = entries[0];
    const header = document.getElementById('header');
    if (!entries.isIntersecting) {
        header.style.height = `${headerPlace1.offsetHeight}px`;
        header.style.width = `${headerPlace1.offsetWidth}px`;
        header.style.marginTop = "0px";
        header.style.position = "fixed";
        header.style.transition = "margin-top 0.3s";
    };
};
const observeHeader1 = new IntersectionObserver(headerObserved, {
    threshold: 0,
});
observeHeader1.observe(headerPlace1);



const headerSizeUpdate = () => {
    const header = document.getElementById('header');
    header.style.width = `${headerPlace1.offsetWidth}px`;
};
headerSizeUpdate();



const homeBackgroundUpdate = () => {
    const profileDiv = document.getElementById('profileDiv');
    profileDiv.style.height = `${profileDiv.offsetWidth}px`;
};
homeBackgroundUpdate();



const experiencesSizeUpdate = () => {
    const experiences = document.querySelectorAll('.experience');

    for (let i = 0; i < experiences.length; i++) {
        const element = experiences[i];
        element.style.height = `${element.offsetWidth}px`;
    };
    const experiencesArea = document.getElementById('experiences');
    experiencesArea.style.height = `${experiences[0].offsetWidth * 2}px`;
};
experiencesSizeUpdate();



window.onresize = () => {
    headerSizeUpdate();
    homeBackgroundUpdate();
    experiencesSizeUpdate();
};


