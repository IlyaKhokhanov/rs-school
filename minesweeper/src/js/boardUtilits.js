export function checkForPlaint(matrix, x, y, randomX, randomY) {
  return (
    matrix[y]?.[x] !== matrix[randomY]?.[randomX] &&
    matrix[y - 1]?.[x - 1] !== matrix[randomY]?.[randomX] &&
    matrix[y - 1]?.[x] !== matrix[randomY]?.[randomX] &&
    matrix[y - 1]?.[x + 1] !== matrix[randomY]?.[randomX] &&
    matrix[y]?.[x - 1] !== matrix[randomY]?.[randomX] &&
    matrix[y]?.[x + 1] !== matrix[randomY]?.[randomX] &&
    matrix[y + 1]?.[x - 1] !== matrix[randomY]?.[randomX] &&
    matrix[y + 1]?.[x] !== matrix[randomY]?.[randomX] &&
    matrix[y + 1]?.[x + 1] !== matrix[randomY]?.[randomX]
  );
}

export function getNearbyCells(matrix, x, y) {
  const cell1 = matrix[y - 1]?.[x - 1];
  const cell2 = matrix[y - 1]?.[x];
  const cell3 = matrix[y - 1]?.[x + 1];
  const cell4 = matrix[y]?.[x - 1];
  const cell5 = matrix[y]?.[x + 1];
  const cell6 = matrix[y + 1]?.[x - 1];
  const cell7 = matrix[y + 1]?.[x];
  const cell8 = matrix[y + 1]?.[x + 1];

  return [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];
}
