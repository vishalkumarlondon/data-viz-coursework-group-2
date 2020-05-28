{
    d3.csv("https://raw.githubusercontent.com/vishalkumarlondon/fashion-week/master/data/LFW_2019_bar.csv", function(Data) {
        console.log(Data[1]);
        var svg = dimple.newSvg("#chartContainer", 840, 440); // The chart is an svg variable assigned to the chartcontainer div. It's width and height are also assigned here
        var myChart = new dimple.chart(svg, Data);  // Create the chart with CityData as the data input
        myChart.setBounds(60, 5, 300, 200);            // Set the chart bounds within the svg container, top-left and bottom-right coords measured from top left
        myChart.defaultColors = [
            new dimple.color("#FF5733")
            ];
        var x = myChart.addCategoryAxis("x", "date");  // Define the x axis. In this example it is a category axis
        var y = myChart.addMeasureAxis("y", "vis"); // Define the y axis
        y.title = "TAG in 2019 LFW";
        var s = myChart.addSeries(null, dimple.plot.bar); // Plot a bar chart of the data
        myChart.draw(500); // Draw the chart. The number is the animation delay in miliseconds
        svg.selectAll("path.domain").style("stroke", "#CCC"); // These statements change the chart gridlines to a lighter grey colour
        svg.selectAll("g.tick line").style("stroke", "#CCC");
        svg.selectAll(".dimple-hover-text").style("fill", "#ecf0f1")

    });
}