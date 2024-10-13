import courses from '../seed/courses/parse_result.json' with { type: 'json' };

import { file, write } from 'bun';

import { load } from 'cheerio';

const cleanCourses = (courses: string[]) => courses.filter(c => /\w+/.test(c) && c.toLowerCase() !== 'or').map(c => c.replaceAll(/\^?\*?/g, '').replaceAll(/\s*\(\d* ?Credit Units?( - NA)?\)?/gi, '').trim());

const readDataFile = async (filePath: string) => {
  const $ = load(await file(filePath).text());

  return new Set(cleanCourses($('h2#what-you-will-learn').nextAll('div').extract({ courses: ['strong:not(:empty)'] }).courses));
}

const result = [];

for (const course of courses) {
  const modules = await readDataFile(`../seed/courses/${course.ref_path}`);
  result.push({ course, modules: [...modules] });
}

await write(file('./fakes/data/super-data.json'), JSON.stringify(result, null, 2));
