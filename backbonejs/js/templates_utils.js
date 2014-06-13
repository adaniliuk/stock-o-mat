var styleConfig = {
	colorStyle: {
		positive: 'text-success',
		negative: 'text-danger'
	}
};

function getPriceStyle(change) {
	if (change >= 0) {
		return styleConfig.colorStyle.positive;
	} else {
		return styleConfig.colorStyle.negative;
	}			
}

function htmlEncode(value) {
	return $('<div/>').text(value).html();
}
