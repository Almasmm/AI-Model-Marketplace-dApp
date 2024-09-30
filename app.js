// Replace with your deployed contract address
const contractAddress = "";

// Replace with your contract's ABI
const contractABI = [];

let web3;
let contract;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    document.getElementById('accountAddress').innerText = accounts[0];
    contract = new web3.eth.Contract(contractABI, contractAddress);
    loadModels();
  } else {
    alert('Please install MetaMask!');
  }
});

document.getElementById('listModelForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('modelName').value;
  const description = document.getElementById('modelDescription').value;
  const price = web3.utils.toWei(document.getElementById('modelPrice').value, 'ether');
  const accounts = await web3.eth.getAccounts();
  contract.methods.listModel(name, description, price).send({ from: accounts[0], gas: 3000000 })
    .on('transactionHash', (hash) => {
      console.log('Transaction sent:', hash);
    })
    .on('receipt', (receipt) => {
      console.log('Transaction confirmed:', receipt);
      alert('Model listed successfully!');
      loadModels();
    })
    .on('error', (error) => {
      console.error(error);
      alert('Error listing model');
    });
});

async function loadModels() {
  const modelsCount = await contract.methods.modelCount().call();
  const modelsList = document.getElementById('modelsList');
  modelsList.innerHTML = '';
  for (let i = 1; i <= modelsCount; i++) {
    const model = await contract.methods.getModelDetails(i).call();
    const modelDiv = document.createElement('div');
    modelDiv.className = 'model';
    modelDiv.innerHTML = `
      <h3>${model.name}</h3>
      <p><strong>Description:</strong> ${model.description}</p>
      <p><strong>Price:</strong> ${web3.utils.fromWei(model.price, 'ether')} ETH</p>
      <p><strong>Creator:</strong> ${model.creator}</p>
      <p><strong>Average Rating:</strong> ${model.averageRating}</p>
      <button onclick="purchaseModel(${model.id})">Purchase</button>
      <button onclick="rateModel(${model.id})">Rate</button>
      <button onclick="viewDetails(${model.id})">View Details</button>
    `;
    modelsList.appendChild(modelDiv);
  }
}
async function purchaseModel(modelId) {
  const accounts = await web3.eth.getAccounts();
  const model = await contract.methods.getModelDetails(modelId).call();
  contract.methods.purchaseModel(modelId).send({ from: accounts[0], value: model.price, gas: 3000000 })
    .on('transactionHash', (hash) => {
      console.log('Transaction sent:', hash);
    })
    .on('receipt', (receipt) => {
      console.log('Transaction confirmed:', receipt);
      alert('Model purchased successfully!');
    })
    .on('error', (error) => {
      console.error(error);
      alert('Error purchasing model');
    });
}
async function rateModel(modelId) {
  const rating = prompt('Enter rating (1-5):');
  if (rating < 1 || rating > 5) {
    alert('Invalid rating');
    return;
  }

  const accounts = await web3.eth.getAccounts();
  contract.methods.rateModel(modelId, rating).send({ from: accounts[0], gas: 3000000 })
    .on('transactionHash', (hash) => {
      console.log('Transaction sent:', hash);
    })
    .on('receipt', (receipt) => {
      console.log('Transaction confirmed:', receipt);
      alert('Model rated successfully!');
    })
    .on('error', (error) => {
      console.error(error);
      alert('Error rating model');
    });
}
async function viewDetails(modelId) {
  const model = await contract.methods.getModelDetails(modelId).call();
  alert(`Model Details:
    ID: ${model.id}
    Name: ${model.name}
    Description: ${model.description}
    Price: ${web3.utils.fromWei(model.price, 'ether')} ETH
    Creator: ${model.creator}
    Average Rating: ${model.averageRating}`);
}

document.getElementById('withdrawButton').addEventListener('click', async () => {
  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods.withdrawFunds().send({ from: accounts[0]});
    alert('Funds withdrawn successfully!');
  } catch (error) {
    console.error('Error withdrawing funds:', error);
    alert('Error withdrawing funds');
  }
});