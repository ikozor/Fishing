const gameEngine = new GameEngine();
var DEBUG = false;

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Assets/Objects/Fishing_hut.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/grassblock.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Water.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Boat.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Title.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Woodcutter_fish.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Woodcutter_hook.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Fisherman_hook.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/Fisherman_idle.png");
ASSET_MANAGER.queueDownload("./Assets/Objects/hook.png");

ASSET_MANAGER.queueDownload("./Assets/Fish/1.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/2.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/3.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/4.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/5.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/6.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/7.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/8.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/1R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/2R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/3R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/4R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/5R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/6R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/7R.png");
ASSET_MANAGER.queueDownload("./Assets/Fish/8R.png");

ASSET_MANAGER.queueDownload("./Assets/Obsticals/Bomb.png");
ASSET_MANAGER.queueDownload("./Assets/Obsticals/Anchor.png");

ASSET_MANAGER.queueDownload("./Assets/Background/Mast.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Seaweed_1.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Seaweed_2.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Steering-wheel.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Stone_1.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Stone_2.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Stone_3.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Stone_4.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Stone_5.png");
ASSET_MANAGER.queueDownload("./Assets/Background/Stone_6.png");

ASSET_MANAGER.queueDownload("./Assets/Objects/CatchBG.png");

ASSET_MANAGER.queueDownload("./Assets/Audio/bk_music.mp3");
ASSET_MANAGER.queueDownload("./Assets/Audio/underwater.mp3");
ASSET_MANAGER.queueDownload("./Assets/Audio/reel.mp3");


ASSET_MANAGER.downloadAll(() => {
	ASSET_MANAGER.autoRepeat("./Assets/Audio/bk_music.mp3");

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.lineWidth = 5;
	ctx.font = "30px Bradley Hand, cursive";
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	
	gameEngine.addEntity(new EntityManager(gameEngine));

	gameEngine.start();
});