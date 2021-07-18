import MainScene from "./MainScene.js";

const config = {
    width:512,
    height:512,
    backgroundColor:'#777777',
    type: Phaser.AUTO,
    parent: 'survival-game', // ID of div to attach to
    scene:[MainScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug:true,
            gravity:{y:0},
        }
    },
    plugins: {
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config);
