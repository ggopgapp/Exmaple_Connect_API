import { test, request, expect } from '@playwright/test';

test.describe('API tests with Playwright', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://automationexercise.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET products list', async () => {
    const response = await apiContext.get('/api/productsList');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    console.log('GET:', data);
  });

  test('POST create account', async () => {
    const response = await apiContext.post('/api/createAccount', {
      form: {
        name: 'Gap',
        email: 'g.gapp71@gmail.com',
        password: '123456',
        title: 'Mr',
        birth_date: '18',
        birth_month: 'July',
        birth_year: '1999',
        firstname: 'Ratchapat',
        lastname: 'Teowsuwan',
        address1: '123 ',
        country: 'Thailand',
        zipcode: '11110',
        state: 'Nonthaburi',
        city: 'Bangbuathong',
        mobile_number: '0888888888'
      }
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log('POST:', data);
  });

  test('POST serach product', async () => {
    const response = await apiContext.post('/api/searchProduct', {
      form: {
        search_product: 'Blue Top'
      }
    });
    expect(response.status()).toBe(200)
    const data = await response.json();
    console.log('POST:', data);
  })

  test('PUT update account', async () => {
    const response = await apiContext.put('/api/updateAccount', {
      form: {
        email: 'g.gapp',
        name: 'Gap Updated',
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    console.log('PUT:', data);
  });

  test('DELETE account', async () => {
    const response = await apiContext.delete('/api/deleteAccount', {
      form: {
        email: 'gap123@example.com',
        password: '123456',
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    console.log('DELETE:', data);
  });
});


