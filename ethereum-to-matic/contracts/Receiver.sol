// SPDX-License-Identifier: MIT

pragma solidity ^0.5.11;

interface IStateReceiver {
    function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract Receiver {

    uint public lastStateId;
    bytes public lastChildData;

    function onStateReceive(uint256 stateId, bytes calldata data) external {
        lastStateId = stateId;
        lastChildData = data;
    }
}