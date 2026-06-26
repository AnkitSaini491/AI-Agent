from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

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


# Real AI Chat API
@app.route("/ask", methods=["POST"])
def ask():

    data = request.get_json()

    prompt = data.get("message", "")

    if not prompt:
        return jsonify({"reply": "Please enter a message."})

    try:
        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})

    except Exception as e:
        return jsonify({"reply": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
