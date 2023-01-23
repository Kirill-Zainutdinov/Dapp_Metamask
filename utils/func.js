const Web3 = require('web3')
const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/R9QqWMg1ORMnOE9RwIaMwwfNVrgBNN4J')

let web3Wallet
let userAddress
let chainId

export const  connectWallet = async() => {
    // проверка, что в браузере установлен клиент эфириума
    if (typeof window.ethereum !== 'undefined') {
        console.log("Ethereum client installed!")
        // проверка, то клиент эфириума - это метамаск
        if(ethereum.isMetaMask === true)
        {
            console.log("Metamask installed!")
            if(ethereum.isConnected() != true){
                console.log("Metamask is not connected!")
                // не подключён - подклчистя
                await ethereum.enable();
                console.log("Metamask connected!")
            }
            else{
                console.log("Metamask connected!")
            }
            // получене аккаунтов
            // метод возвращает массив
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            // но на данный момент, доступен только первый аккаунт из массива
            userAddress = accounts[0]

            // подписываемся на изменение аккаунта
            ethereum.on('accountsChanged', (accounts) => {
                userAddress = accounts[0]
                console.log(`accounts changed to ${userAddress }`)
            })

            // подключаем провайдер через метамаск
            web3Wallet = new Web3(ethereum)
            // получаем id и название цепочки
            chainId = await web3Wallet.eth.net.getId();
            let chain = ""
            if(chainId == 5){
                chain = "goerli."
            }
            else if(chainId == 11155111){
                chain = "sepolia."
            }
            console.log("chain", chain, chainId)
            // возвращаем адрес аккаунта и id цепочки
            return [userAddress, chainId, chain]
        }
        else{
            alert('MetaMask is not installed!')
        }
    }
    else{
        alert('Ethereum client is not installed!')
    }
}

export const sendEther = async(recepient, value) => {

    value = web3Wallet.utils.numberToHex(value)
    let txHash
    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
            from: userAddress,
            to: recepient,
            value: value,
        }]
    })
    .then(hash => {
        txHash = hash
    })
    .catch(console.log)
    return txHash
}



export const getBlock = async (blockNumberOrHash) => {
    return await web3Wallet.eth.getBlock(blockNumberOrHash)
}

export const getTransaction = async (txHash) => {
    return await web3Wallet.eth.getTransaction(txHash)
}