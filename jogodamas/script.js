// Pegando os elementos HTML
const boardElement = document.getElementById('board');
const turnText = document.getElementById('turn');
const resetBtn = document.getElementById('reset');

// Variáveis do jogo
let board = [];          // Tabuleiro em forma de matriz 8x8
let selected = null;     // Peça atualmente selecionada
let currentPlayer = 'blue'; // Jogador inicial


function createInitialBoard() {
  // Cria uma matriz 8x8 preenchida com null
  board = Array.from({ length: 8 }, () => Array(8).fill(null));

  // Adiciona peças vermelhas nas 3 primeiras linhas
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1) // só coloca em casas escuras
        board[r][c] = { player: 'red', king: false };
    }
  }

  // Adiciona peças azuis nas últimas 3 linhas
  for (let r = 5; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1)
        board[r][c] = { player: 'blue', king: false };
    }
  }
}

function drawBoard() {
  boardElement.innerHTML = ''; // limpa tabuleiro antes de redesenhar

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {

      // Cria uma casa
      const cell = document.createElement('div');

      // Define cor da casa (clara ou escura)
      cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light' : 'dark');

      // Guarda linha e coluna como atributos
      cell.dataset.row = r;
      cell.dataset.col = c;

      // Se esta célula é a selecionada, marca visualmente
      if (selected && selected.r == r && selected.c == c) {
        cell.classList.add('selected');
      }

      // Se existe peça nessa posição
      const piece = board[r][c];
      if (piece) {
        const el = document.createElement('div');
        el.className = `piece ${piece.player} ${piece.king ? 'king' : ''}`;
        el.textContent = piece.king ? 'KING' : ''; // escreve KING se for dama
        cell.appendChild(el);
      }

      // Ao clicar em uma casa chama handleClick
      cell.addEventListener('click', () => handleClick(r, c));

      boardElement.appendChild(cell);
    }
  }
}

// Verifica se uma posição está dentro do tabuleiro
function inside(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

// Verifica se um movimento é permitido
function canMove(fromR, fromC, toR, toC) {
  const piece = board[fromR][fromC];

  // Se não tem peça ou não é do jogador atual: não pode mover
  if (!piece || piece.player !== currentPlayer) return false;

  // Se a casa destino já tem peça: não pode
  if (board[toR][toC] !== null) return false;

  const dr = toR - fromR;     // diferença de linha
  const dc = Math.abs(toC - fromC); // diferença de coluna

  // Movimentos válidos só podem ser 1 ou 2 casas (andar ou capturar)
  if (dc !== 1 && dc !== 2) return false;

  // Direção do movimento (azul sobe, vermelho desce)
  const dir = piece.player === 'blue' ? -1 : 1;

  // Peça normal (não é rei)
  if (!piece.king) {

    // movimento simples
    if (dc === 1 && dr === dir) return true;

    // movimento de captura
    if (dc === 2 && dr === dir * 2) {
      const midR = (fromR + toR) / 2; // peça do meio
      const midC = (fromC + toC) / 2;
      const midPiece = board[midR][midC];

      // só permite se estiver capturando peça inimiga
      if (midPiece && midPiece.player !== piece.player) return true;
    }

  } else {
    // Rei pode andar para qualquer lado

    if (Math.abs(dr) === 1 && dc === 1) return true; // movimento simples rei

    if (Math.abs(dr) === 2 && dc === 2) { // captura rei
      const midR = (fromR + toR) / 2;
      const midC = (fromC + toC) / 2;
      const midPiece = board[midR][midC];

      if (midPiece && midPiece.player !== piece.player) return true;
    }
  }

  return false;
}

// Move a peça e aplica regras de captura e virar rei
function movePiece(fromR, fromC, toR, toC) {
  const piece = board[fromR][fromC];

  board[fromR][fromC] = null; // remove da posição antiga
  board[toR][toC] = piece;    // coloca na nova posição

  // Se movimento foi captura (2 casas)
  if (Math.abs(toR - fromR) === 2) {
    const midR = (fromR + toR) / 2;
    const midC = (fromC + toC) / 2;
    board[midR][midC] = null; // remove peça capturada
  }

  // Transforma em rei ao chegar no final do tabuleiro
  if (piece.player === 'blue' && toR === 0) piece.king = true;
  if (piece.player === 'red' && toR === 7) piece.king = true;

  // Troca jogador da vez
  currentPlayer = currentPlayer === 'blue' ? 'red' : 'blue';
  turnText.textContent = `Vez do ${currentPlayer === 'blue' ? 'Azul' : 'Vermelho'}`;
}

// ----------------------------------------------
// Controle de clique do usuário
// ----------------------------------------------
function handleClick(r, c) {

  // Se nenhuma peça está selecionada ainda
  if (!selected) {

    // Só permite selecionar peça do jogador da vez
    if (board[r][c] && board[r][c].player === currentPlayer) {
      selected = { r, c }; // marca como selecionada
    }

  } else {
    // Se já existe peça selecionada, tenta mover

    if (canMove(selected.r, selected.c, r, c)) {
      movePiece(selected.r, selected.c, r, c);
    }

    selected = null; // limpa seleção
  }

  drawBoard(); // redesenha tabuleiro
}

// Botão de reiniciar o jogo
resetBtn.addEventListener('click', () => {
  currentPlayer = 'blue'; // azul começa
  turnText.textContent = 'Vez do Azul';
  createInitialBoard();  // recria tabuleiro
  drawBoard();           // redesenha
});

// Inicializa o jogo ao abrir a página
createInitialBoard();
drawBoard();


drawBoard();

