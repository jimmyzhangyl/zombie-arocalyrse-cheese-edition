namespace SpriteKind {
    export const weapon = SpriteKind.create()
}
function fire () {
    if (direction == 1) {
        bullet = sprites.createProjectileFromSprite(assets.image`bullet`, playerSprite, -100, 0)
    } else if (direction == 2) {
        bullet = sprites.createProjectileFromSprite(assets.image`bullet`, playerSprite, 0, 100)
    } else if (direction == 3) {
        bullet = sprites.createProjectileFromSprite(assets.image`bullet`, playerSprite, 100, 0)
    } else if (direction == 4) {
        bullet = sprites.createProjectileFromSprite(assets.image`bullet`, playerSprite, 0, -100)
    } else {
    	
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile2, function (sprite, location) {
    game.over(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bulletNumber.value > 0) {
        fire()
        bulletNumber.value += -1
    }
})
function nextLevel () {
    tiles.setTilemap(tilemap`level2`)
    level += 1
    tiles.placeOnRandomTile(playerSprite, sprites.castle.tileDarkGrass2)
    for (let value of tiles.getTilesByType(sprites.builtin.forestTiles24)) {
        zombie = sprites.create(assets.image`Normal Zombie`, SpriteKind.Enemy)
        zombieHp = statusbars.create(16, 4, StatusBarKind.EnemyHealth)
        zombieHp.attachToSprite(zombie)
        zombieHp.max = 3
        tiles.placeOnTile(zombie, value)
        animation.runImageAnimation(
        zombie,
        assets.animation`zombie normal Animation`,
        500,
        true
        )
    }
    for (let value of tiles.getTilesByType(sprites.builtin.forestTiles0)) {
        weapon = sprites.create(assets.image`Sniper`, SpriteKind.weapon)
        bulletNumber = statusbars.create(14, 2, StatusBarKind.Energy)
        bulletNumber.attachToSprite(weapon, 2, 0)
        tiles.placeOnTile(weapon, value)
    }
}
function isAround (mySprite: Sprite, mySprite2: Sprite, num: number) {
    if (Math.abs(mySprite.x - mySprite2.x) > num) {
    	
    } else if (Math.abs(mySprite.y - mySprite2.y) > num) {
    	
    } else {
        return true
    }
    return false
}
// 0: initial
// 1:East
// 2:South
// 3:West
// 4:North
function updateDirection () {
    if (playerSprite.vx > 0) {
        direction = 3
    } else if (playerSprite.vx < 0) {
        direction = 1
    } else if (playerSprite.vy > 0) {
        direction = 2
    } else if (playerSprite.vy < 0) {
        direction = 4
    } else {
    	
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.weapon, function (sprite, otherSprite) {
    otherSprite.follow(sprite, 800)
    bulletNumber.max = 10
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value <= 0) {
        otherSprite.destroy(effects.fire, 500)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.zapped.play()
    info.changeLifeBy(-1)
    pause(2000)
})
let weapon: Sprite = null
let zombieHp: StatusBarSprite = null
let zombie: Sprite = null
let bulletNumber: StatusBarSprite = null
let bullet: Sprite = null
let direction = 0
let playerSprite: Sprite = null
playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
controller.moveSprite(playerSprite)
scene.cameraFollowSprite(playerSprite)
animation.runImageAnimation(
playerSprite,
[img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f 4 4 f b f e f . . 
    . . f e 4 1 f d d f 1 4 e f . . 
    . . . f e 4 d d d d 4 e f e . . 
    . . f e f 2 2 2 2 e d d 4 e . . 
    . . e 4 f 2 2 2 2 e d d e . . . 
    . . . . f 4 4 5 5 f e e . . . . 
    . . . . f f f f f f f . . . . . 
    . . . . f f f . . . . . . . . . 
    `,img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f e e 2 2 2 2 2 2 e f f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f 4 4 f b f e f . . 
    . . f e 4 1 f d d f 1 4 e f . . 
    . . e f e 4 d d d d 4 e f . . . 
    . . e 4 d d e 2 2 2 2 f e f . . 
    . . . e d d e 2 2 2 2 f 4 e . . 
    . . . . e e f 5 5 4 4 f . . . . 
    . . . . . f f f f f f f . . . . 
    . . . . . . . . . f f f . . . . 
    `],
500,
true
)
info.setLife(3)
nextLevel()
let level = 0
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        // measure the distance from center of both sprites
        if (isAround(playerSprite, value, 60)) {
            value.follow(playerSprite, 10)
        }
    }
    updateDirection()
})
