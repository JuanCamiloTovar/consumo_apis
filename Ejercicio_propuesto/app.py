from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/games', methods = ['GET'])
def games():
    response = requests.get('https://www.freetogame.com/api/games')
    data = response.json()
    return jsonify(data)

@app.route('/filter', methods = ['GET'])
def filter():
    info = request.get_json()
    
    platform = info['platform']
    category = info['category']
    zorted = info['sorted']
    
    if platform != '' and category == '' and zorted == '':
        response = requests.get(f'https://www.freetogame.com/api/games?platform={platform}')
        data = response.json()
        return jsonify(data)
    elif category != '' and platform == '' and zorted == '':
        response = requests.get(f'https://www.freetogame.com/api/games?category={category}')
        data = response.json()
        return jsonify(data)
    elif zorted != '' and platform == '' and category == '':
        response = requests.get(f'https://www.freetogame.com/api/games?sort-by={zorted}')
        data = response.json()
        return jsonify(data)
    else:
        if platform != '' and category != '' and zorted != '':
            response = requests.get(f'https://www.freetogame.com/api/games?platform={platform}&category={category}&sort-by={zorted}')
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'Mensaje': 'Porfavor use 1 filtro o 3 para completar el endpoint'})
if __name__ == '__main__':
    app.run(debug=True)