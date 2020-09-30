const isProd = window.location.hostname !== "localhost";
export const DEV = isProd
    ? {}
    : {
          initialLevel: 0,
          startInWinScene: false,
          skipTitle: false,
          startInCredits: false,
          showPaths: false,
          loseDisabled: false,
          winDisabled: false,
          enableSceneWatcher: false,
      };
