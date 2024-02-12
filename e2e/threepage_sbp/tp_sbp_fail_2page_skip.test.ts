import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';
import {ThreePage} from "../pages/threePage";

let globalPage;
const sum = '500.00';
const currencyCode = '643';

let threePage: ThreePage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    threePage = new ThreePage(globalPage);

});


test.afterAll(async () => {
    await globalPage.close();
});


test('The First Page Buttons and InputSum check', async () => {
    await expect(threePage.proceedButton).toBeEnabled();
    await expect(threePage.cancelButton).toBeEnabled();
    await expect(threePage.inputSum).toHaveValue('500');
});


test('The First page Cancel Modal Window checks', async () => {
    await threePage.cancelButton.click();
    await expect(threePage.modalCancelButton).toBeVisible;
    await expect(threePage.backButton).toBeVisible;
    await threePage.backButton.click();
    await expect(threePage.cancelModal).toBeHidden;
});


test('Go to the Second page', async () => {
    await expect(threePage.proceedButton).toBeEnabled();
    await threePage.proceedButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(threePage.popupButton).toBeVisible();
});


test('Popup closing', async () => {
    await expect(threePage.popupButton).toBeVisible();
    await threePage.popupButton.click();
    await expect(threePage.popupButton).toBeHidden();
});


test('The Second Page Main checks', async () => {
    const timer = (await threePage.timerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);
    const amount = await threePage.amount;
    await expect(`${amount}`).toEqual('500');
    await expect(threePage.phoneNumber).toBeVisible();
    await expect(threePage.completeButton).toBeEnabled();
    await expect(threePage.secondPageCancelButton).toBeEnabled();
});

test('The Second Page Cancel Modal Window checks', async () => {
    await threePage.secondPageCancelButton.click();
    await expect(threePage.modalCancelButton).toBeVisible;
    await expect(threePage.backButton).toBeVisible;
    await threePage.backButton.click();
    await expect(threePage.cancelModal).toBeHidden;
});

test('Go to Cancellation Reason Modal Window', async () => {
    await threePage.secondPageCancelButton.click();
    await expect(threePage.modalCancelButton).toBeEnabled;
    await expect(threePage.backButton).toBeEnabled;
    await threePage.modalCancelButton.click();
    await expect(threePage.cancelModal).toBeHidden;
    await expect(threePage.cancellationReasonModalMainText).toBeVisible();
});


test('Skip this step cancellation', async () => {
    await expect(threePage.firstCheckbox).toBeVisible();
    await expect(threePage.secondCheckbox).toBeVisible();
    await expect(threePage.commentInput).toBeVisible();
    await expect(threePage.submitButton).toBeEnabled;
    await expect(threePage.skipThisStepButton).toBeEnabled;
    await threePage.skipThisStepButton.click();
    await expect(threePage.cancellationReasonModalMainText).toBeHidden;
    await expect(threePage.orderCancelledPageMainText).toBeVisible();
});