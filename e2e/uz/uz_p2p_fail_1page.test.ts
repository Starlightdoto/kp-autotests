import {test, expect} from '@playwright/test';
import { createP2PRequestLink } from '../helpers/create_request_link';
import {UzPage} from "../pages/uz";
import { filePath } from "../helpers/data";

let globalPage;
const sum = '5000.00';
const currencyCode = '860';

let uz: UzPage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createP2PRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    uz = new UzPage(globalPage);
});



test.afterAll(async () => {
    await globalPage.close();
});


test('The First Page Main checks', async () => {

    const amount = await uz.amount;
    await expect(`${amount}`).toEqual('5 000.00 UZS ');

    const timer = (await uz.timerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);

    await expect(uz.cardNumber).toBeVisible();

    await expect(uz.transferCompletedButton).toBeEnabled();

    await expect(uz.cancelButton).toBeEnabled();
});

test('Go To Cancellation Modal Window and Cancellation', async () => {

    await uz.cancelButton.click();
    await expect (uz.cancelButtonInCancelModal). toBeEnabled;
    await expect (uz.backButtonInCancelModal). toBeEnabled;
    await uz.cancelButtonInCancelModal. click();
    await expect (uz.cancelModal). toBeHidden;
    await expect(uz.orderCancelledText).toBeVisible();

});