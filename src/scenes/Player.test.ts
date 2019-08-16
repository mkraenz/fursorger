// tslint:disable: no-unused-expression
import { expect } from "chai";
import { Graph } from "graphlib";
import { CityName } from "./CityName";
import { Player } from "./Player";

describe("Player", () => {
    it("constructs a new player", () => {
        const graph = new Graph();

        const result = new Player(graph, { name: CityName.Athens });

        expect(result).to.exist;
    });
});
