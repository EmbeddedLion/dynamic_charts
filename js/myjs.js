$(function() {
	var container = $("#flot-line-chart-moving");
	var maximum = container.outerWidth() / 2 || 300;
	var data = [];
	function getRandom(min, max){
		var r = Math.random() * (max - min);
		var re = Math.round(r + min);
		re = Math.max(Math.min(re, max), min)

		return re;
	}
	while(data.length < maximum){
		data.push(0);
	}

	function getRandomData() {
		if (data.length) {
			data = data.slice(1);//跳过第0个，从第一个开始到最后一个
		}
		/*while (data.length < maximum) {
			var previous = data.length ? data[data.length - 1] : 50;
			var y = previous + Math.random() * 10 - 5;
			data.push(y < 0 ? 0 : y > 100 ? 100 : y);
		}*/
		while(data.length < maximum){
			data.push(getRandom(0,22));
		}
		var res = [];
		for (var i = 0; i < data.length; ++i) {
			res.push([i, data[i]]);//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
			//res.push([i, getRandom(0,100)]);
			console.log( getRandom(0,100));
		}
		return res;
	}
	series = [{
		data: getRandomData(),
		label: "码率",
		lines: {
			fill: true
		},
		hoverable: true,
		clickable: true,
	}];
	var plot = $.plot(container, series, {
		grid: {
			color: "#999999",
			tickColor: "#f7f9fb",
			borderWidth:0,
			minBorderMargin: 20,
			labelMargin: 10,
			backgroundColor: {
				colors: ["#ffffff", "#ffffff"]
			},
			margin: {
				top: 8,
				bottom: 20,
				left: 20
			},
			markings: function(axes) {
				var markings = [];
				var xaxis = axes.xaxis;
				for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
					markings.push({
						xaxis: {
							from: x,
							to: x + xaxis.tickSize
						},
						color: "#fff"
					});
				}
				return markings;
			}
		},
		colors: ["#4fc5ea"],
		xaxis: {
			tickFormatter: function() {
				return "";
			}
		},
		yaxis: {
			min: 0,
			max: 22,
			ticks: 2.0,
			tickSize: 2.0,
			minTickSize: 0,
			// 刻度显示精确度，即小数位数
			tickDecimals: 2
		},
		legend: {
			show: true
		}
	});

	// Update the random dataset at 25FPS for a smoothly-animating chart
	//setInterval()方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
	setInterval(function updateRandom() {
		series[0].data = getRandomData();
		plot.setData(series);
		plot.draw();
	}, 400);//1s == 1000ms ==> 1000ms/40 ==25fps
});
		
$(function() {
	
	function euroFormatter(v, axis) {
		return "&yen;"+v.toFixed(axis.tickDecimals);
	}

	function doPlot(position) {
		$.plot($("#bitrate"), {
			xaxes: [{
				mode: 'time'
			}],
			yaxes: [{
				min: 0
			}, {
				alignTicksWithAxis: position == "right" ? 1 : null,
				position: position,
				tickFormatter: euroFormatter
			}],
			legend: {
				position: 'sw'
			},
			colors: ["#f7f9fb"],
			grid: {
				color: "#999999",
				hoverable: true,
				clickable: true,
				tickColor: "#f7f9fb",
				borderWidth:0,

			},
			tooltip: true,
			tooltipOpts: {
				content: "%s %x 为 %y",
				xDateFormat: "%y-%0m-%0d",

				onHover: function(flotItem, $tooltipEl) {
					// console.log(flotItem, $tooltipEl);
				}
			}
		});
    }
	
});