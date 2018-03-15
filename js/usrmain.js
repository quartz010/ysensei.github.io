
    // var Web3 = require("web3");
    // var web3 = new Web3();   
    // //var provider = ethers.providers.getDefaultProvider();
    // web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));



    // function getCurrentNum() {
    //     contract.getCurrentNumber().then(function (result) {
    //         console.log('CurrentNumber is: ' + result);
    //         $("#current-num").text(result)
    //         var num = 1000-parseInt(result)
    //         $("#remain-num").text(num)
    //         $("#remain-eth-num").text(num*0.001)
    //     });
    // }

    // function getCurrentPeriod() {
    //     contract.getCurrentPeriod().then(function (result) {
    //         console.log('currentPeriod is: ' + result);
    //         $("#current-period").text(result);
    //         getPrizeResult(--result);
    //     });
    // }

    // function getPrizeResult(number) {
    //     contract.getPrizeResult(number).then(function (result) {
    //         console.log('PrizeResult is: ' + result);
    //         $("#prize-num").text(result[1]);
    //         $("#prize-address").text(result[0]);
    //         $("#block-height").text(result[2]);
    //         getTimestamp(parseInt(result[2]));
    //     });
    // }

    function getTimestamp(number) {
        web3.eth.getBlock(number, function(error, block) {
            console.log('blockInfo is: ' + block.timestamp);
            var date = new Date();
            date.setTime(block.timestamp * 1000);
            console.log(date.toLocaleString());
            $("#prize-time").text(date.toLocaleString());
        });
    }

    // 注意web3 的默认的回调格式
    function getBalance() {
        account = web3.eth.getBalance("0x2f7f71a4bc310b77f1d16ed6de3829fc5d4202d0",        
        function(error, result) {
            if(!error){
                console.log(result);
                $("#prize-time").text(result);
            }
            else {
                console.error(error);
            }
        });
        
        
    }
    // getCurrentNum();
    // getCurrentPeriod();

    // 初始化 全局web3
    if (typeof web3 !== 'undefined') { 
        web3 = new Web3(web3.currentProvider); 
    } 
    else { 
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
        console.log("OK");
    }

    // 初始化我们的合约
    var contractAddress = '0x5df65847709bfdbdd1a853f320fa4c30aabd844b';    
    // 注意:这里是直接json格式不是字符串
    var abi = [{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"print","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"say","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"addNum","outputs":[{"name":"r","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"}];
    var contract = web3.eth.contract(abi);
    var contractInstance = contract.at(contractAddress);
    
    // 这里调用合约函数
    console.log(contractInstance.say.call());
    // console.log(web3.eth.accounts);
    // getBalance();
    getTimestamp(2);