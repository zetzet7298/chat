from flask import Flask, render_template
app = Flask(__name__)
@app.route('/login')
def login():
    return render_template('auth/login.html')

@app.route('/')
def chat_index():
    return render_template('chat/index.html')

if __name__ == '__main__':
    context = ('local.crt', 'local.key')
    app.run(
        host="0.0.0.0",
        debug=True,
        port=5000,
        # ssl_context='adhoc'
    )
