# Fursorger

[![Build Status](https://travis-ci.com/proSingularity/fursorger.svg?branch=master)](https://travis-ci.com/proSingularity/fursorger)
[![codecov](https://codecov.io/gh/proSingularity/fursorger/branch/master/graph/badge.svg)](https://codecov.io/gh/proSingularity/fursorger)

**Play now at [prosingularity.github.io/fursorger/](https://prosingularity.github.io/fursorger/).**

```log
I am the care taker who
tries to keep the dying world alive
as long as possible
by traveling to cities,
redistributing goods among cities,
and building factories to produce more goods
```

[Big Hairy Audacious Goal](https://en.wikipedia.org/wiki/Big_Hairy_Audacious_Goal) Number 1.

A phaser3 survival trading game in TypeScript.

## Getting started

### Installing

Assumes you have globally installed

- git
- node.js

Clone the git repository

```bash
git clone https://github.com/proSingularity/fursorger.git
```

Install, test and start:

```bash
npm run sanity-check
```

### Building and Running

Perform a quick build (bundle.js) and start server:

```bash
npm run dev
```

### Running with Docker

```bash
# Assumes local installation of Docker.
npm run build && docker-compose up
```

In your browser, navigate to [localhost:8080](http://localhost:8080).

## Debugging

```bash
npm run dev
# STEP: you can close the window that opens automatically
# STEP: Set a breakpoint in VS CODE
# STEP: Start 'Chrome' debug config in VS Code
# STEP: Maybe reload the window
# STEP: Trigger the breakpoint
```

Check out this cool [how-to](https://github.com/samme/phaser3-faq/wiki#how-do-i-fixdebug-my-game).

## Deployment

Continuous deployment to github pages [https://prosingularity.github.io/fursorger/](https://prosingularity.github.io/fursorger/) is performed on each push to `master`.

At the same time, a new Docker image is published to [Fursorger's Docker Hub repository](https://cloud.docker.com/u/nonbiri/repository/docker/nonbiri/fursorger).

Every branch is automatically deployed to [fursorger-game.herokuapp.com](https://fursorger-game.herokuapp.com).

See [.travis.yml](.travis.yml).

## Resources

### Phaser

- [Phaser 3 Framework](https://github.com/photonstorm/phaser)
- [Phaser 3 Docs with TypeScript Definition File](https://github.com/photonstorm/phaser3-docs)
- [Phaser 3 Online Docs](https://photonstorm.github.io/phaser3-docs/index.html)
- [Phaser 3 Examples](https://phaser.io/examples/v3)
- [Phaser 3 Examples Lab](https://labs.phaser.io/)
- [Phaser 3 Examples Lab Github](https://github.com/photonstorm/phaser3-examples)
- [Cheat sheets](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets)
- [Template Project - Phaser3 with TypeScript](https://github.com/digitsensitive/phaser3-typescript)
- [RexRainbow Github Phaser 3 plugins and more](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/plugins)
- [Ease Cheat Sheet](http://lets-gamedev.de/phasereasings/)

### Tools

- [Pixel Art Maker](http://pixelartmaker.com/)
- [Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool)
- [Littera](http://kvazars.com/littera)
- [MagicTools](https://github.com/ellisonleao/magictools)
- [Tiled](https://www.mapeditor.org)
- [Favicon Generator](https://favicon.io/favicon-generator/)
- [Aseprite](https://www.aseprite.org/)
- [Aseprite - How to](https://www.youtube.com/watch?v=Md6W79jtLJM)
- [Awesome Github Actions](https://github.com/sdras/awesome-actions)
- [tl;dr legal](https://tldrlegal.com/) summary of licenses
- [dat.GUI.js](https://github.com/dataarts/dat.gui) Dynamically change game object props and more
- [Audacity](https://www.audacityteam.org/) Audio software
- [CutMp3](http://manpages.ubuntu.com/manpages/bionic/man1/cutmp3.1.html) Audacity sometimes leaves a few milliseconds of silence at the end of an mp3 file. To make those files usable for looping, use this to cut. E.g. `cutmp3 -i wind.mp3 -o no_silence -a 00:00 -b 00:17`
- [Phaser3 Particle Editor](https://koreezgames.github.io/phaser3-particle-editor/)
- [jessholland Maps](https://jessholland.artstation.com/projects/ovArq)
- [Phaser3 Path Builder Plugin](https://github.com/samid737/phaser3-plugin-pathbuilder) (not working with newest Phaser3 version)

## Assets

- [game-icons.net](https://game-icons.net/)
- <https://itch.io/c/396696/tools>
