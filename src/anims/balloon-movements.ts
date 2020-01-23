export const balloonDisturbances = (
    t: number,
    x1: number,
    x2: number,
    disturbenceCase: number
) => {
    switch (disturbenceCase) {
        case 1: {
            return Math.floor(((t - x1) * (x2 - t)) / 100);
        }
        case 2: {
            return Math.floor(
                40 * Math.sin((2 * Math.PI * (t - x1)) / (x2 - x1))
            );
        }
        case 3: {
            return Math.floor(
                40 * Math.sin((3 * Math.PI * (t - x1)) / (x2 - x1))
            );
        }
        case 4: {
            return Math.floor(
                40 * Math.sin((2 * Math.PI * (t - x1)) / (x2 - x1)) +
                    ((t - x1) * (x2 - t)) / 10000
            );
        }
        case 5: {
            return Math.floor(
                40 * Math.sin((3 * Math.PI * (t - x1)) / (x2 - x1)) +
                    ((t - x1) * (x2 - t)) / 5000
            );
        }
        default: {
            return Math.floor(((t - x1) * (x2 - t)) / 10000);
        }
    }
};
