//
var tenkiApi_userId = 'tenki api user id here';

//2点間の距離を返す
function geoDistance(lat1, lng1, lat2, lng2, precision) {
  // lat緯度,lng経度、測地系はWGS84、世界標準の方らしい
  // 引数　precision は小数点以下の桁数（距離の精度）
  var distance = 0;
  if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
    distance = 0;
  } else {
    lat1 = lat1 * Math.PI / 180;
    lng1 = lng1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lng2 = lng2 * Math.PI / 180;
    var A = 6378140;
    var B = 6356755;
    var F = (A - B) / A;
    var P1 = Math.atan((B / A) * Math.tan(lat1));
    var P2 = Math.atan((B / A) * Math.tan(lat2));
    var X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
    var L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));
    distance = A * (X + L);
    var decimal_no = Math.pow(10, precision);
    distance = Math.round(decimal_no * distance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
  }
  return distance;
}

//緯度経度で現在地から最も近い代表都市のコードを返す
function geoNearby(lat1, lng1){
	var codes = [{"code":1100,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"宗谷地方","rep_name":"稚内","lat":45.415664,"lng":141.673082},
{"code":1200,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"上川地方","rep_name":"旭川","lat":43.770636,"lng":142.364819},
{"code":1300,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"留萌地方","rep_name":"留萌","lat":43.940987,"lng":141.637012},
{"code":1400,"city_code":1,"rep_code":1,"pre_name":"北海道","area_name":"石狩地方","rep_name":"札幌","lat":43.062096,"lng":141.354376},
{"code":1500,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"空知地方","rep_name":"岩見沢","lat":43.196206,"lng":141.775933},
{"code":1600,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"後志地方","rep_name":"倶知安","lat":42.901829,"lng":140.758698},
{"code":1710,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"網走地方","rep_name":"網走","lat":44.020632,"lng":144.273398},
{"code":1720,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"北見地方","rep_name":"北見","lat":43.807923,"lng":143.894276},
{"code":1730,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"紋別地方","rep_name":"紋別","lat":44.356584,"lng":143.354095},
{"code":1800,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"根室地方","rep_name":"根室","lat":43.330076,"lng":145.58279},
{"code":1900,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"釧路地方","rep_name":"釧路","lat":42.984854,"lng":144.381356},
{"code":2000,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"十勝地方","rep_name":"帯広","lat":42.923899,"lng":143.196103},
{"code":2100,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"胆振地方","rep_name":"室蘭","lat":42.315231,"lng":140.973799},
{"code":2200,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"日高地方","rep_name":"浦河","lat":42.168516,"lng":142.76812},
{"code":2300,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"渡島地方","rep_name":"函館","lat":41.768793,"lng":140.72881},
{"code":2400,"city_code":1,"rep_code":0,"pre_name":"北海道","area_name":"檜山地方","rep_name":"江差","lat":41.869156,"lng":140.12746},
{"code":3110,"city_code":2,"rep_code":1,"pre_name":"青森県","area_name":"津軽","rep_name":"青森","lat":40.822072,"lng":140.747365},
{"code":3120,"city_code":2,"rep_code":0,"pre_name":"青森県","area_name":"下北","rep_name":"むつ","lat":41.292746,"lng":141.183476},
{"code":3130,"city_code":2,"rep_code":0,"pre_name":"青森県","area_name":"三八上北","rep_name":"八戸","lat":40.512284,"lng":141.488399},
{"code":3210,"city_code":5,"rep_code":1,"pre_name":"秋田県","area_name":"沿岸","rep_name":"秋田","lat":39.720008,"lng":140.102564},
{"code":3220,"city_code":5,"rep_code":0,"pre_name":"秋田県","area_name":"内陸","rep_name":"横手","lat":39.311251,"lng":140.553159},
{"code":3310,"city_code":3,"rep_code":1,"pre_name":"岩手県","area_name":"内陸","rep_name":"盛岡","lat":39.702053,"lng":141.154484},
{"code":3320,"city_code":3,"rep_code":0,"pre_name":"岩手県","area_name":"沿岸北部","rep_name":"宮古","lat":39.64142,"lng":141.957139},
{"code":3330,"city_code":3,"rep_code":0,"pre_name":"岩手県","area_name":"沿岸南部","rep_name":"大船渡","lat":39.081901,"lng":141.70853},
{"code":3410,"city_code":4,"rep_code":1,"pre_name":"宮城県","area_name":"東部","rep_name":"仙台","lat":38.268215,"lng":140.869356},
{"code":3420,"city_code":4,"rep_code":0,"pre_name":"宮城県","area_name":"西部","rep_name":"白石","lat":38.002478,"lng":140.619861},
{"code":3510,"city_code":6,"rep_code":1,"pre_name":"山形県","area_name":"村山","rep_name":"山形","lat":38.255439,"lng":140.339602},
{"code":3520,"city_code":6,"rep_code":0,"pre_name":"山形県","area_name":"置賜","rep_name":"米沢","lat":37.92224,"lng":140.116781},
{"code":3530,"city_code":6,"rep_code":0,"pre_name":"山形県","area_name":"庄内","rep_name":"酒田","lat":38.914433,"lng":139.836515},
{"code":3540,"city_code":6,"rep_code":0,"pre_name":"山形県","area_name":"最上","rep_name":"新庄","lat":38.765015,"lng":140.301608},
{"code":3610,"city_code":7,"rep_code":1,"pre_name":"福島県","area_name":"中通り","rep_name":"福島","lat":37.760723,"lng":140.473356},
{"code":3620,"city_code":7,"rep_code":0,"pre_name":"福島県","area_name":"浜通り","rep_name":"小名浜","lat":36.945708,"lng":140.894349},
{"code":3630,"city_code":7,"rep_code":0,"pre_name":"福島県","area_name":"会津","rep_name":"若松","lat":37.494761,"lng":139.92981},
{"code":5010,"city_code":22,"rep_code":1,"pre_name":"静岡県","area_name":"中部","rep_name":"静岡","lat":34.975562,"lng":138.38276},
{"code":5020,"city_code":22,"rep_code":0,"pre_name":"静岡県","area_name":"伊豆","rep_name":"網代","lat":35.043506,"lng":139.081551},
{"code":5030,"city_code":22,"rep_code":0,"pre_name":"静岡県","area_name":"東部","rep_name":"三島","lat":35.118402,"lng":138.918513},
{"code":5040,"city_code":22,"rep_code":0,"pre_name":"静岡県","area_name":"西部","rep_name":"浜松","lat":34.710834,"lng":137.726126},
{"code":5110,"city_code":23,"rep_code":1,"pre_name":"愛知県","area_name":"西部","rep_name":"名古屋","lat":35.181446,"lng":136.906398},
{"code":5120,"city_code":23,"rep_code":0,"pre_name":"愛知県","area_name":"東部","rep_name":"豊橋","lat":34.7692,"lng":137.391466},
{"code":5210,"city_code":21,"rep_code":1,"pre_name":"岐阜県","area_name":"美濃地方","rep_name":"岐阜","lat":35.423298,"lng":136.760654},
{"code":5220,"city_code":21,"rep_code":0,"pre_name":"岐阜県","area_name":"飛騨地方","rep_name":"高山","lat":36.146124,"lng":137.252173},
{"code":5310,"city_code":24,"rep_code":1,"pre_name":"三重県","area_name":"北中部","rep_name":"津","lat":34.643424,"lng":136.415682},
{"code":5320,"city_code":24,"rep_code":0,"pre_name":"三重県","area_name":"南部","rep_name":"尾鷲","lat":34.070799,"lng":136.190995},
{"code":5510,"city_code":16,"rep_code":1,"pre_name":"富山県","area_name":"東部","rep_name":"富山","lat":36.695952,"lng":137.213677},
{"code":5520,"city_code":16,"rep_code":0,"pre_name":"富山県","area_name":"西部","rep_name":"伏木","lat":36.791995,"lng":137.057949},
{"code":5610,"city_code":17,"rep_code":1,"pre_name":"石川県","area_name":"加賀","rep_name":"金沢","lat":36.561325,"lng":136.656205},
{"code":5620,"city_code":17,"rep_code":0,"pre_name":"石川県","area_name":"能登","rep_name":"輪島","lat":37.39059,"lng":136.899196},
{"code":5710,"city_code":18,"rep_code":1,"pre_name":"福井県","area_name":"嶺北","rep_name":"福井","lat":36.064067,"lng":136.219494},
{"code":5720,"city_code":18,"rep_code":0,"pre_name":"福井県","area_name":"嶺南","rep_name":"敦賀","lat":35.645244,"lng":136.055441},
{"code":5410,"city_code":15,"rep_code":1,"pre_name":"新潟県","area_name":"下越","rep_name":"新潟","lat":37.916192,"lng":139.036413},
{"code":5420,"city_code":15,"rep_code":0,"pre_name":"新潟県","area_name":"中越","rep_name":"長岡","lat":37.436513,"lng":138.838921},
{"code":5430,"city_code":15,"rep_code":0,"pre_name":"新潟県","area_name":"上越","rep_name":"高田","lat":34.288503,"lng":134.112213},
{"code":5440,"city_code":15,"rep_code":0,"pre_name":"新潟県","area_name":"佐渡","rep_name":"相川","lat":38.018352,"lng":138.368082},
{"code":4010,"city_code":8,"rep_code":1,"pre_name":"茨城県","area_name":"北部","rep_name":"水戸","lat":36.365856,"lng":140.471221},
{"code":4020,"city_code":8,"rep_code":0,"pre_name":"茨城県","area_name":"南部","rep_name":"土浦","lat":36.071881,"lng":140.196023},
{"code":4110,"city_code":9,"rep_code":1,"pre_name":"栃木県","area_name":"南部","rep_name":"宇都宮","lat":36.555112,"lng":139.882807},
{"code":4120,"city_code":9,"rep_code":0,"pre_name":"栃木県","area_name":"北部","rep_name":"大田原","lat":36.871117,"lng":140.015499},
{"code":4210,"city_code":10,"rep_code":1,"pre_name":"群馬県","area_name":"南部","rep_name":"前橋","lat":36.389482,"lng":139.063428},
{"code":4220,"city_code":10,"rep_code":0,"pre_name":"群馬県","area_name":"北部","rep_name":"みなかみ","lat":36.6787,"lng":138.999064},
{"code":4310,"city_code":11,"rep_code":1,"pre_name":"埼玉県","area_name":"南部","rep_name":"さいたま","lat":35.861729,"lng":139.645482},
{"code":4320,"city_code":11,"rep_code":0,"pre_name":"埼玉県","area_name":"北部","rep_name":"熊谷","lat":36.14731,"lng":139.388645},
{"code":4330,"city_code":11,"rep_code":0,"pre_name":"埼玉県","area_name":"秩父地方","rep_name":"秩父","lat":35.991752,"lng":139.085428},
{"code":4410,"city_code":13,"rep_code":1,"pre_name":"東京都","area_name":"東京地方","rep_name":"東京","lat":35.689506,"lng":139.691701},
{"code":4420,"city_code":13,"rep_code":0,"pre_name":"東京都","area_name":"伊豆諸島北部","rep_name":"大島","lat":34.737098,"lng":139.399337},
{"code":4430,"city_code":13,"rep_code":0,"pre_name":"東京都","area_name":"伊豆諸島南部","rep_name":"八丈島","lat":33.102183,"lng":139.80051},
{"code":4440,"city_code":13,"rep_code":0,"pre_name":"東京都","area_name":"小笠原地方","rep_name":"父島","lat":27.0750533,"lng":142.2116025},
{"code":4510,"city_code":12,"rep_code":1,"pre_name":"千葉県","area_name":"北西部","rep_name":"千葉","lat":35.6072668,"lng":140.1062907},
{"code":4520,"city_code":12,"rep_code":0,"pre_name":"千葉県","area_name":"北東部","rep_name":"銚子","lat":35.7346813,"lng":140.8266406},
{"code":4530,"city_code":12,"rep_code":0,"pre_name":"千葉県","area_name":"南部","rep_name":"館山","lat":34.9965057,"lng":139.8699653},
{"code":4610,"city_code":14,"rep_code":1,"pre_name":"神奈川県","area_name":"東部","rep_name":"横浜","lat":35.4437078,"lng":139.6380256},
{"code":4620,"city_code":14,"rep_code":0,"pre_name":"神奈川県","area_name":"西部","rep_name":"小田原","lat":35.2645639,"lng":139.1521538},
{"code":4810,"city_code":20,"rep_code":1,"pre_name":"長野県","area_name":"北部","rep_name":"長野","lat":36.6485496,"lng":138.1942432},
{"code":4820,"city_code":20,"rep_code":0,"pre_name":"長野県","area_name":"中部","rep_name":"松本","lat":36.238038,"lng":137.972034},
{"code":4830,"city_code":20,"rep_code":0,"pre_name":"長野県","area_name":"南部","rep_name":"飯田","lat":35.5147,"lng":137.821822},
{"code":4910,"city_code":19,"rep_code":1,"pre_name":"山梨県","area_name":"中西部","rep_name":"甲府","lat":35.655625,"lng":138.567574},
{"code":4920,"city_code":19,"rep_code":0,"pre_name":"山梨県","area_name":"東部・富士五湖","rep_name":"河口湖","lat":35.498239,"lng":138.768624},
{"code":6010,"city_code":25,"rep_code":1,"pre_name":"滋賀県","area_name":"南部","rep_name":"大津","lat":35.017893,"lng":135.854607},
{"code":6020,"city_code":25,"rep_code":0,"pre_name":"滋賀県","area_name":"北部","rep_name":"彦根","lat":35.274461,"lng":136.259623},
{"code":6100,"city_code":26,"rep_code":1,"pre_name":"京都府","area_name":"南部","rep_name":"京都","lat":35.011636,"lng":135.768029},
{"code":400,"city_code":26,"rep_code":0,"pre_name":"京都府","area_name":"北部","rep_name":"舞鶴","lat":35.474797,"lng":135.385992},
{"code":6200,"city_code":27,"rep_code":1,"pre_name":"大阪府","area_name":"大阪","rep_name":"大阪","lat":34.693738,"lng":135.502165},
{"code":6310,"city_code":28,"rep_code":1,"pre_name":"兵庫県","area_name":"南部","rep_name":"神戸","lat":34.690083,"lng":135.195511},
{"code":6320,"city_code":28,"rep_code":0,"pre_name":"兵庫県","area_name":"北部","rep_name":"豊岡","lat":35.544473,"lng":134.820184},
{"code":6410,"city_code":29,"rep_code":1,"pre_name":"奈良県","area_name":"北部","rep_name":"奈良","lat":34.685087,"lng":135.805},
{"code":6420,"city_code":29,"rep_code":0,"pre_name":"奈良県","area_name":"南部","rep_name":"風屋","lat":34.043799,"lng":135.781779},
{"code":6510,"city_code":30,"rep_code":1,"pre_name":"和歌山県","area_name":"北部","rep_name":"和歌山","lat":34.230511,"lng":135.170808},
{"code":6520,"city_code":30,"rep_code":0,"pre_name":"和歌山県","area_name":"南部","rep_name":"潮岬","lat":33.447709,"lng":135.7614},
{"code":6610,"city_code":33,"rep_code":1,"pre_name":"岡山県","area_name":"南部","rep_name":"岡山","lat":34.655146,"lng":133.919502},
{"code":6620,"city_code":33,"rep_code":0,"pre_name":"岡山県","area_name":"北部","rep_name":"津山","lat":35.069115,"lng":134.004543},
{"code":6710,"city_code":34,"rep_code":1,"pre_name":"広島県","area_name":"南部","rep_name":"広島","lat":34.385203,"lng":132.455293},
{"code":6720,"city_code":34,"rep_code":0,"pre_name":"広島県","area_name":"北部","rep_name":"庄原","lat":34.857732,"lng":133.017278},
{"code":6810,"city_code":32,"rep_code":1,"pre_name":"島根県","area_name":"東部","rep_name":"松江","lat":35.468059,"lng":133.048375},
{"code":6820,"city_code":32,"rep_code":0,"pre_name":"島根県","area_name":"西部","rep_name":"浜田","lat":34.899303,"lng":132.079783},
{"code":6830,"city_code":32,"rep_code":0,"pre_name":"島根県","area_name":"隠岐","rep_name":"西郷","lat":35.434481,"lng":132.808143},
{"code":6910,"city_code":31,"rep_code":1,"pre_name":"鳥取県","area_name":"東部","rep_name":"鳥取","lat":35.501133,"lng":134.235091},
{"code":6920,"city_code":31,"rep_code":0,"pre_name":"鳥取県","area_name":"中・西部","rep_name":"米子","lat":35.428072,"lng":133.330945},
{"code":8110,"city_code":35,"rep_code":0,"pre_name":"山口県","area_name":"西部","rep_name":"下関","lat":33.957831,"lng":130.941459},
{"code":8120,"city_code":35,"rep_code":1,"pre_name":"山口県","area_name":"中部","rep_name":"山口","lat":34.178496,"lng":131.473727},
{"code":8130,"city_code":35,"rep_code":0,"pre_name":"山口県","area_name":"東部","rep_name":"柳井","lat":33.963833,"lng":132.101597},
{"code":8140,"city_code":35,"rep_code":0,"pre_name":"山口県","area_name":"北部","rep_name":"萩","lat":34.408116,"lng":131.399085},
{"code":7110,"city_code":36,"rep_code":1,"pre_name":"徳島県","area_name":"北部","rep_name":"徳島","lat":34.07027,"lng":134.554844},
{"code":7120,"city_code":36,"rep_code":0,"pre_name":"徳島県","area_name":"南部","rep_name":"日和佐","lat":33.728843,"lng":134.530636},
{"code":7200,"city_code":37,"rep_code":1,"pre_name":"香川県","area_name":"高松","rep_name":"高松","lat":34.342788,"lng":134.046574},
{"code":7310,"city_code":38,"rep_code":1,"pre_name":"愛媛県","area_name":"中予","rep_name":"松山","lat":33.839157,"lng":132.765575},
{"code":7320,"city_code":38,"rep_code":0,"pre_name":"愛媛県","area_name":"東予","rep_name":"新居浜","lat":33.96029,"lng":133.283351},
{"code":7330,"city_code":38,"rep_code":0,"pre_name":"愛媛県","area_name":"南予","rep_name":"宇和島","lat":33.22334,"lng":132.560558},
{"code":7410,"city_code":39,"rep_code":1,"pre_name":"高知県","area_name":"中部","rep_name":"高知","lat":33.558803,"lng":133.531167},
{"code":7420,"city_code":39,"rep_code":0,"pre_name":"高知県","area_name":"東部","rep_name":"室戸","lat":33.290009,"lng":134.152051},
{"code":7430,"city_code":39,"rep_code":0,"pre_name":"高知県","area_name":"西部","rep_name":"清水","lat":32.783389,"lng":132.957889},
{"code":8210,"city_code":40,"rep_code":1,"pre_name":"福岡県","area_name":"福岡地方","rep_name":"福岡","lat":33.590355,"lng":130.401716},
{"code":8220,"city_code":40,"rep_code":0,"pre_name":"福岡県","area_name":"北九州","rep_name":"八幡","lat":33.862203,"lng":130.877689},
{"code":8230,"city_code":40,"rep_code":0,"pre_name":"福岡県","area_name":"筑豊地方","rep_name":"飯塚","lat":33.645908,"lng":130.691511},
{"code":8240,"city_code":40,"rep_code":0,"pre_name":"福岡県","area_name":"筑後地方","rep_name":"久留米","lat":33.319286,"lng":130.508374},
{"code":8310,"city_code":44,"rep_code":1,"pre_name":"大分県","area_name":"中部","rep_name":"大分","lat":33.239558,"lng":131.609272},
{"code":8320,"city_code":44,"rep_code":0,"pre_name":"大分県","area_name":"北部","rep_name":"中津","lat":33.598221,"lng":131.188325},
{"code":8330,"city_code":44,"rep_code":0,"pre_name":"大分県","area_name":"西部","rep_name":"日田","lat":33.321333,"lng":130.940966},
{"code":8340,"city_code":44,"rep_code":0,"pre_name":"大分県","area_name":"南部","rep_name":"佐伯","lat":32.960217,"lng":131.899533},
{"code":8410,"city_code":42,"rep_code":1,"pre_name":"長崎県","area_name":"南部","rep_name":"長崎","lat":32.750286,"lng":129.877667},
{"code":8420,"city_code":42,"rep_code":0,"pre_name":"長崎県","area_name":"北部","rep_name":"佐世保","lat":33.179915,"lng":129.71511},
{"code":8430,"city_code":42,"rep_code":0,"pre_name":"長崎県","area_name":"壱岐対馬","rep_name":"厳原","lat":34.206435,"lng":129.29057},
{"code":8440,"city_code":42,"rep_code":0,"pre_name":"長崎県","area_name":"五島","rep_name":"福江","lat":32.6989712,"lng":128.8464038},
{"code":8510,"city_code":41,"rep_code":1,"pre_name":"佐賀県","area_name":"南部","rep_name":"佐賀","lat":33.263482,"lng":130.300858},
{"code":8520,"city_code":41,"rep_code":0,"pre_name":"佐賀県","area_name":"北部","rep_name":"伊万里","lat":33.264586,"lng":129.880269},
{"code":8610,"city_code":43,"rep_code":1,"pre_name":"熊本県","area_name":"熊本地方","rep_name":"熊本","lat":32.8031,"lng":130.707891},
{"code":8620,"city_code":43,"rep_code":0,"pre_name":"熊本県","area_name":"阿蘇地方","rep_name":"阿蘇乙姫","lat":32.943445,"lng":131.043434},
{"code":8630,"city_code":43,"rep_code":0,"pre_name":"熊本県","area_name":"天草地方","rep_name":"牛深","lat":32.325496,"lng":130.087902},
{"code":8640,"city_code":43,"rep_code":0,"pre_name":"熊本県","area_name":"球磨地方","rep_name":"人吉","lat":32.21004,"lng":130.762554},
{"code":8710,"city_code":45,"rep_code":1,"pre_name":"宮崎県","area_name":"南部平野部","rep_name":"宮崎","lat":31.907674,"lng":131.420241},
{"code":8720,"city_code":45,"rep_code":0,"pre_name":"宮崎県","area_name":"北部平野部","rep_name":"延岡","lat":32.582317,"lng":131.664848},
{"code":8730,"city_code":45,"rep_code":0,"pre_name":"宮崎県","area_name":"南部山沿い","rep_name":"都城","lat":31.71959,"lng":131.061621},
{"code":8740,"city_code":45,"rep_code":0,"pre_name":"宮崎県","area_name":"北部山沿い","rep_name":"高千穂","lat":32.711657,"lng":131.308028},
{"code":8810,"city_code":46,"rep_code":1,"pre_name":"鹿児島県","area_name":"薩摩地方","rep_name":"鹿児島","lat":31.596554,"lng":130.557116},
{"code":8820,"city_code":46,"rep_code":0,"pre_name":"鹿児島県","area_name":"大隅地方","rep_name":"鹿屋","lat":31.378292,"lng":130.852077},
{"code":8830,"city_code":46,"rep_code":0,"pre_name":"鹿児島県","area_name":"種子島屋久島地方","rep_name":"西之表","lat":30.732412,"lng":130.996835},
{"code":1000,"city_code":46,"rep_code":0,"pre_name":"鹿児島県","area_name":"奄美地方","rep_name":"名瀬","lat":28.3705601,"lng":129.501021},
{"code":9110,"city_code":47,"rep_code":1,"pre_name":"沖縄県","area_name":"本島中南部","rep_name":"那覇","lat":26.22853,"lng":127.68911},
{"code":9120,"city_code":47,"rep_code":0,"pre_name":"沖縄県","area_name":"本島北部","rep_name":"名護","lat":26.591547,"lng":127.977316},
{"code":9130,"city_code":47,"rep_code":0,"pre_name":"沖縄県","area_name":"久米島","rep_name":"久米島","lat":26.348886,"lng":126.747004},
{"code":9200,"city_code":47,"rep_code":0,"pre_name":"沖縄県","area_name":"大東島地方","rep_name":"南大東島","lat":25.846401,"lng":131.244907},
{"code":9300,"city_code":47,"rep_code":0,"pre_name":"沖縄県","area_name":"宮古島地方","rep_name":"宮古島","lat":24.80549,"lng":125.281149},
{"code":9410,"city_code":47,"rep_code":0,"pre_name":"沖縄県","area_name":"石垣島地方","rep_name":"石垣島","lat":24.408388,"lng":124.197692},
{"code":9420,"city_code":47,"rep_code":0,"pre_name":"沖縄県","area_name":"与那国島地方","rep_name":"与那国島","lat":24.4616586,"lng":123.0085106}];
	
	var most_code = 0; //最も近い予報地域コード
	var most_distans = 9999999;//今のところ最も近い距離(mm)
	for(var i in codes){
		//console.log(codes[i].code);
		var distans = geoDistance(lat1, lng1, codes[i].lat, codes[i].lng, 0);
		if(most_distans > distans){
			most_distans = distans;
			most_code = codes[i].code;
		}
	}
	return most_code;
	Ti.API.info('[geoNearby]'+most_code);
}

