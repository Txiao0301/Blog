import {PlayerColors} from '../othelloUtils';
import '../index.css';

// 操作与信息组件
interface OthelloControlsProps {
    currentPlayer: string;
    scores: { B: number; W: number };
    gameOver: boolean;
    onRestart: () => void;
}
const OthelloControls: React.FC<OthelloControlsProps> = ({ currentPlayer, scores, gameOver, onRestart }) => (
    <div className="reversi-game-info">
        <div className={`reversi-player-turn ${currentPlayer === PlayerColors.BLACK ? 'black' : 'white'}`}>
            {gameOver ? "游戏结束" : `当前: ${currentPlayer === PlayerColors.BLACK ? '黑子' : '白子'}`}
        </div>
        <div className="reversi-scores">
            <div>黑: {scores.B}</div>
            <div>白: {scores.W}</div>
        </div>
        <div className="reversi-game-controls">
            <button className="reversi-button" onClick={onRestart}>重新开始游戏</button>
        </div>
    </div>
);

export default OthelloControls;