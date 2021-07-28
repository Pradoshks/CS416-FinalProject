function ccc() {
  height = 400;
  width = 1200;

  const svg = d3.select("svg").attr('height', height).attr('width', width)
  us = d3.csv('/USA/us_daily.csv')
  worldDataWeek = d3.csv('world_cases_deaths_week_global.csv')
  worldDataMonth = d3.csv('world_cases_deaths_month_global.csv')
  countryDetails = d3.csv('country_name.csv')
  regionDataMonth = d3.csv("new_cases_deaths_month_global.csv")  //Continentwise

  Promise.all([worldDataWeek, worldDataMonth, countryDetails,regionDataMonth,us])
    .then(([worldDataWeek, worldDataMonth, countryDetails,regionDataMonth,us]) => {
      worldDataWeek.forEach(d => {
        d.new_deaths = +d.new_deaths;
        d.new_cases = +d.new_cases
        d.date_reported = new Date(d.date_reported) //+ new Date(d.date).getDate()
      })

      worldDataMonth.forEach(d => {
        d.new_deaths = +d.new_deaths;
        d.new_cases = +d.new_cases
        d.date_reported = new Date(d.date_reported) //+ new Date(d.date).getDate()
      })

      regionDataMonth.forEach(d => {
        d.new_deaths = +d.new_deaths;
        d.new_cases = +d.new_cases
        d.date_reported = new Date(d.date_reported) //+ new Date(d.date).getDate()
      })
      console.log(us)
      render(svg, worldDataWeek, worldDataMonth, countryDetails, regionDataMonth)
    })

}
