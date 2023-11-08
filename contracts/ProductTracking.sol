// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ProductTracking {
    struct Product {
        string id;
        string name;
        address manufacturer;
        string manufacturerName;
        address distributor;
        string distributorName;
        address retailer;
        string retailerName;
        address customer;
        string status;
        uint timestamp;
        uint price;
    }

    mapping(string => Product) public products;
    Product[] Products;

    event ProductStatusUpdated(string id, address actor, string status, uint timestamp);
    event PaymentSent(address from, address to, uint amount);

    modifier onlyManufacturer(string memory id) {
        require(msg.sender == products[id].manufacturer, "Only the manufacturer can perform this action");
        _;
    }

    modifier onlyDistributor(string memory id) {
        require(msg.sender == products[id].distributor, "Only the distributor can perform this action");
        _;
    }

    modifier onlyRetailer(string memory id) {
        require(msg.sender == products[id].retailer, "Only the retailer can perform this action");
        _;
    }

    modifier onlyCustomer(string memory id) {
        require(msg.sender == products[id].customer, "Only the customer can perform this action");
        _;
    }


    function getAllProducts() public view returns(Product[] memory){
        return Products;
    }

    function addProduct(string memory id, string memory name, string memory manufacturerName, uint price) public {
        require(bytes(products[id].id).length == 0, "Product with this unique identifier already exists");

        Product memory newProduct = Product({
            name: name,
            id: id,
            manufacturer: msg.sender,
            manufacturerName: manufacturerName,
            distributor: address(0),
            distributorName: "",
            retailerName: "",
            retailer: address(0),
            customer: address(0),
            status: "Manufactured",
            timestamp: block.timestamp,
            price: price
        });

        products[id] = newProduct;
        Products.push(newProduct);

        emit ProductStatusUpdated(id, msg.sender, "Manufactured", block.timestamp);

    }

    function setDistributor(string memory distributorName, string memory id, address distributorAdd) public onlyManufacturer(id){
        products[id].distributor = distributorAdd;
        products[id].distributorName = distributorName;

        updateProductStatus(id, "Assigned to Distributor");
    }
    function setRetailer(string memory retailerName, string memory id, address retailerAdd) public onlyDistributor(id){
        products[id].retailer = retailerAdd;
        products[id].retailerName = retailerName;

        updateProductStatus(id, "Assigned to Retailer");
    }

    function updateProductStatus(string memory id, string memory status) internal {
        require(bytes(products[id].id).length > 0, "Product with this unique identifier does not exist");
        Product storage product = products[id];

        require(keccak256(abi.encodePacked(status)) != keccak256(abi.encodePacked(product.status)), "New status must be different from the current status");

        product.status = status;
        product.timestamp = block.timestamp;

        emit ProductStatusUpdated(id, msg.sender, status, block.timestamp);
    }

    function purchaseDistributor(string memory id) public payable onlyDistributor(id) {
        Product storage product = products[id];
        require(keccak256(abi.encodePacked(product.status)) == keccak256(abi.encodePacked("Assigned to Distributor")), "Product must be in 'Manufactured' to send to distributor");

        uint price = product.price;
        require(msg.value > price, "Insufficient payment");

        address payable manufacturer = payable(product.manufacturer);
        manufacturer.transfer(price * (0.01 ether));

        updateProductStatus(id, "Sold to Distributor");
        emit PaymentSent(msg.sender, manufacturer, price);
    }

    function purchaseRetailer(string memory id) public payable onlyRetailer(id) {
        Product storage product = products[id];
        require(keccak256(abi.encodePacked(product.status)) == keccak256(abi.encodePacked("Assigned to Retailer")), "Product must be in 'Assigned to Retailer' to send to retailer");

        uint price = product.price ;
        require(msg.value > price, "Insufficient payment");

        address payable distributor = payable(product.distributor);
        distributor.transfer(price * (0.01 ether));

        updateProductStatus(id, "Sold to Retailer");

        emit PaymentSent(msg.sender, distributor, price);
    }

    function purchaseCustomer(string memory id) public payable {
        Product storage product = products[id];
        require(keccak256(abi.encodePacked(product.status)) == keccak256(abi.encodePacked("Sold to Retailer")), "Product must be in 'Sold to Retailer' to buy");

        uint price = product.price;
        require(msg.value > price, "Insufficient payment");

        address payable retailer = payable(product.retailer);
        retailer.transfer(price * (0.01 ether));

        product.customer = msg.sender;
        updateProductStatus(id, "Sold to Customer");

        emit PaymentSent(msg.sender, retailer, price);
    }

    function findProductsForManufacturer() public view returns (Product[] memory) {
        Product[] memory manufacturerProducts = new Product[](Products.length);
        uint productCount = 0;
        
        for (uint i = 0; i < Products.length; i++) {
            if (products[Products[i].id].manufacturer == msg.sender) {
                manufacturerProducts[productCount] = products[Products[i].id];
                productCount++;
            }
        }
        
        assembly {
            mstore(manufacturerProducts, productCount)
        }

        return manufacturerProducts;
    }

    function findProductsForDistributor() public view returns (Product[] memory) {
        Product[] memory distributorProducts = new Product[](Products.length);
        uint productCount = 0;

        for (uint i = 0; i < Products.length; i++) {
            if (products[Products[i].id].distributor == msg.sender) {
                distributorProducts[productCount] = products[Products[i].id];
                productCount++;
            }
        }

        // Resize the distributorProducts array to the exact size
        assembly {
            mstore(distributorProducts, productCount)
        }

        return distributorProducts;
    }



    function findProductsForRetailer() public view returns (Product[] memory) {
        Product[] memory retailerProducts = new Product[](Products.length);
        uint productCount = 0;

        for (uint i = 0; i < Products.length; i++) {
            if (products[Products[i].id].retailer == msg.sender) {
                retailerProducts[productCount] = products[Products[i].id];
                productCount++;
            }
        }

        assembly {
            mstore(retailerProducts, productCount)
        }

        return retailerProducts;
    }

    function findProductsForCustomer() public view returns (Product[] memory) {
        Product[] memory customerProducts = new Product[](Products.length);
        uint productCount = 0;

        for (uint i = 0; i < Products.length; i++) {
            if (products[Products[i].id].customer == msg.sender) {
                customerProducts[productCount] = products[Products[i].id];
                productCount++;
            }
        }

        assembly {
            mstore(customerProducts, productCount)
        }

        return customerProducts;
    }

    function findProductsByStatus(string memory status) public view returns (Product[] memory) {
        Product[] memory matchingProducts = new Product[](Products.length);
        uint productCount = 0;
        
        for (uint i = 0; i < Products.length; i++) {
            if (keccak256(abi.encodePacked(products[Products[i].id].status)) == keccak256(abi.encodePacked(status))) {
                matchingProducts[productCount] = products[Products[i].id];
                productCount++;
            }
        }
        
        // Resize the matchingProducts array to the exact size
        assembly {
            mstore(matchingProducts, productCount)
        }

        return matchingProducts;
    }

    function findProductsAssignedToDistributorOrRetailer(bool isDistributor) public view returns (Product[] memory) {
        Product[] memory assignedProducts = new Product[](Products.length);
        uint productCount = 0;

        for (uint i = 0; i < Products.length; i++) {
            Product storage product = products[Products[i].id];

            // Check if the product is assigned to a distributor or retailer and the caller is that distributor or retailer
            bool isAssignedToActor = (isDistributor && product.distributor == msg.sender) || (!isDistributor && product.retailer == msg.sender);
            if (isAssignedToActor && (keccak256(abi.encodePacked(product.status)) == keccak256(abi.encodePacked("Assigned to Distributor")) || keccak256(abi.encodePacked(product.status)) == keccak256(abi.encodePacked("Assigned to Retailer")))) {
                assignedProducts[productCount] = product;
                productCount++;
            }
        }

        // Resize the assignedProducts array to the exact size
        assembly {
            mstore(assignedProducts, productCount)
        }

        return assignedProducts;
    }
}