import {test, expect} from '@playwright/test';
import { createP2PRequestLink } from '../helpers/create_request_link';
import {ThreePage} from "../pages/threePage";
import { filePath } from "../helpers/data";


let globalPage;
const sum = '500.00';
const currencyCode = '643';

let threePage: ThreePage;


test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createP2PRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    threePage = new ThreePage(globalPage);
});


test.afterAll(async () => {
    await globalPage.close();
});


test('The First Page Buttons, InputSum and BankDropdown check', async () => {
    await expect(threePage.proceedButton).toBeEnabled();
    await expect(threePage.cancelButton).toBeEnabled();
    await expect(threePage.inputSum).toHaveValue('500');
    await threePage.bankDropdown.click();
    await expect(threePage.anyOption).toBeEnabled();
    await expect(threePage.sberOption).toBeEnabled();
    await threePage.anyOption.click();
    await expect(threePage.anyOption).toBeHidden();
    await expect(threePage.sberOption).toBeHidden();
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
    const amount = await threePage.amount;
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);
    await expect(`${amount}`).toEqual('500');
    await expect(threePage.cardNumber).toBeVisible();
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
    await (threePage.firstCheckbox).click();
    await (threePage.secondCheckbox).click();
    await threePage.commentInput.fill ('auto_test_tree_page_p2p_fail_2page_send comment');
    await globalPage.setInputFiles(threePage.dropZoneSelector, [
        filePath]);
    await expect(threePage.submitButton).toBeEnabled;
    await expect(threePage.skipThisStepButton).toBeEnabled;
    await threePage.submitButton. click();
    await expect(threePage.cancellationReasonModalMainText).toBeHidden;
    await globalPage.waitForTimeout(3000);
    await expect(threePage.orderCancelledPageMainText).toBeVisible();
});