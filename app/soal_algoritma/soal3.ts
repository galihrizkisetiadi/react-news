export default function Soal2(input: string[], query: string[]) {
	const inputFrequency: { [key: string]: number } = {};

	input.forEach((elInput) => {
		inputFrequency[elInput] = (inputFrequency[elInput] || 0) + 1;
	});

	const output = query.map((elQuery) => inputFrequency[elQuery] || 0);

	return output;
}
