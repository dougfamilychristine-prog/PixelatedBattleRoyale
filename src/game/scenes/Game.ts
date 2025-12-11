import { Scene } from 'phaser';
import { Hero } from '../hero/Hero';
import { Sword } from '../weapons/Sword';

export class Game extends Scene
{
    grass: Phaser.GameObjects.TileSprite;
    player: Hero;
    weapon: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    background: Phaser.Physics.Arcade.StaticGroup;

    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.spritesheet('sword', 'assets/weapons/sword.png', { frameWidth: 64, frameHeight: 64 });
    }

    create ()
    {
        // this.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.1, 1);
        this.grass = this.add.tileSprite(0, 285, 1024, 768 - 285, 'grass').setOrigin(0, 0);
        this.background = this.physics.add.staticGroup();
        this.background.create(0, 0, 'background').setOrigin(0, 0).setScale(1.1, 1).refreshBody();
            
        const sword = new Sword(this);
        this.weapon = sword.add(235, 400, 'sword');
        
        this.cursorKeys = this.input.keyboard?.createCursorKeys();

        this.player = new Hero(this, this.cursorKeys);
        this.player.addBody(100, 450, 'main');

        this.physics.add.collider(this.player.body, this.background);
        this.physics.add.overlap(this.player.body, this.weapon, this.player.equipWeapon, undefined, this.player);
    }

    update ()
    {
        this.player.addControls();
    }
}
