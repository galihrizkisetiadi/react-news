export default function Soal2(matrix: number[][]) {
	const n = matrix.length;
	let firstTotal = 0;
	let secondTotal = 0;

	for (let i = 0; i < n; i++) {
		firstTotal += matrix[i][i];
		secondTotal += matrix[i][n - 1 - i];
	}

	return firstTotal - secondTotal;
}
