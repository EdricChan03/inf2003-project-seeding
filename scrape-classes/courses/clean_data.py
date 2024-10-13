import csv
import json
import pathlib
import re

import terminal
import credit_scraper

CWD_PATH = pathlib.Path(__file__).parent.absolute()

COURSE_CODE_PATTERN = re.compile(r"\(N\d+\)\s+")


def load_data():
    with open(CWD_PATH / "2023FulltimeDiplomaCourses_fixed.csv") as csv_file:
        csv_dict = csv.DictReader(csv_file)

        csv_dicts = list(csv_dict)

        for row in csv_dicts:
            try:
                # Strip the course code from the description
                row["course_description"] = COURSE_CODE_PATTERN.sub("", row["course_description"])

                # Scrape the credit units from the reference URL
                download_ref_path = credit_scraper.download_reference(row["reference"],
                                                                      download_dir=CWD_PATH / "scrape-out",
                                                                      verbose_logs=True)
                row["ref_path"] = str(download_ref_path.relative_to(CWD_PATH))

                metadata = credit_scraper.get_metadata(download_ref_path)
                row["credits"] = metadata["total_credits"]
                row["modules"] = metadata["modules"]
            except Exception as ex:
                terminal.warn(f"Could not download reference {row['reference']}: {ex}")

        return csv_dicts


def dump_data(data, dump_file: pathlib.Path):
    dump_file.write_text(json.dumps(data))


def main():
    data = load_data()

    terminal.log("Dumping loaded data...")
    data_path = CWD_PATH / "parse_result.json"
    dump_data(data, data_path)
    terminal.success(f"Dumped loaded data to {data_path}")


if __name__ == "__main__":
    main()
