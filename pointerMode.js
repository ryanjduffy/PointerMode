(function () {
	var POINTER_HIDE = 1537;
	var POINTER_SHOW = 1536;

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

	window.addEventListener('keydown', function (ev) {
		clearTimeout(pointerTimeout);
		if (ev.keyCode !== POINTER_HIDE && ev.keyCode !== POINTER_SHOW) {
			hidePointer();
		}
	}, {capture: true});

	window.addEventListener('mousemove', function () {
		clearTimeout(pointerTimeout);
		if (pointerVisible) {
			pointerTimeout = setTimeout(hidePointer, 3000);
		} else {
			showPointer();
		}
	});
})();