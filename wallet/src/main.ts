import "./style.css";
import { ethers } from "ethers";
import WalletArtifact from "../../artifacts/contracts/Wallet.sol/Wallet.json";
import { MetamaskProvider } from "./meta.type";
import { hexZeroPad } from "ethers/lib/utils";

// following that https://hardhat.org/getting-started 

const contractAddress = "the contract address that get from the deploy stage ";
const HARDHAT_NETWORK_ID = "31337";
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
let userAddress = "";
let walletContract: ethers.Contract;
let provider: ethers.providers.Web3Provider;
let membersCount = 0;

// htmlElements

const memberCountHtml = document.getElementById("MemberCount");
const historyListHtml = document.getElementById("historyList");

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
if ((window as any).ethereum === undefined) {
	alert("Please install metamask extension");
}

async function connectWalletAndSetUserAddress() {
	const accounts = await (window as any).ethereum?.request({
		method: "eth_requestAccounts",
	});
	userAddress = accounts[0];
	console.log(userAddress);
}

// (window as any).ethereum.on("chainChanged", (data: any[]) => {
// 	console.log("chainChanged");

// 	console.log(data);
// });

async function initContract() {
	provider = new ethers.providers.Web3Provider((window as any).ethereum);
	walletContract = new ethers.Contract(
		contractAddress,
		WalletArtifact.abi,
		provider.getSigner(0)
	);
	console.log(walletContract);
	return Promise.resolve();
}

async function setMembersCount() {
	const count = await walletContract.allowanceCount();
	membersCount = ethers.BigNumber.from(count).toNumber();
	console.log(membersCount);

	memberCountHtml!.innerHTML = `${membersCount} `;
	memberCountHtml!.innerHTML += membersCount !== 1 ? "Members" : "Member";
}

async function setPollingData() {}

async function listenToEvents() {
	walletContract.on(
		walletContract.filters["AllowanceChange"](),
		(from, to, oldAmount, newAmount) => {
			console.log("AllowanceChange event");
			historyListHtml!.innerHTML += `<li>from:${from.substring(
				28
			)} to: ${to.substring(28)}, amount: ${newAmount}</li>`;

			setMembersCount();

			// console.log(from, to, oldAmount, newAmount);
		}
	);

	walletContract.on(
		walletContract.filters["AllowanceChange"](null, userAddress),
		(from, to, old, a) => {
			console.log(from, to, old, a);
		}
	);
}

await connectWalletAndSetUserAddress();
await initContract();
await setPollingData();
await setMembersCount();
await listenToEvents();
