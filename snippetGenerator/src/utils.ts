export const toPascalCase = (input: string) => {
	const asWords = splitToWords(input);
	let result = '';
	asWords?.forEach((word: string) => {
		result += word.substr(0,1).toUpperCase() + word.substr(1).toLowerCase();
	});

	return result;
};

export const splitToWords = (input: string) => {
	const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
	return input.match(regex);
};