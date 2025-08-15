import { theme } from 'antd';
import ReversiGame from './gameSubject';

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
