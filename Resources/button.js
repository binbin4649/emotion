var win = Titanium.UI.currentWindow;

Titanium.include("titwitter.js");
Ti.include('lib/cache.js');
Ti.include('lib/tenki_api.js');
Ti.include('setup.js');

Ti.Geolocation.purpose = "ざっくりとした現在地をツイートに含めます。";

var label1 = Titanium.UI.createLabel({
	text: '今、どう？',font: {fontSize:13},
	top: 14,left:15,height:16
});
win.add(label1);

var button1 = Titanium.UI.createButton({
	title:'喜',height:96,width:145,top:40,left:10,image:left_top_img
});
win.add(button1);

var button2 = Titanium.UI.createButton({
	title:'怒',height:96,width:145,top:40,left:165,image:right_top_img
});
win.add(button2);

var button3 = Titanium.UI.createButton({
	title:'哀',height:96,width:145,top:146,left:10,image:left_bottom_img
});
win.add(button3);

var button4 = Titanium.UI.createButton({
	title:'楽',height:96,width:145,top:146,left:165,image:right_bottom_img
});
win.add(button4);

var actInd = Titanium.UI.createActivityIndicator({
	top: 90,
	height: 100,
	width: 100,
	opacity:0.5,
	borderRadius:5,
	color : '#ffffff',
	BackgroundColor:'#000000',
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
});
win.add(actInd);

var TiAdmaker, adView, win;
TiAdmaker = require('co.saiten.ti.admaker');
adView = TiAdmaker.createView({
    backgroundColor:'white',
	top: 315,
	width: 320,
	height: 50,
	adUrl: Admaker_adUrl,
	siteId: Admaker_siteId,
	zoneId: Admaker_zoneId
});
adView.addEventListener('success', function() {
	return Ti.API.debug("request success");
});
adView.addEventListener('fail', function() {
	return Ti.API.debug("request failed");
});
win.add(adView);

button1.addEventListener('click', function(){
	if(Titanium.Network.online == false) { alert(networkMessage); return; }
	actInd.show();
	postTweet(left_top_text);
});

button2.addEventListener('click', function(){
	if(Titanium.Network.online == false) { alert(networkMessage); return; }
	actInd.show();
	postTweet(right_top_text);
});

button3.addEventListener('click', function(){
	if(Titanium.Network.online == false) { alert(networkMessage); return; }
	actInd.show();
	postTweet(left_bottom_text);
});

button4.addEventListener('click', function(){
	if(Titanium.Network.online == false) { alert(networkMessage); return; }
	actInd.show();
	postTweet(right_bottom_text);
});

var twitterName = function(callback){
	var twitter_name = Ti.App.Cache.get('twitter_name');
	if(twitter_name == null){
		twitterApi.account_verify_credentials({
			onSuccess: function(ret){
				Ti.API.info('[twitterName cache None:]'+ret.name);
				//Ti.App.Cache.put('twitter_name', ret.name, 86400);//キャッシュタイム　１日：86400
				Ti.App.Cache.put('twitter_name', ret.name, 86400);//開発用　１日：86400
				callback(ret.name);
				// return ret.name;
			},
			onError: function(error){
				actInd.hide();
				alert('今ちょっと通信状況が悪いみたいです。もう一度お試しください。');
				callback(null);
	    		//return null;
			}
		});
	}else{
		Ti.API.info('[twitterName cache Existence:]'+twitter_name);
		callback(twitter_name);
		// return twitter_name;
	}
};

//設定と実際に取得できるかどうかを加味して、位置情報を付加するかどうか判定する
function infoGeo(){
	var optInfoGeo = Ti.App.Properties.getInt('info_geo', 0);
	Ti.API.info('[optInfoGeo]'+optInfoGeo);
	if(optInfoGeo == 0){
		if(Titanium.Geolocation.locationServicesEnabled){
			return 1;
		}else{
			return 0;
		}
	}else{
		return 0;
	}
};

var reverseGeoCoder = function(coords,callback){
	var lon = 'lon='+coords.longitude;
	var lat = '&lat='+coords.latitude;
	var appid = '&appid='+yahoo_appid;
	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 100000;
	xhr.open("GET","http://reverse.search.olp.yahooapis.jp/OpenLocalPlatform/V1/reverseGeoCoder?"+lon+lat+appid);
	xhr.onload = function(){
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("Name");
		//Ti.API.info('[getCurrentPosition]' + items.item(1).text);
		//Ti.API.info('[getCurrentPosition]' + items.item(2));
		if(items.item(1) && items.item(2)){
			var todofuken = items.item(1).text;
			var sikuchoson = items.item(2).text;
			var adress = [todofuken, sikuchoson];
			callback(adress);
		}else{
			callback(null);
		}
	};
	xhr.send();
};

var postTweet = function(val) {
	// 発言内容を変数にセットし、画面の値をクリアする
	var status = val[1]; //発言
	var hashtag2 = val[0]; //ハッシュタグ２
	// 発言内容が空の場合はなにもしない。
	if(status === '') {
		return;
	}
	// 140文字以上のときはエラーとする。
	if(status.length > 140) {
		textarea.value = status;
		Titanium.UI.createAlertDialog({
			title: 'TinyTweet',
			message: '発言内容が長すぎます。'
		}).show();
		return;
	}
	twitterName(function(twitter_name){
		var infogeo = infoGeo();
		var dialog = Titanium.UI.createAlertDialog();
		dialog.setTitle('Tweet');
		if(infogeo == 1){//geoが取れる場合
			Titanium.Geolocation.getCurrentPosition(function(e){
				if(e.error){
					Ti.API.error(e.error);
					return;
				}
				var coords = e.coords;
				reverseGeoCoder(coords, function(adress){
					//20111031 変更した辺り
					Ti.API.info('[adress_name]'+adress);
					if(adress == null){
						var hashtag = '#' + hashtag2;
						var adress_name = '地球のどこか';
					}else{
						var adress_name = adress[0] + adress[1];
						var hashtag = '#' + adress[0] + hashtag2;
					}
					
					status = twitter_name+'は'+adress_name+'で'+status+' '+hashtag+' '+twitter_ac_name;
					actInd.hide();
					TiTwitter.postTweet(status);
					dialog.setMessage(status);
					dialog.show();
					Titanium.App.Properties.setString('query_string', hashtag);
					var search = Ti.UI.createWindow({url:"search.js"});
					Titanium.UI.currentTab.open(search);
					
					/*天気API
					plusTenki(coords.latitude, coords.longitude, function(tenki_plus){
						Ti.API.info('[reverseGeoCoder8]'+tenki_plus);
						status = twitter_name+'は'+tenki_plus+adress_name+'で'+status+' '+hashtag+' '+twitter_ac_name;
						actInd.hide();
						TiTwitter.postTweet(status); // Tweetを行います。
						dialog.setMessage(status); 
						dialog.show();
						Titanium.App.Properties.setString('query_string', hashtag);
						var search = Ti.UI.createWindow({url:"search.js"});
						Titanium.UI.currentTab.open(search);
					});
					*/
				});
			});
		}else{//geoが取れない場合
			var hashtag = '#'+hashtag2;
			status = twitter_name+'は'+status+' '+hashtag;
			actInd.hide();
			TiTwitter.postTweet(status); // Tweetを行います。
			dialog.setMessage(status); 
			dialog.show();
			Titanium.App.Properties.setString('query_string', hashtag);
			var search = Ti.UI.createWindow({url:"search.js"});
			Titanium.UI.currentTab.open(search);
		}
	});
};