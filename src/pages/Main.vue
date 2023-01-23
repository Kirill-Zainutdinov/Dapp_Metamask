<template>
    <div class="main elem">
      <button class="btn" @click="initMetamask">Подключить метамаск</button>
      <div class="mt">Адрес юзера: {{userAddress}}</div>
      <div class="mt">id цепи: {{chainId}}</div>
    </div>
    

    <div class="main elem">
      <div>
        <input class="input mt" v-model="recepient" placeholder="Введите адрес на который хотите отправить эфир">
      </div>
      <div>
        <input class="input mt" v-model="value" placeholder="Введите сколько эфира вы хотите отправить">
      </div>
      <div>
        <button class="btn" @click="sendEther">Отправить эфир</button>
      </div>
      <div id="refTx" class="mt2 hide">
        <a class="btn" v-bind:href="url"> Посмотреть транзакцию на Etherscan </a>
      </div>
    </div>
</template>

<script>
import { 
  connectWallet,
  sendEther,
} from "../../utils/func"
export default{
  data(){
    return{
      userAddress: "",
      chainId: "",
      chain: "",
      recepient: "",
      value: "",
      txHash: "",
      url: "https://www.mozilla.org/ru/"
    }
  },
  methods:{
    async initMetamask(){
      [this.userAddress, this.chainId, this.chain] = await connectWallet()
    },
    async sendEther(){
      this.txHash = await sendEther(this.recepient, this.value)
      this.recepient = ""
      this.value = ""
      this.url = "https://" + this.chain + "etherscan.io/tx/" + this.txHash
      if(refTx.classList.contains("hide")){
        refTx.classList.remove("hide")
      }
    }
  }
}
</script>


<style>
.main{
  margin-top: 20px;
}
.input{
  width: 350px;
}
.mt{
  margin-top: 5px;
}
.mt2{
  margin-top: 15px;
}
.btn{
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 2px solid teal;
    margin-top: 5px;
}
.hide{
  visibility: hidden;
  transition: all ease 0.8s;
}
.elem{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
</style>

