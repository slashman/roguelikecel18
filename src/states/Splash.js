import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('tileset', 'assets/images/tileset.png', 32, 32)
    this.load.spritesheet('particles', 'assets/images/particles.png', 16, 16)
    this.load.image('background', 'assets/images/background.png')
    this.load.image('band', 'assets/images/band.png')
    this.load.audio('music', 'assets/shadowman.ogg')
  }

  create () {
    this.state.start('Game')
  }
}
