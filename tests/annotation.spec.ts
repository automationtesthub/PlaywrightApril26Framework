import { test, expect } from '@playwright/test';

   test('test 1', async ({ page }) => {
    console.log('Test 1');
    });
5
     test('test 5', async ({ page }) => {
    console.log('Test 5');
    });

    test.skip('test 2', async ({ page }) => {
    console.log('Test 2');
    });


    test.fixme('test 3', async ({ page }) => {
      console.log('Test 3');
    });
    
    test.fail('test 4', async ({ page }) => {
      console.log('Test 4');
    });

    // test.slow('test 5', async ({ page }) => {
    //   console.log('Test 5');
    // });