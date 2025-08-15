let box = document.querySelector(".box");
let dialogdelete = document.querySelector(".dialogdelete");
let yes = document.querySelector(".yes");
let no = document.querySelector(".no");


let dialogedit = document.querySelector(".dialogedit");
let editjoy = document.querySelector(".editjoy");
let editimg = document.querySelector(".editimg");
let editname = document.querySelector(".editname");
let editinfo = document.querySelector(".editinfo");
let editcategory = document.querySelector(".editcategory");
let editprice = document.querySelector(".editprice");
let editqty = document.querySelector(".editqty");
let editstatus = document.querySelector(".editstatus");
let editsave = document.querySelector(".editsave");
let editcancel = document.querySelector(".editcancel");

let dialogadd = document.querySelector(".dialogadd");
let addjoy = document.querySelector(".addjoy");
let addimg = document.querySelector(".addimg");
let addname = document.querySelector(".addname");
let addinfo = document.querySelector(".addinfo");
let addcategory = document.querySelector(".addcategory");
let addprice = document.querySelector(".addprice");
let addqty = document.querySelector(".addqty");
let addstatus = document.querySelector(".addstatus");
let addsave = document.querySelector(".addsave");
let addcancel = document.querySelector(".addcancel");


let bntadd = document.querySelector(".bntadd");

let API = "https://687f27d3efe65e5200888b47.mockapi.io/todolist";

let inpsearh = document.querySelector(".inpsearh");

inpsearh.oninput = () => {
    inpfunc(inpsearh.value);
}

async function inpfunc(value) {
    try {
        let respone = await fetch(API);
        let dt = await respone.json();
        let filter = dt.filter((item) => item.name.toLowerCase().includes(value));
        getData(filter);
    } catch (error) {
        console.log(error);
        
    }

}

bntadd.onclick = () => {
    dialogadd.showModal();
}

addcancel.onclick = () => {
    dialogadd.close();
}

addsave.onclick = () => {
    let yuser = {
        joy:addjoy.value,
        img:addimg.value,
        name:addname.value,
        info:addinfo.value,
        category:addcategory.value,
        price:addprice.value,
        qty:addqty.value,
        status:addstatus.value,
    }
    Addfunc(yuser);
}

async function Addfunc(yuser) {
    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(yuser)
    });
    get();
    dialogadd.close();
    addjoy.value = "";
    addimg.value = "";
    addname.value = "";
    addinfo.value = "";
    addcategory.value = "";
    addprice.value = "";
    addqty.value = "";
    addstatus.value = "In Stock";
}

async function delfunc(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    get();
    dialogdelete.close();
}


let idx = null

editsave.onclick = () => {
    let newuser = {
        joy:editjoy.value,
        img:editimg.value,
        name:editname.value,
        info:editinfo.value,
        category:editcategory.value,
        price:editprice.value,
        qty:editqty.value,
        status:editstatus.value,
    }
    editfunc(idx, newuser);
}

async function editfunc(id,newuser) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newuser)
    })
    get();
    dialogedit.close();
}

editcancel.onclick = () => {
    dialogedit.close();
}


async function get() {
    try {
        let respone = await fetch(API, { method: "GET" });
        let data = await respone.json();
        getData(data);
    } catch (error) {   
        console.log(error);
    }
}                         

function getData(data) {
    box.innerHTML = ""
    data.forEach((elem) => {
      let div = document.createElement("tr");
      let divcheckbox = document.createElement("td");
      let checkbox = document.createElement("input");
      let joy = document.createElement("td");
      let divforall = document.createElement("td");
      let divname = document.createElement("div");
      let name = document.createElement("h3");
      let img = document.createElement("img");
      let info = document.createElement("p");
      let category = document.createElement("td");
      let price = document.createElement("td");
      let qty = document.createElement("td");
      let divstatus = document.createElement("td");
      let status = document.createElement("p");
      let btns = document.createElement("td");
      let btndelete = document.createElement("button");
      let btninfo = document.createElement("button");
      let btnedit = document.createElement("button");

      checkbox.type = "checkbox";
      checkbox.checked = elem.check;
      joy.innerHTML = elem.joy;
      name.innerHTML = elem.name;
      info.innerHTML = elem.info;
      img.src = elem.img;
      category.innerHTML = elem.category;
      price.innerHTML = "$" + elem.price;
      qty.innerHTML = elem.qty;
      status.innerHTML = elem.status;

      btndelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      btnedit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      btninfo.innerHTML = `<i class="fa-solid fa-eye"></i>`;

      btndelete.style.background = "white";
      btndelete.style.border = "none";
      btndelete.style.color = "red";
      btndelete.style.cursor = "pointer";

      btnedit.style.background = "white";
      btnedit.style.border = "none";
      btnedit.style.color = "blue";
      btnedit.style.cursor = "pointer";

      btninfo.style.background = "white";
      btninfo.style.border = "none";
      btninfo.style.color = "gray";
      btninfo.style.cursor = "pointer";

      img.style.width = "48px";
      img.style.height = "48px";
      img.style.borderRadius = "12px";
      img.style.marginTop = "25px";

      divforall.style.display = "flex";
      divforall.style.gap = "20px";

      name.style.marginTop = "25px";
      info.style.marginTop = "-10px";

      btns.append(btninfo, btnedit, btndelete);
      divname.append(name, info);
      divforall.append(img, divname);
        divcheckbox.append(checkbox);
        divstatus.append(status)
      div.append(divcheckbox,joy,divforall,category,price,qty,divstatus,btns);
      box.append(div);

        btndelete.onclick = () => {
            dialogdelete.showModal();
            yes.onclick = () => {
                delfunc(elem.id) 
            }
            no.onclick = () => {
                dialogdelete.close();
            }
        }

        btnedit.onclick = () => {
            dialogedit.showModal();
            editjoy.value = elem.joy
            editimg.value = elem.img
            editname.value = elem.name
            editinfo.value = elem.info
            editcategory.value = elem.category
            editprice.value = elem.price
            editqty.value = elem.qty
            editstatus.value = elem.status
            idx = elem.id
        }

        if (status.innerHTML == "In Stock") {
            status.style.background = "rgba(69, 248, 69, 0.337)";
            status.style.width = "100px"
            status.style.borderRadius = "20PX"
            status.style.height = "25px"
            status.style.textAlign = "center"
            status.style.alignContent = "center"
            status.style.color = "green"
        }
        
        else {
            status.style.background = "rgba(255, 0, 0, 0.222)";
            status.style.width = "100px";
            status.style.borderRadius = "20PX";
            status.style.height = "25px";
            status.style.textAlign = "center";
            status.style.alignContent = "center";
            status.style.color = "red";
        }

    });
 
}
get()