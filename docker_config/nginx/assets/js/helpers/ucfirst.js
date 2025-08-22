function ucfirst(string) {
    let error = new TypeError(
        `You did not pass a string : ${string} is not a string`
    );

    if (string && typeof string === 'string' && Number.isNaN(Number(string))) {
        if (typeof Number(string.charAt(0)) === 'number') {
            error.message = `Call is useless : ${string.charAt(0)} is not a string`;
        }
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    throw error;
}

export { ucfirst };
