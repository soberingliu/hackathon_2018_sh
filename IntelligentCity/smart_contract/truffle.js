
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks:{
        development:{
            gas:4700000,
            gasPrice:200000000000,
            host:"127.0.0.1",
            port:8545,
            network_id:"*",
            // from:"0x147ddb719a1bf39df359a5d7e6a1b533f4a7432c"
            from:"0xf9b32578b4420a36f132db32b56f3831a7cc1804"
        }
    }
};
