const Velocity = require('velocity-animate')
import { findParent } from 'utility/dist'

const Toggle = ({
	toggleSelector = '[data-toggle]',
	parentClass = null,
	parentOpenClass = null,
	targetClass = null,
	closeAnimation = 'slideUp',
	openAnimation = 'slideDown',
	duration = 200
	}) => {
	const toggleNodes = document.querySelectorAll(toggleSelector)

	if (toggleNodes.length) {
		const toggles = [...toggleNodes]

		toggles.map(toggle => {
			parentClass = parentClass || toggle.getAttribute('data-toggle-parent-class')
			const parent = parentClass !== null ? findParent.withClass(toggle, parentClass) : null
			if (!parent) return

			parentOpenClass = parentOpenClass || `${parentClass}--open`
			const target = parent.querySelector(targetClass || toggle.getAttribute('data-toggle'))
			if (!target) return

			Velocity(target, closeAnimation, { duration: 0 })

			toggle.addEventListener('click', e => {
				e.preventDefault

				const animation = parent.classList.contains(parentOpenClass) ? closeAnimation : openAnimation
				const toggleAltText = toggle.getAttribute('data-toggle-alt-text') ? toggle.getAttribute('data-toggle-alt-text') : null
				const toggleText = toggle.innerHTML

				Velocity(target, animation, { duration })
				if (toggleAltText !== null) {
					toggle.innerHTML = toggleAltText
					toggle.setAttribute('data-toggle-alt-text', toggleText)
				}
				parent.classList.toggle(parentOpenClass)
			}, false)
		})
	}
}

module.exports = Toggle
