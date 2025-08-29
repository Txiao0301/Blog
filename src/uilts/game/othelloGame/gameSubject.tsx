import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import OthelloBoard, { createEmptyBoard } from './OthelloBoard/index';
import OthelloControls from './OthelloControls/index';
import { PlayerColors, OppositeColor } from './othelloUtils';

// 主体组件
const ReversiGame: React.FC = () => {
    const BoardSize = 8;

    const [board, setBoard] = useState(createEmptyBoard(BoardSize));
    const [currentPlayer, setCurrentPlayer] = useState(PlayerColors.BLACK);
    const [scores, setScores] = useState({ B: 2, W: 2 });
    const [gameOver, setGameOver] = useState(false);
    const [hints, setHints] = useState<string[]>([]);

    // 初始化棋盘
    useEffect(() => {
        restartGame();
        // eslint-disable-next-line
    }, []);

    // 检查是否有效落子
    const isValidMove = useCallback((board: (string | null)[][], row: number, col: number, player: string) => {
        if (board[row][col] !== null) return false;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (const [dr, dc] of directions) {
            let r = row + dr, c = col + dc, foundOpponent = false;
            while (r >= 0 && r < BoardSize && c >= 0 && c < BoardSize) {
                if (board[r][c] === null) break;
                if (board[r][c] === OppositeColor[player]) {
                    foundOpponent = true;
                } else if (board[r][c] === player) {
                    if (foundOpponent) return true;
                    break;
                } else break;
                r += dr; c += dc;
            }
        }
        return false;
    }, []);

    // 更新提示
    const updateHints = useCallback((board: (string | null)[][], player: string) => {
        const newHints: string[] = [];
        for (let row = 0; row < BoardSize; row++) {
            for (let col = 0; col < BoardSize; col++) {
                if (isValidMove(board, row, col, player)) {
                    newHints.push(`${row}-${col}`);
                }
            }
        }
        setHints(newHints);
        return newHints;
    }, [isValidMove]);

    // 落子
    const makeMove = (row: number, col: number) => {
        if (board[row][col] !== null || !isValidMove(board, row, col, currentPlayer) || gameOver) return;
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = currentPlayer;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (const [dr, dc] of directions) {
            let flipStack: [number, number][] = [];
            let r = row + dr, c = col + dc;
            while (r >= 0 && r < BoardSize && c >= 0 && c < BoardSize) {
                if (newBoard[r][c] === OppositeColor[currentPlayer]) {
                    flipStack.push([r, c]);
                } else if (newBoard[r][c] === currentPlayer) {
                    flipStack.forEach(([fr, fc]) => { newBoard[fr][fc] = currentPlayer; });
                    break;
                } else break;
                r += dr; c += dc;
            }
        }
        setBoard(newBoard);
        // 计算分数
        const blackCount = newBoard.flat().filter(cell => cell === PlayerColors.BLACK).length;
        const whiteCount = newBoard.flat().filter(cell => cell === PlayerColors.WHITE).length;
        setScores({ B: blackCount, W: whiteCount });
        // 切换玩家
        const nextPlayer = OppositeColor[currentPlayer];
        setCurrentPlayer(nextPlayer);
        // 检查下一个玩家是否有合法移动
        const nextHints = updateHints(newBoard, nextPlayer);
        if (nextHints.length === 0) {
            // 检查对手是否也无合法移动
            const otherHints = updateHints(newBoard, OppositeColor[nextPlayer]);
            if (otherHints.length === 0) setGameOver(true);
        }
    };

    // 重新开始
    const restartGame = useCallback(() => {
        const newBoard = createEmptyBoard(BoardSize);
        const center = BoardSize / 2 - 1;
        newBoard[center][center] = PlayerColors.WHITE;
        newBoard[center][center + 1] = PlayerColors.BLACK;
        newBoard[center + 1][center] = PlayerColors.BLACK;
        newBoard[center + 1][center + 1] = PlayerColors.WHITE;
        setBoard(newBoard);
        setCurrentPlayer(PlayerColors.BLACK);
        setScores({ B: 2, W: 2 });
        setGameOver(false);
        updateHints(newBoard, PlayerColors.BLACK);
    }, [updateHints]);

    return (
        <div className="reversi-game">
            <OthelloControls
                currentPlayer={currentPlayer}
                scores={scores}
                gameOver={gameOver}
                onRestart={restartGame}
            />
            <OthelloBoard
                board={board}
                hints={hints}
                gameOver={gameOver}
                onCellClick={makeMove}
            />
            {gameOver && (
                <div className="reversi-game-result">
                    <h3>
                        {scores.B > scores.W ? '黑棋胜利!' :
                            scores.W > scores.B ? '白棋胜利!' : '平局!'}
                    </h3>
                    <button className="reversi-button" onClick={restartGame}>重新开始</button>
                </div>
            )}
        </div>
    );
};

export default ReversiGame;