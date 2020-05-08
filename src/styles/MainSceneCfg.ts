const toolbarX = 50;
const toolbarImgToTextXOffset = 40;
const toolbarImgToTextYOffset = -30;
export const MainSceneCfg = {
    playerStock: {
        img: {
            x: toolbarX,
            y: 200,
        },
        text: {
            x: toolbarX + toolbarImgToTextXOffset,
            y: 200 + toolbarImgToTextYOffset,
        },
    },
    turnInfo: {
        img: {
            x: toolbarX,
            y: 280,
        },
        text: {
            x: toolbarX + toolbarImgToTextXOffset,
            y: 280 + toolbarImgToTextYOffset,
        },
    },
    buildFactory: {
        x: toolbarX,
        y: 370,
    },
    restart: {
        x: toolbarX,
        y: 460,
    },
};
