Cocos2d-x v3.6
```cpp
auto mySprite = Sprite::create();
auto action = FadeOut::create(0.1);
mySprite->runAction(action);
// ラムダ式でコールバックを設定する
auto callback = CallFuncN::create([](Ref *sender){
  //コールバック処理をここに書く
  Node *node = (Node *)sender;
  node->removeFromParent();
});
// アクションとコールバックをシーケンスに設定する
auto seq = Sequence::create(action, callback, NULL);
mySprite->runAction(seq);
```