function today(){
	var date = new Date();
	var year = date.getYear();
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	year = (year < 2000) ? year+1900 : year;
    if (mon < 10) { mon = "0" + mon; }
    if (day < 10) { day = "0" + day; }
    return year +'-'+ mon +'-'+ day;
}

function tomorrow(){
	var date = new Date();
	var year = date.getYear();
	var mon = date.getMonth();
	var day = date.getDate();
	var tomor = new Date(year, mon, day + 1);
	day = tomor.getDate();
	year = tomor.getFullYear();
	mon = tomor.getMonth() +1;
	year = (year < 2000) ? year+1900 : year;
    if (mon < 10) { mon = "0" + mon; }
    if (day < 10) { day = "0" + day; }
    return year +'-'+ mon +'-'+ day;
}

var tenkiXhr = function(params,callback){
	var userid = tenkiApi_userId;
	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;
	var uri = "http://w002.tenkiapi.jp/"+userid+"/"+params+"&type=json";
	Ti.API.info('[tenkiXhr1]'+uri);
	xhr.open("GET",uri);
	xhr.onload = function(){
		//Ti.API.info('[tenkiXhr2]'+this.responseText);
		callback(this.responseText);
		//return json;
	}
	xhr.send();
}

// params = +dir+"/"+p1+p2+
var tenkiDaily = function(code,callback){//天気予報
	var params = "daily/?p1="+code+"&p2=today";
	tenkiXhr(params, function(json){
		Ti.API.info('[tenkiDaily0]'+json);
		//[tenkiDaily1]{"areaCode":"4410","date":"2011-10-27","time":"17:00:00","daily":{"dateName":"today","date":"2011-10-28","telop":"101","wDescription":"\u6674\u6642\u3005\u66c7","minTemp":"12","maxTemp":"20","probPrecip":[{"time":"00-06","code":"0","prob":"10"},{"time":"06-12","code":"0","prob":"10"},{"time":"12-18","code":"0","prob":"0"},{"time":"18-24","code":"0","prob":"0"}]}}
		/*
		var json = {"areaCode":"4410","date":"2011-10-27","time":"17:00:00","daily":{"dateName":"today","date":"2011-10-28","telop":"101","wDescription":"\u6674\u6642\u3005\u66c7","minTemp":"12","maxTemp":"20","probPrecip":[{"time":"00-06","code":"0","prob":"10"},{"time":"06-12","code":"0","prob":"10"},{"time":"12-18","code":"0","prob":"0"},{"time":"18-24","code":"0","prob":"0"}]}};
		var probPrecip = json.daily.probPrecip;
		var minTemp = json.daily.minTemp;
		var maxTemp = json.daily.maxTemp;
		*/
		
		var parseJson = JSON.parse(json);
		var probPrecip = parseJson.daily.probPrecip;
		var minTemp = parseJson.daily.minTemp;
		var maxTemp = parseJson.daily.maxTemp;
		
		Ti.API.info('[tenkiDaily1]'+probPrecip);
		if(probPrecip){//エラーとかで中身がとれなかったら、の処理
			var date = new Date();
			var hour = date.getHours() + 1;//hourが、0～24の整数という前提
			var sec = date.getSeconds();
			if(hour <= 7 && sec <= 15 && minTemp){//朝、4分の1の確率で今日の最低気温
				callback('最低気温' + minTemp + '度の');
			}else if(hour == 13 && sec <= 20 && maxTemp){//昼13時、3分の１の確率で今日の最高気温
				callback('最高気温' + maxTemp + '度の');
			}else{//それ以外は、降水確率
				var select_time = null;
				if(hour <= 6){
					select_time = '00-06';
				}else if(hour > 6 && hour <= 12){
					select_time = '06-12';
				}else if(hour > 12 && hour <= 18){
					select_time = '12-18';
				}else{
					select_time = '18-24';
				}
				var prob = null;
				for(var i in probPrecip){
					if(probPrecip[i].time == select_time){
						prob = probPrecip[i].prob;
					}
				}
				if(!prob) prob = 0;
				Ti.API.info('[tenkiDaily2]'+'降水確率'+prob+'%の');
				callback('降水確率'+prob+'%の');
			}
		}else{
			callback(' ');
		}
	});
}

