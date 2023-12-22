let btn = document.getElementById("array-btn");
let inputEl = document.getElementById("inputArr");

btn.addEventListener("click", () => {
  fetchInput();
});

// Fetch data from the input
const fetchInput = () => {
  let inputArray = inputEl.value.split(",");
  waterAndBlocks(inputArray);
  water(inputArray);
};

const createChart = (xaxisinput, outputArr, id) => {
  let dom = document.getElementById(id);
  let myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });
  let option;
  option = {
    xAxis: {
      type: "category",
      data: xaxisinput,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: outputArr,
        type: "bar",
      },
    ],
  };
  if (option && typeof option === "object") {
    myChart.setOption(option);
  }
  window.addEventListener("resize", myChart.resize);
};

const countWater = (finalDataSet) => {
  let sum = 0;
  for (let i = 0; i < finalDataSet.length; i++) {
    if (finalDataSet[i] != "-") {
      sum += +finalDataSet[i];
    }
  }
  return sum;
};

const waterAndBlocks = (blocks) => {
  let finalDataSet = [],
    firstDataSet = [],
    secondDataSet = [],
    result = [],
    lastValueFirstData = 0,
    lastValueSecondData = 0;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] == 0) {
      firstDataSet.push(lastValueFirstData);
    } else {
      firstDataSet.push("-");
      lastValueFirstData = blocks[i];
    }
  }

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] == 0) {
      secondDataSet.unshift(lastValueSecondData);
    } else {
      secondDataSet.unshift("-");
      lastValueSecondData = blocks[i];
    }
  }

  for (let i = 0; i < blocks.length; i++) {
    if (firstDataSet[i] == "-") {
      finalDataSet[i] = "-";
    } else {
      finalDataSet[i] =
        firstDataSet[i] - secondDataSet[i] > 0
          ? secondDataSet[i]
          : firstDataSet[i];
    }
  }

  for (let i = 0; i < blocks.length; i++) {
    let element = blocks[i];
    if (element == 0) {
      result.push({
        value: finalDataSet[i],
        itemStyle: {
          color: "#77e1fe",
        },
      });
    } else {
      result.push({
        value: element,
        itemStyle: {
          color: "#ff8800",
        },
      });
    }
  }

  createChart(blocks, result, "waterBlock-chart-container");
  let outputSpan = document.getElementById("waterunit");
  outputSpan.innerHTML = `Total ${countWater(finalDataSet)} Water Units`;
};

// Fetch only water
function water(water) {
  let finalDataSet = [],
    firstDataSet = [],
    secondDataSet = [],
    result = [],
    lastValueFirstData = 0,
    lastValueSecondData = 0;
  for (let i = 0; i < water.length; i++) {
    if (water[i] == 0) {
      firstDataSet.push(lastValueFirstData);
    } else {
      firstDataSet.push("-");
      lastValueFirstData = water[i];
    }
  }
  for (let i = water.length - 1; i >= 0; i--) {
    if (water[i] == 0) {
      secondDataSet.unshift(lastValueSecondData);
    } else {
      secondDataSet.unshift("-");
      lastValueSecondData = water[i];
    }
  }
  for (let i = 0; i < water.length; i++) {
    if (firstDataSet[i] == "-") {
      finalDataSet[i] = "-";
    } else {
      finalDataSet[i] =
        firstDataSet[i] - secondDataSet[i] > 0
          ? secondDataSet[i]
          : firstDataSet[i];
    }
  }
  for (let i = 0; i < water.length; i++) {
    if (water[i] == 0) {
      result.push({
        value: finalDataSet[i],
        itemStyle: {
          color: "#77e1fe",
        },
      });
    } else {
      result.push({
        value: water[i] - finalDataSet[i], // Subtract the finalDataSet value from the water[i] value to get the water amount
        itemStyle: {
          color: "#77e1fe",
        },
      });
    }
  }

  createChart(water, result, "water-chart-container");
}
