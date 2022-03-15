const main = async () => {
  // We get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory('Transactions')  // like factory. generates instances of contract
  const transactions = await Transactions.deploy()

  await transactions.deployed()

  console.log('Transactions deployed to:', transactions.address)
}

// Pattern to use async/await everywhere and properly handle errors
const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain(  );