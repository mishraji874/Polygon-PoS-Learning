const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
    apiKey: "YWJeJSVwA7DHkwLJec2uuYP_1OODd6xu",
    network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

async function main() {
    const latestBlock = await alchemy.core.getBlockNumber();
    console.log("The latest block is: ", latestBlock);
}

main()