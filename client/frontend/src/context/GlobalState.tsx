import { State, WindowWithEthereum } from "@/types";
import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/ProductTracking.json";

interface ContextState extends State {
  connectWallet: Function
}
export const StateContext = createContext<ContextState>({
  contract: null,
  provider: null,
  signer: null,
  account: null,
  connectWallet: () => { }
});