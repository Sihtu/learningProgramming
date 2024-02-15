const CreateMenu = document.getElementById("buttonBtn");
const menuCatagory = document.querySelector(".menuCatagory");
const removeItems =async (id) => {
    const url = `http://localhost:3000/menu?id=${id}`
    const idServer = await fetch(url, {
        method: "DELETE"
    })
}

const create =async () => {
    const menuName = document.querySelector("input[name=menuName]");
    const menuPrice = document.querySelector("input[name=menuPrice]")
    const menu ={
        name: menuName.value,
        price: menuPrice.value,
    }
    const post =await fetch("http://localhost:3000/menu", {
        method: "POST",
        body: JSON.stringify(menu),
        headers: {
            "Text-Content": "server/js"
        }
    })
    const menuItem = await post.json();
    const menuDiv = document.createElement("div");
    const menuUl = document.createElement("ul");

    
    menuItem.forEach((item) => {
        const meunLi = document.createElement("li");
        const deleteItemBtn = document.createElement("button");
        deleteItemBtn.textContent = "DELETE";
        console.log(deleteItemBtn);
        deleteItemBtn.addEventListener("click",() => removeItems(item.id))
        meunLi.textContent = item.name;
        menuUl.append(meunLi);
        menuUl.append(deleteItemBtn);
        menuDiv.append(menuUl);
        
        menuCatagory.innerHTML = "";
        menuCatagory.append(menuDiv);
        console.log(menuCatagory)
    })
}
CreateMenu.addEventListener("click", create)
