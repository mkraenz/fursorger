const isProd = window.location.hostname !== "localhost";
export const DEV = isProd
    ? {}
    : {
          startInWinScene: false,
          skipTitle: true,
          showPaths: false,
          loseDisabled: false,
          winDisabled: false,
      };
