[![Build Status](https://travis-ci.com/proSingularity/fursorger.svg?branch=master)](https://travis-ci.com/proSingularity/fursorger)
[![codecov](https://codecov.io/gh/proSingularity/fursorger/branch/master/graph/badge.svg)](https://codecov.io/gh/proSingularity/fursorger)

# Fursorger

**Play now at [prosingularity.github.io/fursorger/](https://prosingularity.github.io/fursorger/).**

```
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

## External Resources

- [Phaser 3 Framework](https://github.com/photonstorm/phaser)
- [Phaser 3 Docs with TypeScript Definition File](https://github.com/photonstorm/phaser3-docs)
- [Phaser 3 Online Docs](https://photonstorm.github.io/phaser3-docs/index.html)
- [Phaser 3 Official Examples](https://github.com/photonstorm/phaser3-examples)
- [Cheat sheets](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets)
- [Template Project - Phaser3 with TypeScript](https://github.com/digitsensitive/phaser3-typescript)

## Helpful tools

- [Pixel Art Maker](http://pixelartmaker.com/)
- [Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool)
- [Littera](http://kvazars.com/littera)
- [MagicTools](https://github.com/ellisonleao/magictools)
- [Tiled](https://www.mapeditor.org)
- [Favicon Generator](https://favicon.io/favicon-generator/)
- [Aspire](https://www.aseprite.org/)
- [Aspire - How to](https://www.youtube.com/watch?v=Md6W79jtLJM)
- [Awesome Github Actions](https://github.com/sdras/awesome-actions)

### Generating favicon.ico

Thanks to [Favicon Generator](https://favicon.io/favicon-generator/) for allowing us to easily create a nice favicon.
We used the following settings:

- Text: Für
- Background: rounded
- Font family: Tillana
- Font size: 90
- Font color: #F0F2E8
- Background color: #537169
