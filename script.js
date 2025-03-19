window.onload = function () {
    const form = document.getElementById("inputForm");
    const productList = document.getElementById("product-list");
    let products = JSON.parse(localStorage.getItem("tissue-products")) || [];

    updateTable();

    if (!form) {
        console.error("エラー: フォームが見つかりません。");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const productName = document.getElementById("product-name").value.trim();
        const setCount = parseFloat(document.getElementById("set-count").value);
        const boxCountElement = document.getElementById("box-count");

        if (!boxCountElement) {
            console.error("エラー: box-count の入力欄が見つかりません。");
            return;
        }

        if (boxCountElement.value === "") {
            console.error("エラー: box-count の値が空です。");
            return;
        }

        const boxCount = parseFloat(boxCountElement.value);
        const price = parseFloat(document.getElementById("price").value);

        console.log("boxCountElement:", boxCountElement);
        console.log("boxCountElement.value:", boxCountElement.value);
        console.log("boxCount:", boxCount);

        if (!productName || isNaN(setCount) || isNaN(boxCount) || isNaN(price) || setCount <= 0 || boxCount <= 0 || price <= 0) {
            alert("正しい数値を入力してください");
            return;
        }

        const totalSets = setCount * boxCount;
        const pricePerSet = price / totalSets;

        products.push({
            name: productName,
            boxCount: boxCount,
            price: price,
            pricePerSet: parseFloat(pricePerSet.toFixed(2))
        });

        saveToLocalStorage();
        updateTable();
        form.reset();
    });

    function updateTable() {
        productList.innerHTML = "";
        products.sort((a, b) => a.pricePerSet - b.pricePerSet);
        const minPrice = products.length > 0 ? products[0].pricePerSet : null;

        products.forEach((product, index) => {
            const row = document.createElement("tr");
            if (product.pricePerSet === minPrice) {
                row.classList.add("highlight");
            }
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.boxCount}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.pricePerSet.toFixed(2)}</td>
                <td><button class="delete-btn" data-index="${index}">削除</button></td>
            `;
            productList.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                products.splice(index, 1);
                saveToLocalStorage();
                updateTable();
            });
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem("tissue-products", JSON.stringify(products));
    }
};
