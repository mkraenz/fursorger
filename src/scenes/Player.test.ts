// tslint:disable: no-unused-expression
import { expect } from "chai";
import { Graph } from "graphlib";
import { City } from "./City";
import { Player } from "./Player";

describe("Player", () => {
    it("constructs a new player", () => {
        const graph = new Graph();

        const result = new Player(graph, new City("Berlin", [6, 2, 1]));

        expect(result).to.exist;
    });
});
