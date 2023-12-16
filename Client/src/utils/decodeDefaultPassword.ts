const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

export function decodeDefaultPassword(
	firstName: string,
	lastName: string,
	indexNumber: number
) {
	const generatedPassword = `${firstName.substr(0, 3)}${lastName.substr(0, 3)}${
		indexNumber % 10
	}${indexNumber % 13}${indexNumber % 17}${
		specialCharacters[indexNumber % 10]
	}`;
	return generatedPassword;
}
