document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tissue-form");
    const productList = document.getElementById("product-list");

    let products = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const productName = document.getElementById("product-name").value.trim();
        const setCount = parseFloat(document.getElementById("set-count").value);
        const price = parseFloat(document.getElementById("price").value);

        if (!productName || isNaN(setCount) || isNaN(price) || setCount <= 0 || price <= 0) {
            alert("正しい数値を入力してください");
            return;
        }

        const pricePerSet = price / setCount;

        products.push({
            name: productName,
            setCount: setCount,
            price: price,
            pricePerSet: pricePerSet
        });
        saveToLocalStorage();

        updateTable();
        form.reset();
    });
    function saveToLocalStorage() {
        localStorage.setItem("products", JSON.stringify(products));

    function updateTable() {
        // 安い順にソート
        products.sort((a, b) => a.pricePerSet - b.pricePerSet);

        // テーブルをクリア
        productList.innerHTML = "";

        // 最安値を取得
        const minPrice = products.length > 0 ? products[0].pricePerSet : null;

        products.forEach(product => {
            const row = document.createElement("tr");
            // 最安値をハイライト
            if (product.pricePerSet === minPrice) {
                row.style.backgroundColor = "#ffeb3b";
            }
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.setCount}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.pricePerSet.toFixed(2)}</td>
            `;
            productList.appendChild(row);
        });
    }
});
