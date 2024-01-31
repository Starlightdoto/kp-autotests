import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';
import { ThreePage } from './pages/threePage';

let globalPage;
const sum = '500.00';
const currencyCode = '643';
const returnUrl = 'https://google.com';

let threePage: ThreePage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode, returnUrl, true, '123123', '123123');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    threePage = new ThreePage(globalPage);
});

test.afterAll(async () => {
    await globalPage.close();
});


test('Blocked user page elements are shown', async () => {
    await expect(threePage.accountIsBlockedHeader).toBeVisible();
    await expect(threePage.applyButton).toBeDisabled();
    await expect(threePage.goToPersonalAccountButton).toBeEnabled();
    await threePage.emailInput.fill('auto_test_threepage@test.com');
    await expect(threePage.applyButton).toBeDisabled();
    await threePage.commentField.fill('Test test');
    await expect(threePage.applyButton).toBeEnabled();
});


test('Locale change', async () => {
    const textContent = await threePage.accountIsBlockedHeader.textContent();
    await expect(textContent).toEqual('Аккаунт заблокирован');
    await threePage.enButton.click();
    const newTextContent = await threePage.accountIsBlockedHeader.textContent();
    await expect(newTextContent).toEqual('Account has been blocked');
});


test('Help modals are shown', async () => {
   await threePage.helpButton.click();
   await threePage.firstDropDown.click();
   await expect(threePage.firstInstructionBlock).toBeVisible();
   await threePage.secondDropDown.click();
   await expect(threePage.secondInstructionBlock).toBeVisible();
   await threePage.thirdDropDown.click();
   await expect(threePage.thirdInstructionBlock).toBeVisible();
   await threePage.xButton.click();
});


test('Transfer rules modal is shown', async () => {
    await threePage.transferRulesButton.click();
    await expect(threePage.transferRulesModal).toBeVisible();
    await threePage.okButton.click();
    await expect(threePage.transferRulesModal).toBeHidden();
});



//needs investigation
// test('Support chat can be opened', async () => {
//     await threePage.supportChat.click();
//     await expect(threePage.chatHeader).toBeVisible();
// });