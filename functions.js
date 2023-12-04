document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const restartButton = document.getElementById('restartButton');
    const welcomeText = document.getElementById('welcomeText');
    const numRows = 5;
    const numCols = 5;
    let currentPlayer = 'player1';
    let gameActive = true;
  
    function createCell(row, col) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      return cell;
    }
  
    function createRow(row) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      for (let col = 0; col < numCols; col++) {
        const cell = createCell(row, col);
        rowElement.appendChild(cell);
      }
      return rowElement;
    }
  
    function handleCellClick(event) {
      if (!gameActive) return;
  
      const cell = event.target;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      dropPiece(row, col);
  
      if (checkWinner(row, col)) {
        showWinner();
        gameActive = false;
        return; // No continuar si ya hay un ganador
      }
  
      switchPlayer();
    }
  
    function dropPiece(row, col) {
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      if (!cell.classList.contains('player1') && !cell.classList.contains('player2')) {
        cell.classList.add(currentPlayer);
      }
    }
  
    function switchPlayer() {
      currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    }
  
    function checkWinner(row, col) {
      return (
        checkDirection(row, col, 0, 1) || // Horizontal
        checkDirection(row, col, 1, 0) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
      );
    }
  
    function checkDirection(row, col, rowDir, colDir) {
      const playerClass = currentPlayer === 'player1' ? 'player1' : 'player2';
      let count = 1; // Iniciar con 1 para contar la celda actual
  
      // Verificar hacia adelante
      for (let i = 1; i < 5; i++) {
        const newRow = row + rowDir * i;
        const newCol = col + colDir * i;
        const cell = document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`);
        if (cell && cell.classList.contains(playerClass)) {
          count++;
        } else {
          break;
        }
      }
  
      // Verificar hacia atrás
      for (let i = 1; i < 5; i++) {
        const newRow = row - rowDir * i;
        const newCol = col - colDir * i;
        const cell = document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`);
        if (cell && cell.classList.contains(playerClass)) {
          count++;
        } else {
          break;
        }
      }
  
      return count >= 5;
    }
  
    function showWinner() {
      const winnerMessage = document.createElement('div');
      winnerMessage.classList.add('winner-message');
      winnerMessage.textContent = `${currentPlayer} ha ganado. ¡Felicidades!`;
  
      document.body.appendChild(winnerMessage);
    }
  
    function resetBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.classList.remove('player1', 'player2'));
      currentPlayer = 'player1';
      gameActive = true;
  
      // Eliminar el mensaje de ganador si existe
      const winnerMessage = document.querySelector('.winner-message');
      if (winnerMessage) {
        winnerMessage.remove();
      }
    }
  
    function init() {
      for (let row = 0; row < numRows; row++) {
        const rowElement = createRow(row);
        board.appendChild(rowElement);
      }
  
      // Añadir botón de reinicio
      restartButton.addEventListener('click', resetBoard);
    }
  
    init();
  });
  