import Echarts from 'echarts';

const echart = Echarts.init(document.getElementById('root'));
echart.setOption({
    title: {
        text: '折线图'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'value',
        name: '区间',
        nameLocation: 'middle',
        nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 16
        },
        nameGap: 25
    },
    yAxis: {
        type: 'value',
        name: '数量',
        nameLocation: 'middle',
        nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 16
        },
        nameGap: 55

    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            data:[[20, 40], [40, 90], [70, 100], [90, 200]]
        },
        {
            name:'联盟广告',
            type:'line',
            data:[[0, 40], [50, 70], [80, 100], [110, 300]]
        }
    ]
})