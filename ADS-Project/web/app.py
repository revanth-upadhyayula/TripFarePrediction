from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__, template_folder='template')

# Load the trained model
model_pipeline = joblib.load('model.pkl')

# Load the HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Predict fare
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    new_data = pd.DataFrame(data, index=[0])

    fare_prediction = model_pipeline.predict(new_data)

    return jsonify(float(fare_prediction[0])*80)

if __name__ == '__main__':
    app.run(debug=True)