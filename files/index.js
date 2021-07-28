function load(){

  svg = d3.select("svg")
  const render = data => {
    const  margin = {
        top:50,
        bottom:50,
        left :100,
        right: 50
      }
    console.log(data[0].country_code)
    console.log(data.length)
    const width = +svg.attr('width')
    const height = +svg.attr('height')

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xValue = d => d.date_reported;
    const yValue = d => d.cumulative_cases;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data,xValue))
      .range([0, innerWidth])
      .clamp(true)

      const xScaleWidth = d3.scaleBand()
        .domain(d3.map(data, d => new Date(d.date)))
        .range([0, innerWidth])
        .padding(0.2)


    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.cumulative_cases))
      .range([innerHeight,0])
      .clamp(true)
      .nice();

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeWeek.every(3))

    // const yAxisTickFormat = number =>
    // d3.format('.2s')(number)
    //   .replace('G', 'B')

    const yAxis = d3.axisLeft(yScale)
      // .tickFormat(yAxisTickFormat).
      .tickSize(-innerWidth)
      .ticks(10)



    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", -50)
      .attr("dy", ".32em")
      .attr("transform", "rotate(270)")
      .style("text-anchor", "start")
      .attr('font-size','2em')

    const yAxisG = g.append('g').call(yAxis)


      g.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', d => xScale(xValue(d)))
        .attr('y', d => yScale(yValue(d)))
        .attr('height', d => innerHeight-yScale(yValue(d)))
        .attr('width', 1)
        .attr('stroke', 'green')
        .attr('fill', 'blue')
        .on('mouseover', function(event) {
          d3.select(this).attr('stroke', 'blue')})
          .on('mouseout', function(event) {
            d3.select(this).attr('stroke', 'green')})

            var divG = g.append("div")
                .attr("class", "tooltip")
                .style("opacity", 01)

            var formatTime = d3.timeParse("%e %B");

    function lineChart(){
    // Add the line
    lineG = g.append('g')

    lineG.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) {
          return xScale(xValue(d))
        })
        .y(function(d) {
          return yScale(yValue(d))
        })
      )
      .on("mouseover", function(event, d) {
        const [x, y] = d3.pointer(event);
        divG.transition()
          .duration(200)
          .style("opacity", .9);
        divG.html('pr' + d.close)
          .style("left", (x) + "px")
          .style("top", (y) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
    }


circleG = g.append('g')
      lineChart()
      circleG.selectAll('circle').data(data)
        .enter().append('circle')
        .attr("cy", d => yScale(yValue(d)))
        .attr("cx", d => xScale(xValue(d)))
        .attr("r",  2)
        .attr('fill', 'blue')
        .on('mouseover', function(event) {
          d3.select(this).attr("r",  4)})
          .on('mouseout', function(event) {
            d3.select(this).attr("r",  2)})

  };

  data = d3.csv('WHO-COVID-19-global-data-detailed.csv')
    .then(data => {
      data.forEach(d => {
        d.new_deaths = +d.new_deaths;
        d.cumulative_cases = +d.cumulative_cases;
        d.new_cases = +d.new_cases
        d.cumulative_deaths = +d.cumulative_deaths;

        d.date_reported = new Date(d.date_reported)//+ new Date(d.date).getDate()
        // var parseTime = d3.timeParse('%m/%d/%Y')

      })
      console.log(data)
      render(data);
    });

  // data = d3.csv('owid-covid-data.csv')
  //   .then(data => {
  //     data.forEach(d => {
  //       d.new_deaths = +d.new_deaths;
  //       d.total_cases = +d.total_cases;
  //       d.new_cases = +d.new_cases
  //       d.total_deaths = +d.total_deaths;
  //       d.new_tests = +d.new_tests;
  //       d.location = d.location;
  //       d.date = new Date(d.date)//+ new Date(d.date).getDate()
  //       // var parseTime = d3.timeParse('%m/%d/%Y')
  //
  //     })
  //     render(data);
  //   });

}
