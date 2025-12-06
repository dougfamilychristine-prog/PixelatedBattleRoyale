import { Scene } from 'phaser';

export class Game extends Scene
{
    grass: Phaser.GameObjects.TileSprite;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    background: Phaser.Physics.Arcade.StaticGroup;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // this.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.1, 1);
        this.grass = this.add.tileSprite(0, 285, 1024, 768 - 285, 'grass').setOrigin(0, 0);
        this.background = this.physics.add.staticGroup();
        this.background.create(0, 0, 'background').setOrigin(0, 0).setScale(1.1, 1).refreshBody();
        
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.background);

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursorKeys = this.input.keyboard?.createCursorKeys();
    }

    update ()
    {
        if (!this.cursorKeys)
        {
            throw new Error('The cursor keys property will only be available if defined in the Scene Injection Map and the plugin is installed.');
        }
        
        if (this.cursorKeys.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);

            this.player.anims.play('left', true);
        }
        else if (this.cursorKeys.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);

            this.player.anims.play('right', true);
        }
        else if (this.cursorKeys.up.isDown)
        {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);
            this.player.anims.play('up', true);
        }
        else if (this.cursorKeys.down.isDown)
        {
            this.player.setVelocityY(160);
            this.player.setVelocityX(0);
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }
    }
}
