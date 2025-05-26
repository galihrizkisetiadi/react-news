export default function Soal2(str: string) {
	const words = str.split(/\s+/);

	words.sort((a, b) => b.length - a.length);

	return words[0];
}
