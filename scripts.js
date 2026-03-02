// Cotação de moedas do dia (serão atualizadas via API).
let USD = 4.87;
let EUR = 5.32;
let GBP = 6.08;

// Função para buscar cotações atualizadas (API de graça)
async function fetchExchangeRates() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL');
    const data = await response.json();
    
    USD = parseFloat(data.USDBRL.bid);
    EUR = parseFloat(data.EURBRL.bid);
    GBP = parseFloat(data.GBPBRL.bid);
    
    console.log('Cotações atualizadas:', { USD, EUR, GBP });
  } catch (error) {
    console.error('Erro ao buscar cotações:', error);
    alert('Não foi possível atualizar as cotações. Usando valores padrão.');
  }
}

// Busca as cotações quando a página carregar
fetchExchangeRates();

// Obtendo os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault();
  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    console.log("entrou na função de conversão");
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Calcula o total
    let total = amount * price;

    if (isNaN(total)) {
      return alert("Por favor, insira um valor válido.");
    }
    total = `${formatCurrencyBRL(total).replace("R$", "")}`;
    result.textContent = `${total} Reais`;

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");

    console.log(error);
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

function formatCurrencyBRL(value) {
  // Converte o valor para o formato de moeda BR.
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
