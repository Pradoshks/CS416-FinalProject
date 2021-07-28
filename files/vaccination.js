function vaccination(selectedCountry,totalCases) {


  height = 600;
  width = 900;

  const chartHolder = d3.select(".chart-holder").append('div')
  // const svgx = d3.select("svg").attr('height', height).attr('width', width)
  // const svg = d3.select('.chart-holder').select('div').append('svg').attr('height', height).attr('width', width)

const svg = d3.select('svg')
  usDaily = d3.csv('/USA/us_daily.csv')
  usStatesDaily = d3.csv('/USA/us-states_daily.csv')
  usCountiesDaily = d3.csv('/USA/us-counties_daily.csv')

  usCumul = d3.csv('/USA/us_cumul.csv')
  usDaily = d3.csv('/USA/us-states_cumul.csv')
  usDaily = d3.csv('/USA/us-counties_cumul.csv')
  wordAllData = d3.csv('/USA/owid-covid-data.csv')

  Promise.all([wordAllData,usCumul])
    .then(([wordAllData,usCumul]) => {
      wordAllData.forEach(d => {
        d.new_deaths = +d.new_deaths;
        d.new_cases = +d.new_cases;
        d.total_vaccinations	= +d.total_vaccinations
        d.people_vaccinated	= +d.people_vaccinated
        d.people_fully_vaccinated	 = +d.people_fully_vaccinated
        d.new_vaccinations = +d.new_vaccinations
        d.date_reported = new Date(d.date) //+ new Date(d.date).getDate()
      })

    usCumul.forEach(d =>{
      d.cases = +d.cases;
      d.deaths = +d.deaths;
      d.date_reported = new Date(d.date)
    })
    // selectedCountry ='United States'
console.log('ggg'+selectedCountry)
      createVaccineChart(svg, wordAllData ,selectedCountry,totalCases)
    })

}
