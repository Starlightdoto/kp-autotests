import {test, expect} from '@playwright/test';
import { createP2PRequestLink } from '../helpers/create_request_link';
import {ChiefpayPage} from "../pages/chiefpay";
import { filePath } from "../helpers/data";

let globalPage;
const sum = '500.00';
const currencyCode = '643';


let chiefpay: ChiefpayPage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createP2PRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    chiefpay = new ChiefpayPage(globalPage);

});


test.afterAll(async () => {
    await globalPage.close();
});


test('First Page Main checks', async () => {
    const amount = await chiefpay.amount;
    await expect(`${amount}`).toEqual('500.00 ₽');

    const timer = (await chiefpay.timerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);

    await expect(chiefpay.cardNumber).toBeVisible();
    await expect(chiefpay.transferredButton).toBeEnabled();
    await expect(chiefpay.cancelButton).toBeEnabled();
});

test('Cancel Modal Window checks', async () => {
    await chiefpay.cancelButton.click();
    await expect (chiefpay.cancelModal).toBeVisible;
    await expect (chiefpay.yesButtonInCancelModal).toBeEnabled;
    await expect (chiefpay.noButtonInCancelModal).toBeEnabled;
    await chiefpay.noButtonInCancelModal. click();
    await expect (chiefpay.cancelModal).toBeHidden;
    await expect (chiefpay.transferCancelledText).toBeVisible;
    await expect (chiefpay.goToPersonalAccountButton).toBeEnabled;


});

test('Cancellation test', async () => {
    await chiefpay.cancelButton.click();
    await expect (chiefpay.cancelModal).toBeVisible;
    await expect (chiefpay.yesButtonInCancelModal).toBeEnabled;
    await expect (chiefpay.noButtonInCancelModal).toBeEnabled;
    await chiefpay.yesButtonInCancelModal. click();
    await expect (chiefpay.cancelModal).toBeHidden;


});