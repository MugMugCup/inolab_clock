function displayDateTime() {
    // 現在時間を取得
    var now = new Date();
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);
    var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var week = weeks[now.getDay()];
    var hour = ("0" + now.getHours()).slice(-2);
    var minute = ("0" + now.getMinutes()).slice(-2);
    var second = ("0" + now.getSeconds()).slice(-2);

    // デッドラインを計算
    const target_date = new Date("2024-07-11T23:59:59").getTime();
    var distance = target_date - now;
    var dead_day = Math.floor(distance / (1000 * 60 * 60 * 24));
    var dead_hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var dead_minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var dead_second = Math.floor((distance % (1000 * 60)) / 1000);

    // HTML に出力
    var time = hour + ":" + minute + ":" + second;
    document.getElementById("time").innerHTML = time;
    var date = year + "/" + month + "/" + day + " (" + week + ")";
    document.getElementById("date").innerHTML = date;
    var dead_date = dead_day + "D:" + dead_hour + "h:" + dead_minute + "m:" + dead_second + "s";
    document.getElementById("dead_date").innerHTML = dead_date;
}

// window.onload = function () {
//     displayDateTime();
//     setInterval(displayDateTime, 1000); // 1秒ごとに日時を更新
// }
