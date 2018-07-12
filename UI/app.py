from flask import Flask, render_template,request
app = Flask(__name__,template_folder = 'pages')

class Protocol:
    def __init__(Protocol,numOutputs,vessel,syringeCombination,)

@app.route('/')
def hello_world():
    return render_template('experiment.html')

if __name__ == '__main__':
    app.run(debug=True)
