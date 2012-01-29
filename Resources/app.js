// ベース色は黒
Titanium.UI.setBackgroundColor('#000');

// TabGroupを作成する
var tabGroup = Titanium.UI.createTabGroup();

//
Ti.include('setup.js');

var tab1 = Titanium.UI.createTab({
	icon: 'images/dark_heart.png',
	title: 'Button',
	window: Titanium.UI.createWindow({
		title: buttons_name,
		backgroundColor: '#fff',
		url: 'button.js'
	})
});
var tab2 = Titanium.UI.createTab({
	icon: 'images/dark_home.png',
	title: 'Home TL',
	window: Titanium.UI.createWindow({
		title: 'Home タイムライン',
		backgroundColor: '#fff',
		url: 'timeline.js'
	})
});
var tab3 = Titanium.UI.createTab({
	icon: 'images/dark_search.png',
	title: '検索',
	window: Titanium.UI.createWindow({
		title: '検索',
		backgroundColor: '#fff',
		url: 'search.js'
	})
});
var tab4 =  Titanium.UI.createTab({
	icon: 'images/dark_wrench.png',
	title: '設定',
	window: Titanium.UI.createWindow({
		title: '設定',
		backgroundColor: '#fff',
		url: 'config.js',
		barColor: '#000'
	})
});

// タブを追加しTabGroupを表示する
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.open();
