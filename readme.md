# Installation
MySQL must be installed in order for lifeguard to work.
Create a new database for lifeguard's tables:

```sql
CREATE DATABASE lifeguard CHARACTER SET utf8 COLLATE utf8_general_ci;
```

As well as MySQL, Python 3.5+ must be installed as we use the `async`
 and `await` syntax to deal with coroutines.

Install the required dependencies that we need:
```bash
$ pip install -r /path/to/project/requirements.txt
```

# Configuration

The configuration files are in the `./config/` folder.
The configuration loaded is `default.json` by default.
To load another configuration file, use the `--config name`
flag when execution the `main.py` file :

```bash
$ python main.py --config test
```

to use the `./config/test.json` configuration file.

# Initialization

To create all the tables, use the `--setup` flag :

To initialize the content of the tables, use the flag `--seed`

```bash
$ python main.py --setup --seed
```

# Add a first user

To create a user use the
flag `--add-user username password`.

```bash
$ python main.py --add-user username password
```