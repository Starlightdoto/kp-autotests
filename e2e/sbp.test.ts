import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';

let globalPage;
let baseUrl;

test.beforeAll(async ({browser}, testInfo) => {
    

    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', '500', '643');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});



test.afterAll(async () => {
    await globalPage.close();
});

// test('Create link and go to payment page', async ({page}) => {
//
// });

test('Popup closing', async () => {
    const popupButton = globalPage.locator ('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeVisible();
    await globalPage.click(popupButton);
    // await expect(popupButton).toBeHidden();
});



    

