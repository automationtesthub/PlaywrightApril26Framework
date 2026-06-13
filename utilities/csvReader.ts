import fs from 'fs';
import csv from 'csv-parser';

export function getCSVTestData(filePath: string, testCaseName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let foundData: any = null;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.TCName === testCaseName) {
          foundData = row;
        }
      })
      .on('end', () => {
        if (foundData) {
          resolve(foundData);
        } else {
          reject(`Test data not found for: ${testCaseName}`);
        }
      })
      .on('error', reject);
  });
}