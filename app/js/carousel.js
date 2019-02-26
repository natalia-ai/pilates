'use strict';
var slider = (function (config) {

  const ClassName = {
    INDICATOR_ACTIVE: 'feedback__slider-indicator--active',
    ITEM: 'feedback__slider-item',
    ITEM_LEFT: 'feedback__slider-item--left',
    ITEM_RIGHT: 'feedback__slider-item--right',
    ITEM_PREV: 'feedback__slider-item--prev',
    ITEM_NEXT: 'feedback__slider-item--next',
    ITEM_ACTIVE: 'feedback__slider-item--active'
  }

  var
    _isSliding = false, 
    _interval = 0, 
    _transitionDuration = 700, 
    _slider = {}, 
    _items = {}, 
    _sliderIndicators = {},
    _config = {
      selector: '',
      isCycling: true, 
      direction: 'next', 
      interval: 5000, 
      pause: true 
    };

  var
    _getItemIndex = function (_currentItem) {
      var result;
      _items.forEach(function (item, index) {
        if (item === _currentItem) {
          result = index;
        }
      });
      return result;
    },
  
    _setActiveIndicator = function (_activeIndex, _targetIndex) {
      if (_sliderIndicators.length !== _items.length) {
        return;
      }
      _sliderIndicators[_activeIndex].classList.remove(ClassName.INDICATOR_ACTIVE);
      _sliderIndicators[_targetIndex].classList.add(ClassName.INDICATOR_ACTIVE);
    },

    _slide = function (direction, activeItemIndex, targetItemIndex) {
      var
        directionalClassName = ClassName.ITEM_RIGHT,
        orderClassName = ClassName.ITEM_PREV,
        activeItem = _items[activeItemIndex], 
        targetItem = _items[targetItemIndex]; 

      var _slideEndTransition = function () {
        activeItem.classList.remove(ClassName.ITEM_ACTIVE);
        activeItem.classList.remove(directionalClassName);
        targetItem.classList.remove(orderClassName);
        targetItem.classList.remove(directionalClassName);
        targetItem.classList.add(ClassName.ITEM_ACTIVE);
        window.setTimeout(function () {
          if (_config.isCycling) {
            clearInterval(_interval);
            _cycle();
          }
          _isSliding = false;
          activeItem.removeEventListener('transitionend', _slideEndTransition);
        }, _transitionDuration);
      };

      if (_isSliding) {
        return; 
      }
      _isSliding = true; 

      if (direction === "next") { 
        directionalClassName = ClassName.ITEM_LEFT;
        orderClassName = ClassName.ITEM_NEXT;
      } 

      targetItem.classList.add(orderClassName); 
      _setActiveIndicator(activeItemIndex, targetItemIndex); 

      window.setTimeout(function () { 
        targetItem.classList.add(directionalClassName);
        activeItem.classList.add(directionalClassName);
        activeItem.addEventListener('transitionend', _slideEndTransition);
      }, 0);

    },
    
    _slideTo = function (direction) {
      var
        activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), 
        activeItemIndex = _getItemIndex(activeItem), 
        lastItemIndex = _items.length - 1, 
        targetItemIndex = activeItemIndex === 0 ? lastItemIndex : activeItemIndex - 1;
      if (direction === "next") { 
        targetItemIndex = activeItemIndex == lastItemIndex ? 0 : activeItemIndex + 1;
      }
      _slide(direction, activeItemIndex, targetItemIndex);
    },
    
    _cycle = function () {
      if (_config.isCycling) {
        _interval = window.setInterval(function () {
          _slideTo(_config.direction);
        }, _config.interval);
      }
    },
    
    _actionClick = function (e) {
      var
        activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), 
        activeItemIndex = _getItemIndex(activeItem), 
        targetItemIndex = e.target.getAttribute('data-slide-to');

      if (!(e.target.hasAttribute('data-slide-to') || e.target.classList.contains('feedback__slider-control'))) {
        return; 
      }
      if (e.target.hasAttribute('data-slide-to')) {
        if (activeItemIndex === targetItemIndex) {
          return;
        }
        _slide((targetItemIndex > activeItemIndex) ? 'next' : 'prev', activeItemIndex, targetItemIndex);
      } else {
        e.preventDefault();
        _slideTo(e.target.classList.contains('feedback__slider-control--next') ? 'next' : 'prev');
      }
    },
    
    _setupListeners = function () {
      _slider.addEventListener('click', _actionClick);
      if (_config.pause && _config.isCycling) {
        _slider.addEventListener('mouseenter', function (e) {
          clearInterval(_interval);
        });
        _slider.addEventListener('mouseleave', function (e) {
          clearInterval(_interval);
          _cycle();
        });
      }
    };

  for (var key in config) {
    if (key in _config) {
      _config[key] = config[key];
    }
  }
  _slider = (typeof _config.selector === 'string' ? document.querySelector(_config.selector) : _config.selector);
  _items = _slider.querySelectorAll('.' + ClassName.ITEM);
  _sliderIndicators = _slider.querySelectorAll('[data-slide-to]');
  _cycle();
  _setupListeners();

  return {
    next: function () { 
      _slideTo('next');
    },
    prev: function () { 
      _slideTo('prev');
    },
    stop: function () { 
      clearInterval(_interval);
    },
    cycle: function () { 
      clearInterval(_interval);
      _cycle();
    }
  }
}({
  selector: '.feedback__slider',
  isCycling: true,
  direction: 'next',
  interval: 5000,
  pause: true
}));