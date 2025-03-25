import * as d3 from '../node_modules/d3/dist/d3.min.js';
document.addEventListener("routeLoaded", () => {
    console.log("[INFO] Statistics Page Loaded");
    if (location.hash.slice(1) == "/statistics") {
        const container = d3.select("#visitorChart");
        if (container.empty()) {
            console.error('Error: Container element not found.');
            return;
        }
        const svg = container.append("svg")
            .attr("width", 800)
            .attr("height", 400);
        // Fetch visitor statistics data
        fetch('./otherFiles/statistics.json')
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then((data) => {
            console.log('Data fetched successfully:', data);
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const width = +svg.attr("width") - margin.left - margin.right;
            const height = +svg.attr("height") - margin.top - margin.bottom;
            const x = d3.scaleTime()
                .domain(d3.extent(data, d => new Date(d.date)))
                .range([margin.left, width - margin.right]);
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.visitors)]).nice()
                .range([height - margin.bottom, margin.top]);
            const xAxis = (g) => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
            const yAxis = (g) => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .call((g) => g.select(".domain").remove())
                .call((g) => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("Number of Visitors"));
            svg.append("g")
                .call(xAxis);
            svg.append("g")
                .call(yAxis);
            const line = d3.line()
                .defined(d => !isNaN(d.visitors))
                .x(d => x(new Date(d.date)))
                .y(d => y(d.visitors));
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line);
            console.log('Chart rendered successfully');
        })
            .catch(error => console.error('Error fetching visitor statistics:', error));
    }
});
//# sourceMappingURL=statistics.js.map