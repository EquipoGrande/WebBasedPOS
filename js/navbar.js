function loadNavbar() {
    let header = document.createElement("div");
    header.classList.add("row");
    header.id = "headerDiv";
    header.innerHTML = /*html*/
    `<div class="row" id="headerDiv">
        <img id="logo" class="img-fluid col-2 align-middle col-2" src="assets/AssumtpaITomasLogoGreen.png">
        <div class="col">
            <h1 class="">Assumpta i Tomas</h1>
            <nav class="navbar navbar-expand-lg navbar-light">
                <ul>
                    <li class="col mx-2"><a href="transactionsPage.html">Transactions</a></li>
                    <li class="col mx-2"><a href="EditProductInfo.html">Edit Product Info</a></li>
                    <li class="col mx-2"><a href="UpdateInventory.html">Update Inventory</a></li>
                </ul>
                <ul>
                    <button class="col mx-2 btn btn-light" onclick="toggleSize();">Toggle Size</button>
                    <button class="col mx-2 btn btn-dark" onclick="logoutButton();">Log Out</button>
                </ul>
            </nav>
        </div>
    </div>`;
    document.getElementById("header").appendChild(header);
}