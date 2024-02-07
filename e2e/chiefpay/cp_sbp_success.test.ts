import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';

let globalPage;
const sum = '500.00';
const currencyCode = '643';


test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});


test.afterAll(async () => {
    await globalPage.close();
});


test('Check amount', async () => {
    const amount = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[2]/div/div[2]/p[1]').textContent();
    await expect(`${amount}`).toEqual('500.00 ₽');
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div[2]/p').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);
});


test('Phone number is visible', async () => {
    const phoneNumber = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[1]/div/p[1]');
    await expect(phoneNumber).toBeVisible();
});


test('Transferred button is active', async () => {
    const TransferredButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[2]');
    await expect(TransferredButton).toBeEnabled();
});


test('Cancel button is active', async () => {
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[1]');
    await expect(cancelButton).toBeEnabled();
});


test('How to transfer modal window checks', async () => {
    const howtotransferButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[2]/p');
    await howtotransferButton.click();
    const transferInstructionModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[5]/div/div/div[2]');
    const gotitbutton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(5) > div > div > div.px-8 > button');
    const xButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(5) > div > div > div.px-8 > div.text-right.my-5 > svg');
    await expect (transferInstructionModal).toBeVisible();
    await expect(gotitbutton).toBeEnabled();
    await expect(xButton).toBeEnabled();
    await xButton. click();
    await expect (transferInstructionModal).toBeHidden();
    await howtotransferButton.click();
    await expect (transferInstructionModal).toBeVisible();
    await gotitbutton.click();
    await expect (transferInstructionModal).toBeHidden();

});


test('Transfer rules modal window checks', async () => {
    const transferrulesButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[3]/p');
    await transferrulesButton.click();
    const transferRulesModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[8]/div/div/div[2]');
    const gotitbutton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(8) > div > div > div.px-8 > button');
    const xButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(8) > div > div > div.px-8 > div.text-right.my-5 > svg');
    await expect (transferRulesModal).toBeVisible();
    await expect(gotitbutton).toBeEnabled();
    await expect(xButton).toBeEnabled();
    await xButton. click();
    await expect (transferRulesModal).toBeHidden();
    await transferrulesButton.click();
    await expect (transferRulesModal).toBeVisible();
    await gotitbutton.click();
    await expect (transferRulesModal).toBeHidden();

});


// test('Chat Modal Window checks', async () => {
//     const chatButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[1]');
//     await chatButton.click();
//     await globalPage.waitForTimeout(2000);
//
//     const chatModal = await globalPage.locator ('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]');
//     const submitButton = await globalPage.locator ('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(3) > div > div > div.py-10.px-8 > div.flex.items-center.justify-between.gap-x-4 > button.text-white.bg-\\[\\#18325A\\].outline-none.py-3.px-3.xs\\:px-4.text-xl.font-semibold.rounded-\\[70px\\].w-full.sm\\:hover\\:shadow-\\[0_2px_8px_0_rgba\\(0\\,0\\,0\\,0\\.25\\)\\].transition-shadow');
//     const cancelButton = await globalPage.locator ('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(3) > div > div > div.py-10.px-8 > div.flex.items-center.justify-between.gap-x-4 > button.text-\\[\\#41484C\\].dark\\:text-\\[\\#E8E8E8\\].bg-white.dark\\:bg-\\[\\#1C1C1C\\].border.border-\\[\\#E8E8E8\\].outline-none.py-3.px-3.xs\\:px-4.text-xl.font-semibold.rounded-\\[70px\\].w-full.sm\\:hover\\:shadow-\\[0_2px_8px_0_rgba\\(0\\,0\\,0\\,0\\.25\\)\\].transition-shadow');
//     await expect (chatModal).toBeVisible;
//     await expect (submitButton).toBeEnabled;
//     await expect (cancelButton).toBeEnabled;
//     await cancelButton.click();
//     await expect (chatModal).toBeHidden;
//
//     await chatButton.click();
//
//     const commentInput = await globalPage. locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[2]/textarea');
//     await commentInput.fill('auto_test_chiefpay_sbp');
//
//     const emailInput = await globalPage. locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[3]/div/input');
//     await emailInput.fill('auto_test_chiefpay_sbp@test.com');
//
//     const attachFilesZone  =await globalPage. locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[4]/div/input');
//     await globalPage.setInputFiles('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[4]/div/input', [
//         'assets/receipts/receipt1.png' ]);
//     await submitButton.click();
//     await globalPage.waitForTimeout(2000);
//
//     const requestHasBeenSentModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[4]/div/div/div[2]');
//     const okButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(4) > div > div > div.py-10.px-8 > button')
//     await expect (requestHasBeenSentModal).toBeVisible;
//     await expect (okButton).toBeEnabled;
//
//     await okButton.click();
//     await expect (requestHasBeenSentModal).toBeHidden;
//
//
// });

