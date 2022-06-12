const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Wallet", () => {
	let accounts;

	before(async function () {
		accounts = await ethers.getSigners();
	});

	it("Should deploy with 0 ETH ", async () => {
		const Wallet = ethers.getContractFactory("Wallet");
		const wallet = await (await Wallet).deploy();
		await wallet.deployed();
		const initialBalance = await waffle.provider.getBalance(wallet.address);
		expect(initialBalance).to.equal(0);
	});

	it("Should have correct balance after transaction ", async () => {
		const Wallet = ethers.getContractFactory("Wallet");
		const wallet = await (await Wallet).deploy();
		await wallet.deployed();
		const [ac1] = accounts;
		await ac1.sendTransaction({
			to: wallet.address,
			value: 10,
		});
		const balance = await waffle.provider.getBalance(wallet.address);
		expect(balance).to.equal(ethers.BigNumber.from(10));
	});

	it("Should not authorize withdraw for not authorized", async () => {
		const Wallet = ethers.getContractFactory("Wallet");
		const wallet = await (await Wallet).deploy();
		await wallet.deployed();
		const amount = ethers.BigNumber.from(10);
		const [ac1, ac2] = accounts;
		try {
			await wallet.connect(ac2).withdraw(ac2.address, amount);
			expect.fail("Expect to fails");
		} catch (error) {
			expect(error.message).to.equal(
				"VM Exception while processing transaction: reverted with reason string 'You are not allowed'"
			);
		}
	});

	it("Should add allowance ", async () => {
		const Wallet = ethers.getContractFactory("Wallet");
		const wallet = await (await Wallet).deploy();
		await wallet.deployed();
		const amount = ethers.BigNumber.from(1);
		const [ac1, ac2] = accounts;
		await wallet.addAllowance(ac2.address, amount);
		const allowanceAmount = await wallet.allowance(ac2.address);
		expect(amount).to.equal(allowanceAmount);
	});

	it("should withdraw for authorized ", async () => {
		const Wallet = ethers.getContractFactory("Wallet");
		const wallet = await (await Wallet).deploy();
		await wallet.deployed();
		const amount = ethers.BigNumber.from(1);
		const [ac1, ac3] = accounts;
		await ac1.sendTransaction({
			to: wallet.address,
			value: 1,
		});
		await wallet.addAllowance(ac3.address, amount);
		const oldAc3Balance = await waffle.provider.getBalance(ac3.address);
		const res = await wallet.connect(ac3).withdraw(ac3.address, amount);
		receipt = await res.wait();
		const newAc2balance = await waffle.provider.getBalance(ac3.address);
		expect(newAc2balance.add(receipt.gasUsed.mul(receipt.effectiveGasPrice))).to.equal(oldAc3Balance.add(amount));
	});
});
