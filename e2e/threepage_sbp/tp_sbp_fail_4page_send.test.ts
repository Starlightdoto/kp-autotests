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

test('Go to the Third page', async () => {
    await expect(threePage.completeButton).toBeEnabled();
    await threePage.completeButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(threePage.thirdPageSubmitButton).toBeEnabled();
    await expect(threePage.headerText).toBeVisible();

});

test('The Third page main checks', async () => {
    const timer = (await threePage.thirdPageTimerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);
    await threePage.transferDetailsBlock.click();
    await globalPage.waitForTimeout(2000);
    // const orderNumberInDetails = await globalPage.locator('//*[@id="pv_id_8_0_content"]/div/div/div[1]');
    // await expect(orderNumberInDetails).toBeVisible();
    await expect(threePage.thirdPageSubmitButton).toBeEnabled();
    await expect(threePage.iDidNotMakeTransferButton).toBeEnabled();
    await threePage.thirdPageSubmitButton.click();
    await expect(threePage.emailInputValidationErrorMessage).toBeVisible();
    await threePage.emailInput.fill('auto_test_tree_page_sbp_fail_4page_send@test.com');
});

test('The Third page - I did not make a transfer modal appears', async () => {
    await threePage.iDidNotMakeTransferButton.click();
    await expect(threePage.attachButton).toBeEnabled();
    await expect(threePage.iDidNotMakeTransferButtonInModal).toBeEnabled();
    await threePage.attachButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(threePage.attachButton).toBeHidden();
});


test('Attach receipt', async () => {
    await globalPage.setInputFiles(threePage.dropZoneSelector, [
        filePath]);
});


test('Go to payment verification page', async () => {
    await threePage.thirdPageSubmitButton.click();
    // const backToReturnUrlButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[1]');
    // await expect(backToReturnUrlButton).toBeEnabled();
    await expect(threePage.iDidNotMakeTransferButton).toBeEnabled();
    const timer = (await threePage.thirdPageTimerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);
});


test('Waiting for payment verification page - I did not make a transfer modal appears', async () => {
    await threePage.iDidNotMakeTransferButton.click();
    await expect(threePage.attachButton).toBeEnabled();
    await expect(threePage.iDidNotMakeTransferButtonInModal).toBeEnabled();
    await threePage.attachButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(threePage.attachButton).toBeHidden();
});


test('Go to Cancellation Reason Modal Window', async () => {
    await threePage.iDidNotMakeTransferButton4Page.click();
    await expect(threePage.iDidNotMakeTransferButtonInModal).toBeEnabled;
    await expect(threePage.attachButton).toBeEnabled;
    await threePage.iDidNotMakeTransferButtonInModal.click();
    await expect(threePage.iDidNotMakeTransferButtonInModal).toBeHidden;
    await globalPage.waitForTimeout(2000);
    await expect(threePage.cancellationReasonModalMainText).toBeVisible();
});

test('Cancellation with receipt attaching', async () => {
    await (threePage.firstCheckbox).click();
    await (threePage.secondCheckbox).click();
    await threePage.commentInput.fill ('auto_test_tree_page_sbp_fail_4page_send_comment');
    await globalPage.setInputFiles(threePage.dropZoneSelector, [
        filePath]);
    await expect(threePage.submitButton).toBeEnabled;
    await expect(threePage.skipThisStepButton).toBeEnabled;
    await threePage.submitButton.click();
    await expect(threePage.cancellationReasonModalMainText).toBeHidden;
    await globalPage.waitForTimeout(3000);
    await expect(threePage.thirdPageOrderCancelledPageMainText).toBeVisible();
});