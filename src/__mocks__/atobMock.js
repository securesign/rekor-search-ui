const atobMock = () => {
	window.atob = jest.fn().mockImplementation(str => {
		// console.log(`Decoding: ${str}, Result: ${Buffer.from(str, "base64").toString("utf-8")}`);

		return Buffer.from(str, "base64").toString("utf-8");
	});
};

export default atobMock;
