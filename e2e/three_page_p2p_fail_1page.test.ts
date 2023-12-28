import {test, expect} from '@playwright/test';
import { createP2PRequestLink } from './helpers/create_request_link';


let globalPage;
const sum = '500.00';
const currencyCode = '643';


test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createP2PRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});


test.afterAll(async () => {
    await globalPage.close();
});


test('The First Page Buttons, InputSum and BankDropdown check', async () => {
    const proceedButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > div > button');
    await expect(proceedButton).toBeEnabled();

    const cancelButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > button');
    await expect(cancelButton).toBeEnabled();

    await expect(globalPage.locator('//*[@id="v-step-0"]/input')).toHaveValue('500');

    const bankDropdown = await globalPage.locator('//*[@id="pv_id_12"]/span');
    await bankDropdown.click();
    const anyOption = await globalPage.locator('//*[@id="pv_id_12_0"]/div');
    const sberOption = await globalPage.locator('//*[@id="pv_id_12_1"]/div');
    const tinkoffOption = await globalPage.locator('//*[@id="pv_id_12_2"]/div');
    await expect(anyOption).toBeEnabled();
    await expect(sberOption).toBeEnabled();
    await expect(tinkoffOption).toBeEnabled();
    await anyOption.click();
    await expect(anyOption).toBeHidden();
    await expect(sberOption).toBeHidden();
    await expect(tinkoffOption).toBeHidden();

});

test('The First page Cancel Modal Window checks', async () => {
    const cancelButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > button');
    const cancelModal = await globalPage. locator ('/html/body/div[3]/div/div/div');
    const modalCancelButton = await globalPage. locator('/html/body/div[3]/div/div/div/div[2]/button[1]');
    const backButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await cancelButton.click();
    await expect (modalCancelButton). toBeVisible;
    await expect (backButton). toBeVisible;
    await backButton. click();
    await expect (cancelModal). toBeHidden;
});

test('The First page Cancellation', async () => {
    const cancelButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > button');
    const cancelModal = await globalPage. locator ('/html/body/div[3]/div/div/div');
    const modalCancelButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray');
    const backButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await cancelButton.click();
    await expect (modalCancelButton). toBeEnabled;
    await expect (backButton). toBeEnabled;
    await modalCancelButton. click();
    await expect (cancelModal). toBeHidden;
    const orderCancelledPageMainText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div/p[1]');
    await expect(orderCancelledPageMainText).toBeVisible();
});