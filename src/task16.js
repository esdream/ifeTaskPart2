/**
* Created by Faizal on 2016/4/23.
*/
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 window.onload = function () {
    var $ = function (id) {
        return document.getElementById(id);
    };

    var aqiData = {},
        cityName = $('aqi-city-input'),
        aqiValue = $('aqi-value-input');
    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqidata() {
        var city = cityName.value.trim(),
            aqi = aqiValue.value.trim();

        //检测输入
        if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
            alert('城市名必须为中英文字符!');
            return;
        }
        if (!aqi.match(/^\d+$/)) {
            alert('空气质量指数必须为整数!');
            return;
        }
        aqiData[city] = aqi;
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var tableText = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        for (var city in aqiData) {
            tableText += '<tr>' + '<td>' + city + '</td>' + '<td>' + aqiData[city] + '</td>' + '<td>' + '<button>' + '删除' + '</button>' + '</td>' + '</tr>';
        }
        $('aqi-table').innerHTML = tableText;
    }
    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqidata();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(city) {
        delete aqiData[city];
        renderAqiList();
    }

    function init() {
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var addBtn = $('add-btn'),
            table = $('aqi-table');

        addBtn.addEventListener('click', addBtnHandle);
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        table.addEventListener('click', function (event) {
            delBtnHandle(event.target.parentNode.parentNode.childNodes[0].innerHTML);
        });
    }

    init();
};
