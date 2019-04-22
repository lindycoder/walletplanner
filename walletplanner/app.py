import os

from flask import Flask

from walletplanner.api import blueprint as api_blueprint
from walletplanner.api.transactions import blueprint as transactions_blueprint
from walletplanner.transactions import Transactions
from walletplanner.ui import blueprint as ui_blueprint

app = Flask(__name__)

# Secret key for cookie encryption. Required so that the server cannot
# be run in production with a development secret key accidentally
if 'SECRET_KEY_FILE' in os.environ:
    path = os.environ['SECRET_KEY_FILE']
    with open(path) as fp:
        app.config['SECRET_KEY'] = fp.read()
    app.logger.info('Using secret key from %s', path)
else:
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'testing-secret-key')
    app.logger.info('Using secret key from SECRET_KEY env var')

app.config["di.transactions"] = Transactions()

# Create blueprints for the UI and API
app.register_blueprint(api_blueprint)
app.register_blueprint(ui_blueprint)
app.register_blueprint(transactions_blueprint, url_prefix="/api/transactions")
