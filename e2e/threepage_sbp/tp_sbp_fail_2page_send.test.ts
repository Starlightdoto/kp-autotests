import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';
import {ThreePage} from "../pages/threePage";
import { filePath } from "../helpers/data";

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


test('Cancellation with receipt attaching', async () => {
    // const cancellationReasonModalMainText = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__header > p');
    // const firstCheckbox = await globalPage.locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(1) > div > div > div.p-checkbox-box');
    // const secondCheckbox = await globalPage.locator ('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(2) > div > div > div.p-checkbox-box');
    // const commentInput = await globalPage. locator('body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > textarea');
    // const submitButton = await globalPage. locator('body > div:nth-child(7) > div > div > div > div.reason-modal__footer-container > div > div > button');
    // const skipThisStepButton = await globalPage.locator('body > div:nth-child(7) > div > div > div > div.reason-modal__footer-container > div > button');
    // await (firstCheckbox).click();
    // await (secondCheckbox).click();
    // await commentInput.fill ('auto_test_tree_page_sbp_fail_2page_send comment');
    // await globalPage.setInputFiles('//*[@id="dropzoneFile"]', [
    //     'assets/receipts/receipt1.png']);
    // await expect (submitButton).toBeEnabled;
    // await expect (skipThisStepButton).toBeEnabled;
    // await submitButton. click();
    // await expect (cancellationReasonModalMainText).toBeHidden;
    // await globalPage.waitForTimeout(3000);
    // // const thankYouPageMainText = await globalPage.locator('');
    // // await expect(thankYouPageMainText).toBeVisible();
    // const orderCancelledPageMainText = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div > div > p.cancelled__header');
    // await expect(orderCancelledPageMainText).toBeVisible();

    await (threePage.firstCheckbox).click();
    await (threePage.secondCheckbox).click();
    await threePage.commentInput.fill ('auto_test_tree_page_sbp_fail_2page_send comment');
    await globalPage.setInputFiles(threePage.dropZoneSelector, [
        filePath]);
    await expect(threePage.submitButton).toBeEnabled;
    await expect(threePage.skipThisStepButton).toBeEnabled;
    await threePage.submitButton. click();
    await expect(threePage.cancellationReasonModalMainText).toBeHidden;
    await globalPage.waitForTimeout(3000);
    await expect(threePage.orderCancelledPageMainText).toBeVisible();
});