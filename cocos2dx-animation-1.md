spriteを順番にactionさせる
```cpp
auto downAction = MoveBy::create(0.5, Point(0, 30));
auto upActiopn = MoveBy::create(0.5, Point(0, -30));
//Spawnは２つのアクションを制御することができる、２つ以上はSequeneにすること
auto upDownAction = Spawn::create(downAction, upActiopn, NULL);
sprite->runAction(upDownAction);
```

spriteを順番にactionさせ、ループさせる
```cpp
auto downAction = MoveBy::create(0.5, Point(0, 30));
auto upActiopn = MoveBy::create(0.5, Point(0, -30));
//Sequenceは複数のアクションを順番に行うことができる
auto sequence = Sequence::create(downAction, upActiopn, NULL);
auto repeatForever = RepeatForever::create(sequence);
sprite->runAction(repeatForever);
```
