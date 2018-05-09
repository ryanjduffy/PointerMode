(function () {
	var POINTER_HIDE = 1537;
	var POINTER_SHOW = 1536;

	var enabled = false;
	var pointerTimeout = null;
	var pointerVisible = true;

	function sendKeyDown (keyCode) {
		const ev = new KeyboardEvent('keydown', {
			keyCode: keyCode,
			code: keyCode,
			bubbles: true,
			cancelable: true
		});

		document.dispatchEvent(ev);
	}

	function hidePointer () {
		if (!pointerVisible) return;

		pointerVisible = false;
		sendKeyDown(POINTER_HIDE);
	}

	function showPointer () {
		if (pointerVisible) return;

		pointerVisible = true;
		sendKeyDown(POINTER_SHOW);
	}

	function handleKeyDown (ev) {
		clearTimeout(pointerTimeout);
		if (ev.keyCode !== POINTER_HIDE && ev.keyCode !== POINTER_SHOW) {
			hidePointer();
		}
	}

	function handleMouseMove () {
		clearTimeout(pointerTimeout);
		if (pointerVisible) {
			pointerTimeout = setTimeout(hidePointer, 3000);
		} else {
			showPointer();
		}
	}

	function setEnabled (isEnabled) {
		if (enabled === isEnabled) return;

		enabled = isEnabled;

		if (!enabled) {
			clearTimeout(pointerTimeout);
		}

		var method = enabled ? 'addEventListener' : 'removeEventListener';
		window[method]('keydown', handleKeyDown, {capture: true});
		window[method]('mousemove', handleMouseMove);
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.type === 'PointerMode') {
			switch (request.action) {
				case 'Enable':
					setEnabled(request.enabled);
					break;
			}
		}
	});
})();