const isProd = window.location.hostname !== "localhost";
export const DEV = isProd
    ? {}
    : {
          skipTitle: false,
      };
