export type HeroKeys = 'main';

type HeroConfig = {
    spriteKey: string;
    spriteSheetPath: string;
    spriteSheetHeight: number;
    spriteSheetWidth: number;
    createAnimations: () => void;
}

type HeroConfigInternal = Omit<HeroConfig, 'createAnimations'> & {
    createAnimations: (animationManager: Phaser.Animations.AnimationManager, spriteKey: string) => void;
}

const HEROS_CONFIG: Record<HeroKeys, HeroConfigInternal> = {
    main: {
        spriteKey: 'player',
        spriteSheetPath: 'assets/heros/main/hero.png',
        spriteSheetHeight: 64,
        spriteSheetWidth: 64,
        createAnimations: (animationManager: Phaser.Animations.AnimationManager, spriteKey: string) =>
        {
            animationManager.create({
                key: 'right',
                frames: animationManager.generateFrameNumbers(spriteKey, { start: 143, end: 151 }),
                frameRate: 10,
                repeat: -1
            });

            animationManager.create({
                key: 'left',
                frames: animationManager.generateFrameNumbers(spriteKey, { start: 117, end: 125 }),
                frameRate: 10,
                repeat: -1
            });

            animationManager.create({
                key: 'up',
                frames: animationManager.generateFrameNumbers(spriteKey, { start: 104, end: 112 }),
                frameRate: 10,
                repeat: -1
            });

            animationManager.create({
                key: 'down',
                frames: animationManager.generateFrameNumbers(spriteKey, { start: 130, end: 138 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }
};

export const getHeroConfig = (key: HeroKeys, animationManager: Phaser.Animations.AnimationManager): HeroConfig =>
{
    const config = HEROS_CONFIG[key];

    return {
        ...config,
        createAnimations: () => config.createAnimations(animationManager, config.spriteKey)
    };
};

