//===========================POPULAR LINE=====================
const popularLine = document.getElementById('popularLine');
let popularLineOffset = popularLine.getBoundingClientRect().top;
let windowCenterPos = window.innerHeight/2;

if (windowCenterPos >= popularLineOffset) popularLine.classList.add('show');

document.addEventListener('scroll', function() {
    popularLineOffset = popularLine.getBoundingClientRect().top;
    windowCenterPos = window.innerHeight/2;
    if (windowCenterPos >= popularLineOffset) popularLine.classList.add('show');
});