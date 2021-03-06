try:
    import unzip_requirements
except ImportError:
    pass

from flask import Flask, make_response
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

@app.errorhandler(404)
def not_found(error):
    response = make_response('NOT FOUND', 404)
    return response
