// tslint:disable:no-unused-expression

import { expect } from "chai";
import { SinonStub, stub } from "sinon";
import { Inventory } from "./inventory";
import { WareType } from "./wareType";

class MockInventory extends Inventory {
    public hasMoney(): boolean {
        return true;
    }
}

describe("Inventory", () => {
    const type = WareType.Furs;

    function getMockInventory(quantity: number) {
        return new MockInventory([
            {
                add: stub(),
                getQuantity: () => quantity,
                getStream: null as any,
                price: 1234,
                type,
            },
        ]);
    }
    it("buy() relays to wares.add with correct quantity", () => {
        const inventory = getMockInventory(200);

        inventory.buy(type, 100, 1234);

        expect(inventory.get(type)
            .add as SinonStub).to.have.been.calledOnceWithExactly(100);
    });
    it("sell() relays to wares.add with correct quantity", () => {
        const inventory = getMockInventory(200);

        inventory.sell(type, 50, 1234);

        expect(inventory.get(type)
            .add as SinonStub).to.have.been.calledOnceWithExactly(-50);
    });
    describe("isValidSell()", () => {
        it("returns true for valid sell", () => {
            const inventory = getMockInventory(200);

            const result = inventory.isValidSell(type, 50);

            expect(result).to.be.true;
        });
        it("returns false for invalid sell", () => {
            const inventory = getMockInventory(0);

            const result = inventory.isValidSell(type, 50);

            expect(result).to.be.false;
        });
        it("returns true for remainder 0", () => {
            const inventory = getMockInventory(50);

            const result = inventory.isValidSell(type, 50);

            expect(result).to.be.true;
        });
    });
});
