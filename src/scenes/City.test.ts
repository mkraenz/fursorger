// tslint:disable:no-unused-expression
import { expect, use } from "chai";
import { spy } from "sinon";
import * as sinonChai from "sinon-chai";
import { City } from "./City";
import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { IWareForCity } from "./IWareForCity";
import { WareType } from "./wareType";

use(sinonChai);

describe("City", () => {
    let ware: IWareForCity;
    let city: City;

    beforeEach(() => {
        ware = {
            add: () => undefined,
            getQuantity: () => 0,
            getStream: undefined as any,
            maxPrice: 355,
            minPrice: 130,
            price: 123,
            type: WareType.Furs,
        };
        city = new City([ware], CityName.Mecklenburg);
    });

    describe("getSellPrice()", () => {
        const toSellPrice = (price: number) =>
            Math.round(price * cityConfig.sellToBuyPriceFactor);

        it("returns maxPrice * sellToBuyPriceFactor when city quantity 0", () => {
            const result = city.getSellPrice(WareType.Furs, 1);

            const expected = toSellPrice(355);
            expect(result).to.equal(expected);
        });

        it("returns maxPrice * sellToBuyPriceFactor when city quantity 1", () => {
            ware.getQuantity = () => 1;

            const result = city.getSellPrice(WareType.Furs, 1);

            expect(result).to.equal(toSellPrice(355));
        });

        it("returns minPrice * sellToBuyPriceFactor when city quantity very large", () => {
            ware.getQuantity = () => 999999999;

            const result = city.getSellPrice(WareType.Furs, 1);

            expect(result).to.equal(toSellPrice(130));
        });
    });

    describe("getBuyPrice()", () => {
        it("returns maxPrice when city quantity 0", () => {
            const result = city.getBuyPrice(WareType.Furs, 1);

            const expected = 355;
            expect(result).to.equal(expected);
        });

        it("returns maxPrice when city quantity 1", () => {
            ware.getQuantity = () => 1;

            const result = city.getBuyPrice(WareType.Furs, 1);

            expect(result).to.equal(355);
        });

        it("returns minPrice when city quantity very large", () => {
            ware.getQuantity = () => 99999999;

            const result = city.getBuyPrice(WareType.Furs, 1);

            expect(result).to.equal(130);
        });
    });

    describe("consume()", () => {
        it("does not reduce quantity when quantity = 0", () => {
            ware.add = spy();

            city.consume();

            expect(ware.add).to.have.not.been.called;
        });

        it("reduces ware quantity by 1 when quantity > 1", () => {
            ware.getQuantity = () => 1;
            ware.add = spy();

            city.consume();

            expect(ware.add).to.have.been.calledWithExactly(-1);
        });
    });
});
