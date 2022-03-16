const main = async () => {
  // get contract to deploy
  const Transactions = await hre.ethers.getContractFactory('Transactions')  // like factory. generates instances of contract
  const transactions = await Transactions.deploy()

  await transactions.deployed()

  // TODO Remove
  console.log('Transactions deployed to:', transactions.address)
}

// pattern to use async/await everywhere; properly handle errors
const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain();