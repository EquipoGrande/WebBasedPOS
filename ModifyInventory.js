class ModifyInventory {
    constructor(inventory) {
        this.productList = inventory.productList;
    }

    modifyQuantity(itemId, newQuantity) {
        for(let i = 0; i < this.productList.length; i++) {
            if(itemId == productList[i].id) {
                productList[i].quantity = newQuantity;
                break;
            }
        }
    }
}