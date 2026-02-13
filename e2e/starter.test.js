describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      // url: "scheme://localhost:8081",
      sourceApp: "com.exposample",
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have welcome screen", async () => {
    await expect(element(by.id("welcome"))).toBeVisible();
    // await expect(element(by.text("Welcome.*"))).toBeVisible();
  });

  it("should show hello screen after tap", async () => {
    await element(by.id("login_apple_id")).tap();
    // await expect(element(by.text("OK"))).tap();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
