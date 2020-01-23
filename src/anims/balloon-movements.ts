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
        // numberOfCases should be the highest possible case + 1
        default: {
            return Math.floor(((t - x1) * (x2 - t)) / 10000);
        }
    }
};

export const numberOfCases = 6;

export let pathCaseArray = [];

export const getCaseOfPath = (firstName: string, secondName: string) => {
    const pathCase = pathCaseArray.find(
        path => path.v === firstName && path.w === secondName
    );
    // returns undefined if secondName should be firstName and vice versa
    return pathCase.case;
};

export const incrementCaseOfPath = (firstName: string, secondName: string) => {
    const possibleEdge = { v: firstName, w: secondName };
    const pathCase = this.pathCaseArray.find(
        path => path.v === firstName && path.w === secondName
    );
    // returns undefined if secondName should be firstName and vice versa
    pathCase.case = (pathCase.case + 1) % numberOfCases;
};
