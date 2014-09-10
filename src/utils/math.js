// from https://github.com/useflashpunk/FlashPunk/blob/master/net/flashpunk/FP.as
/* global M */
M.clamp = function(value, min, max) {
	if (max > min) {
		if (value < min) return min;
		else if (value > max) return max;
		else return value;
	} else {
		// Min/max swapped
		if (value < max) return max;
		else if (value > min) return min;
		else return value;
	}
};
M.addStepTo = function(from, step, to) {
	from += step;
	if (step < 0) {
		if (from < to) from = to;
	} else {
		if (from > to) from = to;
	}
	return from;
};
M.lerp = function(a, b ,t) {
	return a + t * (b - a);
};
M.rand = function(value) {
	return this.sc = M.floor(M.random() * value);
};