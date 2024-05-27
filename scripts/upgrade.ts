import { ethers, upgrades,defender } from 'hardhat';

async function main() {
  const ReFiMedLendUpgradeable = await ethers.getContractFactory(
    'ReFiMedLendUpgradeable',
    {
      libraries: {
        LendManagerUtils: '0xc0a81809db36BbdF3AA8aDf91AfD965160A9cb57',
      },
    }
  );
  const proxyAddress = '0x505E65f7D854d4a564b5486d59c91E1DfE627579';
  // await upgrades.forceImport(proxyAddress, ReFiMedLendUpgradeable);
  console.log('Proxy registrado en:', proxyAddress);
  const proposal = await defender.proposeUpgradeWithApproval(
    proxyAddress,
    ReFiMedLendUpgradeable
  );

  console.log(`Upgrade proposed with URL: ${proposal.url}`);

  const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
