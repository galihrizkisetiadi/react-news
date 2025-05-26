export default function Soal1(str: string) {
	const letters = str
		.match(/[A-Za-z]/g)
		?.reverse()
		.toString()
		.replaceAll(",", "");
	const numbers = str.match(/[0-9]/g)?.toString().replaceAll(",", "");

	const output = letters?.concat("", numbers as string);

	return output;
}
