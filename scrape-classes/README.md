# Scrape classes

Code used to scrape the classes from the reference website using
[requests](https://requests.readthedocs.io/en/latest/) and
[BeautifulSoup](https://beautiful-soup-4.readthedocs.io/en/latest/)
to fetch and scrape the data accordingly.

The dependencies are as listed in [`requirements.txt`](./requirements.txt) and can
be installed via `pip` - see the [Running the code](#running-the-code) section below.

## Running the code

Make sure you've installed the [project's dependencies](./requirements.txt) before-hand:

```sh
python -m pip install -r requirements.txt
```

The code's entry-point is the [`clean_data.py`](./courses/clean_data.py) file
and can be run with the relevant Python command:

```sh
python courses/clean_data.py
```

It's pretty bare-bones, so it currently doesn't offer any command-line flags.

The [`2023FulltimeDiplomaCourses_fixed.csv` file](./courses/2023FulltimeDiplomaCourses_fixed.csv)
is used as the input source for the `clean_data.py` script.

The parsed result will be outputted as `courses/parse_result.json`, and is currently
[versioned in the repository as well](./courses/parse_result.json).

## Attributions

### Datasets

* [2023FulltimeDiplomaCourses.csv](./courses/2023FulltimeDiplomaCourses.csv) originates from the
  [2023 Full-time Diploma Courses Ngee Ann Polytechnic Dataset](https://data.gov.sg/datasets/d_120ad7e0334d2c2a37ad62ae262f75fa/view)
  and is licensed under the [Open Data License](https://data.gov.sg/open-data-licence)

---

# History

This project was created before I decided to use [Bun](https://bun.sh) :\

The [seed-bun](../seed-bun) folder contains the actual seeding scripts used to
generate the SQL scripts.
