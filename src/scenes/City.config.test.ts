// tslint:disable: no-unused-expression
import { expect } from "chai";
import { cityConfig } from "./City.config";
import { CityName } from "./CityName";

describe("city.config", () => {
    it("has a config for each city", () => {
        expect(Object.values(CityName).length).to.equal(
            Object.values(cityConfig).length
        );
    });
});
