from flask import Flask, render_template,request

app = Flask(__name__,template_folder = 'pages')

@app.route('/', methods=['GET','POST'])
def index():
    if request.method =='POST':
        if request.form['action'] == 'numberOutputsButton':
            outputNum = request.form['numberOutputs']
            outputVessel = request.form['selectVessel']
            outputSelect = 'empty'
            outputOpen = 'empty'
            outputClose = 'empty'
            outputDuration = 'empty'

            return render_template('liveview.html', outputNum = outputNum, outputVessel = outputVessel,
            outputSelect = outputSelect, outputOpen = outputOpen, outputClose = outputClose, outputDuration = outputDuration)
        if request.form['action'] == 'configureButton':
            outputNum = 'empty'
            outputVessel = 'empty'
            outputSelect = request.form['selectOutput']
            outputOpen = request.form['openSyringes']
            outputClose = request.form['closeSyringes']
            outputDuration = request.form['outputDuration']

            return render_template('liveview.html', outputNum = outputNum, outputVessel = outputVessel,
            outputSelect = outputSelect, outputOpen = outputOpen, outputClose = outputClose, outputDuration = outputDuration)

        if request.form['action'] == 'submitProtocol':
            return Submit

    else:
        return render_template('experiment.html')

@app.route('/liveview',methods=['GET','POST'])
def liveview():
    return render_template('liveview.html', numberOutputs = numberOutputs)

if __name__ == '__main__':
    app.run(debug=True)
