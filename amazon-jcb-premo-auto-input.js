//@ts-check

// ==UserScript==
// @name         自動でプレモカード入力してくれる君
// @version      1.0
// @description  自動でプレモカード入力してくれる君
// @author       anonymouse
// @match        https://link3.kessai.info/*
// @grant        none
// ==/UserScript==

(async() => {
    const SESSION_STORAGE_KEY = "MY_TAMPER_MONKEY_ITEM";
    const href = location.href;
    // 引数の秒数分待つ
    const wait = ( /** @type {number} */ second) => new Promise((resolve) => setTimeout(() => resolve(), second * 1000))
    await wait(1)
    // お支払方法の選択画面
    if (href.includes("https://link3.kessai.info/JLP/JLPcon")) {
        if (location.hash.length === 0) {
            alert("tampermonkeyエラー: hashタグがありません");
            return;
        }
        const hash = location.hash.substring(1);
        const splitedHash = hash.split(",");
        const card = {
            no: splitedHash[0],
            key: splitedHash[1],
        }
        // ハッシュタグのカード情報をsessionStorageに格納
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(card));
        const jcbPremoButton = /** @type {HTMLElement} */ (document.querySelector("#anchorsel16"));
        jcbPremoButton.click();
    // カード入力画面
    } else if (href === "https://link3.kessai.info/JcbPremoWeb/Payment") {
        // ハッシュタグのカード情報をsessionStorageから取り出し
        const cardString = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (cardString === null) {
            alert("tampermonkeyエラー: sessionStorageに何も入っていません");
            return;
        }
        const card = JSON.parse(cardString);
        document.body.scrollTop = document.body.scrollHeight;
        const cardNoInput = /** @type {HTMLInputElement} */ (document.querySelector("input[name=cardno]"));
        const cardAuthInput = /** @type {HTMLInputElement} */ (document.querySelector("input[name=authno]"))
        const form = /** @type {HTMLFormElement} */ (document.querySelector("form[name=premo]"));
        cardNoInput.value = card.no;
        cardAuthInput.value = card.key;
        await wait(1);
        form.submit();
    // エラー画面
    } else if (href.includes("errorcode=")) {
        document.body.scrollTop = document.body.scrollHeight;
        alert("tampermonkeyエラー: エラーページのようです。")
    }
})();