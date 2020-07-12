const isProd = window.location.hostname !== "localhost";
export const DEV = isProd
    ? {}
    : {
          initialLevel: 1,
          startInWinScene: false,
          skipTitle: true,
          showPaths: false,
          loseDisabled: false,
          winDisabled: false,
      };
