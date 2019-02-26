'use strict';
(function () {
var modal = document.querySelector('#popup-sign-up');
var modalClose = modal.querySelector('.popup-sign-up__close');

function showPopup() {
    $('.schedule-and-cost__sign-up').on('click', function (evt) {
        evt.preventDefault;
        modal.style.display = 'block';
    })
}

function closePopup() {
    window.addEventListener('click', function (evt) {
        evt.preventDefault;
        if (evt.target == modal || event.target == modalClose) {
            modal.style.display = "none";
        }
    })
}
showPopup();
closePopup(); 
})();