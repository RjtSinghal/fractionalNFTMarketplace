// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract FractionalMarketplace is ERC20, Ownable, ERC20Permit, ERC721Holder, ReentrancyGuard {
    IERC721 public collection;
    uint256 public tokenId;
    bool public initialized = false;
    bool public forSale = false;
    bool public canRedeem = false;
    uint256 public salePrice;

    event Initialized(address collection, uint256 tokenId, uint256 amount);
    event SalePriceSet(uint256 salePrice);
    event Purchased(address buyer);
    event Redeemed(address redeemer, uint256 amount, uint256 etherAmount);

    constructor(address initialOwner) ERC20("MyToken", "MTK") Ownable(initialOwner) ERC20Permit("MyToken") {}

    // Initialize the contract with NFT details
    function initialize(address _collection, uint256 _tokenId, uint256 _amount) external {
        require(!initialized, "Already initialized");
        require(_amount > 0, "Amount must be positive");
        require(_collection != address(0), "Invalid NFT address");

        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, address(this), _tokenId);

        tokenId = _tokenId;
        initialized = true;
        _mint(msg.sender, _amount);

        emit Initialized(_collection, _tokenId, _amount);
    }

    // Set the NFT for sale with a specified price
    function putForSale(uint256 price) external onlyOwner {
        require(initialized, "Contract not initialized");
        require(!forSale, "Already for sale");
        require(price > 0, "Price must be positive");

        salePrice = price;
        forSale = true;

        emit SalePriceSet(price);
    }

    // Purchase the NFT
    function purchase() external payable nonReentrant {
        require(forSale, "Not for sale");
        require(msg.value >= salePrice, "Not enough eth sent");

        collection.transferFrom(address(this), msg.sender, tokenId);

        forSale = false;
        canRedeem = true;

        emit Purchased(msg.sender);
    }

    // Redeem your tokens for a proportional amount of Ether
    function redeem(uint256 _amount) external nonReentrant {
        require(canRedeem, "Can not redeem tokens");
        require(_amount > 0 && balanceOf(msg.sender) >= _amount, "Invalid amount");

        uint256 totalEther = address(this).balance;
        uint256 toRedeem = _amount * totalEther / totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(toRedeem);

        emit Redeemed(msg.sender, _amount, toRedeem);
    }
}
