//データの保存
UserDefault *userDefault = UserDefault::getInstance();
userDefault->setStringForKey("key", "set data");
userDefault->setIntegerForKey("key", 1);
userDefault->setFloatForKey("key", 1.0f);
userDefault->setBoolForKey("key", true);

//データの読み込み
auto value = userDefault->getStringForKey("key");
auto value = userDefault->getIntegerForKey("key");
auto value = userDefault->getFloatForKey("key");
auto value = userDefault->getBoolForKey("key");


// アニメーションの作成
Vector<SpriteFrame *> frames;
const auto playerSize = mySprite->getContentSize();
const int animationFrameCount = 3;
for (int i = 0; i < animationFrameCount; ++i) {
    auto rect = Rect(playerSize.width * i, 0, playerSize.width, playerSize.height);
    auto frame = SpriteFrame::create("ninja.png", rect) ;
    frames.pushBack(frame);
}
auto animation = Animation::createWithSpriteFrames(frames, 10.0 / 60.0);
animation->setLoops(3);
animation->setRestoreOriginalFrame(true);
mySprite->runAction(Sequence::create(Animate::create(animation),
                                    CallFunc::create([this] {
    _isCrash = false;
}),
                                    NULL));
_score = MAX(0, _score - BOMB_PENALTY_SCORE); // 0未満になったら0点にする
CocosDenshion::SimpleAudioEngine::getInstance()->playEffect(AudioUtils::getFileName("crash").c_str());