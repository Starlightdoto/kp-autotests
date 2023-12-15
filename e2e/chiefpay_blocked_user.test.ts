import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';

let globalPage;
const sum = '500.00';
const currencyCode = '643';


test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});

test.afterAll(async () => {
    await globalPage.close();
});

test('Blocked user page is shown', async () => {
    const transferCancelledText = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1');
    await expect(transferCancelledText).toBeVisible();
});