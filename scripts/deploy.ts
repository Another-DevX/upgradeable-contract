import { ethers, defender } from 'hardhat';

async function main() {
  const ReFiMedLendUpgradeable = await ethers.getContractFactory(
    'ReFiMedLendUpgradeable',
    {
      libraries: {
        Utils: '0xb12FcA821c721dD85875784a6e63F5432B1cb401',
      },
    }
  );

  const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess();

  if (upgradeApprovalProcess.address === undefined) {
    throw new Error(
      `Upgrade approval process with id ${upgradeApprovalProcess.approvalProcessId} has no assigned address`
    );
  }

  console.debug(upgradeApprovalProcess);

  const deployment = await defender.deployProxy(
    ReFiMedLendUpgradeable,
    [
      '0x809C3aca42a603797794dA019C779aE3D2F0e7F8'
    ],
    { initializer: 'initialize'}
  );

  await deployment.waitForDeployment();

  console.log(`Contract deployed to ${await deployment.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
