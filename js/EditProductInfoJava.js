class ProductInfo {
    constructor(inventory) {
        this.productList = inventory.productList;
    }

    removeProduct(itemId) {
        for(let i = 0; i < this.productList.length; i++) {
            if(this.productList[i].id === itemId) {
                productList.splice(i, 1);
                break;
            }
        }
    }

    addNewProduct(itemId, itemName, itemSellPrice, itemPurchasePrice, itemUnitIsKg) {
        this.productList.push(new Product(itemName, itemId, itemSellPrice, itemPurchasePrice, 0, itemUnitIsKg));
    }

    modifyItem(itemId, newName, newSellPrice, newPurchasePrice, newUnitIsKg) {
        for(let i = 0; i < this.productList.length; i++) {
            if(itemId == productList[i].id) {
                productList[i] = new Product(newName, itemId, newSellPrice, newPurchasePrice, productList[i].quantity, newUnitIsKg);
                break;
            }
        }
    }
}