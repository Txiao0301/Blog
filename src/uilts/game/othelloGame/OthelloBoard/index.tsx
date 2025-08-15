import '../index.css';
import { PlayerColors } from '../othelloUtils';

const createEmptyBoard = (BoardSize:number) =>
    Array(BoardSize).fill(null).map(() => Array(BoardSize).fill(null));

// 棋盘组件
interface OthelloBoardProps {
    board: (string | null)[][];
    hints: string[];
    gameOver: boolean;
    onCellClick: (row: number, col: number) => void;
}
const OthelloBoard: React.FC<OthelloBoardProps> = ({ board, hints, gameOver, onCellClick }) => (
    <div className="reversi-board">
        {board.map((row, rowIndex) => (
            <div key={rowIndex} className="reversi-board-row">
                {row.map((cell, colIndex) => {
                    const isHint = hints.includes(`${rowIndex}-${colIndex}`);
                    return (
                        <div
                            key={colIndex}
                            className={`reversi-cell ${isHint ? 'reversi-hint' : ''}`}
                            onClick={() => !gameOver && !cell && onCellClick(rowIndex, colIndex)}
                        >
                            {cell === PlayerColors.BLACK && <div className="reversi-piece reversi-black" />}
                            {cell === PlayerColors.WHITE && <div className="reversi-piece reversi-white" />}
                            {isHint && <div className="reversi-hint-dot" />}
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
);

export default OthelloBoard;
export { createEmptyBoard };