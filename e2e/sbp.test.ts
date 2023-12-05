import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';

let globalPage;


test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
});

test.afterAll(async () => {
    await globalPage.close();
});
test('Create link and go to payment page', async () => {
    const baseUrl = await createSBPRequestLink(globalPage, '19', 'send', '500', '643');
    await globalPage.goto(baseUrl);
});

test('Check sum', async () => {

});



    

