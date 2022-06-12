// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Wallet {

    event AllowanceChange(address indexed _forWho, address indexed _fromWho, uint256 _oldAmount, uint256 _newAmount);

    address owner;
    mapping (address => uint) allowance;
    address[] public allowanceOwners;
    uint256 public allowanceCount = 0;


    modifier onlyOwnerOrAllowed(uint256 _amount) {
        require(msg.sender == owner || allowance[msg.sender] >= _amount, "You are not allowed" );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed" );
        _;
    }


    constructor() payable {
        owner = msg.sender;
    }

    function getAllowanceCount() external view returns(uint256) {
        return allowanceCount;
    }

    function withdraw(address payable _to, uint256 _amount) public  onlyOwnerOrAllowed(_amount) {
        uint256 budget = address(this).balance;
        assert(budget - _amount < budget);
        if(owner != msg.sender) {
            assert(allowance[_to] - _amount < allowance[_to]);
            emit AllowanceChange(_to, msg.sender, allowance[_to], allowance[_to] - _amount);
            allowance[_to]-=_amount;
        }
         _to.transfer(_amount);
        
    }

    function addAllowance(address _to, uint256 _amount ) public onlyOwner() {
        require(_amount > 0, "amount should be bigger than zero");
        if(allowance[_to] == 0) {
            allowanceCount++;
            allowanceOwners.push(_to);
        }
        emit AllowanceChange(msg.sender, _to, allowance[_to], _amount);
        allowance[_to] = _amount;
    }

     receive() external payable {

    }

    // fallback() external payable {}

}