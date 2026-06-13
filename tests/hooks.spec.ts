import { test, expect } from '@playwright/test';




test.beforeAll('Before All', async () => {
    console.log('Before All');
    });


 test.afterAll('After all', async () => {
    console.log('After all');
    });


test.beforeEach('Before Each', async () => {
    console.log('Before Each');
    });


 test.afterEach('After each', async () => {
    console.log('After each');
    });    


test('test 1', async ({page}) => {
    console.log('Test 1');
    });


 test('test 2', async () => {
    console.log('Test 2');
    });