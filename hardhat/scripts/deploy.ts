// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Lib = await ethers.getContractFactory("PalettesLib")
  const lib = await Lib.deploy()
  const Palettes = await ethers.getContractFactory(
    "Palettes",
    {
      libraries: {
        PalettesLib: lib.address,
      },
    },
  )
  const palettes = await Palettes.deploy()
  await palettes.deployed()

  console.log("RGBAx8 deployed to:  ", lib.address)
  console.log("Palettes deployed to:", palettes.address)

  const yellow  = "#B58900FF"
  const orange  = "#CB4B16FF"
  const red     = "#DC322FFF"
  const magenta = "#D33682FF"
  const violet  = "#6C71C4FF"
  const blue    = "#268BD2FF"
  const cyan    = "#2AA198FF"
  const green   = "#859900FF"

  const solarizedAccents = [
    yellow,
    orange,
    red,
    magenta,
    violet,
    blue,
    cyan,
    green,
  ]

  const accentsId = ["0x", ...solarizedAccents].join("").replace(/#/gi, "")

  const base03 = "#002B36FF"
  const base02 = "#073642FF"
  const base01 = "#586E75FF"
  const base00 = "#657B83FF"
  const base0  = "#839496FF"
  const base1  = "#93A1A1FF"
  const base2  = "#EEE8D5FF"
  const base3  = "#FDF6E3FF"

  const solarizedBases = [
    base03,
    base02,
    base01,
    base00,
    base0,
    base1,
    base2,
    base3,
  ]

  const basesId = ["0x", ...solarizedBases].join("").replace(/#/gi, "")

  await palettes.claim(basesId)
  await palettes.claim(accentsId)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});
