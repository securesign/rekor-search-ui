const atobMock = () => {
	window.atob = jest.fn().mockImplementation(str => {
		const base64Pattern =
			/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

		if (!base64Pattern.test(str)) {
			// return if string is not base64 encoded
			return str;
		}

		return Buffer.from(str, "base64").toString("utf-8");
	});

	// window.atob = jest.fn().mockImplementation(str => {
	// 	// console.log(`Decoding: ${str}, Result: ${Buffer.from(str, "base64").toString("utf-8")}`);
	//
	// 	return Buffer.from(str, "base64").toString("utf-8");
	// });
};

export default atobMock;
