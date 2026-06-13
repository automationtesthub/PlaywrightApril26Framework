import { test, expect } from '@playwright/test';


test.describe('Group_1', () => {


    test('test 1', async ({ page }) => {
    console.log('Test 1');
    });

    test('test 2', async ({ page }) => {
    console.log('Test 2');
    });

});

test.describe('Group 2', () => {

test('test 3', async ({ page }) => {
  console.log('Test 3');
});

test('test 4', async ({ page }) => {
  console.log('Test 4');
});
});
