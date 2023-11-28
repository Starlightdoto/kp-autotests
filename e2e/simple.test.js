import { test, expect } from '@playwright/test';
import { fail } from 'assert';
import axios from 'axios';
import { beforeEach } from 'node:test';

let login = 'Mylink';
let password = 'SuperLink';
let merchant = '30';
let pspname = 'cyber1';
let amount = '500';
let currency = '643';
let rate = '0';
let fee = '0';
let amount_edit = true;
let p2p = true;
let qr_bank = '4';
let callback_url = '';
let success_url = '';
let fail_url = '';
let return_url = 'https://google.com';
let merchant_uid = '';
let customer_uid = '';
let customer_acc = '';
let mail = '';


// const baseUrl = `https://api.kiberpay.com/api/test/inrequest?login=${login}&pas=${password}&id_merch=${merchant}&pspname=${pspname}&amount=${amount}&currency=${currency}&rate=${rate}&fee=${fee}&amount_edit=${amount_edit}&p2p=${p2p}&qr_bank=${qr_bank}&callback_url=${callback_url}&success_url=${success_url}&fail_url=${fail_url}&return_url=${return_url}&merchant_uid=${merchant_uid}&customer_uid=${customer_uid}&customer_acc=${customer_acc}&mail=${mail}&test=%7B%7D&q=Send`;
const baseUrl = 'https://api.kiberpay.com/api/test/test';

test.beforeAll(async () => {
    test.setTimeout(20000);
  });

test.describe('QR test', async () => {
    test('Open page', async ({page}) => {
        await page.goto(baseUrl);
    });
    test('Fill in the fields', async ({page}) => {
        await page.locator('//html/body/form/p[1]/input').fill(login);
        await page.locator('//html/body/form/p[2]/input').fill(password);
        await page.locator('//html/body/form/p[3]/select').selectOption('19');
    });
})