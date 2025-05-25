export async function applyStealth(context) {
	await context.grantPermissions(['notifications']);

	await context.addInitScript(() => {
		Object.defineProperty(navigator, 'webdriver', { get: () => false });
		window.chrome = { runtime: {} };
		Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
		Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });

		const getParameter = WebGLRenderingContext.prototype.getParameter;
		WebGLRenderingContext.prototype.getParameter = function (parameter) {
			if (parameter === 37445) return 'Intel Inc.';
			if (parameter === 37446) return 'Intel Iris OpenGL Engine';
			return getParameter.call(this, parameter);
		};

		const toDataURL = HTMLCanvasElement.prototype.toDataURL;
		HTMLCanvasElement.prototype.toDataURL = function (...args) {
			const context = this.getContext('2d');
			const shift = { r: 1, g: 1, b: 1, a: 0 };
			const width = this.width;
			const height = this.height;
			const imageData = context.getImageData(0, 0, width, height);

			for (let i = 0; i < height; i++) {
				for (let j = 0; j < width; j++) {
					const n = ((i * (width * 4)) + (j * 4));
					imageData.data[n + 0] += shift.r;
					imageData.data[n + 1] += shift.g;
					imageData.data[n + 2] += shift.b;
					imageData.data[n + 3] += shift.a;
				}
			}
			context.putImageData(imageData, 0, 0);
			return toDataURL.apply(this, args);
		};

		const originalIntl = Intl.DateTimeFormat.prototype.resolvedOptions;
		Intl.DateTimeFormat.prototype.resolvedOptions = function () {
			const options = originalIntl.apply(this, arguments);
			options.timeZone = 'Europe/London';
			return options;
		};
	});
}
