'use strict';
(function () {
    var modal = document.querySelector('#popup-sign-up');
    var modalClose = modal.querySelector('.popup-sign-up__close');
    var lastFocusedElement;

    function showPopup() {
        closePopup();
        lastFocusedElement = $('.schedule-and-cost__sign-up');

        lastFocusedElement.on('click', function (evt) {
            evt.preventDefault;
            modal.style.display = 'block';
        })
        var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        var focusableElements = modal.querySelectorAll(focusableElementsString);
        focusableElements = Array.prototype.slice.call(focusableElements);
        var firstTabStop = focusableElements[0];
        var lastTabStop = focusableElements[focusableElements.length - 1];
        firstTabStop.focus();

        modal.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 9) {
                if (evt.shiftKey) {
                    if (document.activeElement === firstTabStop) {
                        evt.preventDefault();
                        lastTabStop.focus();
                    }
                } else {
                    if (document.activeElement === lastTabStop) {
                        evt.preventDefault();
                        firstTabStop.focus();
                    }
                }
            }
        });
    }

    function closePopup() {
        modal.addEventListener('click', function (evt) {
            evt.preventDefault;
            if (evt.target == modal || event.target == modalClose) {
                modal.style.display = "none";
                lastFocusedElement.focus();
            }
        });

        modal.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 27) {
                modal.style.display = "none";
                lastFocusedElement.focus();
            }
        });

    }

    showPopup();
    closePopup();
})();