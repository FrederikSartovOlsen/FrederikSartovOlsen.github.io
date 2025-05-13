// Wait until the HTML is fully loaded before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log("Website loaded. Starting script...")
    // --- Get references to HTML elements ---
    const countrySelect = document.getElementById('countrySelect');
    const yearSelectCountry = document.getElementById('yearSelectCountry');
    const countrySummaryStatsEl = document.getElementById('countrySummaryStats');
    const topPartnersChartCanvas = document.getElementById('topPartnersChart');
    const selectedCountryTrendCanvas = document.getElementById('selectedCountryTrendChart');

    // --- Check if elements exist ---
    if (!countrySelect || !yearSelectCountry || !countrySummaryStatsEl || !topPartnersChartCanvas || !selectedCountryTrendCanvas) {
        console.error("ERROR: One or more essential HTML elements not found. Check IDs in index.markdown.");
        if (countrySummaryStatsEl) countrySummaryStatsEl.innerHTML = `<span style="color: red;">Error: Essential HTML elements for charts missing.</span>`;
        return; // Stop if elements are missing
    }

    // Get the 2D drawing context for the charts
    const topPartnersChartCtx = topPartnersChartCanvas.getContext('2d');
    const selectedCountryTrendCtx = selectedCountryTrendCanvas.getContext('2d');

    // --- Variables to hold our data and charts ---
    let allFlowsData = [];
    let countryTotalsData = [];
    let uniqueCountriesList = [];

    let topPartnersChartInstance = null; // To store the Chart.js object for top partners
    let selectedCountryTrendChartInstance = null; // To store the Chart.js object for the trend

    // --- Simple CSV Parser ---
    // Assumes comma delimiter and no commas within fields.
    // For robust CSV parsing, consider a library like PapaParse.js if issues arise.
    function parseSimpleCSV(text) {
        const lines = text.trim().split('\n');
        if (lines.length < 2) {
            console.warn("CSV text has less than 2 lines (header + data). Returning empty array.");
            return [];
        }
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            let rowObject = {};
            headers.forEach((header, i) => {
                rowObject[header] = values[i];
            });
            return rowObject;
        });
    }

     // --- Function to Load Data ---
     async function loadAllData() {
        console.log("Attempting to load data...");
        try {
            // Use the globally defined SITE_BASE_URL
            const baseUrl = typeof SITE_BASE_URL !== 'undefined' ? SITE_BASE_URL : ''; // Fallback if not defined

            const [flowsRes, totalsRes, countriesRes] = await Promise.all([
                fetch(baseUrl + '/data/all_yearly_country_flows.csv'),
                fetch(baseUrl + '/data/country_yearly_totals.csv'),
                fetch(baseUrl + '/data/unique_countries.json')
            ]);

            // Check if fetch requests were successful
            if (!flowsRes.ok) throw new Error(`Failed to fetch all_yearly_country_flows.csv: ${flowsRes.status} ${flowsRes.statusText}`);
            if (!totalsRes.ok) throw new Error(`Failed to fetch country_yearly_totals.csv: ${totalsRes.status} ${totalsRes.statusText}`);
            if (!countriesRes.ok) throw new Error(`Failed to fetch unique_countries.json: ${countriesRes.status} ${countriesRes.statusText}`);

            // Get the text/json content
            const flowsText = await flowsRes.text();
            const totalsText = await totalsRes.text();
            uniqueCountriesList = await countriesRes.json();

            // Parse the CSV text into arrays of objects
            allFlowsData = parseSimpleCSV(flowsText);
            countryTotalsData = parseSimpleCSV(totalsText);

            // IMPORTANT: Convert string numbers from CSV to actual numbers
            allFlowsData.forEach(row => {
                row.year = parseInt(row.year) || 0;
                row.participants = parseInt(row.participants) || 0;
            });
            countryTotalsData.forEach(row => {
                row.year = parseInt(row.year) || 0;
                row.total_sent = parseInt(row.total_sent) || 0;
                row.total_received = parseInt(row.total_received) || 0;
            });

            console.log("Data successfully loaded and parsed.");
            // Now that data is loaded, populate dropdowns and set up charts
            setupSelectorsAndCharts();

        } catch (error) {
            console.error("FATAL ERROR during data loading:", error);
            countrySummaryStatsEl.innerHTML = `<span style="color: red;">Error loading data. Please check console and data file paths. (${error.message})</span>`;
        }
    }


    // --- Function to Populate Selectors and Attach Listeners ---
    function setupSelectorsAndCharts() {
        console.log("Setting up selectors and charts...");

        // --- Populate Country Dropdown ---
        if (uniqueCountriesList && uniqueCountriesList.length > 0) {
            uniqueCountriesList.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country; // TODO: Map ISO codes to full names if available
                countrySelect.appendChild(option);
            });
        } else {
            console.warn("Unique countries list is empty. Country dropdown will not be populated.");
        }


        // --- Populate Year Dropdown ---
        const startYear = 2015;
        const endYear = 2022; // Adjust if your data range differs
        for (let year = endYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelectCountry.appendChild(option);
        }
        // Set default selection (e.g., 2019)
        yearSelectCountry.value = "2019";

        // --- Attach Event Listeners ---
        countrySelect.addEventListener('change', updateDisplay);
        yearSelectCountry.addEventListener('change', updateDisplay);

        // --- Initial Display ---
        updateDisplay();
        console.log("Selectors populated and initial display updated.");
    }

    // --- Helper to draw message on canvas ---
    function drawNoDataMessage(ctx, message) {
        if (!ctx) return;
        const canvas = ctx.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#666'; // Darker grey
        ctx.font = '16px Arial';
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }

    // --- Function to Update Stats and Charts Based on Selection ---
    function updateDisplay() {
        const selectedCountry = countrySelect.value;
        const selectedYear = parseInt(yearSelectCountry.value);

        console.log(`Updating display for Country: ${selectedCountry || '"All Countries"'}, Year: ${selectedYear}`);

        countrySummaryStatsEl.textContent = ''; // Clear previous text

        if (topPartnersChartInstance) {
            topPartnersChartInstance.destroy();
            topPartnersChartInstance = null;
        }
        if (selectedCountryTrendChartInstance) {
            selectedCountryTrendChartInstance.destroy();
            selectedCountryTrendChartInstance = null;
        }

        if (!selectedCountry) { // "All Countries" selected
            countrySummaryStatsEl.textContent = "Select a country from the dropdown to see details.";
            // Hide canvases and their titles
            topPartnersChartCanvas.style.display = 'none';
            selectedCountryTrendCanvas.style.display = 'none';
            const topPartnersHeader = document.querySelector('#topPartnersChartContainer h4');
            if (topPartnersHeader) topPartnersHeader.style.display = 'none';
            const trendHeader = document.querySelector('#selectedCountryTrendContainer h4');
            if (trendHeader) trendHeader.style.display = 'none';
            return;
        } else {
             // Make sure canvases and titles are visible if a country IS selected
             topPartnersChartCanvas.style.display = 'block';
             selectedCountryTrendCanvas.style.display = 'block';
             const topPartnersHeader = document.querySelector('#topPartnersChartContainer h4');
             if (topPartnersHeader) topPartnersHeader.style.display = 'block';
             const trendHeader = document.querySelector('#selectedCountryTrendContainer h4');
             if (trendHeader) trendHeader.style.display = 'block';
        }

        // --- 1. Update Summary Stats ---
        const countryYearTotal = countryTotalsData.find(
            d => d.country_iso === selectedCountry && d.year === selectedYear
        );
        if (countryYearTotal) {
            countrySummaryStatsEl.textContent =
                `${selectedCountry} (${selectedYear}): Sent: ${countryYearTotal.total_sent.toLocaleString()} | Received: ${countryYearTotal.total_received.toLocaleString()}`;
        } else {
            countrySummaryStatsEl.textContent = `${selectedCountry} (${selectedYear}): Aggregate data not found for this year.`;
        }

        // --- 2. Update Top Partners Chart (Showing Top Destinations from selected country) ---
        const sendingFlows = allFlowsData
            .filter(d => d.sending_country_iso === selectedCountry && d.year === selectedYear && d.receiving_country_iso !== selectedCountry)
            .sort((a, b) => b.participants - a.participants)
            .slice(0, 10); // Top 10

        if (sendingFlows.length > 0) {
            topPartnersChartInstance = new Chart(topPartnersChartCtx, {
                type: 'bar',
                data: {
                    labels: sendingFlows.map(d => d.receiving_country_iso),
                    datasets: [{
                        label: `Participants Sent`, // Simplified label
                        data: sendingFlows.map(d => d.participants),
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { beginAtZero: true, title: { display: true, text: 'Number of Participants' } },
                        y: { title: { display: true, text: 'Receiving Country' } }
                    },
                    plugins: {
                        title: { display: true, text: `Top Destinations from ${selectedCountry} (${selectedYear})` },
                        legend: { display: false }
                    }
                }
            });
        } else {
            drawNoDataMessage(topPartnersChartCtx, `No sending data from ${selectedCountry} in ${selectedYear}.`);
        }

        // --- 3. Update Selected Country Trend Chart ---
        const countryTrendData = countryTotalsData
            .filter(d => d.country_iso === selectedCountry)
            .sort((a, b) => a.year - b.year);

        if (countryTrendData.length > 0) {
            selectedCountryTrendChartInstance = new Chart(selectedCountryTrendCtx, {
                type: 'line',
                data: {
                    labels: countryTrendData.map(d => d.year.toString()), // Ensure labels are strings for Chart.js
                    datasets: [
                        {
                            label: `Sent from ${selectedCountry}`,
                            data: countryTrendData.map(d => d.total_sent),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0.1
                        },
                        {
                            label: `Received in ${selectedCountry}`,
                            data: countryTrendData.map(d => d.total_received),
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Number of Participants' } },
                        x: { title: { display: true, text: 'Year' } }
                    },
                    plugins: {
                        title: { display: true, text: `Sending & Receiving Trend for ${selectedCountry}` }
                    }
                }
            });
        } else {
            drawNoDataMessage(selectedCountryTrendCtx, `No trend data available for ${selectedCountry}.`);
        }
    } // End of updateDisplay function

    // --- Start the process by loading data ---
    loadAllData();

}); // End of DOMContentLoaded listener