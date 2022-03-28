// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable {

    uint public constant ARTWORK = 0;
    uint public constant PHOTO = 1;

    constructor() ERC1155("") {
        _mint(msg.sender, ARTWORK, 1, "");
        _mint(msg.sender, PHOTO, 2, "");
    }

    function mint(address account, uint id, uint amount) public onlyOwner {
        _mint(account, id, amount, "");
    }

    function burn(address account, uint id, uint amount) public {
        require(msg.sender == account);
        _burn(account, id, amount);
    }
}
