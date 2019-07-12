module.exports = [{
        name: 'Company',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            businessName: 'string',
            contactNumber: 'string',
            gstin: 'string',
            email: 'string',
            address: 'string',
            state: 'string',
            signature: 'string',
        }
    }, {
        name: 'Customer',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            name: 'string',
            contactNumber: 'string',
            email: 'string',
            billingAddress: 'string',
            gstType: 'string', //Unregistered/Customer , Registered-Regular , Registered-Composite
            state: 'string',
            openingBalance: 'int',
            asOfDate: 'date',
            balanceType: 'string' // To Pay , To Receive
        }
    },
    {
        name: 'TaxRate',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            name: 'string',
            rate: 'int',
            type: 'string',
        }
    }, {
        name: 'TaxGroup',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            name: 'string',
            taxRateList: 'TaxRate[]'
        }
    },
    {
        name: 'Product',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            type: 'string', // Product or Service
            name: 'string',
            itemCode: 'string',
            hsnCode: 'string',
            salePrice: 'int',
            purchasePrice: 'int',
            taxType: 'string', //Inclusive or Exclusive
            taxRate: 'TaxGroup',
            openingStock: 'int',
            stockAsOfDate: 'date',
            price: 'int',
            minStock: 'int',
            location: 'string',
        }
    },
    {
        name: 'BankAccount',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            displayName: 'string',
            bankName: 'string',
            accountNumber: 'string',
            currentBalance: 'string',
            asOfDate: 'date',
        }
    },
    {
        name: 'CashAdjustment',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            adjustmentType: 'string', //Add Cash , Reduce Cash
            amount: 'int',
            adjustmentDate: 'date',
            description: 'string',
        }
    },
    {
        name: 'BankAdjustment',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            BankAccount: 'BankAccount',
            adjustmentType: 'string', // Deposite Money , Withdraw Money , Increase balance , Reduce balance
            amount: 'int',
            adjustmentDate: 'date',
            description: 'string',
        }
    },
    {
        name: 'ExpenseCategory',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            name: 'string',
        }
    },
    {
        name: 'ExpenseItem',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            name: 'string',
            quantity: 'int',
            unitPrice: 'int',
            amount: 'int',
        }
    }, {
        name: "Expense",
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36)
            },
            companyId: 'string',
            category: 'ExpenseCategory',
            itemDetails: 'ExpenseItem[]',
            totalAmount: 'int',
            paymentType: 'string',
            description: 'string',
            timestamp: 'date',
            image: 'string',
        }
    },
    {
        name: 'Quotation',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36),
            },
            companyId: 'string',
            customer: 'Customer',
            refNo: 'string',
            timestamp: 'date',
            totalAmount: 'int',
            itemDetails: 'Product[]',
            stateOfSupply: 'string',
            description: 'string',
            image: 'string',
        }
    }, {
        name: 'LineItem',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36),
            },
            companyId: 'string',
            product: 'Product',
            quantity: 'int',
            rate: 'int',
            subtotal: 'int',
            discount: 'int',
            tax: 'TaxGroup',
            totalAmount: 'int',
        }
    },
    {
        name: 'DeliveryChallan',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36),
            },
            companyId: 'string',
            challanNo: 'string',
            customer: 'Customer',
            dueDate: 'date',
            itemDetails: 'LineItem',
            totalAmount: 'int',
            stateOfSupply: 'string',
            description: 'string',
            image: 'string',
            timestamp: 'date',
        }
    },
    {
        name: 'Sale',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36),
            },
            companyId: 'string',
            invoiceNo: 'string',
            type: 'string', // Credit or Cash,
            customer: 'Customer',
            itemDetails: 'LineItem[]',
            totalAmount: 'int',
            paymentType: 'string', //Cash or Cheque
            stateOfSupply: 'string',
            description: 'string',
            image: 'string',
            timestamp: 'date',
        }
    },
    {
        name: 'Purchase',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36),
            },
            companyId: 'string',
            billNo: 'string',
            date: 'date',
            customer: 'Customer',
            itemDetails: 'LineItem[]',
            totalAmount: 'int',
            paymentType: 'string', //Cash or Cheque
            stateOfSupply: 'string',
            description: 'string',
            image: 'string',
            timestamp: 'date',
        }
    },
    {
        name: 'ChequeTransfer',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
                default: new Date().getTime().toString(36),
            },
            companyId: 'string',
            receivedFrom:'string',
            chequeRefNo:'string',
            chequeAmount:'int',
            transferDate: 'date',
            description:'string',
        }
    }
]