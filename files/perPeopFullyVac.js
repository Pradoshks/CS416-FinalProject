function perPeopFullyVac(svg, wordAllData, selectedCountry, selectedvalue){

  let data ={}
  data=wordAllData

  formatWeek = d3.timeFormat("%b %d %Y")

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
    right: 0
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = d => d.date_reported;
  const xAxisLabel = 'Timeline';

  const yValue = d => d.perc_people_full_vacc;
  const yAxisLabel = 'Share Of Population Fully Vaccinated (%)';

  d3.select("svg").html("")
  d3.select(".tooltip").html("")

  d3.select(".leftTitle").text("")
  d3.select(".leftTitle")
  .html("Country : " + selectedCountry + "</br>" + "% Vaccinations : "+d3.format(".2f")(selectedvalue)+'%')

  const g = svg.append("g")
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataFilter, xValue))
    // .domain([new Date("2020-12-01"), new Date("2021-07-31")])
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

  const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeWeek.every(8))

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

  const yAxisG = g.append('g').call(yAxis)

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .text(yAxisLabel)
    .attr("x", -innerHeight / 2)
    .attr('y', -60)
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", `middle`)
    .attr("fill", "black");

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .text(xAxisLabel)
    .attr("x", innerWidth / 2)
    .attr('y', 50)
    .attr("fill", "black");

  yAxisG.selectAll('.domain')
    .remove();

  xAxisG.select('.domain')
    .remove();

  const title = "Vaccination Over Time - " + selectedCountry
  g.append('text')
    .attr('class', 'title')
    .attr('y', -25)
    .attr('x', 210)
    .text(title)

  rectG = g.append('g')

  rectG.selectAll('rect')
    .data(dataFilter)
      .enter().append('rect')
      .attr('x', d => xScaleWidth(xValue(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('width', xScaleWidth.bandwidth())
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('fill', '#238b45')
    .on('mouseover',function(event,d){
        d3.select(this).attr('fill', '#AFADAD')
        d3.select(".tooltip")
          .style("opacity", 1)
          .html("Date: <b>" + formatWeek(d.date_reported) +"</b><br>"  +
                "Number People Fully Vaccinated: <b>" + d3.format(".2f")(d.perc_people_full_vacc)+'%')
          .style("left", (event.pageX) -150 +"px")
          .style("top", (event.pageY) -20+ "px")
    })
    .on('mouseout', function(event) {
      d3.select(".tooltip").html("")
      d3.select(this).attr('fill', "#238b45")
    })
}
