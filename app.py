from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
import sqlite3
import os
from datetime import datetime

# ==========================
# Load Environment
# ==========================

load_dotenv()

app = Flask(__name__)
app.secret_key = "change_this_secret_key"

# ==========================
# Gemini Setup
# ==========================

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

# ==========================
# Database
# ==========================

def init_db():

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS chats(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        answer TEXT,
        created_at TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()
# ==========================
# Routes
# ==========================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


# ==========================
# Ask Gemini
# ==========================

@app.route("/ask", methods=["POST"])
def ask():

    try:

        data = request.get_json()

        question = data.get("message", "").strip()

        if question == "":
            return jsonify({
                "reply": "Please type a message."
            })

        response = model.generate_content(question)

        answer = response.text

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute(
            "INSERT INTO chats(question,answer,created_at) VALUES(?,?,?)",
            (
                question,
                answer,
                str(datetime.now())
            )
        )

        conn.commit()
        conn.close()

        return jsonify({
            "reply": answer
        })

    except Exception as e:

        return jsonify({
            "reply": f"Error: {str(e)}"
        })
        # ==========================
# Chat History API
# ==========================

@app.route("/history")
def history():

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("""
        SELECT question, answer, created_at
        FROM chats
        ORDER BY id DESC
        LIMIT 30
    """)

    rows = c.fetchall()

    conn.close()

    history = []

    for row in rows:

        history.append({

            "question": row[0],

            "answer": row[1],

            "time": row[2]

        })

    return jsonify(history)


# ==========================
# Error Handler
# ==========================

@app.errorhandler(404)
def not_found(error):

    return render_template("index.html"), 404


# ==========================
# Main
# ==========================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )
    
        
