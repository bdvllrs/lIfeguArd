import json
from os import path


def import_config(argv):
    # Fetches the configuration
    config_path = path.abspath(path.join(path.dirname(__file__), './config/default.json'))
    if '--config' in argv and len(argv) > argv.index('--config') + 1:
        config_filename = argv[argv.index('--config')+1]
        config_path = path.abspath(path.join(path.dirname(__file__), './config/{}.json'.format(config_filename)))
        if not path.exists(config_path):
            config_path = path.abspath(path.join(path.dirname(__file__), './config/default.json'))
    # Loads the default config
    with open(config_path, 'r') as config_file:
        config = json.loads(config_file.read())
    return config
