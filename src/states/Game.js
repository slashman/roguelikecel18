import Phaser from 'phaser'
import Time from '../Time'

var data = [
['Tarn Adams', 'Bay12Games', 'Villains and upcoming', 'changes on Dwarf Fortress'],
['Thomas Biskup', 'ADOM', 'Entity Component Systems', 'in games'],
['Josh Ge', 'Cogmind', 'how to make a', 'roguelike'],
['Jim Shepard', 'Dungeonmans', 'Secrets of storytelling', 'in games'],
['Brian Walker', 'Brogue', 'Level generation', 'techniques',,2800],
['Santiago Zapata', 'Ananias - Roguetemple', 'History of roguelikes','',,3000],
['Max Kreminski', 'Epitaph', 'Gardening as a mode', 'of play',,2800],
['Colin Liotta', 'Rogue Puzzles', 'My roguelike puzzle for', '2018 MIT Mystery Hunt'],
['Jongwoo Kim', 'Kitfox Games', 'Subjective simulation and', 'ludonarrative congruence'],
['Dr. Lessard & Dr. Barr', 'Concordia University', 'Chogue', 'the chess roguelike', 16,2800],
['Bob Nystrom', 'Game Programming Patterns', 'Techniques for game design'],
['Lief Bloomquist', 'Jamming Signal', 'A multiplayer roguelike' ,'for the Commodore 64'],
['Alexei Pepers', 'Code Monkey', 'Joys of delving through', 'the Nethack codebase'],
['Andrew Aversa', 'Tangledeep', 'Calibrating difficulty', 'in games'],
['Featuring', 'The Roguelike Arcade', 'Play games new and old', ''],
['ROGUELIKE CELEBRATION', '2018', 'OCTOBER 6TH AND 7TH', 'GITHUB HQ SAN FRANCISCO'],
]

export default class extends Phaser.State {
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.game.add.image(0, 0, 'background')

    this.particlesGroup = this.game.add.group();
    this.frontGroup = this.game.add.group();

    this.game.add.image(0, 72, 'band', 1, this.frontGroup)
    Time.init(this.game)
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(4 * 1.333, 4)

    
    const TEXTX = 128;
    this.nameTxt = this.game.add.text(TEXTX, 112, '', {font: "8px lcd", fill: "#FFF"})
    this.frontGroup.add(this.nameTxt);
    this.projectTxt = this.game.add.text(TEXTX, 120, '', {font: "8px lcd", fill: "#FFF"}, this.frontGroup)
    this.talkTxt = this.game.add.text(TEXTX, 136, '', {font: "8px lcd", fill: "#FFF"}, this.frontGroup)
    this.talk2Txt = this.game.add.text(TEXTX, 144, '', {font: "8px lcd", fill: "#FFF"}, this.frontGroup)
    this.characterImg = this.game.add.image(112, 80, 'tileset', 0, this.frontGroup);
    this.characterImg2 = this.game.add.image(120, 80, 'tileset', 0, this.frontGroup);
    this.characterImg.visible = false;
    this.characterImg2.visible = false;
    this.current = -1;
    this.game.add.audio('music').play();
    Time.wait(3600).then(() => this.next());  
    Time.wait(2000).then(() => {
      for (var i = 0; i < 15; i++) {
        this.addParticle(0);
      }
    });
    Time.wait(20000).then(() => {
      for (var i = 0; i < 10; i++) {
        this.addParticle(1);
      }
    });
    Time.wait(32000).then(() => {
      for (var i = 0; i < 5; i++) {
        this.addParticle(2);
      }
    });
    this.setText(this.nameTxt, "In the year of 2018...")
    this.setText(this.talkTxt, "The Roguelike Celebration")
    this.setText(this.talk2Txt, "was happening again.")
  }

  addParticle(type) {
    const x = Math.floor(Math.random() * 256);
    const y = Math.random() > 0.5 ? Math.floor(Math.random() * 72) : 168 + Math.floor(Math.random() * 56);
    if (type === undefined) {
      type = Math.floor(Math.random() * 3);
    }
    const color = Math.floor(Math.random() * 3);
    const sprite = this.game.add.sprite(-x, y, 'particles', type + color * 4, this.particlesGroup);
    const speed = type == 0 ? 1 : type == 2 ? 8 : 4;
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    const realSpeed = speed * 40 + Math.random() * 40;
    sprite.body.velocity.setTo(realSpeed, 0);
    Time.wait(5000 / speed).then(() => {
      this.addParticle(type);
    });
    Time.wait(20000 / speed).then(() => {
      sprite.destroy();
    });
  }

  next() {
    this.current++;
    if (this.current < data.length) {
      this.setText(this.nameTxt, data[this.current][0])
      this.setText(this.projectTxt, data[this.current][1])
      
      this.setText(this.talkTxt, data[this.current][2])
      if (data[this.current][3]) {
        this.setText(this.talk2Txt, data[this.current][3])
      } else {
        this.setText(this.talk2Txt, '')
      }
      this.characterImg.loadTexture('tileset', this.current);
      if (data[this.current][4]) {
        this.characterImg2.loadTexture('tileset', data[this.current][4]);
        this.characterImg.x = 104;
        this.characterImg.visible = true;
        this.characterImg2.visible = true;
      } else {
        this.characterImg.visible = true;
        this.characterImg2.visible = false;
        this.characterImg.x = 112;
      }
      //const delay = data[this.current][5] || 3000;
      const delay = 2900;
      Time.wait(delay).then(() => this.next());  
    } else {
      Time.wait(3000).then(() => this.end());  
    }
  }

  setText(txt, text) {
    text = text.toUpperCase();
    var remainder = Math.floor((32 - text.length) / 2);
    txt.x = remainder * 8;
    txt.text = text;
  }
}
