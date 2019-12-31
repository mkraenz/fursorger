import { Data } from "phaser";

const LEVEL = "level";
export const setLevel = (registry: Data.DataManager, level: number) =>
    registry.set(LEVEL, level);

export const getLevel = (registry: Data.DataManager): number =>
    registry.get(LEVEL);
