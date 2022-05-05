// https://eth-ropsten.alchemyapi.io/v2/8pv6x8949uUuoxfQSfdzzjOYI6ySwzmG

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/8pv6x8949uUuoxfQSfdzzjOYI6ySwzmG",
      accounts: [
        "2b5ec8a5897d65df29dbffa2d405d4106432f7b09d6f5d4f29ef3c895447146c"
      ]
    }
  }
}