import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';
import {currencies} from "./helpers/currencies";

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


test('Popup closing', async () => {
    const popupButton = globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeVisible();
    await globalPage.click('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeHidden();
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[1]/div[2]').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);
});


test('Check amount', async () => {
    const amount = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p').textContent();
    await expect(`${amount}`).toEqual('500.00 ₽');
});


test('Phone number is visible', async () => {
    const phoneNumber = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[1]/div[2]/div[1]/div/p');
    await expect(phoneNumber).toBeVisible();
});



test('Transfer completed button is active', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/div/button');
    await expect(completeButton).toBeEnabled();
});



test('Back button is active', async () => {
    const backButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/button');
    await expect(backButton).toBeEnabled();
});


test('Go to transfer completed page', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/div/button');
    await expect(completeButton).toBeEnabled();
    await completeButton.click();
    const headerText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[2]/p');
    await expect(headerText).toBeVisible();
});


test('Go to Cancellation Reason Modal Window', async () => {
    const transferHasNotCompletedButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[2]');
    await transferHasNotCompletedButton.click();
    const attachReceiptButton = await globalPage.locator ('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    const iDidntTransferButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray');
    const transferHasNotCompletedModal = await globalPage.locator('/html/body/div[3]/div/div/div');
    await expect (iDidntTransferButton).toBeEnabled;
    await expect (attachReceiptButton).toBeEnabled;
    await iDidntTransferButton.click();
    await expect (transferHasNotCompletedModal).toBeHidden;
});


test('Cancellation with receipt attaching', async () => {
    const headerText = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__header');
    const firstCheckbox = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(1) > div > div > div.p-checkbox-box');
    const secondCheckbox = await globalPage. locator ('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(2) > div > div > div.p-checkbox-box');
    const commentInput = await globalPage. locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > textarea');
    const submitButton = await globalPage. locator('body > div:nth-child(7) > div > div > div > div.reason-modal__footer > div > button');
    const skipThisStepButton = await globalPage. locator('body > div:nth-child(7) > div > div > div > div.reason-modal__footer > button');
    await firstCheckbox.click();
    await secondCheckbox.click();
    await commentInput.fill ('auto_test_sbp@test.com comment');
    await globalPage.setInputFiles('//*[@id="dropzoneFile"]', [
        'assets/receipts/receipt1.png']);
    await expect (submitButton). toBeEnabled;
    await expect (skipThisStepButton). toBeEnabled;
    await submitButton. click();
    await expect (headerText). toBeHidden;
    // const theRequestIsOutdatedText = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div > div');
    // await expect(theRequestIsOutdatedText).toBeVisible();
});