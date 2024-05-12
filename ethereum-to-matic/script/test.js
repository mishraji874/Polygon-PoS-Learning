// test.js

const Web3 = require("web3");
const Network = require("@maticnetwork/meta/network");

const network = new Network("testnet", "mumbai");

const main = new Web3(network.Main.RPC);
const matic = new Web3(network.Matic.RPC);

let privateKey = `0x...`;
matic.eth.accounts.wallet.add(privateKey);
main.eth.accounts.wallet.add(privateKey);

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`;
let receiverABI = ``;
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`;
let senderABI = ``;

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress);
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress);

// data to sync
function getData(string) {
    let data = matic.utils.asciiToHex(string);
    return data;
}

function getString(data) {
    let string = matic.utils.hexToAscii(data);
    return string;
}

// console.log(getData('Sending a state sync! :) '))

async function sendData(data) {
    let r = await sender.methods.sendState(getData(data)).send({
        from: main.eth.accounts.wallet[0].address,
        gas: 8000000,
    });
    console.log("sent data from root, ", r.transactionHash);
}

async function checkSender() {
    let r = await sender.methods.states().call();
    console.log("number of states sent from sender: ", r);
}

async function checkReceiver() {
    let r = await receiver.methods.lastStateId().call();
    let s = await receiver.methods.lastChildData().call();
    console.log("last state id: ", r, "and last data: ", s);
    console.log("interpreted data: ", getString(s));
}

async function test() {
    await sendData("Hello World !");
    await checkSender();
    // add a timeout here to allow time gap for the state to sync
    await checkReceiver();
}

test();
