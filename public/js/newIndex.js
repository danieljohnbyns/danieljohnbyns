
const headerPlace = document.getElementById('headerPlace');
const headerObserved = (entries) => {
    entries = entries[0];
    const header = document.getElementById('header');
    if (entries.isIntersecting) {
        header.style.position = "static";
        header.style.marginTop = `-${header.offsetHeight}px`;
        header.style.transition = "all 0s";
    } else {
        header.style.position = "fixed";
        header.style.marginTop = "0px";
        header.style.transition = "all 0.3s";
    };
};
const observeHeader = new IntersectionObserver(headerObserved, {
    threshold: 0,
});
observeHeader.observe(headerPlace);