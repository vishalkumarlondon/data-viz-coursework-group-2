d3.csv("https://raw.githubusercontent.com/vishalkumarlondon/fashion-week/master/data/airbnb/Counts.csv").then(function (data) {

        var width = 250;
        var height = 200;

        var margin = {top: 40,left: 40,right: 40,bottom: 20};
        var svgWidth = width + margin.left + margin.right;
        var svgHeight = height + margin.top + margin.bottom;

        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            ;
        var color = d3.scaleOrdinal(["#3172bc"]);

        // popup
        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.5);

        var currmonth = 1;

        // scale
        var x = d3.scaleBand()
            .range([0, width])
            ;

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(function (d, i) {
                var date = new Date(d);
                if (date.getMonth() + 1 === currmonth) {
                    currmonth++;
                    return (date.getMonth() + 1) + "-" + date.getDate();
                }
                // if (date.getDate() === 15) {
                //     return (date.getMonth() + 1) + "-" + date.getDate();
                // }
                return "";
            })
            ;

        var yAxis = d3.axisLeft()
            .scale(y)
            ;

        //  title---Y
        svg.append("g")
            .attr("class", "y-label")
            .attr("transform", "translate(-20,-20)")
            .append("text")
            .text("Average Number of Reviews ")
            ;

        // title---X
        svg.append("g")
            .attr("class", "x-label")
            .attr("transform", "translate(" + (width - 60) + "," + (height + 40) + ")")
            .append("text")
            .text("Year(2019)")
            ;

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis)
            .append("text")
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            ;
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            ;
        var yearlyAverage = 2003.5;


        var linema10 = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.ma10));


            var list = [];
            data.columns.forEach(function (key) {
                if (key !== "ma" && key !== "Index") {
                    list.push({
                        ma10: data[0][key]*1, date: key
                    });
                }
            });
            console.log(list);

            // gain the max value
            var max10 = d3.max(list, function (d) { return d.ma10; });
            var max10_min = d3.min(list, function (d) { return d.ma10; });

            // Set the Y-axis domain
            y.domain([1300,2700]);

            // renew Y-axis
            svg.select(".y.axis").call(yAxis);

            // Get the X-axis domain
            var xdomain = list.map(function (d) { return d.date; });
            // Set the X-axis domain
            x.domain(xdomain);
            // renew X-axis
            svg.select(".x.axis").call(xAxis);

            svg.append("g")
                .selectAll("rect")
                .data(list)
                .join("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.date))
                .attr("width", x.bandwidth())
                .style("fill", "none")
                .style("opacity", "0.7")
                .style("stroke", "#fdfbfb")
                .style("stroke-width", "0.5")
                .attr("height", height)
                .on("mouseover", function (d) {
                    // popup
                    var str = "";
                    str += "<div style='margin:5px 5px'>Ma10 numbers:" + d.ma10 + "</div>";
                    str += "<div style='margin:5px 5px'>Date:" + d.date + "</div>";

                    // popup by mouse move
                    tooltip.html(str)
                        .style("width", 300 + "px")
                        .style("height", "auto")
                        .style("left", (d3.event.pageX - 60) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 0.8)
                        ;
                    d3.select(this)
                        .style("fill", "#81FBB8")
                        .style("opacity", "0.5");
                })
                .on("mouseout", function (d) {
                    tooltip.style("width", 0)
                        .style("height", 0)
                        .style("opacity", 0.0);
                    d3.select(this)
                        .style("fill", "none")
                        .style("opacity", "0.1");
                })
                ;

            svg.append("path")
                .datum(list)
                .attr("fill", "none")
                .attr("stroke", color("ma10"))
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", linema10);

      	var yearlyAverageLineAndText = svg.append("g")
            .attr("class", "yearly-average-line-and-text")


            yearlyAverageLineAndText.append("line")
            .attr("class", "yearly-average-line")
            .attr("x1", 0)
            .attr("y1", y(yearlyAverage))
            .attr("x2", width)
            .attr("y2", y(yearlyAverage));

            yearlyAverageLineAndText.append("text")
            .attr("class", "yearly-average-text")
            .attr("y", y(yearlyAverage))
            .attr("dy","20px")
            .text("monthly-average: 2003.5");



        //     const type = d3.annotationLabel

        //     const annotations = [{
        //       note: {
        //         label: "Demand has risen significantly from mid-February, exceeding the annual average",
        //         bgPadding: 10,
        //         title: "Fashion week 15 Feb 2019 – 19 Feb 2019",
        //         wrap: 300,
        //       },

        //       x: 150,
        //       y: 100,
        //       dy: 0,
        //       dx: 20,

        //     },
        //     {
        //       note: {
        //         label: "Since September, the demand for airbnb has always exceeded the annual average, and there is an upward trend. It even reached a small peak during the fashion week.",
        //         bgPadding: 10,
        //         title: "Fashion week 13 Sept 2019 – 17 Sept 2019",
        //         wrap: 300,
        //         align: "middle",
        //       },
        //       className: "anomaly",
        //       type: d3.annotationCalloutCircle,
        //       subject: { radius: 50 },
        //       color: ["#69b3a2"],
        //       x: 50,
        //       y: 100,
        //       dy: -20,
        //       dx: -20,
        //     }

        //   ]

        //     const parseTime = d3.timeParse("%d-%b-%y")
        //     const timeFormat = d3.timeFormat("%d-%b-%y")

        //     //Skipping setting domains for sake of example


        //     const makeAnnotations = d3.annotation()
        //     .editMode(true)
        //     //also can set and override in the note.padding property
        //    //of the annotation object
        //    .notePadding(15)
        //    .type(type)
        //    //accessors & accessorsInverse not needed
        //    //if using x, y in annotations JSON

        //    .accessors({
        //      x: d => x(parseTime(d.date)),
        //      y: d => y(d.close)
        //    })
        //    .accessorsInverse({
        //      date: d => timeFormat(x.invert(d.x)),
        //      ma10: d => y.invert(d.y)
        //    })
        //    .annotations(annotations)

        //    d3.select("svg")
        //    .append("g")
        //    .attr("class", "annotation-group")
        //    .call(makeAnnotations)

        });