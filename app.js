const url = "https://api.openai.com/v1/images/generations";
const text = document.getElementById("text");
const image = document.getElementById("image");
const btn = document.getElementById("btn");

const settings = document.getElementById('settings');   // 設定モーダル
const btnSettings = document.getElementById('btnSettings');    // 設定ボタン
const closeModal = document.getElementById('close-modal');    // 設定モーダルの閉じるボタン
const settingsApiKey = document.getElementById('settingsApiKey');    // 設定モーダルのAPIキー入力欄

let size = '1024x1024';

// 画像生成ボタンのイベント処理
btn.addEventListener("click", function () {
    if (text.value === "") {
        alert("Please enter a value");
        return;
    }
    if (text.value === "") {
        alert("Please enter a value");
        return;
    };
    const data = {
        prompt: text.value,
        n: 3,
        size: size,
    };
    btn.textContent = '';
    btn.classList.add('btn-spinner');
    btn.setAttribute("disabled", "disabled");
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${settingsApiKey.value}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const arraySize = data.data.length;
            for (let i = 0; i < arraySize; i++) {
                image.innerHTML += `<img src="${data.data[i].url}" alt="image" class="w-100 p-2">`;
            }
        })
        .finally(() => {
            btn.textContent = 'Generate';
            btn.classList.remove('btn-spinner');
            btn.removeAttribute("disabled");
        });
});

// 入力ボックスのイベント処理
text.addEventListener("input", function () {
    if (text.value === "") {
    btn.classList.remove("bg-slate-900", "text-slate-50");
    text.classList.add("border-r-2", "border-gray-200");
    } else {
    text.classList.remove("border-r-2", "border-gray-200");
    btn.classList.add("bg-slate-900", "text-slate-50");
    }
});

// 設定モーダルのイベント処理
btnSettings.addEventListener('click', function(){
    settings.classList.remove('hidden');
});

// 設定モーダルの閉じるボタンのイベント処理
closeModal.addEventListener('click', function(){
    settings.classList.add('hidden');
});

// APIキーの入力欄のイベント処理
settingsApiKey.addEventListener('input', function () {
    if (settingsApiKey.value !== "") {
        window.localStorage.setItem('apiKey', settingsApiKey.value);
    }
});

// APIキーの入力欄の初期値設定
document.addEventListener('DOMContentLoaded', function () {
    const key = window.localStorage.getItem('apiKey');
    if (key !== null) {
        settingsApiKey.value = key;
    }
});

// 画像サイズの選択ボタンのイベント処理
document.getElementById("option1").addEventListener("change", function () {
    size = this.value;
});
document.getElementById("option2").addEventListener("change", function () {
    size = this.value;
});
document.getElementById("option3").addEventListener("change", function () {
    size = this.value;
});

feather.replace();

const checkAuthor = document.getElementById("checkAuthor");
if (checkAuthor.children[0].children[0].textContent === "@sauravhathi") {
} else {
    window.location.href = "https://github.com/sauravhathi";
}
