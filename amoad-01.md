Admobは開発時ににはテスト広告が使用が推奨されている、
このテスト広告を使用するためにはtestDvicesの配列にD端末IDを追加すれば良い。
DeviecIDはAdmob固有のものでiPhone UIDなどとは別物である。
端末がiOSシュミレーター、Androidエミュレターの場合はGAD_SIMULATOR_IDを使用する。

端末IDをを知るには[GADRequest request]時に出力されるログに表示される
**<Google> To get test ads on this device, call: request.testDevices = @[**
**@"ここに端末IDが表示される" ];**

このためテスト端末を利用するときは**はじめの1回は本番環境として起動**する必要がある。

ちょっと考えればあたりまえだが、
https://developers.google.com/mobile-ads-sdk/docs/admob/ios/targeting?hl=ja#test_ads
>開発段階では、表示回数が不正にカウントされないよう、テスト広告を使用することをおすすめします。

と記載されていたので、はじめの1回が不正になるのじゃないかと考えていたため、
本番環境での起動に躊躇してしまった。
AdmobさんはGoogleIDを結構警告(とBAN)すると聞いたので