test('Cancel Modal Window checks', async () => {
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[1]');
    await cancelButton.click();

    const cancelModal = await globalPage.locator ('//*[@id="app"]/div[1]/main/div[2]/div/div/div[2]');
    const yesButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(2) > div > div > div.py-10.px-8 > div.flex.items-center.justify-between.gap-x-4 > button.text-\\[\\#FF001F\\].dark\\:text-\\[\\#FF6161\\].bg-white.dark\\:bg-\\[\\#1C1C1C\\].border.border-\\[\\#FF6161\\].outline-none.py-3.px-3.xs\\:px-4.text-xl.font-semibold.rounded-\\[70px\\].w-full.sm\\:hover\\:shadow-\\[0_2px_8px_0_rgba\\(0\\,0\\,0\\,0\\.25\\)\\].transition-shadow');
    const noButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(2) > div > div > div.py-10.px-8 > div.flex.items-center.justify-between.gap-x-4 > button.text-white.bg-\\[\\#18325A\\].outline-none.py-3.px-3.xs\\:px-4.text-xl.font-semibold.rounded-\\[70px\\].w-full.sm\\:hover\\:shadow-\\[0_2px_8px_0_rgba\\(0\\,0\\,0\\,0\\.25\\)\\].transition-shadow');
    await expect (cancelModal).toBeVisible;
    await expect (yesButton).toBeEnabled;
    await expect (noButton).toBeEnabled;
    await noButton. click();
    await expect (cancelModal).toBeHidden;

});



test('I agree with transfer rules checkbox checks', async () => {
    const TransferredButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[2]');
    await expect(TransferredButton).toBeEnabled();
    const iAgreeCheckbox = await globalPage.locator('//*[@id="agreement"]');
    await (iAgreeCheckbox).click();
    await expect(TransferredButton).toBeDisabled();
    await (iAgreeCheckbox).click();
    await expect(TransferredButton).toBeEnabled();


});

test('Locale change - main page', async () => {
    const changeLocaleButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[1]/p');
    const enButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[5]/p[2]');
    const ruButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[5]/p[1]');

    await changeLocaleButton.click();
    await ruButton.click();
    await globalPage.waitForTimeout(2000);
    const mainRuText = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1').textContent();
    await expect(mainRuText).toEqual('Перевод по СБП');

    await changeLocaleButton.click();
    await enButton.click();
    await globalPage.waitForTimeout(2000);
    const mainEnText = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1').textContent();
    await expect(mainEnText).toEqual('SBP transfer');
});


test('Go to transferred  page', async () => {
    const TransferredButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[2]');
    await expect(TransferredButton).toBeEnabled();
    await TransferredButton.click();
    const headerText = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1');
    await expect(headerText).toBeVisible();
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div[2]/p').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);

});


test('Filling in email field on transferred  page', async () => {
    const emailInput = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[3]/div/div/input');
    await emailInput.fill('auto_test_chiefpay_sbp@test.com');

    const saveButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(1) > div.mb-10.text-left > div > div > button')
    await saveButton.click();

    const pencilSign = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[3]/div/div')
    await expect(pencilSign).toBeVisible();


});


