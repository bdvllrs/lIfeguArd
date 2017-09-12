# Configuration

The configuration files are in the `./config/` forlder.
The configuration loaded is `default.json` by defautl.
To load another configuration file, use the `--config name`
flag when execution the `main.py` file :

```bash
$ python main.py --config test
```

to use the `./config/test.json` configuration file.

# Initialization

To create all the tables, use the `--setup` flag :

```bash
$ python main.py --setup
```

To initialize the content of the tables, use the flag `--seed`

To create a user use the
flag `--add-user username password`.
