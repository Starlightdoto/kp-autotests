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
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);
    const amount = await threePage.amount;
    await expect(`${amount}`).toEqual('500');
    await expect(threePage.cardNumber).toBeVisible();
    await expect(threePage.completeButton).toBeEnabled();
    await expect(threePage.secondPageCancelButton).toBeEnabled();
});


test('I agree with transfer rules checkbox checks', async () => {
    await expect(threePage.completeButton).toBeEnabled();
    await (threePage.iAgreeCheckbox).click();
    await expect(threePage.completeButton).toBeDisabled();
    await (threePage.iAgreeCheckbox).click();
    await expect(threePage.completeButton).toBeEnabled();
    await (threePage.transferRules).click();
    await expect (threePage.transferRulesModal).toBeVisible();
    await expect(threePage.okButton).toBeEnabled();
    await expect(threePage.xButtonNew).toBeEnabled();
    await threePage.xButtonNew.click();
    await expect (threePage.transferRulesModal).toBeHidden();
});


test('Transfer rules modal window checks', async () => {
    await threePage.transferRules.click();
    await expect (threePage.transferRulesModal).toBeVisible();
    await expect(threePage.okButton).toBeEnabled();
    await expect(threePage.attachingBankReceiptButton).toBeEnabled();
    await expect(threePage.xButtonNew).toBeEnabled();
    await threePage. xButtonNew. click();
    await expect (threePage.transferRulesModal).toBeHidden();
    await threePage.transferRulesButton.click();
    await expect (threePage.transferRulesModal).toBeVisible();
    await threePage.okButton.click();
    await expect (threePage.transferRulesModal).toBeHidden();
});


test('Attaching Bank Receipt Modal Window checks', async () => {
    await threePage.transferRulesButton.click();
    await threePage.attachingBankReceiptButton.click();
    await globalPage.waitForTimeout(2000);
    await expect (threePage.attachingBankReceiptModal).toBeVisible;
    await expect (threePage.submitButtonInAttachingBankReceiptModal).toBeEnabled;
    await expect (threePage.cancelButtonInAttachingBankReceiptModal).toBeEnabled;
    await threePage.cancelButtonInAttachingBankReceiptModal.click();
    await expect (threePage.attachingBankReceiptModal).toBeHidden;
    await threePage.transferRulesButton.click();
    await threePage.attachingBankReceiptButton.click();
    await threePage.commentInputInAttachingBankReceiptModal.fill('auto_test_tree_page_p2p_success');
    await threePage.emailInputInAttachingBankReceiptModal.fill('auto_test_tree_page_p2p_success@test.com');
    await globalPage.setInputFiles(threePage.attachFilesZoneInAttachingBankReceiptModalSelectorSelector, [
        filePath]);
    await threePage.submitButtonInAttachingBankReceiptModal.click();
    await globalPage.waitForTimeout(2000);
    await expect (threePage.requestHasBeenSentModal).toBeVisible;
    await expect (threePage.okButtonInRequestHasBeenSentModal).toBeEnabled;
    await threePage.okButtonInRequestHasBeenSentModal.click();
    await expect (threePage.requestHasBeenSentModal).toBeHidden;


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
    await xButton.click();
    await expect (helpButton).toBeVisible();
});

test('The Second Page Cancel Modal Window checks', async () => {
    const cancelButton = await globalPage.locator('#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.transfer > div > div.transfer__buttons > button');
    const cancelModal = await globalPage.locator ('/html/body/div[3]/div/div/div');
    const modalCancelButton = await globalPage.locator('/html/body/div[3]/div/div/div/div[2]/button[1]');
    const backButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    await cancelButton.click();
    await expect (modalCancelButton).toBeVisible;
    await expect (backButton).toBeVisible;

    await backButton.click();
    await expect (cancelModal).toBeHidden;
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
    await emailInput.fill('auto_test_treepagesbp@test.com');
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

test('Attach receipt', async () => {
    await globalPage.setInputFiles('//*[@id="drop-form"]/div/div/label/span', [
        'assets/receipts/receipt1.png'
    ]);
});


test('Go to payment verification page', async () => {
    const submitButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[1]');
    await submitButton.click();
    // const backToReturnUrlButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[6]/button[1]');
    // await expect(backToReturnUrlButton).toBeEnabled();
    const iDidNotMakeTransferButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[2]');
    await expect(iDidNotMakeTransferButton).toBeEnabled();
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[1]/div[2]').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);
});


test('Waiting for payment verification page - I did not make a transfer modal appears', async () => {
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
