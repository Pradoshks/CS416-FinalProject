function render(svg, worldDataWeek, worldDataMonth, countryDetails, regionDataMonth,selectedOption) {
  let data ={}
  data=worldDataWeek
  console.log(data)


  formatWeek = d3.timeFormat("%b %d")
  console.log(formatWeek(data[0].date_reported))

  //   if (selectedOption === undefined) {
  //     selectedOption = 'Global'
  //     var dataFilter = worldDataWeek.filter(d => d.country === selectedOption)
  //   } else {
  //     var dataFilter = worldDataWeek.filter(d => d.country === selectedOption)
  //   }
  //
  // var dataFilter = data.filter(d => d.country === selectedOption)
  var dataFilter = data


  const margin = {
    top: 50,
    bottom: 50,
    left: 100,
    right: 50
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = d => d.date_reported;
  const yValue = d => d.new_cases;
  const cValue = d => d.WHO_region;


  d3.select("svg").html("")

  const g = svg.append("g")
    .attr('transform', `translate(${margin.left},${margin.top})`)
  const xScale = d3.scaleTime()
    .domain(d3.extent(dataFilter, xValue))
    .range([0, innerWidth])
    .clamp(true)

  const xScaleWidth = d3.scaleBand()
    .domain(d3.map(dataFilter, d => new Date(d.date_reported)))
    .range([0, innerWidth])
    .padding(0.2)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataFilter, yValue)])
    .range([innerHeight, 0])
    .clamp(true)
    .nice();

  const cScale = d3.scaleOrdinal()
    // .domain(['AFRO', 'AMRO', 'EURO', 'EMRO' ,'SEARO', 'WPRO'])
    .domain(d3.map(dataFilter, d=> d.WHO_region))
    .range(['rgb(10, 113, 213)',
            'rgb(255, 187, 48)',
            'rgb(0, 174, 143)',
            'rgb(200, 214, 91)',
            'rgb(82, 0, 174)',
            'rgb(193, 37, 146)'])

    console.log("hell"+cScale("1"))
  const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeWeek.every(3))

  // const yAxisTickFormat = number =>
  // d3.format('.2s')(number)
  //   .replace('G', 'B')

  const yAxis = d3.axisLeft(yScale)
    // .tickFormat(yAxisTickFormat)
    // .tickSize(-innerWidth)
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
    .attr('font-size', '2em')
    .on("mouseover", (event) => {
      console.log(this.rectG)
    })

  const yAxisG = g.append('g').call(yAxis)

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    // .curve(d3.curveBasis);

  pathG = g.append('g')
  pathG.append("path")
    .datum(dataFilter)
    .attr("fill", "none")
    .attr("stroke", "rgb(255, 187, 48)")
    .attr("stroke-width", 1.5)
    .attr("d",lineGenerator)




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





  //
  rectG = g.append('g')
  //
  // rectG.selectAll('rect')
  //   .data(dataFilter)
  //   .enter().append('rect')
  //   .attr('x', d => xScaleWidth(xValue(d)))
  //   .attr('y', d => yScale(yValue(d)))
  //   .attr('width', xScaleWidth.bandwidth())
  //   .attr('height', d => innerHeight - yScale(yValue(d)))
  //   .attr('fill', '#AFADAD')
  //   .on('mouseover', function(event, d) {
  //     d3.select(this).attr('fill', '#0093d5')
  //     d3.select(".tooltip").style("opacity", 1)
  //       .style("position", "absolute")
  //       .style("left", (event.pageX) - 160 + "px")
  //       .style("top", (event.pageY) + "px")
  //       .select('.span1')
  //       .text("Week:" + formatWeek(d.date_reported) + "<br>" + "Number of Cases:" + d.new_cases)
  //       .select('.span2')
  //       .text("Week:" + formatWeek(d.date_reported) + "<br>" + "Number of Cases:" + d.new_cases)
  //
  //     // console.log(d3.mouse)
  //     // d3.select(this).append('rect')
  //     // .attr('height', innerHeight)
  //     // .attr('width', 2)
  //     // .attr('stroke' ,'black')
  //     // d3.select(this).attr('fill', 'orange')
  //     // const [x,y] = d3.pointer(event)
  //     console.log((event.pageX) + "px")
  //     console.log((event.pageY) + "px")
  //   })
  //   .on('mouseout', function(event) {
  //     // d3.select(".tooltip").remove()
  //     d3.select(this).attr('fill', 'rgb(255, 187, 48)')
  //   })
    // stackedBar()
    // function stackedBar(){
    //   rectG.selectAll('rect')
    //     .data(dataFilter)
    //     .enter().append('rect')
    //     .attr('x', d => xScale(xValue(d)))
    //     .attr('y', d => yScale(yValue(d)))
    //     .attr('width', 20)
    //     .attr('height', d => innerHeight - yScale(yValue(d)))
    //     .attr('fill', d => cScale(cValue(d)))
    //     .on('mouseover', function(event, d) {
    //       d3.select(this).attr('fill', '#0093d5')
    //       d3.select(".tooltip").style("opacity", 1)
    //         .style("position", "absolute")
    //         .style("left", (event.pageX) - 160 + "px")
    //         .style("top", (event.pageY) + "px")
    //         .select('.span1')
    //         .text("Week:" + formatWeek(d.date_reported) + "<br>" + "Number of Cases:" + d.new_cases)
    //         .select('.span2')
    //         .text("Week:" + formatWeek(d.date_reported) + "<br>" + "Number of Cases:" + d.new_cases)
    //
    //       // console.log(d3.mouse)
    //       // d3.select(this).append('rect')
    //       // .attr('height', innerHeight)
    //       // .attr('width', 2)
    //       // .attr('stroke' ,'black')
    //       // d3.select(this).attr('fill', 'orange')
    //       // const [x,y] = d3.pointer(event)
    //       console.log((event.pageX) + "px")
    //       console.log((event.pageY) + "px")
    //     })
    //     .on('mouseout', function(event) {
    //       // d3.select(".tooltip").remove()
    //       d3.select(this).attr('fill', 'rgb(255, 187, 48)')
    //     })
    // }
  }
