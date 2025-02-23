import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import { ChipiSDK } from "@chipi-pay/chipi-sdk";


function App() {
  const [wallet, setWallet] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const chipi = new ChipiSDK({
    rpcUrl: `https://starknet-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    apiKey: process.env.AVNU_API_KEY,
    argentClassHash: "0x036078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f",
    contractAddress: "0x05039371eb9f5725bb3012934b8821ff3eb3b48cbdee3a29f798c17e9a641544",
    contractEntryPoint: "get_counter",
    })

  const handleCreateWallet = async () => {
    try {
      console.log("Creating wallet...", chipi);
      const newWallet = await chipi.createWallet("1234");
      setWallet(newWallet);
      console.log("Wallet creado:", newWallet);
    } catch (error) {
      console.error("Error al crear wallet:", error);
    }
  };
  
  const handleSendTransaction = async () => {
    if (!wallet) {
      console.error("No hay wallet disponible");
      return;
    }

    try {
      const transaction = await chipi.transfer({
        pin: "1234",
        wallet: { publicKey: wallet.accountAddress, encryptedPrivateKey: wallet.encryptedPrivateKey },
        contractAddress: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        recipient: "0x7a926aa0753b46bd44e03e7521f1adbd560f50a1c6f12a1ca68f0ee81c2c1fe",
        amount: 1,
        decimals: 18
      });
      
      setTransaction(transaction);
      console.log("Transacción enviada:", transaction);
    } catch (error) {
      console.error("Error al enviar transacción:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleCreateWallet}>Create Wallet</button>
        <button onClick={handleSendTransaction}>Send Transaction</button>
      </header>
    </div>
  );
}

export default App;
