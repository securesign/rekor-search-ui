const atobMock = () => {
	window.atob = jest.fn().mockImplementation(str => {
		const decoded = Buffer.from(str, "base64").toString("utf-8");
		console.log(`Decoding: ${str}, Result: ${decoded}`);

		return decoded;
	});
};

export default atobMock;
