// results.js
// Date: 29 Oct 2025
// Author: Alex Mazurczyk
// Objective: load and process data from ../data/summative.csv, then plot it

const getData = async () => {
  const response = await fetch("../data/summative.csv")
  const rawData = await response.text()

  // Headers on the left, data is row by row
  let data = {}
  let rows = rawData.split("\n")
  data.categories = rows[0].split(",").slice(1)
  data.means = rows[1].split(",").slice(1)
  data.stds = rows[2].split(",").slice(1) // standard deviations

  console.log(data)
  return data
}

const createChart = async () => {
  const data = await getData()
  const canvas = document.getElementById("barChart")
  const myChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: data.categories,
      datasets: [
        {
          data: data.means,
        },
      ],
    },
    options: {
      // Define display chart display options
      responsive: true, // Re-size based on screen size
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Trial",
          },
        },
        y: {
          title: {
            display: true,
            text: "Percent Change Over Five Days (%)",
          },
          ticks: {
            min: 8,
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "The Change in Length of the Cut Planaria After the Trial",
        },
        legend: {
          display: false,
        },
      },
    },
  })
}

createChart()
