export class Sword
{
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    spriteKey: string;
    scene: Phaser.Scene;
    container: Phaser.GameObjects.Container;

    hasEqupippedWeapon: boolean = false;

    constructor (scene: Phaser.Scene)
    {
        this.scene = scene;
    }

    add (x: number, y: number, texture: string): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    {
        this.body = this.scene.physics.add.sprite(x, y, texture, 1);
        this.body.setCollideWorldBounds(true);

        this.spriteKey = texture;

        this.scene.anims.create({
            key: 'weapon_right',
            frames: this.scene.anims.generateFrameNumbers(this.spriteKey, { start: 39, end: 47 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'weapon_left',
            frames: this.scene.anims.generateFrameNumbers(this.spriteKey, { start: 13, end: 21 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'weapon_up',
            frames: this.scene.anims.generateFrameNumbers(this.spriteKey, { start: 1, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'weapon_down',
            frames: this.scene.anims.generateFrameNumbers(this.spriteKey, { start: 26, end: 34 }),
            frameRate: 10,
            repeat: -1
        });

        return this.body;
    }
}
