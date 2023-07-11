# import dependencies
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify

import numpy as np
import psycopg2
import pandas as pd

# # connect to database
db_aqi = f"postgresql://postgres:{'Areyoume1!'}@127.0.0.1:5432/Merged AQI Database"

# # create the database engine using from sqlalchemy import create_engine
engine = create_engine(db_aqi)

# # reflect an existing database into a new model
Base = automap_base()

# # reflect the tables
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
        f"/api/v1.0/Canada<br/>"
        f"/api/v1.0/France<br/>"
        f"/api/v1.0/Germany<br/>"
        f"/api/v1.0/Italy<br/>"        
        f"/api/v1.0/Japan<br/>"
        f"/api/v1.0/United Kingdom<br/>"
        f"/api/v1.0/United States<br/>"
    )

# #Return a JSON list of Canada's AQI Data
@app.route("/api/v1.0/Canada")
def Canada():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Return a list of all countries
    countries = session.query(averages.country).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(countries))

    #Return a JSON list of country names
    return jsonify(all_names)

if __name__ == '__main__':
    app.run(debug=True)