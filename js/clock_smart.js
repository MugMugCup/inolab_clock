const sleep = (wait_time) => new Promise((resolve) => setTimeout(resolve, wait_time));
//数字が動くための設定
const key8_up = [
        {
            transform: "translateY(0)",
            offset: 0,
        },
        {
            transform: "translateY(calc(-100%/5))",
        },
    ],
    key8_down = [
        {
            transform: "translateY(0)",
            offset: 0,
        },
        {
            transform: "translateY(calc(100%/5))",
        },
    ],
    key8_1 = {
        duration: 400,
        fill: "forwards",
        easing: "ease-in-out",
    };

let pre_second = 0,
    pre_minute,
    pre_hour = 0;

function second_minute_calc(num) {
    return (num + 60) % 60;
}
function hour_calc(num) {
    return (num + 24) % 24;
}
const create_time = (hour, minute, second) => {
    // let output_hour = minute == 60 && second == 60 ? (hour % 10 == 0 ? `${hour}` : `&nbsp;${hour % 10}`) : "&nbsp;&nbsp;";
    // let output_minute = second == 60 ? (minute % 10 == 0 ? `${minute}` : `&nbsp;${minute % 10}`) : "&nbsp;&nbsp;";
    // let output_second = second % 10 == 0 ? `${second}` : `&nbsp;${second % 10}`;
    //動かす桁の数値
    let output_hour1 = minute == 0 && second == 0 && hour % 10 == 0 ? parseInt(hour / 10) : "&nbsp;";
    let output_hour2 = minute == 0 && second == 0 ? hour % 10 : "&nbsp;";
    let output_minute1 = second == 0 && minute % 10 == 0 ? parseInt(minute / 10) : "&nbsp;";
    let output_minute2 = second == 0 ? minute % 10 : "&nbsp;";
    let output_second1 = second % 10 == 0 ? parseInt(second / 10) : "&nbsp;";
    let output_second2 = second % 10;
    return [output_hour1, output_hour2, output_minute1, output_minute2, output_second1, output_second2];
};

const create_time_master = (hour, minute, second) => {
    //固定するときの各桁の数値
    let output_hour1 = hour >= 10 ? parseInt(hour / 10) : "&nbsp;";
    let output_hour2 = hour % 10;
    let output_minute1 = minute >= 10 ? parseInt(minute / 10) : "0";
    let output_minute2 = minute % 10;
    let output_second1 = second >= 10 ? parseInt(second / 10) : "0";
    let output_second2 = "&nbsp;";
    return [output_hour1, output_hour2, output_minute1, output_minute2, output_second1, output_second2];
};

// async function second_tra(second) {
//     const slide_up = document.getElementById(`s_slide_${list_num}_mas_img`).animate(key8_down, key8_1);
// }

async function displayDateTime() {
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
    //数値を配列に入れて処理しやすいように
    if (pre_second != second) {
        let i_100 = 0;
        const slide_up = document.getElementById(`move_conte`).animate(key8_down, key8_1);
        let data1 = [];
        await sleep(400);
        while (i_100 < 5) {
            data1.push(create_time(hour_calc(hour - 2 + i_100), second_minute_calc(minute - 2 + i_100), second_minute_calc(second - 2 + i_100)));
            i_100++;
        }

        i_100 = 1;
        let i_101 = 0;
        //各桁の最大値00:00:0X
        let tempre_list = [2, 10, 6, 10, 6];
        while (i_100 < 5) {
            i_101 = 0;
            while (i_101 < 5) {
                if (data1[i_100][i_101] != "&nbsp;" && (parseInt(second) + 1) % 10 == 0) {
                    //真ん中になるひとつ前の数値をいじって動いても違和感ないようにする
                    //0だと0-1+10が9になるのを対処
                    let output_value = parseInt(data1[i_100][i_101]) != 0 ? (parseInt(data1[i_100][i_101]) - 1 + tempre_list[i_100]) % tempre_list[i_100] : "5";
                    data1[i_100 - 1][i_101] = output_value;
                    document.getElementById(`time_line_${i_101}`).classList.add("visiable_hide");
                } else if (data1[i_100][i_101] != "&nbsp;" && parseInt(second) % 10 == 0) {
                    //真ん中
                    let output_value = parseInt(data1[i_100][i_101]) != 0 ? (parseInt(data1[i_100][i_101]) - 1 + tempre_list[i_100]) % tempre_list[i_100] : "5";
                    data1[i_100 - 1][i_101] = output_value;
                    data1[i_100][i_101] = "&nbsp;";
                    document.getElementById(`time_line_${i_101}`).classList.remove("visiable_hide");
                } else if (parseInt(second - 1) % 10 == 0) {
                    //そのあと
                    data1[i_100][i_101] = "&nbsp;";
                }
                i_101++;
            }
            i_100++;
            // i_100++;
        }

        i_100 = 0;
        //数値変更
        while (i_100 < 5) {
            i_101 = 0;
            while (i_101 < 6) {
                document.getElementById(`time_view_${i_100}_${i_101}`).innerHTML = data1[i_100][i_101];
                i_101++;
            }

            i_100++;
        }
        slide_up.cancel();
    }
    pre_second = second;
    // デッドラインを計算
    const target_date = new Date("2024-07-11T23:59:59").getTime();
    var distance = target_date - now;
    var dead_day = Math.floor(distance / (1000 * 60 * 60 * 24));
    var dead_hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var dead_minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var dead_second = Math.floor((distance % (1000 * 60)) / 1000);

    // HTML に出力
    i_100 = 0;
    time_output_list = create_time_master(hour, minute, second);
    while (i_100 < 6) {
        document.getElementById(`time_line_${i_100}`).innerHTML = time_output_list[i_100];
        i_100++;
    }
    var date = year + "/" + month + "/" + day + " (" + week + ")";
    document.getElementById("date").innerHTML = date;
    var dead_date = dead_day + "D:" + dead_hour + "h:" + dead_minute + "m:" + dead_second + "s";
    document.getElementById("dead_date").innerHTML = dead_date;
}

window.onload = function () {
    let i = 0;
    while (i < 6) {
        let i2 = 4;
        //マスを配置
        while (i2 >= 0) {
            ((i_1, i_2) => {
                second_view = document.getElementById(`line_${i_1}`);
                let ele = document.createElement("div");
                ele.setAttribute("id", `time_view_${i_2}_${i_1}`);
                ele.appendChild(document.createTextNode("0"));
                second_view.appendChild(ele);
            })(i, i2);
            i2--;
        }
        i++;
    }
    displayDateTime();
    setInterval(displayDateTime, 1000); // 1秒ごとに日時を更新
};
