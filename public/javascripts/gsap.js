(() => {

let message = document.querySelector('#messages'),
    button = document.querySelector('#button');


function showMessage(){
    TweenMax.fromTo(message, 3, 
        {x:-400, opacity: 0},
        {x:0, opacity:100}
    )
}


button.addEventListener('click', showMessage, false);


})();