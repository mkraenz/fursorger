// tslint:disable:no-unused-expression
// tslint:disable:no-empty

import { expect, use } from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { CityName } from "./CityName";
import { doNothing } from "./doNothing";
import { IInventory } from "./i-inventory";
import { ICity } from "./ICity";
import { Logic } from "./logic";
import { WareType } from "./wareType";

use(sinonChai);

const buyPrice = 1234;
const sellPrice = 2345;

describe("Logic", () => {
    let player: IInventory;
    let city: ICity;
    let stub: sinon.SinonStub;
    let logic: Logic;

    beforeEach(() => {
        stub = sinon.stub();
        player = {
            buy: doNothing,
            get: null as any,
            hasMoney: () => true,
            isValidSell: () => true,
            sell: doNothing,
        };
        city = getMockCity(CityName.Mecklenburg);
        logic = new Logic(player, [city], CityName.Mecklenburg);
    });

    const type = WareType.Furs;
    const quantity = 1; // Should match Logic.quantity

    describe("buy()", () => {
        it("checks if city can sell correct waretype", () => {
            city.isValidSell = stub;

            logic.buy(type);

            expect(city.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls city.getBuyPrice() exactly once", () => {
            city.getBuyPrice = stub;

            logic.buy(type);
            expect(city.getBuyPrice).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("checks if player has money", () => {
            player.hasMoney = stub;

            logic.buy(type);

            expect(player.hasMoney).to.have.been.calledOnceWithExactly(
                quantity * buyPrice
            );
        });
        it("calls player.buy() with correct params", () => {
            player.buy = stub;

            logic.buy(type);

            expect(player.buy).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                buyPrice
            );
        });
        it("calls city.sell() with correct params", () => {
            city.sell = stub;

            logic.buy(type);

            expect(city.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                buyPrice
            );
        });
        it("does nothing on player if city cannot sell", () => {
            city.isValidSell = stubReturningFalse();
            player.buy = stub;

            logic.buy(type);

            expect(player.buy).to.have.not.been.called;
        });
        it("does nothing on city if city cannot sell", () => {
            city.isValidSell = stubReturningFalse();
            city.sell = stub;

            logic.buy(type);

            expect(city.sell).to.have.not.been.called;
        });
    });

    describe("sell()", () => {
        it("checks if player can sell correct waretype", () => {
            player.isValidSell = stub;

            logic.sell(type);

            expect(player.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls city.buy() with correct params ", () => {
            city.buy = stub;

            logic.sell(type);

            expect(city.buy).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                sellPrice
            );
        });
        it("calls city.getSellPrice() with correct params", () => {
            city.getSellPrice = stub;

            logic.sell(type);

            expect(city.getSellPrice).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls player.sell() with correct params", () => {
            player.sell = stub;

            logic.sell(type);

            expect(player.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                sellPrice
            );
        });
        it("does nothing on city if player cannot sell", () => {
            player.isValidSell = stubReturningFalse();
            city.buy = stub;

            logic.sell(type);

            expect(city.buy).to.have.not.been.called;
        });
        it("does nothing on player if player cannot sell", () => {
            player.isValidSell = stubReturningFalse();
            player.sell = stub;

            logic.sell(type);

            expect(player.sell).to.have.not.been.called;
        });
    });

    describe("new", () => {
        it("throws on empty cities array", () => {
            const resultFn = () =>
                new Logic(null as any, [], CityName.Mecklenburg);

            expect(resultFn).to.throw(/Must provide at least one city/i);
        });

        it("throws on duplicate city name", () => {
            const anotherMecklenburg = getMockCity(CityName.Mecklenburg);

            const resultFn = () =>
                new Logic(
                    player,
                    [city, anotherMecklenburg],
                    CityName.Mecklenburg
                );

            expect(resultFn).to.throw(/City names must be unique./);
        });
    });

    describe("city", () => {
        it("initially returns the startCity", () => {
            const anotherCity = getMockCity(CityName.Holstein);
            logic = new Logic(
                player,
                [city, anotherCity],
                CityName.Mecklenburg
            );

            const result = logic.city; // getter function

            expect(result).to.equal(city);
        });

        it("can return the selected city", () => {
            const holstein = getMockCity(CityName.Holstein);
            logic = new Logic(player, [city, holstein], CityName.Mecklenburg);

            logic.selectedCity = CityName.Holstein;
            const result = logic.city; // getter function

            expect(result).to.equal(holstein);
        });

        it("throws if selected city does not exist", () => {
            logic = new Logic(player, [city], CityName.Mecklenburg);

            logic.selectedCity = CityName.Holstein;
            const resultFn = () => logic.city; // getter function

            expect(resultFn).to.throw(/City not found Holstein/);
        });
    });
});

function stubReturningFalse() {
    return sinon.stub().returns(false);
}

function getMockCity(name: CityName): ICity {
    return {
        buy: doNothing,
        consume: doNothing,
        get: null as any,
        getBuyPrice: () => buyPrice,
        getSellPrice: () => sellPrice,
        hasMoney: () => true,
        isValidSell: () => true,
        name,
        sell: doNothing,
    };
}
