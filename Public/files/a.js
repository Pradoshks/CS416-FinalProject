function aaa(){


  // height = document.documentElement.clientHeight
  // width = document.documentElement.clientWidth
  height = 800;
  width = 1200;

  const svg = d3.select("svg").attr('height', height).attr('width', width)

  const render = (data) => {

  const  margin = {
      top:50,
      bottom:50,
      left :100,
      right: 50
    }

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const xValue = d => d.Name
    const yValue = d => d.case_cum_total

    const xScale = d3.scaleBand()
      .domain(data.map(xValue))
      .range([0,innerWidth])
      .padding(0.3)


    const yScale = d3.scaleLinear()
      .domain([0,d3.max(data, yValue)])
      .range([innerHeight,0])
      .nice()

    const xAxis = d3.axisBottom(xScale).ticks(10)
    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth)

    const g = svg.append('g')
      .attr('transform',`translate(${margin.left},${margin.top})`)

    const xAxisG = g.append('g')
      .call(xAxis)
      .attr('transform',`translate(0, ${innerHeight})`)
      .attr('stroke', 'black')
      .selectAll('text')


    const yAxisG = g.append('g')
      .call(yAxis)

    const rectG = g.selectAll('rect')
      .data(data)
      .enter().append('rect')
        .attr('x', d => xScale(xValue(d)))
        .attr('y', d => yScale(yValue(d)))
        .attr('height', function(d){return innerHeight -yScale(yValue(d))})
        .attr('width', xScale.bandwidth())
        .attr('stroke', 'black')
  }


data = d3.csv('WHO_COVID-19-Ju.csv')

Promise.all([data])
    .then(([data]) => {
      data.forEach(d => {
        d.case_cum_total = +d.case_cum_total

      })
          render(data)
    })

}
