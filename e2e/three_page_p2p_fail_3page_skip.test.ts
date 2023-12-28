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

test('Go to the Second page', async () => {
    const proceedButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > div > button');
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
    const cardNumber = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div[2]/p');
    await expect(cardNumber).toBeVisible();
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/div/button');
    await expect(completeButton).toBeEnabled();
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/button');
    await expect(cancelButton).toBeEnabled();
});

test('Go to the Third page', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/div/button');
    await expect(completeButton).toBeEnabled();
    await completeButton.click();
    const headerText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[2]/p');
    await expect(headerText).toBeVisible();

});

test('The Third page main checks', async () => {
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[1]/div[2]').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);

    const emailInput = await globalPage.locator('//*[@id="emailInput"]');
    const transferDetailsBlock = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[1]');
    const submitButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[1]');
    const iDidNotMakeTransferButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[2]');
    await transferDetailsBlock.click();
    await globalPage.waitForTimeout(2000);
    // const orderNumberInDetails = await globalPage.locator('//*[@id="pv_id_8_0_content"]/div/div/div[1]');
    // await expect(orderNumberInDetails).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await expect(iDidNotMakeTransferButton).toBeEnabled();
    await submitButton.click();
    const emailInputValidationErrorMessage = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div.container.shadow-container > div.status > div > div.status__form > div.status__form-container > small');
    await expect(emailInputValidationErrorMessage).toBeVisible();
    await emailInput.fill('auto_test_treepage_p2p_fail_3page_skip@test.com');
});

test('The Third page - I did not make a transfer modal appears', async () => {
    const iDidNotMakeTransferButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[2]');
    await iDidNotMakeTransferButton.click();
    const attachButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await expect(attachButton).toBeEnabled();
    const iDidNotMakeTransferButtonInModal = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray');
    await expect(iDidNotMakeTransferButtonInModal).toBeEnabled();
    await attachButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(attachButton).toBeHidden();
});

test('Go to Cancellation Reason Modal Window', async () => {
    const iDidNotMakeTransferButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[2]');
    const attachButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    const iDidNotMakeTransferButtonInModal = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray');
    await iDidNotMakeTransferButton.click();
    await expect (iDidNotMakeTransferButtonInModal).toBeEnabled;
    await expect (attachButton).toBeEnabled;
    await iDidNotMakeTransferButtonInModal.click();
    await expect (iDidNotMakeTransferButtonInModal).toBeHidden;
    const cancellationReasonModalMainText = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__header > p');
    await expect(cancellationReasonModalMainText).toBeVisible();
});


test('Skip this step cancellation', async () => {
    const cancellationReasonModalMainText = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__header > p');
    const firstCheckbox = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(1) > div > div > div.p-checkbox-box');
    const secondCheckbox = await globalPage.locator ('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(2) > div > div > div.p-checkbox-box');
    const commentInput = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > textarea');
    const submitButton = await globalPage.locator('body > div:nth-child(7) > div > div > div > div.reason-modal__footer > div > button');
    const skipThisStepButton = await globalPage.locator('body > div:nth-child(7) > div > div > div > div.reason-modal__footer-container > div > button');
    await expect(firstCheckbox).toBeVisible();
    await expect(secondCheckbox).toBeVisible();
    await expect(commentInput).toBeVisible();
    await expect (submitButton).toBeEnabled;
    await expect (skipThisStepButton).toBeEnabled;
    await skipThisStepButton.click();
    await expect (cancellationReasonModalMainText).toBeHidden;
    const orderCancelledPageMainText = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div > div > p.cancelled__header');
    await expect(orderCancelledPageMainText).toBeVisible();
});