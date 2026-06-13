import fs from 'fs';


export function getTestData(testCaseName: string) {
  const data = JSON.parse(fs.readFileSync('testdata/data.json', 'utf-8'));

  return data[testCaseName];
}