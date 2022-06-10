const { artifacts, assert, web3 } = require("hardhat");

const Wallet = artifacts.require("Wallet");

describe("Wallet", () => {
	let accounts;

	before(async function () {
		accounts = await web3.eth.getAccounts();
	});

	it("Should deploy with 0 ETH ", async () => {
		const wallet = await Wallet.new();
		const [ac1, ac2] = accounts;
		const initialBalance = await web3.eth.getBalance(wallet.address);
		assert.equal(initialBalance, 0);
	});

	it("Should have correct balance after transaction ", async () => {
		const wallet = await Wallet.new();
		const [ac1] = accounts;
		await web3.eth.sendTransaction({
			from: ac1,
			to: wallet.address,
			value: web3.utils.toWei(web3.utils.toBN(10), "ether"),
		});
		const balance = await web3.eth.getBalance(wallet.address);
		assert.equal(balance, web3.utils.toWei(web3.utils.toBN(10), "ether"));
	});

	it("Should not authorize withdraw for not authorized", async () => {
		const wallet = await Wallet.new();
		const amount = web3.utils.toWei(web3.utils.toBN(10));
		const [ac1, ac2] = accounts;
		try {
			await wallet.withdraw(ac2, amount, { from: ac2 });
			assert.fail("Expected throw not received");
		} catch (error) {
			assert.equal(
				error.message,
				"VM Exception while processing transaction: reverted with reason string 'You are not allowed'"
			);
		}
	});

	it("Should add allowance ", async () => {
		const wallet = await Wallet.new();
		const amount = web3.utils.toWei(web3.utils.toBN(1));
		const [ac1, ac2] = accounts;
		await wallet.addAllowance(ac2, amount);
		const allowanceAmount = await wallet.allowance(ac2);
		assert.equal(amount.toString(), allowanceAmount);
	});

	it("should withdraw for authorized ", async () => {
        const wallet = await Wallet.new();
		const amount = web3.utils.toWei(web3.utils.toBN(1), "wei");
		const [ac1, ac2] = accounts;
        await web3.eth.sendTransaction({
			from: ac1,
			to: wallet.address,
			value: web3.utils.toWei(web3.utils.toBN(1), "wei"),
		});
		await wallet.addAllowance(ac2, amount);
        const oldAc2Balance = await web3.eth.getBalance(ac2);
        console.log(oldAc2Balance)
        await wallet.withdraw(ac2,amount);
        const newAc2balance = await web3.eth.getBalance(ac2);
        console.log(newAc2balance)
        assert.equal(+newAc2balance, +oldAc2Balance + 1)

    });
});
