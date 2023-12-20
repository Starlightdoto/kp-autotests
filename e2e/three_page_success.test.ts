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

test('The First Page buttons are active', async () => {
    const proceedButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div/button');
    await expect(proceedButton).toBeEnabled();
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/button');
    await expect(cancelButton).toBeEnabled();
});


test('The First page Cancel Modal Window checks', async () => {
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/button');
    const cancelModal = await globalPage. locator ('/html/body/div[3]/div/div/div');
    const modalCancelButton = await globalPage. locator('/html/body/div[3]/div/div/div/div[2]/button[1]');
    const backButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await cancelButton.click();
    await expect (modalCancelButton). toBeVisible;
    await expect (backButton). toBeVisible;

    await backButton. click();
    await expect (cancelModal). toBeHidden;
});

test('Go to the Second page', async () => {
    const proceedButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div/button');
    await expect(proceedButton).toBeEnabled();
    await proceedButton.click();
    await globalPage.waitForTimeout(2000);
    const popupButton = globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeVisible();
});

test('Popup closing', async () => {
    const popupButton = globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeVisible();
    await popupButton.click();
    await expect(popupButton).toBeHidden();

});


test('The Second Page Main checks', async () => {
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[1]/div[2]').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);

    const amount = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p').textContent();
    console.log(amount);
    await expect(`${amount}`).toEqual('500');

    const phoneNumber = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div[2]/div[1]/div/p');
    await expect(phoneNumber).toBeVisible();

    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/div/button');
    await expect(completeButton).toBeEnabled();

    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/button');
    await expect(cancelButton).toBeEnabled();
});

test('I agree with transfer rules checkbox checks', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/div/button');
    await expect(completeButton).toBeEnabled();
    const iAgreeCheckbox = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[5]/div/div/div[2]');
    await (iAgreeCheckbox).click();
    await expect(completeButton).toBeDisabled();
    await (iAgreeCheckbox).click();
    await expect(completeButton).toBeEnabled();
    const transferRules = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[5]/div/span');
    await (transferRules).click();
    const transferRulesModal = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div');
    const okButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.transfer-rules-modal__footer > button');
    const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.transfer-rules-modal__header > div > svg');
    await expect (transferRulesModal).toBeVisible();
    await expect(okButton).toBeEnabled();
    await expect(xButton).toBeEnabled();
    await xButton. click();
    await expect (transferRulesModal).toBeHidden();


});


test('Transfer rules modal window checks', async () => {
    const transferrulesButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[2]/p');
    await transferrulesButton.click();
    const transferRulesModal = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div');
    const okButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.transfer-rules-modal__footer > button');
    const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.transfer-rules-modal__header > div > svg');
    await expect (transferRulesModal).toBeVisible();
    await expect(okButton).toBeEnabled();
    await expect(xButton).toBeEnabled();
    await xButton. click();
    await expect (transferRulesModal).toBeHidden();
    await transferrulesButton.click();
    await expect (transferRulesModal).toBeVisible();
    await okButton.click();
    await expect (transferRulesModal).toBeHidden();

});

test('Help modal window checks', async () => {
    const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/p');
    await helpButton.click();
    await globalPage.waitForTimeout(2000);
    // const transfeDetailsInstruction = await globalPage.locator('//*[@id="pv_id_14_0_header_action"]');
    // const transferInstruction = await globalPage.locator('//*[@id="pv_id_12_1_header_action"]');
    // const waitForStatusChangeInstruction = await globalPage.locator('//*[@id="pv_id_12_2_header_action"]');
    const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
    // await expect (transfeDetailsInstruction).toBeVisible();
    // await expect (transferInstruction).toBeVisible();
    // await expect (waitForStatusChangeInstruction).toBeVisible();
    // await expect (xButton).toBeVisible();

    // const transferDetailsModal = await globalPage.locator('//*[@id="pv_id_12_0_content"]/div/div/div');
    // const transferModal = await globalPage.locator('//*[@id="pv_id_12_1_content"]/div/div/div[1]');
    // const waitForStatusChangeModal = await globalPage.locator('//*[@id="pv_id_12_2_content"]/div/div/div[1]');

    // await transfeDetailsInstruction. click();
    // await expect (transferDetailsModal). toBeVisible();
    // await transfeDetailsInstruction. click();
    // await expect (transferDetailsModal). toBeHidden();
    //
    // await transferInstruction. click();
    // await expect (transferModal). toBeVisible();
    // await transferInstruction. click();
    // await expect (transferModal). toBeHidden();
    //
    // await waitForStatusChangeInstruction. click();
    // await expect (waitForStatusChangeModal). toBeVisible();
    // await waitForStatusChangeInstruction. click();
    // await expect (waitForStatusChangeModal). toBeHidden();

    await xButton. click();
    await expect (helpButton).toBeVisible();
});

test('The Second Page Cancel Modal Window checks', async () => {
    const cancelButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.transfer > div > div.transfer__buttons > button');
    const cancelModal = await globalPage. locator ('/html/body/div[3]/div/div/div');
    const modalCancelButton = await globalPage. locator('/html/body/div[3]/div/div/div/div[2]/button[1]');
    const backButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await cancelButton.click();
    await expect (modalCancelButton). toBeVisible;
    await expect (backButton). toBeVisible;

    await backButton. click();
    await expect (cancelModal). toBeHidden;
});

test('Locale change - main page', async () => {

    const enButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[3]/div/div[1]/div[1]/div');
    const ruButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[3]/div/div[1]/div[2]/div');

    await enButton.click();
    await globalPage.waitForTimeout(2000);
    const mainEnText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[1]/div/div[2]/div/p').textContent();
    await expect(mainEnText).toEqual('Transfer');

    await ruButton.click();
    await globalPage.waitForTimeout(2000);
    const mainRuText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[1]/div/div[2]/div/p').textContent();
    await expect(mainRuText).toEqual('Перевод');


});