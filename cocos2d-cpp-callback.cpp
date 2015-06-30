auto action = FadeOut::create(0.1);
fadeChar->runAction(action);
// CallFuncNを使用する、引数はC++11のラムダ式
auto callback = CallFuncN::create([](Ref *sender){
	Node *node = (Node *)sender;
	node->removeFromParent();
});
auto seq = Sequence::create(action, callback, NULL);
fadeChar->runAction(seq);
