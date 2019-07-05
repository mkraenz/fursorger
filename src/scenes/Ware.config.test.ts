import { expect } from "chai";
import { Ware } from "./ware";
import { WareType } from "./wareType";

describe("Ware config - every WareType has set a value", () => {
    Object.values(WareType).forEach((type: WareType) => {
        it(`minPrice for ${type} is a positive number `, () => {
            const ware = new Ware(type, 123);

            const result = ware.minPrice;

            expect(result).to.be.a("number");
            expect(result).to.be.greaterThan(0);
        });

        it(`maxPrice for ${type} is a positive number `, () => {
            const ware = new Ware(type, 123);

            const result = ware.maxPrice;

            expect(result).to.be.a("number");
            expect(result).to.be.greaterThan(0);
        });

        it(`maxPrice for ${type} is greater than minPrice `, () => {
            const ware = new Ware(type, 123);

            const max = ware.maxPrice;
            const min = ware.minPrice;

            expect(max).to.be.greaterThan(min);
        });
    });
});
