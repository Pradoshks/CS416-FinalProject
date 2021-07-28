function bbb(){
  // height = document.documentElement.clientHeight
  // width = document.documentElement.clientWidth
  height = 800;
  width = 1200;

  const svg = d3.select("svg").attr('height', height).attr('width', width)

  const render = (data,country,selectedOption) => {
  formatWeek = d3.timeFormat("%b %d")
  console.log(formatWeek(data[0].date_reported))
  if (selectedOption === undefined)
  {
    selectedOption = 'Afghanistan'
    var dataFilter = data.filter(d => d.country === selectedOption)
  } else {
    var dataFilter = data.filter(d => d.country === selectedOption)
  }

  var dataFilter = data.filter(d => d.country === selectedOption)

  const  margin = {
      top:50,
      bottom:50,
      left :100,
      right: 50
    }

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const xValue = d => d.date_reported;
    const yValue = d => d.new_cases;
    d3.select("svg").html("")

    const g = svg.append("g")
      .attr('transform',`translate(${margin.left},${margin.top})`)

    function drawAxis()  {
      const xScale = d3.scaleTime()
        .domain(d3.extent(dataFilter,xValue))
        .range([0, innerWidth])
        .clamp(true)

      const xScaleWidth = d3.scaleBand()
        .domain(d3.map(dataFilter, d => new Date(d.date_reported)))
        .range([0, innerWidth])
        .padding(0.2)

      const yScale = d3.scaleLinear()
        .domain([0,d3.max(dataFilter, yValue)])
        .range([innerHeight,0])
        .clamp(true)
        .nice();

      const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeWeek.every(3))

      // const yAxisTickFormat = number =>
      // d3.format('.2s')(number)
      //   .replace('G', 'B')

      const yAxis = d3.axisLeft(yScale)
        // .tickFormat(yAxisTickFormat)
        .tickSize(-innerWidth)
        .ticks(10)



      const xAxisG = g.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`)
      .selectAll("text")
        .attr("y", 0)
        .attr("x", -50)
        .attr("dy", ".32em")
        .attr("transform", "rotate(270)")
        .style("text-anchor", "start")
        .attr('font-size','2em')
        .on("mouseover", (event) => {
          console.log(this.rectG)
        })

      const yAxisG = g.append('g').call(yAxis)
    }


    function drawBarChart(){
      drawAxis()
      rectG = g.append('g')

      rectG.selectAll('rect')
        .data(dataFilter)
        .enter().append('rect')
        .attr('x', d => xScaleWidth(xValue(d)))
        .attr('y', d => yScale(yValue(d)))
        .attr('width', xScaleWidth.bandwidth())
        .attr('height', d => innerHeight-yScale(yValue(d)))
        .attr('fill', 'steelblue')
        .on('mouseover', function(event,d) {
            d3.select(this).attr('fill', 'orange')
          d3.select(".tooltip").style("opacity",1)
          .style("position", "absolute")
              .style("left", (event.pageX)-160+"px")
              .style("top", (event.pageY)+"px")
              .select('.span1')
              .text("Week:"+formatWeek(d.date_reported)+"<br>"+"Number of Cases:"+ d.new_cases)
              .select('.span2')
              .text("Week:"+formatWeek(d.date_reported)+"<br>"+"Number of Cases:"+ d.new_cases)

              // console.log(d3.mouse)
            // d3.select(this).append('rect')
            // .attr('height', innerHeight)
            // .attr('width', 2)
            // .attr('stroke' ,'black')
            // d3.select(this).attr('fill', 'orange')
            // const [x,y] = d3.pointer(event)
            console.log((event.pageX)+"px")
            console.log((event.pageY)+"px")
          })
            .on('mouseout', function(event) {
              // d3.select(".tooltip").remove()
              d3.select(this).attr('fill', 'steelblue')})


    }


    // Add the line
    function createLineChart(){
      pathG = g.append('g')
      pathG.append("path")
        .datum(dataFilter)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(xValue(d)) })
          .y(function(d) { return yScale(yValue(d))})
          )
          .on("mouseover", function(event,d) {
            const[x, y] = d3.pointer(event);
              divG.transition()
                  .duration(200)
                  .style("opacity", .9);
              divG	.html('pr'  + d.close)
              .style("left", (x) + "px")
              .style("top", (y) + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });
    }

      function createCircle(){
        const circleG = g.append('g')
              circleG.selectAll('circle').data(dataFilter)
                .enter().append('circle')
                .attr("cy", d => yScale(yValue(d)))
                .attr("cx", d => xScale(xValue(d)))
                .attr("r",  2)
                .on('mouseover', function(event) {
                  d3.select(this).attr("r",  4)})
                  .on('mouseout', function(event) {
                    d3.select(this).attr("r",  2)})
      }

      // add the options to the button


    d3.select(".countrySelector")
    		// .append("select")
        .attr("id", "countrySelector")
    		.selectAll("option")
    		.data(country)
    		.enter().append("option")
        .text(d => d.country_name) // text showed in the menu
        .attr("value", d => d.country_name) // corresponding value returned by the button

        // d3.select("#countrySelector")
        //      .selectAll('myOptions')
        //     	.data(country)
        //      .enter()
        //    	.append('option')
        //     .text(d => d.country_name) // text showed in the menu
        //     .attr("value", d => d.country_name) // corresponding value returned by the button

        d3.select('#countrySelector')
          .on("change",function(d){
            const selectedOption = d3.select(this).property("value")
            render(data,country,selectedOption)
          })

          d3.selectAll(".barChart")
            .on("click", function(event)
            {
            drawBarChart()

            })
            d3.selectAll(".dailyLineChart")
              .on("click", function(event)
              {
              load()
              })



  };

  data = d3.csv('new_cases_deaths_week.csv')
  country = d3.csv('country_name.csv')

  Promise.all([data, country])
    .then(([data, country]) => {
      data.forEach(d => {
        d.new_deaths = +d.new_deaths;
        d.new_cases = +d.new_cases
        d.date_reported = new Date(d.date_reported)//+ new Date(d.date).getDate()
    })
    render(data, country)
  })

}
