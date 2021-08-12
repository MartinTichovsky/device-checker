export const isEmptyString = (value: string | null | undefined) =>
	!value || value.toString().trim() === "";

export const formatDate = (date: number | Date) => {
	if (typeof date !== "object") {
		date = new Date(date);
	}

	return isNaN(date.getTime())
		? undefined
		: date.toLocaleString(undefined, {
				day: "numeric",
				year: "numeric",
				month: "numeric",
				hour: "numeric",
				minute: "numeric",
		  });
};
