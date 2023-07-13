# import dependencies
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify

import numpy as np
import psycopg2
import pandas as pd

# Connect to database
db_aqi = f"postgresql://postgres:{'Areyoume1!'}@127.0.0.1:5432/Merged AQI Database"
# Create the database engine using from sqlalchemy import create_engine
engine = create_engine(db_aqi)
# Reflect an existing database into a new model
Base = automap_base()
# Reflect the tables
Base.prepare(autoload_with=engine)
# Save reference to the table
averages = Base.classes.averages
# merge_aqi = Base.classes.merge_aqi

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    return (
        f"AQI Data<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/Countries<br/>"
        f"/api/v1.0/OzoneAvgs<br/>"
        f"/api/v1.0/NO2Avgs<br/>"
        f"/api/v1.0/PM2.5Avgs<br/>"
    )

# #Return a JSON list of G7 Countries
@app.route("/api/v1.0/Countries")
def Countries():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Return a list of all countries
    countries = session.query(averages.country).all()
    # Close the session (link)
    session.close()
    # Convert list of tuples into normal list
    all_names = list(np.ravel(countries))
    #Return a JSON list of country names
    return jsonify(all_names)

# #Return a JSON list of Ozone Averages
@app.route("/api/v1.0/OzoneAvgs")
def OzoneAvgs():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Return a list of all countries
    ozone_avgs = session.query(averages.ozone_aqi_value).all()
    # Close the session (link)
    session.close()
    # Convert list of tuples into normal list
    all_ozone_avgs = list(np.ravel(ozone_avgs))
    #Return a JSON list of country names
    return jsonify(all_ozone_avgs)

# #Return a JSON list of Nitrous Oxide Averages
@app.route("/api/v1.0/NO2Avgs")
def NO2Avgs():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Return a list of all countries
    no2_avgs = session.query(averages.no2_aqi_value).all()
    # Close the session (link)
    session.close()
    # Convert list of tuples into normal list
    all_no2_avgs = list(np.ravel(no2_avgs))
    #Return a JSON list of country names
    return jsonify(all_no2_avgs)

# #Return a JSON list of Particulate Matter Averages
@app.route("/api/v1.0/PM2.5Avgs")
def PM25():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Return a list of all countries
    pm_avgs = session.query(averages.pm25_aqi_value).all()
    # Close the session (link)
    session.close()
    # Convert list of tuples into normal list
    all_pm25_avgs = list(np.ravel(pm_avgs))
    #Return a JSON list of country names
    return jsonify(all_pm25_avgs)

if __name__ == '__main__':
    app.run(debug=True)