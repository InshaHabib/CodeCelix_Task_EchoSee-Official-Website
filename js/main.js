/* Accessible FAQ accordion
	 - Toggles panels and updates ARIA attributes
	 - Keyboard navigation: ArrowUp/ArrowDown/Home/End
	 - Respects prefers-reduced-motion
*/

(function () {
	'use strict';

	// Screen reader live announcer
	let announcer = null;
	function announceToScreenReader(message) {
		if (!announcer) {
			announcer = document.getElementById('a11y-announcer');
		}
		if (announcer) {
			announcer.textContent = '';
			setTimeout(() => {
				announcer.textContent = message;
			}, 100);
		}
	}

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

		// Determine if we should expand or collapse
		const willExpand = typeof expand === 'boolean' ? expand : !(button.getAttribute('aria-expanded') === 'true');

		// If expanding, collapse other open panels
		if (willExpand) {
			buttons.forEach((other) => {
				if (other === button) return;
				if (other.getAttribute('aria-expanded') === 'true') {
					const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
					collapsePanel(other, otherPanel);
				}
			});
		}

		// Toggle the target panel
		if (willExpand) {
			expandPanel(button, panel);
		} else {
			collapsePanel(button, panel);
		}
	}

	// Helper: expand a panel
	function expandPanel(button, panel) {
		button.setAttribute('aria-expanded', 'true');
		panel.setAttribute('aria-hidden', 'false');
		// Announce to screen readers
		const question = button.textContent.trim();
		announceToScreenReader(question + '. Answer expanded.');
		panel.hidden = false;
		if (!reduceMotion) {
			panel.style.maxHeight = panel.scrollHeight + 'px';
			panel.addEventListener('transitionend', function onEnd() {
				panel.style.maxHeight = 'none';
				panel.removeEventListener('transitionend', onEnd);
			});
		} else {
			panel.style.maxHeight = 'none';
		}
	}

	// Helper: collapse a panel
	function collapsePanel(button, panel) {
		button.setAttribute('aria-expanded', 'false');
		panel.setAttribute('aria-hidden', 'true');
		// Announce to screen readers
		const question = button.textContent.trim();
		announceToScreenReader(question + '. Answer collapsed.');
		if (!reduceMotion) {
			const h = panel.scrollHeight;
			panel.style.maxHeight = h + 'px';
			// eslint-disable-next-line @microsoft/sdl/no-document-read
			void panel.offsetHeight; // force layout
			panel.style.maxHeight = '0px';
			panel.addEventListener('transitionend', function onEnd() {
				panel.hidden = true;
				panel.style.maxHeight = '';
				panel.removeEventListener('transitionend', onEnd);
			});
		} else {
			panel.style.maxHeight = '0px';
			panel.hidden = true;
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

/* Accessible Contact Form
	 - Floating labels with CSS :placeholder-shown
	 - Real-time validation with ARIA
	 - Loading and success animations
	 - Keyboard accessible
*/

(function() {
	'use strict';
	
	const form = document.getElementById('contact-form');
	if (!form) return;
	
	const submitBtn = form.querySelector('.contact__submit');
	const successMessage = document.getElementById('form-success');
	
	// Field configurations
	const fields = {
		name: {
			element: form.querySelector('#name'),
			error: form.querySelector('#name-error'),
			required: true,
			pattern: null,
			errorMessage: 'Please enter your full name'
		},
		email: {
			element: form.querySelector('#email'),
			error: form.querySelector('#email-error'),
			required: true,
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			errorMessage: 'Please enter a valid email address'
		},
		subject: {
			element: form.querySelector('#subject'),
			error: form.querySelector('#subject-error'),
			required: true,
			pattern: null,
			errorMessage: 'Please select a subject'
		},
		message: {
			element: form.querySelector('#message'),
			error: form.querySelector('#message-error'),
			required: true,
			pattern: null,
			errorMessage: 'Please enter your message',
			minLength: 10
		}
	};
	
	// Validate a single field
	function validateField(fieldName) {
		const field = fields[fieldName];
		const element = field.element;
		const errorEl = field.error;
		let isValid = true;
		let errorText = '';
		
		// Check required
		if (field.required && !element.value.trim()) {
			isValid = false;
			errorText = field.errorMessage;
		}
		
		// Check pattern
		if (isValid && field.pattern && !field.pattern.test(element.value.trim())) {
			isValid = false;
			errorText = field.errorMessage;
		}
		
		// Check min length for textarea
		if (isValid && field.minLength && element.value.trim().length < field.minLength) {
			isValid = false;
			errorText = `Message must be at least ${field.minLength} characters`;
		}
		
		// Update ARIA and visual state
		element.setAttribute('aria-invalid', String(!isValid));
		errorEl.textContent = errorText;
		
		return isValid;
	}
	
	// Real-time validation on blur
	Object.keys(fields).forEach(fieldName => {
		const field = fields[fieldName];
		field.element.addEventListener('blur', () => {
			validateField(fieldName);
		});
		
		// Clear error on input
		field.element.addEventListener('input', () => {
			if (field.element.getAttribute('aria-invalid') === 'true') {
				validateField(fieldName);
			}
		});
	});
	
	// Form submission
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		
		// Validate all fields
		let isFormValid = true;
		let firstInvalidField = null;
		
		Object.keys(fields).forEach(fieldName => {
			const isValid = validateField(fieldName);
			if (!isValid && !firstInvalidField) {
				firstInvalidField = fields[fieldName].element;
				isFormValid = false;
			}
		});
		
		if (!isFormValid) {
			// Focus first invalid field
			if (firstInvalidField) {
				firstInvalidField.focus();
			}
			// Announce to screen reader
			const announcer = document.getElementById('a11y-announcer');
			if (announcer) {
				announcer.textContent = 'Please correct the errors in the form';
			}
			return;
		}
		
		// Show loading state
		submitBtn.classList.add('loading');
		submitBtn.disabled = true;
		submitBtn.setAttribute('aria-busy', 'true');
		
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		// Show success message
		form.hidden = true;
		successMessage.hidden = false;
		
		// Announce to screen reader
		const announcer = document.getElementById('a11y-announcer');
		if (announcer) {
			announcer.textContent = 'Form submitted successfully. We will get back to you soon.';
		}
	});
	
})();

