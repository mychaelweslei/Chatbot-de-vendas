// Variáveis globais
let carrinho = [];
let total = 0;
let clienteNome = "";
let delivery = false;

// 🔷 Catálogo interno — copie e cole aqui quando quiser atualizar
const textoCatalogo = `
Pão de Mel Sem Glúten,15
Torta Salgada Sem Glúten,30
Biscoito de Polvilho Sem Glúten,10
Pão Sem Glúten,18
Pizza Sem Glúten,40
Bolinho de Queijo Sem Glúten,12
Coxinha Sem Glúten,8
Bolo de Laranja Sem Glúten,25
Torta de Maçã Sem Glúten,35
Pão de Queijo Sem Glúten,20
Brownie Sem Glúten,16
Cupcake Sem Glúten,14
Empada Sem Glúten,11
Cookies Sem Glúten,13
Croissant Sem Glúten,22
Panetone Sem Glúten,38
Quiche Sem Glúten,27
Esfiha Sem Glúten,9
Chipa Sem Glúten,7
Donuts Sem Glúten,19
`;

// 🔷 Converte o texto acima em catálogo interno
const catalogoProdutos = textoCatalogo.trim().split("\n").map(linha => {
  const [nome, preco] = linha.split(",");
  return { nome: nome.trim(), preco: parseFloat(preco) };
});

// 🔷 Renderiza o catálogo no HTML
function renderizarCatalogo() {
  const container = document.getElementById("catalogoProdutos");
  container.innerHTML = ""; // limpa produtos atuais

  catalogoProdutos.forEach(produto => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <span class="product-name">${produto.nome}</span>
      <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
      <button class="add-btn" onclick="adicionarCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
    `;
    container.appendChild(div);
  });
}

// Função para confirmar o nome e mostrar o catálogo
function confirmarNome() {
  const inputNome = document.getElementById("userNameInput").value.trim();
  if (inputNome === "") {
    alert("Por favor, digite seu nome para continuar.");
    return;
  }

  clienteNome = inputNome;

  document.querySelector(".chat-message").style.display = "none";
  document.getElementById("saudacaoPersonalizada").style.display = "block";
  document.getElementById("catalogoProdutos").style.display = "block";
  document.getElementById("userName").textContent = clienteNome;

  renderizarCatalogo();
  atualizarCarrinho();
}

// Adiciona item ao carrinho
function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
}

// Atualiza o conteúdo do carrinho
function atualizarCarrinho() {
  const cartContent = document.getElementById("cartContent");
  if (carrinho.length === 0) {
    cartContent.innerHTML = `<p>${clienteNome || "Cliente"}, seu carrinho está vazio.</p>`;
    return;
  }

  let html = "<ul>";
  carrinho.forEach((item, index) => {
    html += `<li>${item.nome} - R$ ${item.preco.toFixed(2)}
              <button onclick="removerItem(${index})">Remover</button></li>`;
  });
  html += "</ul>";

  if (delivery) {
    html += `<p>💡 Taxa de Delivery: R$ 5,00</p>`;
    html += `<p><strong>Total: R$ ${(total + 5).toFixed(2)}</strong></p>`;
  } else {
    html += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
  }

  cartContent.innerHTML = html;
}

// Remove item do carrinho
function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Escolher forma de pagamento
function escolherPagamento() {
  if (carrinho.length === 0) {
    alert(`${clienteNome}, adicione pelo menos um produto ao carrinho antes.`);
    return;
  }

  const querDelivery = confirm(`${clienteNome}, você quer que a entrega seja por Delivery? (+R$ 5,00)`);
  delivery = querDelivery;

  atualizarCarrinho();

  const forma = prompt(
    `${clienteNome}, escolha a forma de pagamento:\nPix\nDébito\nCrédito`
  );

  if (!forma) return;

  const formaLimpa = forma.trim().toLowerCase();
  if (
    ["pix", "débito", "debito", "crédito", "credito"].includes(formaLimpa)
  ) {
    let valorFinal = delivery ? total + 5 : total;

    alert(
      `Obrigado, ${clienteNome}!\nTotal: R$ ${valorFinal.toFixed(
        2
      )}\nForma de pagamento: ${forma}\nEntrega: ${
        delivery ? "Delivery" : "Retirada no balcão"
      }`
    );
    resetarTudo();
  } else {
    alert(`${clienteNome}, forma de pagamento inválida. Tente novamente.`);
  }
}

// Voltar
function voltarMenu() {
  if (confirm(`${clienteNome || "Cliente"}, deseja mesmo voltar e esvaziar o carrinho?`)) {
    resetarTudo();
  }
}

// Reseta tudo
function resetarTudo() {
  carrinho = [];
  total = 0;
  clienteNome = "";
  delivery = false;

  document.querySelector(".chat-message").style.display = "block";
  document.getElementById("saudacaoPersonalizada").style.display = "none";
  document.getElementById("catalogoProdutos").style.display = "none";

  document.getElementById("userNameInput").value = "";
  document.getElementById("cartContent").innerHTML =
    "<p>Seu carrinho está vazio.</p>";
}
