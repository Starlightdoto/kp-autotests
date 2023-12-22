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



test('Help modal window checks', async () => {
    const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/p');
    const transferInstruction = await globalPage.locator('//*[@id="pv_id_9_0_header_action"]');
    const statusInstruction = await globalPage.locator('//*[@id="pv_id_9_1_header_action"]');
    const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
    const transferModal = await globalPage.locator('//*[@id="pv_id_9_0_content"]/div/div/div[1]');
    const statusModal = await globalPage.locator('//*[@id="pv_id_9_1_content"]/div/div/div[3]');
    await helpButton.click();
    await expect (transferInstruction).toBeVisible();
    await expect (statusInstruction).toBeVisible();
    await expect (xButton).toBeVisible();
    await transferInstruction. click();
    await expect (transferModal). toBeVisible();
    await transferInstruction. click();
    await expect (transferModal). toBeHidden();
    await statusInstruction. click();
    await expect (statusModal). toBeVisible();
    await statusInstruction. click();
    await expect (statusModal). toBeHidden();
    await xButton. click();
    await expect (helpButton).toBeVisible();
});



test('Cancel Modal Window checks', async () => {
    const backButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/button');
    const backModal = await globalPage. locator ('/html/body/div[3]/div/div/div');
    const modalCancelButton = await globalPage. locator('/html/body/div[3]/div/div/div/div[2]/button[1]');
    const backModalButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await backButton.click();
    await expect (modalCancelButton). toBeEnabled;
    await expect (backModalButton). toBeEnabled;
    await backModalButton. click();
    await expect (backModal). toBeHidden;
});



test('Locale change - main page', async () => {
    const changeLocaleButton = await globalPage.locator('//*[@id="pv_id_2"]');
    const enButton = await globalPage.locator('//*[@id="pv_id_2_1"]/div/div');
    const uzButton = await globalPage.locator('//*[@id="pv_id_2_2"]/div/div');
    const ruButton = await globalPage.locator('//*[@id="pv_id_2_0"]/div/div');

    // const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/p');
    // const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
    // const backButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/button');
    // const backModalButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await changeLocaleButton.click();
    await enButton.click();
    await globalPage.waitForTimeout(2000);
    const mainEnText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/p').textContent();
    await expect(mainEnText).toEqual('Transfer the exact amount:');
    // await helpButton.click();
    // await globalPage.waitForTimeout(5000);
    // // const enTransferInstruction = await globalPage.locator('#pv_id_10_0_header_action > div > span');
    // // await enTransferInstruction.click();
    // const enTransferInstruction = await globalPage.locator('#pv_id_10_0_header_action > div > span').textContent();
    // await expect(enTransferInstruction).toEqual('Transfer');
    // await xButton. click();
    // await backButton.click();
    // const backModaltext = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray > span.p-button-label').textContent();
    // await expect(backModaltext).toEqual('Cancel');
    // await backModalButton.click();

    await changeLocaleButton.click();
    await uzButton.click();
    await globalPage.waitForTimeout(2000);
    const mainUzText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/p').textContent();
    await expect(mainUzText).toEqual('Belgilangan miqdorni otkazing:');
    await changeLocaleButton.click();

    await ruButton.click();
    await globalPage.waitForTimeout(2000);
    const mainRuText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/p').textContent();
    await expect(mainRuText).toEqual('Переведите точную сумму:');
});

test('Go to transfer completed page', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/div/button');
    await expect(completeButton).toBeEnabled();
    await completeButton.click();
    const headerText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[2]/p');
    await expect(headerText).toBeVisible();
});

test('Transfer completed page', async () => {
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[1]/div[2]').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);

    const emailInput = await globalPage.locator('//*[@id="emailInput"]');
    const transferDetailsBlock = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[1]');
    const submitButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[1]');
    const transferHasNotCompletedButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[2]');
    await transferDetailsBlock.click();
    await globalPage.waitForTimeout(2000);
    // const orderNumberInDetails = await globalPage.locator('//*[@id="pv_id_8_0_content"]/div/div/div[1]');
    // await expect(orderNumberInDetails).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await expect(transferHasNotCompletedButton).toBeEnabled();
    await submitButton.click();
    const emailInputValidationErrorMessage = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[5]/div[2]/small');
    await expect(emailInputValidationErrorMessage).toBeVisible();
    await emailInput.fill('auto_test_sbp@test.com');
});


test('Attach receipt', async () => {
    await globalPage.setInputFiles('//*[@id="dropzoneFile"]', [
        'assets/receipts/receipt1.png'
    ]);
});

test('Go to payment verification page', async () => {
    const submitButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[1]');
    await submitButton.click();
    const backToReturnUrlButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[1]');
    await expect(backToReturnUrlButton).toBeEnabled();
    const iDidNotMakeTransferButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[2]');
    await expect(iDidNotMakeTransferButton).toBeEnabled();
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[1]/div[2]').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);
});

test('Waiting for payment verification page - I did not make a transfer modal appears', async () => {
    const iDidNotMakeTransferButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[2]');
    await iDidNotMakeTransferButton.click();
    const attachButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await expect(attachButton).toBeEnabled();
    const iDidNotMakeTransferButtonInModal = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray');
    await expect(iDidNotMakeTransferButtonInModal).toBeEnabled();
    await attachButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(attachButton).toBeHidden();
});
