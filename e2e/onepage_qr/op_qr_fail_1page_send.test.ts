import {test, expect} from '@playwright/test';
import { createQRRequestLink } from '../helpers/create_request_link';
import {OnePage} from "../pages/onePage";
import { filePath } from "../helpers/data";

let globalPage;
const sum = '500.00';
const currencyCode = '643';

let onePage: OnePage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createQRRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
    onePage = new OnePage(globalPage);

});


test.afterAll(async () => {
    await globalPage.close();
});


test('Popup closing', async () => {
    await expect(onePage.popupButton).toBeVisible();
    await onePage.popupButton.click();
    await expect(onePage.popupButton).toBeHidden();

});


test('The First Page Main checks', async () => {

    const amount = await onePage.amount;
    await expect(`${amount}`).toEqual('500.00 ₽');

    const timer = (await onePage.timerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);

    // await expect(onePage.cardNumber).toBeVisible();

    await expect(onePage.completeButton).toBeEnabled();

    await expect(onePage.backButton).toBeEnabled();
});


test('Go to Cancellation Reason Modal Window', async () => {
    await onePage.backButton.click();
    await expect (onePage.cancelButtonInBackModal). toBeEnabled;
    await expect (onePage.backButtonInBackModal). toBeEnabled;
    await onePage.cancelButtonInBackModal.click();
    await expect (onePage.backModal).toBeHidden;
    await expect(onePage.cancellationReasonModalHeader).toBeVisible();
});


test('Cancellation with receipt attaching', async () => {

    await (onePage.firstCheckboxInCancellationReasonModal).click();
    await (onePage.secondCheckboxInCancellationReasonModal).click();
    await onePage.commentInputInCancellationReasonModal.fill ('auto_test_one_page_qr_fail_1page_send comment');
    await globalPage.setInputFiles(onePage.dropZoneInCancellationReasonModalSelector, [
        filePath]);
    await expect (onePage.submitButtonInCancellationReasonModal).toBeEnabled;
    await expect (onePage.skipThisStepButtonInCancellationReasonModal).toBeEnabled;
    await onePage.submitButtonInCancellationReasonModal.click();
    await expect (onePage.cancellationReasonModalHeader).toBeHidden;
    await expect(onePage.theRequestIsOutdatedText).toBeVisible();
});