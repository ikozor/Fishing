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


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	
	em = new EntityManager(gameEngine);
	em.create();

	gameEngine.start();
});