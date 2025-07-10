from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'cynthia-y-fer'

questions = [
    {
        "question": "¿Dónde fue nuestra primer cita?",
        "options": ["Cine", "Yaqui", "Parque", "Banco"],
        "answer": "Yaqui"
    },
    {
        "question": "¿Cuál fue nuestra primer película?",
        "options": ["Titanic", "Heretic", "Avengers", "Coco"],
        "answer": "Heretic"
    },
    {
        "question": "¿Qué color de rosas te regalé primero?",
        "options": ["Rojas", "Blancas", "Rosas", "Amarillas"],
        "answer": "Rojas"
    },
    {
        "question": "¿Dónde fue nuestro primer beso?",
        "options": ["En el cine", "Afuera de tu casa", "En el parque", "HEB"],
        "answer": "Afuera de tu casa"
    }
]

@app.route("/", methods=["GET", "POST"])
def quiz():
    session['answers'] = []
    return redirect(url_for('question', num=0))

@app.route("/question/<int:num>", methods=["GET", "POST"])
def question(num):
    if num >= len(questions):
        return redirect(url_for('result'))

    if request.method == "POST":
        selected = request.form.get("answer")
        if 'answers' not in session:
            session['answers'] = []
        session['answers'].append(selected)
        session.modified = True
        return redirect(url_for('question', num=num+1))

    return render_te_