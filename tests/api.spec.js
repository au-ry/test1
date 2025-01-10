const { test, expect, request } = require('@playwright/test');

test.describe('API Testing', () => {
    let apiContext;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('GET /posts', async () => {
        const response = await apiContext.get('/posts');
        expect(response.ok()).toBeTruthy();

        const posts = await response.json();
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
    });

    test.skip('POST /posts', async () => {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1,
        };

        const response = await apiContext.post('/posts', { data: newPost });
        expect(response.ok()).toBeTruthy();

        const post = await response.json();
        expect(post).toHaveProperty('id');
        expect(post.title).toBe('foo');
        expect(post.body).toBe('bar');
        expect(post.userId).toBe(1);
    });
});
