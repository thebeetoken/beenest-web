export const ETH_PAYMENT_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "paymentId",
        "type": "bytes32"
      }
    ],
    "name": "dispatchPayment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "paymentId",
        "type": "bytes32"
      },
      {
        "name": "demandEntityAddress",
        "type": "address"
      },
      {
        "name": "supplyEntityAddress",
        "type": "address"
      },
      {
        "name": "cost",
        "type": "uint256"
      },
      {
        "name": "securityDeposit",
        "type": "uint256"
      },
      {
        "name": "demandCancellationFee",
        "type": "uint256"
      },
      {
        "name": "supplyCancellationFee",
        "type": "uint256"
      },
      {
        "name": "cancelDeadlineInS",
        "type": "uint64"
      },
      {
        "name": "paymentDispatchTimeInS",
        "type": "uint64"
      },
      {
        "name": "transactionFee",
        "type": "uint256"
      }
    ],
    "name": "initAndPayEthPayment",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "arbitrationFee",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "arbitrationFee_",
        "type": "uint256"
      }
    ],
    "name": "updateArbitrationFee",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "paymentDeadlines",
    "outputs": [
      {
        "name": "",
        "type": "uint64"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "arbitrationAddress_",
        "type": "address"
      }
    ],
    "name": "updateArbitrationAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "arbitrationAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "paymentId",
        "type": "bytes32[]"
      }
    ],
    "name": "dispatchPayments",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "paymentId",
        "type": "bytes32"
      }
    ],
    "name": "pay",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "paymentId",
        "type": "bytes32"
      }
    ],
    "name": "disputePayment",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "paymentId",
        "type": "bytes32"
      }
    ],
    "name": "cancelPayment",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "allPayments",
    "outputs": [
      {
        "name": "exist",
        "type": "bool"
      },
      {
        "name": "paymentStatus",
        "type": "uint8"
      },
      {
        "name": "paymentId",
        "type": "bytes32"
      },
      {
        "name": "demandEntityAddress",
        "type": "address"
      },
      {
        "name": "supplyEntityAddress",
        "type": "address"
      },
      {
        "name": "cost",
        "type": "uint256"
      },
      {
        "name": "securityDeposit",
        "type": "uint256"
      },
      {
        "name": "demandCancellationFee",
        "type": "uint256"
      },
      {
        "name": "supplyCancellationFee",
        "type": "uint256"
      },
      {
        "name": "cancelDeadlineInS",
        "type": "uint64"
      },
      {
        "name": "paymentDispatchTimeInS",
        "type": "uint64"
      },
      {
        "name": "transactionFee",
        "type": "uint256"
      },
      {
        "name": "demandPaid",
        "type": "bool"
      },
      {
        "name": "supplyPaid",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arbitrationAddress_",
        "type": "address"
      },
      {
        "name": "arbitrationFee_",
        "type": "uint256"
      },
      {
        "name": "txFeeAddress_",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "paid",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Pay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "paymentId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "CancelPayment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "paymentId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DisputePayment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  }
];
