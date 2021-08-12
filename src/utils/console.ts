const consoleLogEnabled = process.env.REACT_APP_CONSOLE_LOG === "true";

export const consoleLog = (
	message: unknown,
	type: "error" | "info" | "log" = "error"
) => {
	if (consoleLogEnabled) {
		switch (type) {
			case "error":
				console.error(message);
				return;
			case "info":
				console.info(message);
				return;
			case "log":
				console.log(message);
				return;
		}
	}
};
