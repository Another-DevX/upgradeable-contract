import { ethers, defender } from 'hardhat';

async function main() {
  // const utils = await deployUtils();
  const ReFiMedLendUpgradeable = await ethers.getContractFactory(
    'ReFiMedLendUpgradeable',
    {
      libraries: {
        LendManagerUtils: '0xa7763537F4C1F321C31AaAc2a2e3b5c674f568D2',
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
      '0x5Fb7b1c3CC471Dd1D0008cabB9d005Daad9bA58e',
      upgradeApprovalProcess.address,
      '0x302E2A0D4291ac14Aa1160504cA45A0A1F2E7a5c',
    ],
    { initializer: 'initialize' }
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
