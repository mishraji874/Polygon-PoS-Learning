// SPDX-License-Identifier: MIT

pragma solidity ^0.5.11;

contract IStateSender {
    function asyncState(address receiver, bytes calldata data) external;
    function register(address sender, address receiver) public;
}

contract Sender {
    address public stateSenderContract = 0xEAa852323826C71cd7920C3b4c007184234c3945;
    address public receiver = 0x83bB46B64b311c89bEF813A534291e155459579e;

    uint public states = 0;

    function sendState(bytes calldata data) external {
        states = states + 1;
        IStateSender(stateSenderContract).asyncState(receiver, data);
    }
}