export const BEE_PAYMENT_ABI = [
  {
    'constant': true,
    'inputs': [],
    'name': 'disputePeriod',
    'outputs': [
      {
        'name': '',
        'type': 'uint64'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'cancelPeriod',
    'outputs': [
      {
        'name': '',
        'type': 'uint64'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'bytes32'
      }
    ],
    'name': 'details',
    'outputs': [
      {
        'name': 'active',
        'type': 'bool'
      },
      {
        'name': 'supplier',
        'type': 'address'
      },
      {
        'name': 'cancelDeadline',
        'type': 'uint64'
      },
      {
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'name': 'disputeDeadline',
        'type': 'uint64'
      },
      {
        'name': 'price',
        'type': 'uint256'
      },
      {
        'name': 'deposit',
        'type': 'uint256'
      },
      {
        'name': 'cancellationFee',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'arbitration',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'token',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'name': '_token',
        'type': 'address'
      },
      {
        'name': '_arbitration',
        'type': 'address'
      },
      {
        'name': '_cancelPeriod',
        'type': 'uint64'
      },
      {
        'name': '_disputePeriod',
        'type': 'uint64'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': 'supplier',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'price',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'deposit',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'cancellationFee',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'cancelDeadline',
        'type': 'uint64'
      },
      {
        'indexed': false,
        'name': 'disputeDeadline',
        'type': 'uint64'
      }
    ],
    'name': 'Invoice',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': 'supplier',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'price',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'deposit',
        'type': 'uint256'
      }
    ],
    'name': 'Payout',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': 'supplier',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'price',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'deposit',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'cancellationFee',
        'type': 'uint256'
      }
    ],
    'name': 'Cancel',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': 'supplier',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'price',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'deposit',
        'type': 'uint256'
      }
    ],
    'name': 'Refund',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': 'arbitration',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'disputant',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'supplier',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'price',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'deposit',
        'type': 'uint256'
      }
    ],
    'name': 'Dispute',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipRenounced',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'id',
        'type': 'bytes32'
      },
      {
        'name': 'supplier',
        'type': 'address'
      },
      {
        'name': 'purchaser',
        'type': 'address'
      },
      {
        'name': 'price',
        'type': 'uint256'
      },
      {
        'name': 'deposit',
        'type': 'uint256'
      },
      {
        'name': 'cancellationFee',
        'type': 'uint256'
      },
      {
        'name': 'cancelDeadline',
        'type': 'uint64'
      },
      {
        'name': 'disputeDeadline',
        'type': 'uint64'
      }
    ],
    'name': 'invoice',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'id',
        'type': 'bytes32'
      }
    ],
    'name': 'cancel',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'id',
        'type': 'bytes32'
      }
    ],
    'name': 'payout',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'id',
        'type': 'bytes32'
      }
    ],
    'name': 'refund',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'id',
        'type': 'bytes32'
      }
    ],
    'name': 'dispute',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];