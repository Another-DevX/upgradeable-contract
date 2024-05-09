import { ethers, defender } from 'hardhat';

async function main() {
  const LendManagerUtils = await ethers.getContractFactory('LendManagerUtils'); // Reemplaza con el nombre real del contrato de la biblioteca

  // Despliega la biblioteca Utils
  const utils = await LendManagerUtils.deploy();

  // Imprime la dirección del contrato desplegado
  console.debug(await utils.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
