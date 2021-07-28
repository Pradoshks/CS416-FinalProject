function createVaccineChart(svg, wordAllData, selectedCountry, totalCases){

  let data ={}
  data=wordAllData

  formatWeek = d3.timeFormat("%b %d")

    if (selectedCountry === undefined) {
        selectedCountry = 'United States'
        var dataFilter = wordAllData.filter(d => d.location === selectedCountry)
    } else {
        var dataFilter = wordAllData.filter(d => d.location === selectedCountry)
    }

console.log(dataFilter)
  const margin = {
    top: 50,
    bottom: 50,
    left: 80, //100
    right: 50
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = d => d.date_reported;
  const yValue = d => d.people_vaccinated;
  const y1value = d => d.people_fully_vaccinated;

  d3.select("svg").html("")
  d3.select(".tooltip").html("")

  d3.select(".leftTitle").select("span").text(selectedCountry);
  d3.select(".leftTitle").select(".text-muted").text("Total Cases :"+d3.format(",")(totalCases));

  const g = svg.append("g")
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataFilter, xValue))
    // .domain([new Date("2020-12-01"), new Date("2021-07-31")])
    .range([0, innerWidth])
    .clamp(true)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataFilter, yValue)])
      .range([innerHeight, 0])
      .clamp(true)
      .nice();

      const y1Scale = d3.scaleLinear()
        .domain([0, d3.max(dataFilter, y1value)])
        .range([innerHeight, 0])
        .clamp(true)
        .nice();

  const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeWeek.every(5))

  const yAxisTickFormat = number =>
  d3.format('.2s')(number)
    .replace('G', 'B')

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
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
    .attr('font-size', '2em')
    .on("mouseover", (event) => {
      console.log(this.rectG)
    })
  //
  const yAxisG = g.append('g').call(yAxis)



  // const lineGenerator = d3.line()
  //   .x(d => xScale(xValue(d)))
  //   .y(d => yScale(yValue(d)))
  //   // .curve(d3.curveBasis);
  //
  //   pathG = g.append('g')
  //   pathG.append("path")
  //     .datum(dataFilter)
  //     .attr("fill", "none")
  //     .attr("stroke", "rgb(255, 187, 48)")
  //     .attr("stroke-width", 1.5)
  //     .attr("d",lineGenerator)
  //     .transition(1000)


    // const lineGenerator2 = d3.line()
    //   .x(d => xScale(xValue(d)))
    //   .y(d => yScale(y2Value(d)))
    //
    // lineG1 = g.append('g')
    // lineG1.append("path")
    // .datum(dataFilter)
    // .attr("fill", "none")
    //   .attr("stroke", "red")
    //   .attr("stroke-width", 1.5)
    //         .attr("d",lineGenerator2)


    // const areaGenerator = d3.area()
    //   .x(d => xScale(xValue(d)))
    //   .y0(innerHeight)
    //   .y1(d => yScale(yValue(d)))
    //
    // areaG = g.append('g')
    //
    // areaG.append("path")
    //       .attr('d', areaGenerator(dataFilter))
    //   .attr("fill", "rgb(0, 187, 0)")
    //   .attr("stroke", "rgb(0, 187, 1000)")
    //   .attr("stroke-width", 1.5)
    //   .attr("opacity","0.5")
    // //
    //   const areaGenerator2 = d3.area()
    //     .x(d => xScale(xValue(d)))
    //     .y0(innerHeight)
    //     .y1(d => y1Scale(d=> d.people_fully_vaccinated))
    //
    //   areaG1 = g.append('g')
    //   areaG1.append("path")
    //         .attr('d', areaGenerator2(dataFilter))
    //     .attr("fill", "red")
    //     .attr("stroke", "red")
    //     .attr("stroke-width", 1.5)

    //
    // const circleG = g.append('g')
    //       circleG.selectAll('circle').data(dataFilter)
    //         .enter().append('circle')
    //         .attr("cy", d => yScale(yValue(d)))
    //         .attr("cx", d => xScale(xValue(d)))
    //         .attr("r",  2)
    //         .on('mouseover', function(event) {
    //           d3.select(this).attr("r",  8).attr('fill', 'red')})
    //           .on('mouseout', function(event) {
    //             d3.select(this).attr("r",  1).attr('fill', 'black')})


  //
  rectG = g.append('g')

  rectG.selectAll('rect')
    .data(dataFilter)
    .enter().append('rect')
    .attr('x', d => xScale(xValue(d)))
    .attr('y', d => yScale(yValue(d)))
    .attr('height', d => innerHeight - yScale(yValue(d)))
    .attr('width', 2.5)
    // .attr('height', 0)
    .attr('fill', '#0093d5')
    // .transition().duration((d,i)=> (i+1) *1)
    // .delay((d,i)=> i *100)
    // .attr('height', d => innerHeight - yScale(yValue(d)))
    //   .attr('y', d => yScale(yValue(d)))
    .on('mouseover', function(event, d) {
      d3.select(this).attr('fill', '#AFADAD')
      d3.select(".tooltip").style("opacity", 1)
        .style("position", "absolute")
        .style("left", (event.pageX) - 160 + "px")
        .style("top", (event.pageY) + "px")
        .select('.span1')
        .text("Date: " + formatWeek(d.date_reported)  + "  Number of Cases:" + d3.format(",")(d.people_vaccinated))




      // console.log(d3.mouse)
      // d3.select(this).append('rect')
      // .attr('height', innerHeight)
      // .attr('width', 2)
      // .attr('stroke' ,'black')
      // d3.select(this).attr('fill', 'orange')
      // const [x,y] = d3.pointer(event)

    })
    .on('mouseout', function(event) {
      // d3.select(".tooltip").remove()
      d3.select(this).attr('fill', '#0093d5')
    })



    //
    // rect1G = g.append('g')
    //
    // rect1G.selectAll('rect')
    //   .data(dataFilter)
    //   .enter().append('rect')
    //   .attr('x', d => xScaleWidth(xValue(d)))
    //   .attr('y', d => y2Scale(y2Value(d)))
    //   .attr('height', d => innerHeight - y2Scale(y2Value(d)))
    //   .attr('width', xScaleWidth.bandwidth())
    //   // .attr('height', 0)
    //   .attr('fill', 'green')
    //   // .transition().duration((d,i)=> (i+1) *1)
    //   // .delay((d,i)=> i *100)
    //   // .attr('height', d => innerHeight - yScale(yValue(d)))
    //   //   .attr('y', d => yScale(yValue(d)))
    //   .on('mouseover', function(event, d) {
    //     d3.select(this).attr('fill', '#0093d5')
    //     d3.select(".tooltip").style("opacity", 1)
    //       .style("position", "absolute")
    //       .style("left", (event.pageX) - 160 + "px")
    //       .style("top", (event.pageY) -80 + "px")
    //       .select('.span1')
    //       .text("Date: " + formatWeek(d.date_reported)  + "Number of Cases:" + d.vax)
    //       .select('.span2')
    //       .text("Week:" + formatWeek(d.date_reported) + "<br>" + "Number of Cases:" + d.new_cases)
    //
    //
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
    //     d3.select(this).attr('fill', '#AFADAD')
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
