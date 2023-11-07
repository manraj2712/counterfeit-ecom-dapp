"use client";
import { State, WindowWithEthereum } from "@/types";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/ProductTracking.json";
import { StateContext } from "@/context/GlobalState";
import { toast } from "react-toastify";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const contractABI = abi.abi;

export default function StateContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({
    contract: null,
    provider: null,
    signer: null,
    account: null
  });

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {

    if (state.provider && state.signer && state.contract) {
      return;
    }
    try {
      const { ethereum } = window as WindowWithEthereum;

      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        ethereum.on("accountsChanged", (accounts: any) => {
          window.location.reload();
          console.log(accounts);
        });

        ethereum.on("chainChanged", (chainId: any) => {
          console.log(chainId === "0xaa36a7" ? "sepolia" : "other");

          if (chainId === "0xaa36a7") {
            window.location.reload();
          }
          else {
            toast.error('🦄 Switch to Sepolia Test Net!', {
              pauseOnHover: true,
              draggable: true,
            });
          }
        });
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract, account: (accounts as Array<string>)[0] });
      } else {
        console.log("Please install MetaMask!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider value={
      { connectWallet, ...state }
    }>
      {children}
    </StateContext.Provider>
  );
}