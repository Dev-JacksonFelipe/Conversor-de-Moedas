// Cotação de moedas do dia (serão atualizadas via API).
let USD = 4.87;
let EUR = 5.32;
let GBP = 6.08;
let ARS = 0.0052;
let CAD = 3.65;
let AUD = 3.25;
let JPY = 0.034;
let CNY = 0.71;
let BTC = 250000;
let ETH = 15000;
let PYG = 0.00067;

// Função para buscar cotações atualizadas (API de graça)
async function fetchExchangeRates() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,CAD-BRL,AUD-BRL,JPY-BRL,CNY-BRL,BTC-BRL,ETH-BRL,PYG-BRL');
    const data = await response.json();
    
    USD = parseFloat(data.USDBRL.bid);
    EUR = parseFloat(data.EURBRL.bid);
    GBP = parseFloat(data.GBPBRL.bid);
    ARS = parseFloat(data.ARSBRL.bid);
    CAD = parseFloat(data.CADBRL.bid);
    AUD = parseFloat(data.AUDBRL.bid);
    JPY = parseFloat(data.JPYBRL.bid);
    CNY = parseFloat(data.CNYBRL.bid);
    BTC = parseFloat(data.BTCBRL.bid);
    ETH = parseFloat(data.ETHBRL.bid);
    PYG = parseFloat(data.PYGBRL.bid);
    
    console.log('Cotações atualizadas:', { USD, EUR, GBP, ARS, CAD, AUD, JPY, CNY, BTC, ETH, PYG });
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

// Manipulando o input amount para receber somente números e vírgula/ponto.
amount.addEventListener("input", () => {
  // Remove tudo exceto números, vírgula e ponto
  let value = amount.value.replace(/[^\d.,]/g, "");
  
  // Substitui vírgula por ponto (padrão brasileiro)
  value = value.replace(",", ".");
  
  // Garante apenas um ponto decimal
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }
  
  amount.value = value;
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
    case "ARS":
      convertCurrency(amount.value, ARS, "ARS$");
      break;
    case "CAD":
      convertCurrency(amount.value, CAD, "C$");
      break;
    case "AUD":
      convertCurrency(amount.value, AUD, "A$");
      break;
    case "JPY":
      convertCurrency(amount.value, JPY, "¥");
      break;
    case "CNY":
      convertCurrency(amount.value, CNY, "¥");
      break;
    case "BTC":
      convertCurrency(amount.value, BTC, "₿");
      break;
    case "ETH":
      convertCurrency(amount.value, ETH, "Ξ");
      break;
    case "PYG":
      convertCurrency(amount.value, PYG, "₲");
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
