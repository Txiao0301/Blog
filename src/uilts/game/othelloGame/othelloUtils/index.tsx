// 玩家颜色定义
const PlayerColors = { BLACK: 'B', WHITE: 'W' };
const OppositeColor = {
    [PlayerColors.BLACK]: PlayerColors.WHITE,
    [PlayerColors.WHITE]: PlayerColors.BLACK
};

export { PlayerColors, OppositeColor };