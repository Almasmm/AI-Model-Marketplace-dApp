// Replace with your deployed contract address
const contractAddress = "0x62270A4cd96cF6aDdB9385fDdFc366C37F01d715";

// Replace with your contract's ABI
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "listModel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "ModelListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ModelPurchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rater",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "rating",
        type: "uint8",
      },
    ],
    name: "ModelRated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_modelId",
        type: "uint256",
      },
    ],
    name: "purchaseModel",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_modelId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_rating",
        type: "uint8",
      },
    ],
    name: "rateModel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_modelId",
        type: "uint256",
      },
    ],
    name: "getModelDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "averageRating",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "modelCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "models",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalRating",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ratingCount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isPurchased",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "purchases",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

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