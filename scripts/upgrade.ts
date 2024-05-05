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
  const proposal = await defender.proposeUpgradeWithApproval('0x1d05e14deD8f1BF9d8AF0bA78D3864389435Af2f', ReFiMedLendUpgradeable);

  console.log(`Upgrade proposed with URL: ${proposal.url}`);

  const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
