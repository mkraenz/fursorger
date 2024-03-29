import { Scene } from 'phaser';
import { EditorSceneCfg } from '../styles/EditorSceneCfg';
import { IconButton } from './IconButton';

const cfg = {
    x: EditorSceneCfg.deleteCityButton.x,
    y: EditorSceneCfg.deleteCityButton.y,
    icon: {
        baseScale: 0.18,
        texture: 'trashbin',
    },
};

export const DeleteCityButton = (scene: Scene, onPointerUp: () => void) =>
    new IconButton(scene, onPointerUp, cfg.x, cfg.y, cfg.icon);
