import { ethers, upgrades, defender } from 'hardhat';

async function main() {
  const ReFiMedLendUpgradeable = await ethers.getContractFactory(
    'ReFiMedLendUpgradeable',
    {
      libraries: {
        LendManagerUtils: '0xa7763537F4C1F321C31AaAc2a2e3b5c674f568D2',
      },
    }
  );
  const proxyAddress = '0x32bb8Fe3DBFe95b5005628f312588eCDc037F75f';
  // await upgrades.forceImport(proxyAddress, ReFiMedLendUpgradeable);
  await upgrades.forceImport(proxyAddress, ReFiMedLendUpgradeable);
  // console.log('Proxy registrado en:', proxyAddress);

  // // Desplegar una nueva implementación del contrato
  // const newImplementation = await upgrades.deployImplementation(ReFiMedLendUpgradeable, {
  //   kind: 'uups' // o 'transparent' dependiendo de tu proxy
  // });
  // console.log('Nueva implementación desplegada en:', newImplementation);


  // console.log('Nueva implementación desplegada en:', newImplementation);
  // await upgrades.forceImport(proxyAddress, ReFiMedLendUpgradeable);
  // console.log('Proxy registrado en:', proxyAddress);

  // // Desplegar una nueva implementación del contrato
  // const newImplementation = await upgrades.deployImplementation(ReFiMedLendUpgradeable, {
  //   kind: 'uups' // o 'transparent' dependiendo de tu proxy
  // });
  // console.log('Nueva implementación desplegada en:', newImplementation);
  // Proponer la actualización usando Defender
  const proposal = await defender.proposeUpgradeWithApproval(proxyAddress, ReFiMedLendUpgradeable);
  console.log(`Upgrade proposed with URL: ${proposal.url}`);

  const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess();
  console.log('Upgrade approval process:', upgradeApprovalProcess);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
