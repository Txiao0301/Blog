import { theme } from 'antd';
import React, { useState } from 'react';
import Board from './board';
import Popup from '../../../config/popup/index';
import './index.css';

export default function TicTacToeGame() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [description, setDescription] = useState('Start');
  const [start, setStart] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false); // 新增弹窗状态

  function handlePlay(nextSquares: Array<string | null>) {
    if (!start) {
      return;
    }
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    if (nextHistory.length > 1) {
    } else {
      setDescription('Start');
    }
  }

  function moveBack() {
    if (currentMove > 0) {
      setCurrentMove(history.length - 2);
      history.pop();
      setHistory([...history]);
    }
  }

  function startGame() {
    setStart(true);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setDescription('Move');
  }

  function resetGame() {
    setShowResetModal(true); // 显示弹窗
  }

  function confirmResetGame() {
    setStart(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setDescription('Start');
    setShowResetModal(false); // 关闭弹窗
  }

  function cancelResetGame() {
    setShowResetModal(false);
  }

  function gameInfo() {
    if (!start) {
      return <div className="game-info">
        <ol><button onClick={() => startGame()}>{description}</button></ol>
      </div>
    }
    return <div className="game-info">
      <ol>
        <button onClick={() => moveBack()}>{description}</button>
        <button onClick={resetGame} style={{ marginLeft: 8 }}>重置</button>
      </ol>
    </div>
  }

  return (
    <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} resetGame={resetGame} />
        </div>
        <div className="game-info">
          {gameInfo()}
        </div>
        <Popup
          showModal={showResetModal}
          content="确定要重置游戏吗？"
          confirm={confirmResetGame}
          cancel={cancelResetGame}
        />
      </div>
    </div>
  );
}