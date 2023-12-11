// import {test, expect} from '@playwright/test';
// import { createSBPRequestLink } from './helpers/create_request_link';
// import {currencies} from "./helpers/currencies";

// let globalPage;
// const sum = '500.00';
// const currencyCode = '643';

// test.beforeAll(async ({browser}, testInfo) => {
//     const context = await browser.newContext();
//     globalPage = await context.newPage();
//     const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
//     if( baseUrl !== undefined) {
//         await globalPage.goto(baseUrl);
//     }
// });

// test.afterAll(async () => {
//     await globalPage.close();
// });

// test('Proceed button is active', async () => {
//     const proceedButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div/button');
//     await expect(proceedButton).toBeEnabled();
// });

// test('Cancel  button is active', async () => {
//     const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/button');
//     await expect(cancelButton).toBeEnabled();
// });

// // test('Help modal window checks', async () => {
// //     const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/p');
// //     const transfeDetailsrInstruction = await globalPage.locator('//*[@id="pv_id_18_0_header_action"]');
// //     const transferInstruction = await globalPage.locator('//*[@id="pv_id_12_1_header_action"]');
// //     const waitForStatusChangeInstruction = await globalPage.locator('//*[@id="pv_id_12_2_header_action"]');
// //     const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
// //     const transferDetailsModal = await globalPage.locator('//*[@id="pv_id_12_0_content"]/div/div/div');
// //     const transferModal = await globalPage.locator('//*[@id="pv_id_12_1_content"]/div/div/div[1]');
// //     const waitForStatusChangeModal = await globalPage.locator('//*[@id="pv_id_12_2_content"]/div/div/div[1]');


// //     await helpButton.click();
// //     await globalPage.waitForTimeout(2000);
// //     await expect (transfeDetailsrInstruction).toBeVisible();
// //     await expect (transferInstruction).toBeVisible();
// //     await expect (waitForStatusChangeInstruction).toBeVisible();
// //     await expect (xButton).toBeVisible();

// //     await transfeDetailsrInstruction. click();
// //     await expect (transferDetailsModal). toBeVisible();
// //     await transfeDetailsrInstruction. click();
// //     await expect (transferDetailsModal). toBeHidden();

// //     await transferInstruction. click();
// //     await expect (transferModal). toBeVisible();
// //     await transferInstruction. click();
// //     await expect (transferModal). toBeHidden();

// //     await waitForStatusChangeInstruction. click();
// //     await expect (waitForStatusChangeModal). toBeVisible();
// //     await waitForStatusChangeInstruction. click();
// //     await expect (waitForStatusChangeModal). toBeHidden();

// //     await xButton. click();
// //     await expect (helpButton).toBeVisible();
// // });


// test('Cancel Modal Window checks', async () => {
//     const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/button');
//     const cancelModal = await globalPage. locator ('/html/body/div[3]/div/div/div');
//     const modalCancelButton = await globalPage. locator('/html/body/div[3]/div/div/div/div[2]/button[1]');
//     const backButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
//     await cancelButton.click();
//     await expect (modalCancelButton). toBeVisible;
//     await expect (backButton). toBeVisible;

//     await backButton. click();
//     await expect (cancelModal). toBeHidden;
// });





// // test('Check amount', async () => {
// //     const amount = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p').textContent();
// //     console.log(amount);
// //     await expect(`${amount}`).toEqual('500.00 ₽');
// // });