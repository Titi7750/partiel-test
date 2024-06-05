import { expect, test } from '@playwright/test';

test('should add a note', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[placeholder="Title"]', 'Test Note');
  await page.fill('input[placeholder="Score"]', '15');
  await page.fill('textarea[placeholder="Content"]', 'This is a test note.');
  await page.click('button:has-text("Add Note")');
  const noteTitle = await page.textContent('h3');
  expect(noteTitle).toBe('Test Note');
});


test('should delete a note', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[placeholder="Title"]', 'Test Note');
  await page.fill('input[placeholder="Score"]', '15');
  await page.fill('textarea[placeholder="Content"]', 'This is a test note.');
  await page.click('button:has-text("Add Note")');
  await page.click('button:has-text("Delete")');
  // Supprimer la note 
  const noteTitle = await page.textContent('h3');
  expect(noteTitle).toBeNull();
});
