from flask import Flask, jsonify, render_template
import pandas as pd
import numpy as np

app = Flask(__name__)

CSV_PATH = "data/telemetry.csv"


def load_telemetry():
    df = pd.read_csv(CSV_PATH)

    df.columns = df.columns.str.lower()

    df["accel_mag"] = np.sqrt(
        df["accel_x"] ** 2 +
        df["accel_y"] ** 2 +
        df["accel_z"] ** 2
    )
    
    df["altitude"] = 44330 * (
        1 - (df["pressure"] / 101325) ** 0.1903
    )

    return df.to_dict(orient="records")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/telemetry")
def telemetry():
    return jsonify(load_telemetry())


if __name__ == "__main__":
    app.run(debug=True)