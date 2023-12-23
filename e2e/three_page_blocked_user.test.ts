import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';

let globalPage;
const sum = '500.00';
const currencyCode = '643';
const returnUrl = 'https://google.com';


test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode, returnUrl, true, '123123', '123123');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});

test.afterAll(async () => {
    await globalPage.close();
});


test('Blocked user page elements are shown', async () => {
    const accountIsBlockedHeader = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[1]/p');
    await expect(accountIsBlockedHeader).toBeVisible();
    const applyButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[2]/div[4]/div[1]/button');
    await expect(applyButton).toBeDisabled();
    const goToPersonalAccountButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[2]/div[4]/button');
    const emailInput = await globalPage.locator('//*[@id="emailInput"]');
    await emailInput.fill('auto_test_threepage@test.com');
    await expect(applyButton).toBeDisabled();
    const commentField = await globalPage.locator('//*[@id="comment"]');
    await commentField.fill('Test test');
    await expect(applyButton).toBeEnabled();
});


test('Locale change', async () => {
    const accountIsBlockedHeaderText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[1]/p').textContent();
    await expect(accountIsBlockedHeaderText).toEqual('Аккаунт заблокирован');
    const enButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[3]/div/div[1]/div[1]/div');
    await enButton.click();
    const accountIsBlockedHeaderTextAfterLocaleChange = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[1]/p').textContent();
    await expect(accountIsBlockedHeaderTextAfterLocaleChange).toEqual('Account has been blocked');
});


test('Help modals are shown', async () => {
   const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/p');
   await helpButton.click();
   const firstDropDown = await globalPage.locator('//*[@id="pv_id_8_0_header_action"]');
   await firstDropDown.click();
   const firstInstructionBlock = await globalPage.locator('//*[@id="pv_id_8_0_content"]/div');
   await expect(firstInstructionBlock).toBeVisible();
   const secondDropDown = await globalPage.locator('//*[@id="pv_id_8_1_header_action"]');
   await secondDropDown.click();
   const secondInstructionBlock = await globalPage.locator('//*[@id="pv_id_8_1_content"]/div');
   await expect(secondInstructionBlock).toBeVisible();
   const thirdDropDown = await globalPage.locator('//*[@id="pv_id_8_2_header_action"]');
   await thirdDropDown.click();
   const thirdInstructionBlock = await globalPage.locator('//*[@id="pv_id_8_2_content"]/div');
   await expect(thirdInstructionBlock).toBeVisible();
   const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
   await xButton.click();
});


test('Transfer rules modal is shown', async () => {
    const transferRulesButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[2]/p');
    await transferRulesButton.click();
    const transferRulesModal = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div');
    await expect(transferRulesModal).toBeVisible();
    const okButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.transfer-rules-modal__footer > button');
    await okButton.click();
    await expect(transferRulesModal).toBeHidden();
});



//needs investigation
test('Support chat can be opened', async () => {
    const supportChat = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[1]');
    await supportChat.click();
    const chatHeader = await globalPage.locator('//*[@id="main"]/div/div/div[1]/div/div/span');
    await expect(chatHeader).toBeVisible();
});