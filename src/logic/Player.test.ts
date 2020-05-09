import { expect } from "chai";
import { Graph } from "graphlib";
import { Player } from "./Player";

describe("Player", () => {
    it("constructs a new player", () => {
        const graph = new Graph();

        const result = new Player(
            graph,
            {
                name: "Athens",
                economy: { stock: 1 },
            },
            3
        );

        expect(result).to.exist;
    });
});
