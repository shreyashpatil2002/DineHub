import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../../config.js";

const auth = getAuth(app);

var options = {
  series: [{
  name: 'Last week',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'This week',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  toolbar: {
    show: true,
    tools: {
      download: true,
      selection: true,
      zoom: false,
      zoomin: false,
      zoomout: false,
      pan: false,
      reset: false
    },
  },
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'category',
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
},
tooltip: {
  x: {
    format: 'dd'
  },
},
};

var chart = new ApexCharts(document.querySelector("#salesChart"), options);
chart.render();

var options = {
  series: [42, 47, 52, 58, 65],
  chart: {
  width: 380,
  type: 'polarArea'
},
labels: ['Veg', 'Non-veg', 'Fast Food', 'Hot Drinks', 'Cold Drinks'],
fill: {
  opacity: 1
},
stroke: {
  width: 1,
  colors: undefined
},
yaxis: {
  show: false
},
legend: {
  position: 'bottom',
},
plotOptions: {
  polarArea: {
    rings: {
      strokeWidth: 0
    },
    spokes: {
      strokeWidth: 0
    },
  }
},
theme: {
  monochrome: {
    enabled: false,
    shadeTo: 'light',
    shadeIntensity: 0.65
  }
}
};

var chart = new ApexCharts(document.querySelector("#categorySales"), options);
chart.render();