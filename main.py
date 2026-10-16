import os

from flask import Flask, render_template

# Static assets live alongside the templates: templates/static/css|js|assets
app = Flask(__name__, template_folder="templates", static_folder="templates/static")


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/demo")
def demo():
    return render_template("demo.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    debug = os.environ.get("FLASK_DEBUG", "False").lower() in ("1", "true", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug)
