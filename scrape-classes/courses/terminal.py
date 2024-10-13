from blessings import Terminal

terminal = Terminal()


def log(msg: str):
    print(terminal.bright_blue(f"[INFO] {msg}"))


def success(msg: str):
    print(terminal.green(f"[SUCCESS] {msg}"))


def error(msg: str):
    print(terminal.red(f"[ERROR] {msg}"))


def warn(msg: str):
    print(terminal.yellow(f"[WARN] {msg}"))
