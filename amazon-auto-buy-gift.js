// @ts-check
// ==UserScript==
// @name         アマゾンギフト券3000円自動購入してくれる君
// @version      1.0
// @description  アマゾンギフト券3000円自動購入してくれる君
// @author       anonymouse
// @match        https://www.amazon.co.jp/gp/*
// @grant        none
// ==/UserScript==

(async() => {
    const href = location.href;
    // 引数の秒数分待つ
    const wait = ( /** @type {number} */ second) => new Promise((resolve) => setTimeout(() => resolve(), second * 1000))
    await wait(1)
    // 3000円入力画面
    if (href.includes("https://www.amazon.co.jp/gp/gc/create")) {
        const input = /** @type {HTMLInputElement} */ (document.querySelector("#gc-asv-manual-reload-amount"));
        const button = /** @type {HTMLElement} */ (document.querySelector("#form-submit-button"));
        input.value = "3000";
        await wait(0.5);
        button.click();
    // お支払方法選択画面
    } else if (href.includes("https://www.amazon.co.jp/gp/buy/payselect/handlers/display.html?hasWorkingJavascript=1")) {
        const checkbox = /** @type {HTMLElement} */ (document.querySelector("#convenienceStorePayment"));
        const button = /** @type {HTMLElement} */ (document.querySelector("#continue-top"));
        checkbox.click();
        await wait(0.5);
        button.click();
    // 確認画面
    } else if (href.includes("https://www.amazon.co.jp/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1")) {
        const button = /** @type {HTMLElement} */ (document.querySelector("#order-summary-box > div.a-box.a-first > div > div.a-row.a-spacing-base > div > span > span > input"));
        button.click();
    // 注文終了画面
    } else if (href.includes("https://www.amazon.co.jp/gp/buy/thankyou/handlers/display.html")) {
        window.location.href = "https://www.amazon.co.jp/gp/gc/create/ref=gc_cac_red";
    }
})();