import { theme } from 'antd';
import ReversiGame from './gameSubject';

/**  
 * Othello/Reversi 游戏实现
 * 规则：黑子先行，黑子为'B'，白子为'W'，棋盘为8x8
 * 棋子放置规则：落子后可以翻转对手的棋子
 * 游戏结束条件：棋盘满或双方都无合法落子位置
*/
export default function OthelloGame() {
   const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
         <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>
            <ReversiGame />
         </div>
    );
}
