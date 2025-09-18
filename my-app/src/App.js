import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function JugadoresParticipantes({ Player1, Player2 }) {
  return (
    <div className="jugadores-participantes">
      <h3>Jugadores a Participar</h3>
      <ul>
        <li>{Player1}</li>
        <h2>VS</h2>
        <li>{Player2}</li>
      </ul>
    </div>
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

  // Renderizar el tablero 4x4
  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2, 3].map(row => (
        <div className="board-row" key={row}>
          {[0, 1, 2, 3].map(col => {
            const idx = row * 4 + col;
            return (
              <Square
                key={idx}
                value={squares[idx]}
                onSquareClick={() => handleClick(idx)}
              />
            );
          })}
        </div>
      ))}
    </>
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
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  // Estados para los jugadores y el formulario
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [aceptar, setAceptar] = useState(false);

  // Estados para el juego
  const [history, setHistory] = useState([Array(16).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [turno, setTurno] = useState(1);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setTurno(nextHistory.length);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setTurno(nextMove + 1);
  }

  function reiniciarJuego() {
    setPlayer1('');
    setPlayer2('');
    setAceptar(false);
    setHistory([Array(16).fill(null)]);
    setCurrentMove(0);
    setTurno(1);
  }

  function handleAceptar(e) {
    e.preventDefault();
    if (player1.trim() && player2.trim()) {
      setAceptar(true);
    }
  }

  function handleCancelar() {
    setPlayer1('');
    setPlayer2('');
    setAceptar(false);
    setHistory([Array(16).fill(null)]);
    setCurrentMove(0);
    setTurno(1);
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
    <div>
      {!aceptar ? (
        <form className="formulario" onSubmit={handleAceptar}>
          <h2>Ingrese los nombres de los Participantes: </h2>
          <input
            type="text"
            placeholder="Jugador 1"
            value={player1}
            onChange={e => setPlayer1(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Jugador 2"
            value={player2}
            onChange={e => setPlayer2(e.target.value)}
            required
          />
          <button type="submit">Aceptar</button>
          <button type="button" onClick={handleCancelar}>Cancelar</button>
        </form>
      ) : (
        <JugadoresParticipantes Player1={player1} Player2={player2} />
      )}

      {aceptar && (
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
      )}
    </div>
  );
}
