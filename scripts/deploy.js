async function main() {
  const [organiser] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", organiser.address);


  EventOrganization = await ethers.getContractFactory("EventOrganization");
  eventorg = await EventOrganization.deploy();
  await eventorg.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });