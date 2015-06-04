// ディスプレイのサイズとoriginを取得する、よく使う
Size visibleSize = Director::getInstance()->getVisibleSize();
// originは"実際に描画される領域の原点座標"
// 詳しくは http://goo.gl/GBnhuQ
Point origin = Director::getInstance()->getVisibleOrigin();

// Spriteを配置する
mySprite = Sprite::create("stick.png");
mySprite->setPosition(Point((visibleSize.width / 2) + origin.x, (visibleSize.height / 2) + origin.y));
mySprite->setPosition(100, 100);
this->addChild(mySprite);

// Nodeを指定位置に移動させる
auto action = MoveTo::create(3, Point(visibleSize.width, visibleSize.height));
mySprite->runAction(action);

// Nodeを指定座標分移動させる
auto action = MoveBy::create(3, Point(visibleSize.width, visibleSize.height));
mySprite->runAction(action);

// Nodeをアニメーション無しで移動させる
auto action = Place::create(Point(visibleSize.width, visibleSize.height));
mySprite->runAction(action);

// 配置したNodeを移動させる
auto action = JumpBy::create(3, Point(100, 0), 50, 3);
mySprite->runAction(action);

// Nodeを指定角度で回転させる
auto action = RotateTo::create(3, 90);
mySprite->runAction(action);

// Nodeを指定角度分界点させる
auto action = RotateBy::create(3, 90);
mySprite->runAction(action);

// Nodeを指定した大きさにする
auto action = ScaleBy::create(3, 3, 0.25);
mySprite->runAction(action);

// Nodeが消える
auto action = FadeOut::create(3);
mySprite->runAction(action);

// 消えたNodeが出てくる
auto action = FadeIn::create(3);
mySprite->runAction(action);

// Nodeに指定したアルファをにする
auto action = FadeTo::create(3, 100);
mySprite->runAction(action);

// Nodeの配色を変更する
auto action = TintTo::create(3, -255, -200, -200);
mySprite->runAction(action);

// Nodeの配色を変更する
auto action = TintBy::create(3, -255, -200, -200);
mySprite->runAction(action);

// ベジェ曲線を使って移動させる
// MoveToだと直線移動しかできないが、bezierならなめらかな曲線を描いて移動する
ccBezierConfig bezier;
bezier.controlPoint_1 = Point(0, visibleSize.height / 2);
bezier.controlPoint_2 = Point(300, -visibleSize.height / 2);
bezier.endPosition = Point(200, 100);
auto action = BezierBy::create(3, bezier);
mySprite->runAction(action);

// 指定したアクションを指定回数繰り返す
auto rotateAction = RotateBy::create(2, 45);
auto action = Repeat::create(rotateAction, 10);
mySprite->runAction(action);

// 指定したアクションを永久に繰り返す
auto rotateAction = RotateBy::create(2, 45);
auto action = RepeatForever::create(rotateAction);
mySprite->runAction(action);

// 別のアクション終了時にアクションを起こす
// 移動したあとに爆発する、回転後にダッシュする、などで使用する
auto rotateAction = RotateBy::create(2, 118);
auto action = Sequence::create(rotateAction, MoveBy::create(5, Point(100, -90)), NULL);
mySprite->runAction(action);

// Nodeを相対的にXY方向に変形させる
auto action = SkewBy::create(4, 10, 50);
mySprite->runAction(action);

// NodeをXY方向に変形させる
auto action = SkewTo::create(4, 10, 50);
mySprite->runAction(action);

// サウンドを鳴らす、BGMのメソッドは別
// #include "SimpleAudioEngine.h"が必要
// Resouce/audio/にCollide.wavが必要
// 音声ファイルをXcodeに追加すること
CocosDenshion::SimpleAudioEngine::getInstance()->preloadEffect("audio/Collide.wav");
CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("audio/Collide.wav");

// タッチを検出する、スマホアプリには必須
// ヘッダーに以下を追加
/*
bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
*/
auto listener = EventListenerTouchOneByOne::create();
listener->setSwallowTouches(true);

listener->onTouchBegan = CC_CALLBACK_2(HelloWorld::onTouchBegan, this);
listener->onTouchMoved = CC_CALLBACK_2(HelloWorld::onTouchMoved, this);
listener->onTouchEnded = CC_CALLBACK_2(HelloWorld::onTouchEnded, this);

