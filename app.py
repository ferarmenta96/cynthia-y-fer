
from flask import Flask, render_template, request

app = Flask(__name__)

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
    if request.method == "POST":
        score = 0
        for i, q in enumerate(questions):
            if request.form.get(f"q{i}") == q["answer"]:
                score += 1
        return render_template("result.html", score=score, total=len(questions))
    return render_template("quiz.html", questions=questions)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
