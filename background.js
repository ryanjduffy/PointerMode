var enabled = true;

function notifyEnabled (id) {
	chrome.tabs.sendMessage(id, {
		type: 'PointerMode',
		action: 'Enable',
		enabled: enabled
	});
}

chrome.browserAction.onClicked.addListener(function () {
	enabled = !enabled;

	var icon = enabled ? 'icon' : 'icon-disabled';
	chrome.browserAction.setIcon({
		path: {
			'16': 'images/' + icon + '16.png',
			'24': 'images/' + icon + '24.png',
			'32': 'images/' + icon + '32.png'
		}
	}, function () {
		console.log('setIcon', arguments);
	});

	chrome.tabs.query({}, function(tabs) {
		tabs.map(function (tab) {
			return tab.id;
		}).forEach(notifyEnabled);
	});
});

chrome.tabs.onCreated.addListener(notifyEnabled);
chrome.tabs.onUpdated.addListener(notifyEnabled);