async function loadTelemetry() {

    // Fetch telemetry data from Flask API
    const response = await fetch("/api/telemetry");
    const data = await response.json();

    // Extract timestamps for chart x-axis
    const time = data.map(d => d.timestamp);

    // -----------------------------
    // Dashboard Statistics Cards
    // -----------------------------

    document.getElementById("maxAccel").innerText =
        Math.max(...data.map(d => d.accel_mag)).toFixed(2);

    document.getElementById("maxPressure").innerText =
        Math.max(...data.map(d => d.pressure)).toFixed(2);

    document.getElementById("gpsSats").innerText =
        Math.max(...data.map(d => d.gps_sats));

    document.getElementById("sampleCount").innerText =
        data.length;

    document.getElementById("flightTime").innerText =
        Math.round(time[time.length - 1]) + " s";

    document.getElementById("currentAltitude").innerText =
        data[data.length - 1].altitude.toFixed(2) + " m";

    // Shared dark theme used by all charts
    const layoutTemplate = {
        paper_bgcolor: "#1e293b",
        plot_bgcolor: "#1e293b",
        font: {
            color: "white"
        }
    };

    // -----------------------------
    // Accelerometer Plot
    // -----------------------------
    Plotly.newPlot("accelChart", [
        {
            x: time,
            y: data.map(d => d.accel_x),
            name: "Accel X",
            mode: "lines"
        },
        {
            x: time,
            y: data.map(d => d.accel_y),
            name: "Accel Y",
            mode: "lines"
        },
        {
            x: time,
            y: data.map(d => d.accel_z),
            name: "Accel Z",
            mode: "lines"
        },
        {
            x: time,
            y: data.map(d => d.accel_mag),
            name: "Magnitude",
            mode: "lines"
        }
    ], {
        ...layoutTemplate,
        title: "Accelerometer Data",
        xaxis: { title: "Timestamp" },
        yaxis: { title: "Acceleration" }
    });

    // -----------------------------
    // Gyroscope Plot
    // -----------------------------
    Plotly.newPlot("gyroChart", [
        {
            x: time,
            y: data.map(d => d.gyro_x),
            name: "Gyro X",
            mode: "lines"
        },
        {
            x: time,
            y: data.map(d => d.gyro_y),
            name: "Gyro Y",
            mode: "lines"
        },
        {
            x: time,
            y: data.map(d => d.gyro_z),
            name: "Gyro Z",
            mode: "lines"
        }
    ], {
        ...layoutTemplate,
        title: "Gyroscope Data",
        xaxis: { title: "Timestamp" },
        yaxis: { title: "Angular Velocity" }
    });

    // -----------------------------
    // Pressure Plot
    // -----------------------------
    Plotly.newPlot("pressureChart", [
        {
            x: time,
            y: data.map(d => d.pressure),
            name: "Pressure",
            mode: "lines"
        }
    ], {
        ...layoutTemplate,
        title: "Barometric Pressure",
        xaxis: { title: "Timestamp" },
        yaxis: { title: "Pressure (Pa)" }
    });

    // -----------------------------
    // Altitude Plot
    // -----------------------------
    Plotly.newPlot("altitudeChart", [
        {
            x: time,
            y: data.map(d => d.altitude),
            name: "Altitude",
            mode: "lines"
        }
    ], {
        ...layoutTemplate,
        title: "Estimated Altitude",
        xaxis: { title: "Timestamp" },
        yaxis: { title: "Altitude (m)" }
    });
}

// Load dashboard when page opens
loadTelemetry();