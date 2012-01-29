var win = Titanium.UI.currentWindow;

//
Ti.include('setup.js');

// 設定表示用のTableView
var tableView = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
// クレジット用の行
tableView.appendRow((function() {
	var row = Titanium.UI.createTableViewRow({
		height:72,
		backgroundColor: '#bcd'
	});
	// タッチしても選択状態にならないようにする（青反転しないようにする）
	//row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
	row.add(Titanium.UI.createImageView({
		image: 'images/appicon.png',top: 8,left:8,width:57,height:57
	}));
	row.add(Titanium.UI.createLabel({
		text: app_title,
		top: 16,left:78,height:16
	}));
	row.add(Titanium.UI.createLabel({
		text: app_site_url,
		font: {fontSize: 12},top: 35,left:80,height:16
	}));
	row.add(Titanium.UI.createLabel({
		text: '#safariが起動して紹介サイトが開きます。',
		font: {fontSize: 11},top: 52,left:72,height:16
	}));
	return row;
})());
// 見出し用の行
tableView.appendRow((function() {
	var row = Titanium.UI.createTableViewRow({
		height:32,
		backgroundColor:'#ccc'
	});
	row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
	row.add(Titanium.UI.createLabel({
		text: 'Setting',
		height:'auto',
		left:8,
		width:300
	}));
	return row;
})());
// 設定選択用のRowを作成する
var geoOptRow = function(title, checked) {
	var row = Titanium.UI.createTableViewRow({
		height:50
	});
	row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
	row.add(Titanium.UI.createLabel({
		text: title,
		height:'auto',
		left:8,
		width:320
	}));
	if(checked) {
		row.hasCheck = true;
	}
	return row;
};
// 設定値の読み取りと行追加（前回設定値によりチェック状態を復元する）
var optInfoGeo = Ti.App.Properties.getInt('info_geo', 0);
tableView.appendRow(geoOptRow('現在地あり', (optInfoGeo == 0)));
tableView.appendRow(geoOptRow('現在地なし', (optInfoGeo == 1)));

// TableViewクリック時のイベント
tableView.addEventListener('click', function(e) {
	var index = e.index;
	var section = e.section;
	if(index == 0){
		Titanium.Platform.openURL(app_site_url);
	}
	if(index > 1 && index <=5) {
		// 2番目以降が設置可能なRowなのでそれだけを採用する
		// すべてチェックをオフして、今回値のみオンにする
		for (var i = 2; i < section.rows.length; i++) {
			section.rows[i].hasCheck = false;
		}
		section.rows[index].hasCheck = true;
		// アプリケーションプロパティとして保存し、tweet.jsで使用できるようにする
		Ti.App.Properties.setInt('info_geo', index - 2);
	}
});
win.add(tableView);