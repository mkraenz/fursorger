const isProd = window.location.hostname !== "localhost";
export const DEV = isProd
    ? {}
    : {
          skipTitle: true,
          showPaths: false,
          loseDisabled: false,
          winDisabled: false,
      };
