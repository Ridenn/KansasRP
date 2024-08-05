// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

var list = [
	{"desc":"rice", "amount":"1", "value":"5.40"},
	{"desc":"beer", "amount":"12", "value":"1.99"},
	{"desc":"meat", "amount":"1", "value":"15.00"}
];

/*
//somando total
function getTotal(list){
	var total = 0;
	for(var key in list){
		total += list[key].value * list[key].amount;
	}
	document.getElementById("totalValue").innerHTML = formatValue(total);
}

//criando a tabela
function setList(list){
	var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button> <button class="btn btn-default" onclick="deleteData('+key+');">Delete</button></td></tr>';
	}
	table += '</tbody>';

	document.getElementById('listTable').innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

//formatando o nome do produto
function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

//formatando a quantidade
function formatAmount(amount){
	return parseInt(amount);
}

//formatando o preço
function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".",",");
	str = "$ " + str;
	return str;
}

//adicionar novo produto
function addData(){
	if(!validation()){
		return;
	}
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift({"desc":desc , "amount":amount , "value":value });
	setList(list);
}

//botões de editar
function setUpdate(id){
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

//limpa os campos de editar
function resetForm(){
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("inputIDUpdate").innerHTML = "";
	document.getElementById("errors").style.display = "none";
}

//atualizando os dados
function updateData(){
	if(!validation()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc":desc, "amount":amount, "value":value};
	resetForm();
	setList(list);
}

//deletando os dados
function deleteData(id){
	if(confirm("Delete this item?")){
		if(id === list.length - 1){
			list.pop();
		}else if(id === 0){
			list.shift();
		}else{
			var arrAuxIni = list.slice(0,id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}

//validando e printando erros
function validation(){
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";
	document.getElementById("errors").style.display = "none";

	if(desc === ""){
		errors += '<p>Fill out description</p>';
	}
	if(amount === ""){
		errors += '<p>Fill out a quantity</p>';
	}else if(amount != parseInt(amount)){
		errors += '<p>Fill out a valid amount</p>';
	}
	if(value === ""){
		errors += '<p>Fill out a value</p>';
	}else if(value != parseFloat(value)){
		errors += '<p>Fill out a valid value</p>';
	}

	if(errors != ""){
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista
function deleteList(){
	if (confirm("Delete this list?")){
		list = [];
		setList(list);
	}
}

//salvando em storage
function saveListStorage(list){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}

//verifica se já tem algo salvo
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}

initListStorage();

*/

// Função para adicionar ao carrinho
function addToCart(productId, productPrice, productName, productImage) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já existe no carrinho
    const productIndex = carrinho.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
		return
		// Atualizar a quantidade
        carrinho[productIndex].productQuantity++;
    } else {
        // Adicionar o produto ao carrinho
        const product = {
            productId,
            productPrice,
            productName,
            productQuantity: 1,
            productImage
        };
        carrinho.push(product);
    }

    // Atualizar o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    updateCartCount();
    updateCartDisplay();
    //updateSidebar();
    updateButtonState(productId); // Atualizar o botão após adicionar
}

function addToCart(productId) {
    const { productPrice, productName, productImage } = getButtonData(productId);
    
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    const productIndex = carrinho.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
		return
        // Atualizar a quantidade
        carrinho[productIndex].productQuantity++;
    } else {
        // Adicionar o produto ao carrinho
        const product = {
            productId,
            productPrice,
            productName,
            productQuantity: 1,
            productImage
        };
        carrinho.push(product);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    updateCartCount();
    updateCartDisplay();
	updateButtonState(productId, carrinho);
}

let totalPrice = 0; 

function updateCartDisplay() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    totalPrice = 0;

    // Se o carrinho estiver vazio, limpar o conteúdo da tabela e sair
    if (carrinho.length === 0) {
        document.getElementById('cartList').innerHTML = '<tr><td colspan="4">Carrinho vazio</td></tr>';
        updateCartCount();
        updateSidebar(); // Atualiza a sidebar para refletir carrinho vazio
        return;
    }

    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    // Criar um mapa para consolidar itens por productId
    let itemMap = new Map();

    carrinho.forEach(item => {
        if (itemMap.has(item.productId)) {
			return
            //itemMap.get(item.productId).productQuantity += item.productQuantity;
        } else {
            itemMap.set(item.productId, { ...item });
        }
    });

    // Iterar sobre os itens consolidados
    itemMap.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('border');

		const productImageCell = document.createElement('td');
        const productImage = document.createElement('img');
        productImage.src = item.productImage; // Adicione o URL da imagem do produto
        productImage.alt = item.productName;
        productImage.style.width = '50px'; // Ajuste o tamanho da imagem conforme necessário
        productImage.style.height = '50px'; // Ajuste o tamanho da imagem conforme necessário
        productImageCell.appendChild(productImage);
        row.appendChild(productImageCell);

        const productNameCell = document.createElement('td');
        productNameCell.textContent = item.productName;
        row.appendChild(productNameCell);

        const productPriceCell = document.createElement('td');
        productPriceCell.textContent = `R$ ${item.productPrice.toFixed(2)}`;
        row.appendChild(productPriceCell);

        const productQuantityCell = document.createElement('td');

		/*
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('btn', 'btn-sm', 'btn-secondary');
        decreaseButton.addEventListener('click', () => updateQuantity(item.productId, -1));
        productQuantityCell.appendChild(decreaseButton);
		*/

        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.productQuantity;
        quantitySpan.style.margin = '0 10px';
        productQuantityCell.appendChild(quantitySpan);

		/*
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('btn', 'btn-sm', 'btn-secondary');
        increaseButton.addEventListener('click', () => updateQuantity(item.productId, 1));
        productQuantityCell.appendChild(increaseButton);
		*/

        row.appendChild(productQuantityCell);

        const removeButtonCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-sm', 'btn-danger');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.addEventListener('click', () => removeItem(item.productId));
        removeButtonCell.appendChild(removeButton);
        row.appendChild(removeButtonCell);

        cartList.appendChild(row);
        totalPrice += item.productPrice * item.productQuantity;
    });

    // Criar a linha de total
    const totalRow = document.createElement('tr');
    const totalCell1 = document.createElement('td');
    totalCell1.textContent = 'Valor total';
    totalCell1.colSpan = 2;
    totalRow.appendChild(totalCell1);

    const totalCell2 = document.createElement('td');
    const totalDisplay = document.createElement('span');
    totalDisplay.id = 'totalDisplay';
    totalDisplay.textContent = `R$ ${totalPrice.toFixed(2)}`;
    totalCell2.appendChild(totalDisplay);
    totalRow.appendChild(totalCell2);

    const totalCell3 = document.createElement('td');
    const couponInput = document.createElement('input');
    couponInput.placeholder = 'Cupom de Desconto';
    couponInput.type = 'text';
    const applyButton = document.createElement('button');
    applyButton.classList.add('btn', 'btn-sm', 'btn-success');
    applyButton.textContent = 'Aplicar';
    applyButton.addEventListener('click', applyCoupon);
    totalCell3.appendChild(couponInput);
    totalCell3.appendChild(applyButton);
    totalRow.appendChild(totalCell3);

    cartList.appendChild(totalRow);

    updateCartCount();
    //updateSidebar(); // Atualiza a sidebar com os itens do carrinho
}

