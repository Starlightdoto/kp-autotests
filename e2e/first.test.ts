import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';

let baseUrl = '';
test.beforeAll(async ({page}) => {
    baseUrl = await createSBPRequestLink({page}, '19', 'send', '500', '643');

});

test.describe('SBP page test', async () => {

})


    

