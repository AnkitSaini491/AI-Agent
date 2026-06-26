from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
import sqlite3
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__)

app.secret_key = "CHANGE_THIS_TO_A_RANDOM_SECRET_KEY"

# ==========================
# Gemini Setup
# ==========================

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

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
# Ask AI
# ==========================

@app.route("/ask", methods=["POST"])

def ask():

    data = request.get_json()

    question = data.get("message", "").strip()

    if not question:

        return jsonify({
            "reply":"Please type something."
        })

    try:

        response = model.generate_content(question)

        answer = response.text

        conn = sqlite3.connect("database.db")

        c = conn.cursor()

        c.execute(

            "INSERT INTO chats(question,answer,created_at) VALUES(?,?,?)",

            (question,answer,str(datetime.now()))

        )

        conn.commit()

        conn.close()

        return jsonify({

            "reply":answer

        })

    except Exception as e:

        return jsonify({

            "reply":str(e)

        })

# ==========================
# Chat History
# ==========================

@app.route("/history")

def history():

    conn=sqlite3.connect("database.db")

    c=conn.cursor()

    c.execute("""

    SELECT question,answer,created_at

    FROM chats

    ORDER BY id DESC

    LIMIT 30

    """)

    data=c.fetchall()

    conn.close()

    history=[]

    for row in data:

        history.append({

            "question":row[0],

            "answer":row[1],

            "time":row[2]

        })

    return jsonify(history)

# ==========================

if __name__=="__main__":

    app.run(debug=True)
