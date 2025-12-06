export class Hero
{
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    physics: Phaser.Physics.Arcade.ArcadePhysics;
    animations: Phaser.Animations.AnimationManager;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    spriteKey: string;

    constructor (physics: Phaser.Physics.Arcade.ArcadePhysics, animations: Phaser.Animations.AnimationManager, cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined = undefined)
    {
        this.physics = physics;
        this.animations = animations;
        this.cursorKeys = cursorKeys;
    }

    addBody (x: number, y: number, texture: string): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    {
        this.body = this.physics.add.sprite(x, y, texture);
        this.body.setCollideWorldBounds(true);
        this.spriteKey = texture;

        this.animations.create({
            key: 'right',
            frames: this.animations.generateFrameNumbers(this.spriteKey, { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.animations.create({
            key: 'left',
            frames: this.animations.generateFrameNumbers(this.spriteKey, { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.animations.create({
            key: 'up',
            frames: this.animations.generateFrameNumbers(this.spriteKey, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.animations.create({
            key: 'down',
            frames: this.animations.generateFrameNumbers(this.spriteKey, { start: 8, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        return this.body;
    }

    addControls ()
    {
        if (!this.cursorKeys)
        {
            throw new Error('The cursor keys property will only be available if defined in the Scene Injection Map and the plugin is installed.');
        }
        
        if (this.cursorKeys.left.isDown)
        {
            this.body.setVelocityX(-160);
            this.body.setVelocityY(0);

            this.body.anims.play('left', true);
        }
        else if (this.cursorKeys.right.isDown)
        {
            this.body.setVelocityX(160);
            this.body.setVelocityY(0);

            this.body.anims.play('right', true);
        }
        else if (this.cursorKeys.up.isDown)
        {
            this.body.setVelocityY(-160);
            this.body.setVelocityX(0);
            this.body.anims.play('up', true);
        }
        else if (this.cursorKeys.down.isDown)
        {
            this.body.setVelocityY(160);
            this.body.setVelocityX(0);
            this.body.anims.play('down', true);
        }
        else
        {
            this.body.setVelocity(0);
            this.body.anims.stop();
        }
    }

    equipWeapnon (player: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile | Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }, weapon: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody)
    {
        weapon.disableBody(true, true);
    }
}
