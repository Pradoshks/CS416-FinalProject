function weekGrowth(svg, usAllData, countries, countryName, data) {
  height = 600;
  width = 980;

  const path = d3.geoPath()
  const projection = d3.geoMercator()
    .scale(120)
    .translate([width / 2, height / 2 + 50]);

  const pathGenerator = path.projection(projection)

  const zoom = d3.zoom()
  svg.call(zoom.on('zoom', (event, d) => {
    g.attr('transform', event.transform)

  }));

  d3.select("svg").html("")

  let text1 ='But wait - are we there yet?'
  let text1a = ` Vacccines seem to help bend the curve. The cases/death have gone. Felt like everything will be back to
  normal. In the last few weeks, cases and deaths are increasing. `

  text2='Some countries have shown cases growth of 500% from last weeks. Deaths rate is increasing too.'
  text2a = ' Scientists are calling this the '
  text2b='"Pandemic of the UNVACCINATED".'
  text3= 'This chart provides a picture of how cases have been growing/ fallingn since last week. Click on the buttons above to navigate to slides.'
  text4 = 'How to use the Chart: '
  text5 = 'Hover over the chart to see more details or click on coutnries to see how they arrived here. Scroll on the map to Zoom in or Out.'
  d3.select(".leftTitle").html('<i><strong>'+text1+'</strong>'+text1a +'<strong>'+text2+'</strong>'+
            text2a+

            '<strong>'+text2b+'</strong>'+'<br><i>'+'<hr>'+text3+'<hr>'+'<i>'+'<strong>'+text4+'</strong>'+text5)

  const g = svg.append('g')
  const caseRange = [-100, -50, -25, 0, 25, 50, 100, 500]

  const colorScale = d3.scaleThreshold()
    .domain(caseRange)
    .range(d3.schemeBuPu[7]);

    d3.select(".card-heading")
      .select('text')
      .remove()

    d3.select(".card-heading")
      .append('text')
      .text("Where are confirmed cases increasing or falling?")

  mapG = g.append('g').selectAll('path')
    .data(countries)
    .enter()
    .append('path')
    .attr('d', pathGenerator)
    .attr('class', 'country')
    .attr('fill', setColor)
    .on('mouseover', mapToolTip)
    .on('mouseout', mapToolTipClear)
    .on('click', createChart)
    .append('title')
    .text(d => countryName[d.id])

  legendG = svg.append('g').selectAll('rect')
    .data(caseRange)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 50)
    .attr('y', 530)
    .attr('height', 12)
    .attr('width', 50)
    .attr('fill', d => colorScale(d))
    .attr('stroke', 'black')
    .attr('class', (d,i) => 'rect'+i)

  d3.select('.rect7').remove()
  d3.select('.rect6').remove()

  noDataG = svg.append('g')
  noDataG.append('rect')
    .attr('x', 0)
    .attr('y', 570)
    .attr('height', 12)
    .attr('width', 50)
    .attr('fill', 'lightgrey')
    .attr('stroke', 'black')

  textG = noDataG.append('text')
    .attr('x', 60)
    .attr('y', 580)
    .attr('font-size', '0.8em')
    .attr('fill', '#635F5D')
    .attr('class', 'tick')

  textG.text("No Data")

  const legendTextScale = d3.scalePoint()
    .domain([-100, -50, -25, 0, 25, 50, 100, 500])
    .range([0, 600 / 2])

  const legendTextScaleTickFormat = number =>
    d3.format('.0s')(number)
    .replace('G', 'B')

  const lgendTextAxis = d3.axisBottom(legendTextScale)
    .tickFormat(legendTextScaleTickFormat)

  const legendTextG = svg.append('g').call(lgendTextAxis)
    .attr('transform', `translate(0,${540 })`)
    .selectAll("text")

  legendTextG.selectAll('g').select('.tick').attr('opacity', 0)
    .select('line').attr('stroke', '#C0C0BB')

  function mapToolTip(d, i) {
  Weekly_case_growth = data.get(countryName[i.id]) || 0

    d3.select(".tooltip")
      .style("opacity", 1)
      .html("Country: <b>" + countryName[i.id] + "</b><br/>" +
            "% Growth since last Week : <b>" + d3.format(".2f")(Weekly_case_growth) +"%"+
        "</br> Click for change over time.")
      .style("left", (event.pageX) - 150 + "px")
      .style("top", (event.pageY) - 20 + "px")

  }

  function mapToolTipClear(d, i) {
    d3.select(".tooltip").style("opacity", 0)
  }

  function createChart(d, i) {
    Weekly_case_growth = data.get(countryName[i.id]) || 0
    ddd(countryName[i.id], Weekly_case_growth)
  }

  function setColor(d, i) {
    let Weekly_case_growth = data.get(countryName[d.id]) || 0
    if (Weekly_case_growth == 0)
      return 'lightgrey'
    return colorScale(Weekly_case_growth)
  }

}
