import { Scene } from 'phaser';
import { MainSceneCfg } from '../styles/MainSceneCfg';
import { IconButton } from './IconButton';

export const RestartButton = (
    scene: Scene,
    onPointerUp: () => void,
    x = MainSceneCfg.restart.x,
    y = MainSceneCfg.restart.y
) =>
    new IconButton(scene, onPointerUp, x, y, {
        baseScale: 1,
        texture: 'restart',
    });
