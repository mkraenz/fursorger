const sidebarX = 50;
const sidebarImgToTextXOffset = 40;
const sidebarImgToTextYOffset = -30;
export const MainSceneCfg = {
    playerStock: {
        img: {
            x: sidebarX,
            y: 200,
        },
        text: {
            x: sidebarX + sidebarImgToTextXOffset,
            y: 200 + sidebarImgToTextYOffset,
        },
    },
    turnInfo: {
        img: {
            x: sidebarX,
            y: 280,
        },
        text: {
            x: sidebarX + sidebarImgToTextXOffset,
            y: 280 + sidebarImgToTextYOffset,
        },
    },
    buildFactory: {
        x: sidebarX,
        y: 370,
    },
    restart: {
        x: sidebarX,
        y: 460,
    },
};
