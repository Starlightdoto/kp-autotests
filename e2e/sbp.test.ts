import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';



test.describe('SBP page test', async () => {
    test('Create link and go to payment page', async ({page}) => {
        const baseUrl = await createSBPRequestLink({page}, '19', 'send', '500', '643');
        await page.goto(baseUrl);
    });

    test('Check sum', async ({page}) => {

    });
})


    