_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);

bool HelloWorld::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event *event)
{
    CCLOG("onTouchBegan x = %f, y = %f", touch->getLocation().x, touch->getLocation().y);
    
    return true;
}
void HelloWorld::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event)
{
    CCLOG("onTouchMoved x = %f, y = %f", touch->getLocation().x, touch->getLocation().y);
}
void HelloWorld::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event)
{
    CCLOG("onTouchEnded x = %f, y = %f", touch->getLocation().x, touch->getLocation().y);
}

// マルチタッチ
// タッチとの違いはonTouchBegan -> onTouch"es"Beganだけ
// ヘッダーに以下を追加
/*
 void onTouchesBegan(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *event);
 void onTouchesMoved(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *event);
 void onTouchesEnded(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *event);
 */
auto listener = EventListenerTouchAllAtOnce::create();
listener->onTouchesBegan = CC_CALLBACK_2(HelloWorld::onTouchesBegan, this);
listener->onTouchesMoved = CC_CALLBACK_2(HelloWorld::onTouchesMoved, this);
listener->onTouchesEnded = CC_CALLBACK_2(HelloWorld::onTouchesEnded, this);

_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);

void HelloWorld::onTouchesBegan(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *event)
{
    CCLOG("onTouchesBegan");
}

void HelloWorld::onTouchesMoved(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *event)
{
    CCLOG("onTouchesMoved");
}

void HelloWorld::onTouchesEnded(const std::vector<cocos2d::Touch *> &touches, cocos2d::Event *event)
{
    CCLOG("onTouchesEnded");
}

// メニューボタン
// ヘッダーに以下を追加
/*
 void Play(Ref *pSender);
 void Highscores(Ref *pSender);
 void Settings(Ref *pSender);
 void ImageButton(Ref *pSender);
 */
// もぐらたたき、などのゲームでもぐらをmenuにするのはおすすめしない、できればonTouchで判定させるべき
auto menu_item_1 = MenuItemFont::create("Play", CC_CALLBACK_1(HelloWorld::Play, this));
auto menu_item_2 = MenuItemFont::create("Highscores", CC_CALLBACK_1(HelloWorld::Highscores, this));
auto menu_item_3 = MenuItemFont::create("Settings", CC_CALLBACK_1(HelloWorld::Settings, this));
auto menu_item_4 = MenuItemImage::create("CloseNormal.png", "CloseSelected.png", CC_CALLBACK_1(HelloWorld::ImageButton, this));

menu_item_1->setPosition(Point(visibleSize.width / 2, (visibleSize.height / 5) * 4));
menu_item_2->setPosition(Point(visibleSize.width / 2, (visibleSize.height / 5) * 3));
menu_item_3->setPosition(Point(visibleSize.width / 2, (visibleSize.height / 5) * 2));
menu_item_4->setPosition(Point(visibleSize.width / 2, (visibleSize.height / 5) * 1));

auto *menu = Menu::create(menu_item_1, menu_item_2, menu_item_3, menu_item_4, NULL);
menu->setPosition(Point(0, 0));
this->addChild(menu);

void HelloWorld::menuCloseCallback(Ref* pSender)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WP8) || (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
    MessageBox("You pressed the close button. Windows Store Apps do not implement a close button.","Alert");
    return;
#endif
    
    Director::getInstance()->end();
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}
void HelloWorld::Play(cocos2d::Ref *pSender)
{
    CCLOG("Play");
}
void HelloWorld::Highscores(cocos2d::Ref *pSender)
{
    CCLOG("Highscores");
}
void HelloWorld::Settings(cocos2d::Ref *pSender)
{
    CCLOG("Settings");
}
void HelloWorld::ImageButton(cocos2d::Ref *pSender)
{
    CCLOG("IMAGE Button");
}

// メニューアライメント
// メニューを縦横一列に表示したい時に使う
auto *menu = Menu::create(menu_item_1, menu_item_2, menu_item_3, menu_item_4, NULL);
menu->alignItemsVertically();
this->addChild(menu);

// シーンの切り替え
// ヘッダーに#include "NewScene.h"を追加
auto scene = NewScene::createScene();
Director::getInstance()->pushScene(scene);

// トランジッション付きのシーン切り替え
auto scene = NewScene::createScene();
Director::getInstance()->replaceScene(TransitionFlipX::create(2, scene));


