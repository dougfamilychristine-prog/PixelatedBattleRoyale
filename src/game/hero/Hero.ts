import { getHeroConfig, HeroKeys } from '../../configs/heros';
import { Sword } from '../weapons/Sword';

let W: Phaser.Input.Keyboard.Key | undefined;
let A: Phaser.Input.Keyboard.Key | undefined;
let S: Phaser.Input.Keyboard.Key | undefined;
let D: Phaser.Input.Keyboard.Key | undefined;

const BASE_VELOCITY = 160;

export class Hero
{
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    scene: Phaser.Scene;
    container: Phaser.GameObjects.Container;

    equippedWeapon: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

    constructor (scene: Phaser.Scene, cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined = undefined)
    {
        this.scene = scene;
        this.cursorKeys = cursorKeys;
        A = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        W = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        S = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        D = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    addBody (x: number, y: number, heroKey: HeroKeys): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    {
        const heroConfig = getHeroConfig(heroKey, this.scene.anims);

        this.body = this.scene.physics.add.sprite(0, 0, heroConfig.spriteKey);
        this.body.setCollideWorldBounds(true);

        this.container = this.scene.add.container(x, y);
        this.container.add(this.body);

        heroConfig.createAnimations();
          
        return this.body;
    }

    addControls ()
    {
        this.container.getAll().forEach(obj =>
        {
            let velocityY = 0;
            let velocityX = 0;
            let animationKey = '';
            let equippedWeaponAnimationKey = '';

            if (!this.cursorKeys)
            {
                throw new Error('The cursor keys property will only be available if defined in the Scene Injection Map and the plugin is installed.');
            }

            if (!obj.body)
            {
                return;
            }

            if (A?.isDown)
            {
                velocityX = -BASE_VELOCITY;
                animationKey = 'left';
                equippedWeaponAnimationKey = 'weapon_left';
            }
            else if (D?.isDown)
            {
                velocityX = BASE_VELOCITY;
                animationKey = 'right';
                equippedWeaponAnimationKey = 'weapon_right';
            }

            if (W?.isDown)
            {
                velocityY = -BASE_VELOCITY;
                animationKey = 'up';
                equippedWeaponAnimationKey = 'weapon_up';
            }
            else if (S?.isDown)
            {
                velocityY = BASE_VELOCITY;
                animationKey = 'down';
                equippedWeaponAnimationKey = 'weapon_down';
            }

            if (velocityX === 0 && velocityY === 0)
            {
                obj.body.velocity.x = 0;
                obj.body.velocity.y = 0;
                this.body.anims.stop();
                if (this.equippedWeapon)
                {
                    this.equippedWeapon.anims.stop();
                }

                return;
            }

            obj.body.velocity.x = velocityX !== 0 && velocityY !== 0 ? velocityX * 0.75 : velocityX;
            obj.body.velocity.y = velocityY !== 0 && velocityX !== 0 ? velocityY * 0.75 : velocityY;

            this.body.anims.play(animationKey, true);
            if (this.equippedWeapon)
            {
                this.equippedWeapon.anims.play(equippedWeaponAnimationKey, true);
            }
        });
    }

    equipWeapon (_player: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile | Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }, weapon: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody)
    {
        if (this.equippedWeapon) { return; }
        
        weapon.disableBody(true, true);
        const newSword = new Sword(this.scene);
        this.equippedWeapon = newSword.add(70, 0, 'sword');

        this.container.add(this.equippedWeapon);
    }
}
