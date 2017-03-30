'use strict';

var _dist = require('utility/dist');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Velocity = require('velocity-animate');


var Toggle = function Toggle(_ref) {
	var _ref$toggleSelector = _ref.toggleSelector,
	    toggleSelector = _ref$toggleSelector === undefined ? '[data-toggle]' : _ref$toggleSelector,
	    _ref$parentClass = _ref.parentClass,
	    parentClass = _ref$parentClass === undefined ? null : _ref$parentClass,
	    _ref$parentOpenClass = _ref.parentOpenClass,
	    parentOpenClass = _ref$parentOpenClass === undefined ? null : _ref$parentOpenClass,
	    _ref$targetClass = _ref.targetClass,
	    targetClass = _ref$targetClass === undefined ? null : _ref$targetClass,
	    _ref$closeAnimation = _ref.closeAnimation,
	    closeAnimation = _ref$closeAnimation === undefined ? 'slideUp' : _ref$closeAnimation,
	    _ref$openAnimation = _ref.openAnimation,
	    openAnimation = _ref$openAnimation === undefined ? 'slideDown' : _ref$openAnimation,
	    _ref$duration = _ref.duration,
	    duration = _ref$duration === undefined ? 200 : _ref$duration;

	var toggleNodes = document.querySelectorAll(toggleSelector);

	if (toggleNodes.length) {
		var toggles = [].concat(_toConsumableArray(toggleNodes));

		toggles.map(function (toggle) {
			parentClass = parentClass || toggle.getAttribute('data-toggle-parent-class');
			var parent = parentClass !== null ? _dist.findParent.withClass(toggle, parentClass) : null;
			if (!parent) return;

			parentOpenClass = parentOpenClass || parentClass + '--open';
			var target = parent.querySelector(targetClass || toggle.getAttribute('data-toggle'));
			if (!target) return;

			Velocity(target, closeAnimation, { duration: 0 });

			toggle.addEventListener('click', function (e) {
				e.preventDefault;

				var animation = parent.classList.contains(parentOpenClass) ? closeAnimation : openAnimation;
				var toggleAltText = toggle.getAttribute('data-toggle-alt-text') ? toggle.getAttribute('data-toggle-alt-text') : null;
				var toggleText = toggle.innerHTML;

				Velocity(target, animation, { duration: duration });
				if (toggleAltText !== null) {
					toggle.innerHTML = toggleAltText;
					toggle.setAttribute('data-toggle-alt-text', toggleText);
				}
				parent.classList.toggle(parentOpenClass);
			}, false);
		});
	}
};

module.exports = Toggle;