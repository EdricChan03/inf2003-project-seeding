import hashlib
import re
from pathlib import Path
from typing import TypedDict

import requests
from bs4 import BeautifulSoup

import terminal


class Metadata(TypedDict):
    total_credits: int
    modules: list[str]


DOWNLOAD_DIR = Path.cwd() / "scrape-out"

CREDIT_UNITS_PATTERN = re.compile(r"(\d+) Credit Units*")
COURSE_PATTERN = re.compile(r"^(\w+).+Credit Units*")


def download_reference(ref_url: str, verbose_logs=False, download_dir=DOWNLOAD_DIR) -> Path:
    digest = hashlib.sha512(ref_url.encode()).hexdigest()

    r = requests.get(ref_url)

    if r.status_code != requests.codes.ok:
        terminal.error(f"Could not download reference {ref_url}: {r.status_code}")
        r.raise_for_status()

    if download_dir.is_file():
        raise Exception(f"Download path ({download_dir}) is not a directory")

    if not download_dir.exists():
        download_dir.mkdir()

    out = download_dir / f"{digest}.html"
    if verbose_logs:
        terminal.log(f"Downloading reference from {ref_url} to {out}")

    out.write_text(r.text)
    if verbose_logs:
        terminal.success(f"Successfully downloaded reference from {ref_url} to {out}")

    return out


def get_metadata(content_path: Path) -> Metadata:
    soup = BeautifulSoup(content_path.read_text(), "html.parser")
    learn_header_el = soup.find("h2", string="What You Will Learn")

    credits_total = 0

    for sib in learn_header_el.find_next_siblings():
        if sib.name == "style":
            break

        credits_total += sum(map(int, CREDIT_UNITS_PATTERN.findall(sib.text)))
        print(sib.text)
        print(COURSE_PATTERN.findall(sib.text))

    # print(module_els)
    # modules = list(map(lambda el: el.text, module_els))

    return {"total_credits": credits_total, "modules": []}
