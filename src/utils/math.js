// from https://github.com/useflashpunk/FlashPunk/blob/master/net/flashpunk/FP.as
/* global M */
M.rand = function(value) {
	return this.sc = M.floor(M.random() * value);
};