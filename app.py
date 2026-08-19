from flask import Flask, jsonify, render_template
import pandas as pd
import numpy as np

# Initialize Flask application
app = Flask(__name__)

# Path to telemetry dataset
CSV_PATH = "data/telemetry.csv"


def load_telemetry():
    """
    Load telemetry data from CSV and calculate
    derived flight metrics.
    """

    # Read telemetry CSV
    df = pd.read_csv(CSV_PATH)

    # Convert column names to lowercase for easier access throughout the application
    df.columns = df.columns.str.lower()

    # Calculate acceleration magnitude using X, Y, and Z accelerometer axes
    df["accel_mag"] = np.sqrt(
        df["accel_x"] ** 2 +
        df["accel_y"] ** 2 +
        df["accel_z"] ** 2
    )

    # Estimate altitude from barometric pressure using the standard atmosphere formula
    df["altitude"] = 44330 * (
        1 - (df["pressure"] / 101325) ** 0.1903
    )

    # Return telemetry records as JSON compatible data
    return df.to_dict(orient="records")


@app.route("/")
def home():
    """Render dashboard homepage."""
    return render_template("index.html")


@app.route("/api/telemetry")
def telemetry():
    """Serve telemetry data through API endpoint."""
    return jsonify(load_telemetry())


if __name__ == "__main__":
    app.run(debug=True)