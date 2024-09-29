// Replace with your deployed contract address
const contractAddress = "0x421ed83031559cD5387cC3F7074C83cBcF7e3D52";

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
    }
];

// Initialize Web3
if (typeof window.ethereum !== "undefined") {
  window.web3 = new Web3(window.ethereum);
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      window.account = accounts[0];
      document.getElementById("accountAddress").innerText = window.account;
      initContract();
    })
    .catch((error) => {
      console.error("User denied account access", error);
    });
} else {
  alert("Please install MetaMask to use this dApp!");
}

let contract;

function initContract() {
  contract = new web3.eth.Contract(contractABI, contractAddress);
  loadModels();
}

// List Model Form Submission
document
  .getElementById("listModelForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("modelName").value;
    const description = document.getElementById("modelDescription").value;
    const priceEth = document.getElementById("modelPrice").value;
		const priceWei = web3.utils.toWei(priceEth, "ether"); // "100000000000000000"

    try {
      await contract.methods
  		.listModel(name, description, priceWei)
  		.send({ from: window.account, gas: 300000});
      alert("Model listed successfully!");
      loadModels();
    } catch (error) {
      console.error(error);
      alert("Error listing model");
    }
  });

// Load Models
async function loadModels() {
  const modelsCount = await contract.methods.modelCount().call();
  const modelsList = document.getElementById("modelsList");
  modelsList.innerHTML = "";

  for (let i = 1; i <= modelsCount; i++) {
    const model = await contract.methods.getModelDetails(i).call();
    const modelDiv = document.createElement("div");
    modelDiv.className = "model";
    modelDiv.innerHTML = `
            <h3>${model.name}</h3>
            <p><strong>Description:</strong> ${model.description}</p>
            <p><strong>Price:</strong> ${web3.utils.fromWei(
              model.price,
              "ether"
            )} ETH</p>
            <p><strong>Creator:</strong> ${model.creator}</p>
            <p><strong>Average Rating:</strong> ${model.averageRating}</p>
            <button onclick="purchaseModel(${model.id})">Purchase</button>
            <button onclick="rateModel(${model.id})">Rate</button>
            <button onclick="viewDetails(${model.id})">View Details</button>
        `;
    modelsList.appendChild(modelDiv);
  }
}

// Purchase Model
async function purchaseModel(modelId) {
  try {
    const model = await contract.methods.getModelDetails(modelId).call();
    const price = model.price;

    await contract.methods
      .purchaseModel(modelId)
      .send({ from: window.account, value: price, gas: 300000});
    alert("Model purchased successfully!");
  } catch (error) {
    console.error(error);
    alert("Error purchasing model");
  }
}

// Rate Model
async function rateModel(modelId) {
  const rating = prompt("Enter rating (1-5):");
  if (rating < 1 || rating > 5) {
    alert("Invalid rating");
    return;
  }

  try {
    await contract.methods
      .rateModel(modelId, rating)
      .send({ from: window.account, gas: 300000});
    alert("Model rated successfully!");
  } catch (error) {
    console.error(error);
    alert("Error rating model");
  }
}

// View Model Details
async function viewDetails(modelId) {
  const model = await contract.methods.getModelDetails(modelId).call();
  alert(`Model Details:
    ID: ${model.id}
    Name: ${model.name}
    Description: ${model.description}
    Price: ${web3.utils.fromWei(model.price, "ether")} ETH
    Creator: ${model.creator}
    Average Rating: ${model.averageRating}`);
}

// Withdraw Funds (for contract owner)
async function withdrawFunds() {
  try {
    await contract.methods.withdrawFunds().send({ from: window.account, gas: 300000});
    alert("Funds withdrawn successfully!");
  } catch (error) {
    console.error(error);
    alert("Error withdrawing funds");
  }
}
