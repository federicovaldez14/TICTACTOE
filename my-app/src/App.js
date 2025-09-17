import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function appNames() {
  return ['Tic Tac Toe', 'Connect Four', 'Chess'];
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");
  const [Aceptar, Cancelar] = useState(false);
}

const handleAceptar = (aa) => {
    aa.preventDefault();
    // Evita el comportamiento que puede llegar a tener predeterminadamente el comportamiento de formularios del html con la funcion de que react no cargue si no que lo controle al darle aceptar al formulario.
    Aceptar(true);
  };

const handleCancelar = (bb) => {
  setPlayer1("");
  setPlayer2("");
  Cancelar(true);
}

  {(!Aceptar) ? 
    <form onSubmit={handleAceptar}>
      <h2>Ingrese los nombres de los Participantes: </h2>
      <input
        type="Name"
        placeholder="Jugador 1"
        value={Player1}
        onChange={(aa) => setPlayer1(aa.target.value)}
      />
      <input
        type="Name"
        placeholder="Jugador 2"
        value={Player2}
        onChange={(aa) => setPlayer2(aa.target.value)}
      />
      <button type="submit">Aceptar</button>
      <button type="button" onClick={handleCancelar}>Cancelar</button>
    </form>
  }
  {(!Cancelar)?<JugadoresParticipantes Player1={Player1} Player2={Player2} /> : null}

function JugadoresParticipantes({ Player1, Player2 }) {
  return (
    <>
      <h3>Jugadores a Participar</h3>
      <ul>
        <li>{Player1}</li>
        <h2>VS</h2>
        <li>{Player2}</li>
      </ul>
    </>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      </div>
      <div className="board-row">
        
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      </div>
      <div className="board-row">
        
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
      </div>
      <div className="board-row">
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
      </div>
    </>
  );
}

function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  setTurno(turno + 1);
}

function reiniciarJuego() {
  setHistory([Array(16).fill(null)]); 
  setCurrentMove(0);                  
  setTurno(1);                        
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [turno, setTurno] = useState(1);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir al movimiento #' + move;
    } else {
      description = 'Ir al inicio del juego';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <p>Turno actual: {turno}</p>
        <button onClick={reiniciarJuego}>Reiniciar juego</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10,15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}
