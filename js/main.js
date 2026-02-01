/* Accessible FAQ accordion
	 - Toggles panels and updates ARIA attributes
	 - Keyboard navigation: ArrowUp/ArrowDown/Home/End
	 - Respects prefers-reduced-motion
*/

(function () {
	'use strict';

	// Select all FAQ toggle buttons
	const buttons = Array.from(document.querySelectorAll('.faq__button'));
	if (!buttons.length) return; // safe no-op if markup not present

	// Utility: determine if user prefers reduced motion
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Open/close a panel tied to a button
	function toggle(button, expand) {
		const panelId = button.getAttribute('aria-controls');
		const panel = document.getElementById(panelId);
		if (!panel) return;

		const willExpand = typeof expand === 'boolean' ? expand : !(button.getAttribute('aria-expanded') === 'true');

		// If expanding, collapse any other open panels first (clean collapse without recursion)
		if (willExpand) {
			buttons.forEach((other) => {
				if (other === button) return;
				if (other.getAttribute('aria-expanded') === 'true') {
					const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
					other.setAttribute('aria-expanded', 'false');
					if (otherPanel) {
						otherPanel.setAttribute('aria-hidden', 'true');
						if (!reduceMotion) {
							otherPanel.style.maxHeight = otherPanel.scrollHeight + 'px';
							// force layout then collapse
							// eslint-disable-next-line @microsoft/sdl/no-document-read
							void otherPanel.offsetHeight;
							otherPanel.style.maxHeight = '0px';
							const onEnd = function () {
								otherPanel.hidden = true;
								otherPanel.style.maxHeight = '';
								otherPanel.removeEventListener('transitionend', onEnd);
							};
							otherPanel.addEventListener('transitionend', onEnd);
						} else {
							otherPanel.style.maxHeight = '0px';
							otherPanel.hidden = true;
						}
					}
				}
			});
		}

		// Update the target button/panel state
		button.setAttribute('aria-expanded', String(willExpand));
		panel.setAttribute('aria-hidden', String(!willExpand));
		if (willExpand) {
			panel.hidden = false;
			if (!reduceMotion) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
				const onExpandEnd = function () {
					panel.style.maxHeight = '';
					panel.removeEventListener('transitionend', onExpandEnd);
				};
				panel.addEventListener('transitionend', onExpandEnd);
			} else {
				panel.style.maxHeight = 'none';
			}
		} else {
			// collapse
			if (!reduceMotion) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
				// eslint-disable-next-line @microsoft/sdl/no-document-read
				void panel.offsetHeight;
				panel.style.maxHeight = '0px';
				const onCollapseEnd = function () {
					panel.hidden = true;
					panel.style.maxHeight = '';
					panel.removeEventListener('transitionend', onCollapseEnd);
				};
				panel.addEventListener('transitionend', onCollapseEnd);
			} else {
				panel.style.maxHeight = '0px';
				panel.hidden = true;
			}
		}
	}

	// Focus navigation helpers
	function focusNext(currentIndex) {
		const next = (currentIndex + 1) % buttons.length;
		buttons[next].focus();
	}
	function focusPrev(currentIndex) {
		const prev = (currentIndex - 1 + buttons.length) % buttons.length;
		buttons[prev].focus();
	}

	// Attach event handlers
	buttons.forEach((btn, idx) => {
		// Initialize panel ARIA state based on button
		const panelId = btn.getAttribute('aria-controls');
		const panel = document.getElementById(panelId);
		if (panel) {
			panel.setAttribute('aria-hidden', String(!(btn.getAttribute('aria-expanded') === 'true')));
			// ensure collapsed panels are hidden
			if (btn.getAttribute('aria-expanded') !== 'true') panel.hidden = true;
			else panel.hidden = false;
		}

		// Click toggles
		btn.addEventListener('click', (e) => {
			toggle(btn);
		});

		// Keyboard support
		btn.addEventListener('keydown', (e) => {
			/*
				Keyboard support per WAI-ARIA Authoring Practices:
				- ArrowUp/ArrowDown: move focus between buttons
				- Home/End: jump to first/last
				- Enter/Space: toggle the focused panel
			*/
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				focusNext(idx);
				return;
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				focusPrev(idx);
				return;
			}
			if (e.key === 'Home') {
				e.preventDefault();
				buttons[0].focus();
				return;
			}
			if (e.key === 'End') {
				e.preventDefault();
				buttons[buttons.length - 1].focus();
				return;
			}
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
				// Enter and Space toggle the panel; prevent default to avoid double-activation
				e.preventDefault();
				toggle(btn);
				return;
			}
		});
	});

	// Expose a small API for tests or future enhancements
	window.__FAQ = { toggle };

})();

