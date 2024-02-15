const createMenu = document.getElementById("button");
const menuContainer = document.querySelector(".menuContainer");
const deleteMenu = async(id) => {
    const url = `http://localhost:3000/menu?id=${id}`;
    const respond =await fetch(url, {method: "DELETE"});
    
};
const respond =async () => {
    const menuName = document.querySelector("input[name=itemName]")
    const menuPrice = document.querySelector("input[name=price]")
    const menu = {
        name: menuName.value,
        price: menuPrice.value,
    }
    const respond =await fetch("http://localhost:3000/menu",{
        method: "POST",
        body: JSON.stringify(menu),
        headers: {
            "Content-type": "application/json"
        }
    })
    const dataFromServer =await respond.json();
    const menuDiv = document.createElement("div");
    const menuUl =document.createElement("ul");
    dataFromServer.forEach((item) => {
        const menuLi = document.createElement("li");
        const deleteBtn = document.createElement("button");
        deleteBtn.id = item.id;
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteMenu(item.id))
        menuLi.textContent = item.name;
        menuUl.append(menuLi);
        menuUl.append(deleteBtn);
        menuDiv.append(menuUl);
        menuContainer.innerHTML = "";
        menuContainer.append(menuDiv);


    })
}
createMenu.addEventListener("click", respond);