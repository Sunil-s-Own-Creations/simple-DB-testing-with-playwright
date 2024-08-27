import { test, expect, request } from '@playwright/test';

test('Register user and verify in DB', async ({ page }) => {
  // Step 1: Go to the registration form
  await page.goto('http://localhost:3000');

  // Step 2: Fill out the form
  await page.fill('#firstName', 'John');
  await page.fill('#lastName', 'Doe');
  await page.fill('#email', 'john.doe@example.com');
  await page.fill('#password', 'secret123');
  await page.fill('#dob', '1990-01-01');

  // Step 3: Submit the form
  await page.click('button[type="submit"]');

  // Step 4: Verify the UI behavior (Check for success message)
  // await page.waitForSelector('text=Registration successful!');

  // Step 5: Validate the data in the DB by making an API request
  const apiContext = await request.newContext();
  const response = await apiContext.get('http://localhost:3000/api/users');
  const users = await response.json();

  console.log(`The response from DB is =`, users);

  // Step 6: Assert the data saved in the database matches what was submitted
  expect(users).toContainEqual(expect.objectContaining({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dob: '1990-01-01',
  }));
});
