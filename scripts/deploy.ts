import { ethers, defender } from 'hardhat';

async function main() {
  // const utils = await deployUtils();
  const ReFiMedLendUpgradeable = await ethers.getContractFactory(
    'ReFiMedLendUpgradeable',
    {
      libraries: {
        LendManagerUtils: '0xb395Eb9A7F4f99BD235c6B53f83f18B4d3B7e8D6',
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
