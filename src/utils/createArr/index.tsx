export const createJsonFromArray = (arr: any, minBound: any, maxBound: any, divisions: any) => {
	const rangeWidth = (maxBound - minBound) / divisions;

	// Initialize an object to store the counts for each range
	const rangeCounts: any = {};
	for (let i = 0; i < divisions; i++) {
		const lowerBound = minBound + i * rangeWidth;
		const upperBound = minBound + (i + 1) * rangeWidth;
		rangeCounts[`${lowerBound.toFixed(1)}-${upperBound.toFixed(1)}`] = 0;
	}

	// Iterate through the array and count the occurrences in the corresponding range
	arr.forEach((num: any) => {
		for (let i = 0; i < divisions; i++) {
		  const lowerBound = minBound + i * rangeWidth;
		  const upperBound = minBound + (i + 1) * rangeWidth;
		  if (lowerBound <= num && num < upperBound) {
		    rangeCounts[`${lowerBound.toFixed(1)}-${upperBound.toFixed(1)}`]++;
		    break;
		  }
		}
	});
  return rangeCounts;
}