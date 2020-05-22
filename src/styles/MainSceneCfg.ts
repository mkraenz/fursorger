const sidebarX = 50;
const sidebarImgToTextXOffset = 40;
const sidebarImgToTextYOffset = -22;
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
            y: 200 + 80 * 1,
        },
        text: {
            x: sidebarX + sidebarImgToTextXOffset,
            y: 200 + 80 * 1 + sidebarImgToTextYOffset,
        },
    },
    buildFactory: {
        x: sidebarX,
        y: 200 + 80 * 2,
    },
    restart: {
        x: sidebarX,
        y: 200 + 80 * 3,
    },
    nextLevel: {
        x: sidebarX,
        y: 200 + 80 * 4,
    },
};
