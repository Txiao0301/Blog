import React, { useState, useEffect } from 'react';
import './index.css';

const BoardSize = 8;
const PlayerColors = { BLACK: 'B', WHITE: 'W' };
const OppositeColor = {
    [PlayerColors.BLACK]: PlayerColors.WHITE,
    [PlayerColors.WHITE]: PlayerColors.BLACK
};

// 初始化棋盘（8x8）
const createEmptyBoard = () =>
    Array(BoardSize).fill(null).map(() => Array(BoardSize).fill(null));

const ReversiGame = () => {
    // 游戏状态
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPlayer, setCurrentPlayer] = useState(PlayerColors.BLACK);
    const [scores, setScores] = useState({ B: 2, W: 2 });
    const [gameOver, setGameOver] = useState(false);
    const [hints, setHints] = useState<string[]>([]);

    // 初始化游戏棋盘（中心4个棋子）
    useEffect(() => {
        const newBoard = createEmptyBoard();
        const center = BoardSize / 2 - 1;

        newBoard[center][center] = PlayerColors.WHITE;
        newBoard[center][center + 1] = PlayerColors.BLACK;
        newBoard[center + 1][center] = PlayerColors.BLACK;
        newBoard[center + 1][center + 1] = PlayerColors.WHITE;

        setBoard(newBoard);
        updateHints(newBoard, PlayerColors.BLACK);
    }, []);

    // 检查是否有效落子位置
    const isValidMove = (
        board: (string | null)[][],
        row: number,
        col: number,
        player: string
    ) => {
        if (board[row][col] !== null) return false;

        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            let foundOpponent = false;

            while (r >= 0 && r < BoardSize && c >= 0 && c < BoardSize) {
                if (board[r][c] === null) break;
                if (board[r][c] === OppositeColor[player]) {
                    foundOpponent = true;
                } else if (board[r][c] === player) {
                    if (foundOpponent) return true;
                    break;
                }
                r += dr;
                c += dc;
            }
        }

        return false;
    };

    // 更新提示位置（当前玩家可以落子的位置）
    const updateHints = (board: (string | null)[][], player:string) => {
        const newHints = [];
        for (let row = 0; row < BoardSize; row++) {
            for (let col = 0; col < BoardSize; col++) {
                if (isValidMove(board, row, col, player)) {
                    newHints.push(`${row}-${col}`);
                }
            }
        }
        setHints(newHints);
    };

    // 执行落子操作
    const makeMove = (row:number, col:number) => {
        if (board[row][col] !== null || !isValidMove(board, row, col, currentPlayer))
            return;

        // 复制当前棋盘状态
        const newBoard = [...board.map(row => [...row])];
        newBoard[row][col] = currentPlayer;

        // 检查所有方向翻转对手棋子
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [dr, dc] of directions) {
            let flipStack = [];
            let r = row + dr;
            let c = col + dc;

            while (r >= 0 && r < BoardSize && c >= 0 && c < BoardSize) {
                if (newBoard[r][c] === OppositeColor[currentPlayer]) {
                    flipStack.push([r, c]);
                } else if (newBoard[r][c] === currentPlayer) {
                    // 翻转对手棋子
                    flipStack.forEach(([flipRow, flipCol]) => {
                        newBoard[flipRow][flipCol] = currentPlayer;
                    });
                    break;
                } else {
                    break;
                }
                r += dr;
                c += dc;
            }
        }

        // 更新棋盘状态
        setBoard(newBoard);

        // 计算新的分数
        const blackCount = newBoard.flat().filter(cell => cell === PlayerColors.BLACK).length;
        const whiteCount = newBoard.flat().filter(cell => cell === PlayerColors.WHITE).length;
        setScores({ B: blackCount, W: whiteCount });

        // 切换玩家
        const nextPlayer = OppositeColor[currentPlayer];
        setCurrentPlayer(nextPlayer);

        // 检查下一个玩家是否有合法移动
        updateHints(newBoard, nextPlayer);

        // 如果没有合法移动，检查游戏是否结束
        if (hints.length === 0) {
            const otherPlayerHints = [];
            for (let r = 0; r < BoardSize; r++) {
                for (let c = 0; c < BoardSize; c++) {
                    if (isValidMove(newBoard, r, c, OppositeColor[nextPlayer])) {
                        otherPlayerHints.push(`${r}-${c}`);
                    }
                }
            }

            if (otherPlayerHints.length === 0) {
                setGameOver(true);
            }
        }
    };

    // 重新开始游戏
    const restartGame = () => {
        const newBoard = createEmptyBoard();
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
    };

    // 渲染棋子或提示点
    const renderCell = (row:number, col:number) => {
        const value = board[row][col];
        const isHint = hints.includes(`${row}-${col}`);

        return (
            <div
                className={`reversi-cell ${isHint ? 'reversi-hint' : ''}`}
                onClick={() => !gameOver && !value && makeMove(row, col)}
            >
                {value === PlayerColors.BLACK && <div className="reversi-piece reversi-black" />}
                {value === PlayerColors.WHITE && <div className="reversi-piece reversi-white" />}
                {isHint && <div className="reversi-hint-dot" />}
            </div>
        );
    };

    return (
        <div className="reversi-game">
            <div className="reversi-game-info">
                <div className={`reversi-player-turn ${currentPlayer === PlayerColors.BLACK ? 'black' : 'white'}`}>
                    {gameOver ? "游戏结束" : `当前: ${currentPlayer === PlayerColors.BLACK ? '黑子' : '白子'}`}
                </div>
                <div className="reversi-scores">
                    <div>黑: {scores.B}</div>
                    <div>白: {scores.W}</div>
                </div>
            </div>

            <div className="reversi-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="reversi-board-row">
                        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
                    </div>
                ))}
            </div>

            {gameOver && (
                <div className="reversi-game-result">
                    <h3>
                        {scores.B > scores.W ? '黑棋胜利!' :
                            scores.W > scores.B ? '白棋胜利!' : '平局!'}
                    </h3>
                    <button className = "reversi-button" onClick={restartGame}>重新开始</button>
                </div>
            )}

            <div className="reversi-game-controls">
                <button className = "reversi-button" onClick={restartGame}>重新开始游戏</button>
            </div>
        </div>
    );
};

export default ReversiGame;