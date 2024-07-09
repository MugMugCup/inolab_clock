function displayDateTime() {
    // 現在時間を取得
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var day = ('0' + now.getDate()).slice(-2);
    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var week = weeks[now.getDay()]
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);

    // HTML に出力
    var time = hours + ':' + minutes + ':' + seconds
    document.getElementById('time').innerHTML = time;
    var data = year + '/' + month + '/' + day + ' (' + week + ')';
    document.getElementById('data').innerHTML = data;
}

window.onload = function () {
    displayDateTime();
    setInterval(displayDateTime, 1000); // 1秒ごとに日時を更新
}