// Função para atualizar a sidebar
function updateSidebar() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.getElementById('cartTotal').textContent = 'R$0,00';
        return;
    }

    // Criar um mapa para consolidar itens por productId
    let itemMap = new Map();

    carrinho.forEach(item => {
        if (itemMap.has(item.productId)) {
            itemMap.get(item.productId).productQuantity += item.productQuantity;
        } else {
            itemMap.set(item.productId, { ...item });
        }
    });

    // Iterar sobre os itens consolidados
    itemMap.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('sidebar-item');

        const productName = document.createElement('p');
        productName.textContent = `${item.productName} (${item.productQuantity})`;
        itemDiv.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = `R$ ${(item.productPrice * item.productQuantity).toFixed(2)}`;
        itemDiv.appendChild(productPrice);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('btn', 'btn-sm', 'btn-danger');
        removeButton.addEventListener('click', () => {
            removeItem(item.productId);
            updateSidebar(); // Atualiza a sidebar após remoção
        });
        itemDiv.appendChild(removeButton);

        cartItems.appendChild(itemDiv);
    });

    document.getElementById('cartTotal').textContent = `R$ ${totalPrice.toFixed(2)}`;
}
  
function applyCoupon() {
    const couponInput = document.querySelector('input[placeholder="Cupom de Desconto"]');
    const couponCode = couponInput.value;
    const totalDisplay = document.getElementById('totalDisplay');
  
    // Lógica para verificar o cupom (substitua por sua lógica de validação)
	if (couponCode === 'KANSAS10%') {
		const discount = 0.1; // 10% de desconto
		const newTotal = totalPrice * (1 - discount);
		totalDisplay.textContent = `R$ ${newTotal.toFixed(2)}`;
	} else if (couponCode === 'KANSAS10') {
		const discount = 10;
		const newTotal = totalPrice - discount;
		totalDisplay.textContent = `R$ ${newTotal.toFixed(2)}`;
	} else {
		alert('Cupom inválido');
	}
}

function updateQuantity(productId, change) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.map(item => {
        if (item.productId === productId) {
            item.productQuantity = Math.max(1, item.productQuantity + change);
        }
        return item;
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    updateCartDisplay();
	//updateSidebar();
}

function removeItem(productId) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.productId !== productId);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    updateCartCount();
    updateCartDisplay();
    //updateSidebar();
    updateButtonState(productId); // Atualizar o botão após remover
}

// Função para atualizar o estado do botão
function updateButtonState(productId) {
    const button = document.getElementById(`button-${productId}`);
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const productIndex = carrinho.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
        // Produto está no carrinho, mostrar "Remover do Carrinho"
        button.textContent = 'Remover do Carrinho';
        button.onclick = () => removeItem(productId);
    } else {
        // Produto não está no carrinho, mostrar "Adicionar ao Carrinho"
        button.textContent = 'Adicionar ao Carrinho';
        button.onclick = () => addToCart(productId);
    }
}

function getButtonData(productId) {
    const button = document.getElementById(`button-${productId}`);
    const productPrice = parseFloat(button.dataset.price);
    const productName = button.dataset.name;
    const productImage = button.dataset.image;

    return { productPrice, productName, productImage };
}

function updateCartCount() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let itemCount = carrinho.reduce((total, item) => total + item.productQuantity, 0);
    document.getElementById('cart-count').textContent = itemCount;
}

  // Function to open the sidebar
  function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
  }

  // Function to close the sidebar
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
  }

  function initializeButtons() {
    const buttons = document.querySelectorAll('[id^="button-"]');

    buttons.forEach(button => {
        const productId = button.id.split('-')[1];
        updateButtonState(productId)
    });
}

document.addEventListener('DOMContentLoaded', () => {
	initializeButtons();
	updateCartCount();
	updateCartDisplay();
});