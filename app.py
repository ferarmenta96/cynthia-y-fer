from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route('/')
def index():
    return open("index.html", encoding="utf-8").read()

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