var tenkiViolet = function(code,callback){//紫外線情報
	var params = "violet/?p1="+code;
	tenkiXhr(params, function(json){
		var parseJson = JSON.parse(json);
		var uvIndex = parseJson.violet.uvIndex;
		if(uvIndex){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 17){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in uvIndex){
				if(uvIndex[i].date == date_now){
					value = uvIndex[i].value;
					if(hour < 17){
						callback('UV値'+value+'の');
					}else{
						callback('明日のUV値'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiWash = function(code,callback){
	var params = "wash/?p1="+code;
	tenkiXhr(params, function(json){
		var parseJson = JSON.parse(json);
		var clothDriedIndex = parseJson.wash.clothDriedIndex;
		if(clothDriedIndex){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 14){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in clothDriedIndex){
				if(clothDriedIndex[i].date == date_now){
					value = clothDriedIndex[i].value;
					if(hour < 14){
						callback('洗濯指数'+value+'の');
					}else{
						callback('明日の洗濯指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiUmbrella = function(code,callback){
	var params = "umbrella/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.umbrella.umbrellaIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 20){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 22){
						callback('傘指数'+value+'の');
					}else{
						callback('明日の傘指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiCold = function(code,callback){
	var params = "cold/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.cold.coldnessIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 20){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 20){
						callback('寒冷指数'+value+'の');
					}else{
						callback('明日の寒冷指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiSkin = function(code,callback){
	var params = "skin/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.skin.skinDriedIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 18){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 18){
						callback('素肌乾燥指数'+value+'の');
					}else{
						callback('明日の素肌乾燥指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiCough = function(code,callback){
	var params = "cough/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.cough.coughIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 20){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 20){
						callback('風邪ひき指数'+value+'の');
					}else{
						callback('明日の風邪ひき指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiHotpot = function(code,callback){
	var params = "hotpot/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.hotpot.hotPotIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 19){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 19){
						callback('鍋もの指数'+value+'の');
					}else{
						callback('明日の鍋もの指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiQuilt = function(code,callback){
	var params = "quilt/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.quilt.quiltIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 22){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 22){
						callback('掛け布団指数'+value+'の');
					}else{
						callback('明日の掛け布団指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiClothLayer = function(code,callback){
	var params = "clothLayer/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki0]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.clothLayer.clothLayeringIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 19){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 19){
						callback('重ね着指数'+value+'の');
					}else{
						callback('明日の重ね着指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

var tenkiStarry = function(code,callback){
	var params = "starry/?p1="+code;
	tenkiXhr(params, function(json){
		Ti.API.info('[tenki99]'+json);
		var parseJson = JSON.parse(json);
		var values = parseJson.starry.starryIndex;
		if(values){
			var date = new Date();
			var hour = date.getHours();
			if(hour < 22){
				var date_now = today();
			}else{
				var date_now = tomorrow();
			}
			var value = null;
			Ti.API.info('[tenki999]'+date_now);
			for(var i in values){
				if(values[i].date == date_now){
					value = values[i].value;
					if(hour < 22){
						callback('星空指数'+value+'の');
					}else{
						callback('明日の星空指数'+value+'の');
					}
				}
			}
			if(value == null) callback(' ');
		}else{
			callback(' ');
		}
	});
}

// tenki_APIを叩いて、文字列を作る
//どの指数にするかランダム判定。秒で判定
var plusTenki = function(lat1, lng1, callback){
	var code = geoNearby(lat1, lng1);
	var date = new Date();
	var sec = date.getSeconds();
	Ti.API.info('[plusTenki-sec]' + sec);
	if(sec < 30){
		tenkiDaily(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 34){
		tenkiViolet(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 38){
		tenkiWash(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 40){
		tenkiUmbrella(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 42){
		tenkiCold(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 43){
		tenkiSkin(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 45){
		tenkiCough(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 50){
		tenkiHotpot(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 54){
		tenkiQuilt(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else if(sec < 57){
		tenkiClothLayer(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}else{
		tenkiStarry(code, function(plustenki){
			Ti.API.info('[plusTenki]'+plustenki);
			callback(plustenki);
		});
	}
}