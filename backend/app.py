import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/execute-script', methods=['POST'])
def execute_script():
    try:
        # Trigger the automate.py script using subprocess
        result = subprocess.run(['python3', 'automate.py'], capture_output=True, text=True)
        
        # Return the output or error from the script
        if result.returncode == 0:
            return jsonify({"output": result.stdout}), 200
        else:
            return jsonify({"error": result.stderr}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
