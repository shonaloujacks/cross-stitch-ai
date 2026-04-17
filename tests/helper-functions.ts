const submitPattern = async (page, pattern) => {
   await page.goto('http://localhost:5173/');
   
   await page.getByLabel('prompt (max 300 characters)').fill(pattern);
   
   await page.getByRole('button', { name: 'generate' }).click();
}

export {submitPattern}

