import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"

/*
SOLARIZED
base03	#002b36
base02	#073642
base01	#586e75
base00	#657b83
base0	#839496
base1	#93a1a1
base2	#eee8d5
base3	#fdf6e3
yellow	#b58900
orange	#cb4b16
red	#dc322f
magenta	#d33682
violet	#6c71c4
blue	#268bd2
cyan	#2aa198
green	#859900
*/

const wantBasesURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjYlIiBoZWlnaHQ9IjUxJSIgc3R5bGU9ImZpbGw6IzAwMkIzNkZGIiAvPjxyZWN0IHg9IjI1JSIgeT0iMCIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MSUiIHN0eWxlPSJmaWxsOiMwNzM2NDJGRiIgLz48cmVjdCB4PSI1MCUiIHk9IjAiIHdpZHRoPSIyNiUiIGhlaWdodD0iNTElIiBzdHlsZT0iZmlsbDojNTg2RTc1RkYiIC8+PHJlY3QgeD0iNzUlIiB5PSIwIiB3aWR0aD0iMjUlIiBoZWlnaHQ9IjUxJSIgc3R5bGU9ImZpbGw6IzY1N0I4M0ZGIiAvPjxyZWN0IHg9IjAiIHk9IjUwJSIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiM4Mzk0OTZGRiIgLz48cmVjdCB4PSIyNSUiIHk9IjUwJSIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiM5M0ExQTFGRiIgLz48cmVjdCB4PSI1MCUiIHk9IjUwJSIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiNFRUU4RDVGRiIgLz48cmVjdCB4PSI3NSUiIHk9IjUwJSIgd2lkdGg9IjI1JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiNGREY2RTNGRiIgLz48L3N2Zz4="

const wantAccentsURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjYlIiBoZWlnaHQ9IjUxJSIgc3R5bGU9ImZpbGw6I0I1ODkwMEZGIiAvPjxyZWN0IHg9IjI1JSIgeT0iMCIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MSUiIHN0eWxlPSJmaWxsOiNDQjRCMTZGRiIgLz48cmVjdCB4PSI1MCUiIHk9IjAiIHdpZHRoPSIyNiUiIGhlaWdodD0iNTElIiBzdHlsZT0iZmlsbDojREMzMjJGRkYiIC8+PHJlY3QgeD0iNzUlIiB5PSIwIiB3aWR0aD0iMjUlIiBoZWlnaHQ9IjUxJSIgc3R5bGU9ImZpbGw6I0QzMzY4MkZGIiAvPjxyZWN0IHg9IjAiIHk9IjUwJSIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiM2QzcxQzRGRiIgLz48cmVjdCB4PSIyNSUiIHk9IjUwJSIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiMyNjhCRDJGRiIgLz48cmVjdCB4PSI1MCUiIHk9IjUwJSIgd2lkdGg9IjI2JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiMyQUExOThGRiIgLz48cmVjdCB4PSI3NSUiIHk9IjUwJSIgd2lkdGg9IjI1JSIgaGVpZ2h0PSI1MCUiIHN0eWxlPSJmaWxsOiM4NTk5MDBGRiIgLz48L3N2Zz4="

describe("Paletes", function () {

  let palettes: Contract
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
  const base1	 = "#93A1A1FF"
  const base2	 = "#EEE8D5FF"
  const base3	 = "#FDF6E3FF"

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

  beforeEach(async function () {
    const RGBAx8 = await ethers.getContractFactory("RGBAx8")
    const rgbax8 = await RGBAx8.deploy()
    const Palettes = await ethers.getContractFactory(
      "Palettes",
      {
        libraries: {
          RGBAx8: rgbax8.address,
        },
      },
    )
    palettes = await Palettes.deploy()
    await palettes.deployed()
  })

  it("Should return correct colors from the palette.", async function () {

    for (let i in solarizedAccents) {
      const color = solarizedAccents[i]
      const RGBA = await palettes.getHexRGBA(accentsId, i)
      expect(RGBA).to.equal(color)
    }

    for (let i in solarizedBases) {
      const color = solarizedBases[i]
      const RGBA = await palettes.getHexRGBA(basesId, i)
      expect(RGBA).to.equal(color)
    }

  })

  it("Should give SVG data URIs", async function () {
    const gotBasesURI = await palettes.tokenURI(basesId)
    expect(gotBasesURI).to.equal(wantBasesURI)
    const gotAccentsURI = await palettes.tokenURI(accentsId)
    expect(gotAccentsURI).to.equal(wantAccentsURI)
   })

  it("Should be claimable", async function () {
    await palettes.claim(basesId)
    await palettes.claim(accentsId)

    const baseOwner = await palettes.ownerOf(basesId)
    const accentsOwner = await palettes.ownerOf(accentsId)

    expect(baseOwner).to.equal(accentsOwner)
    expect(baseOwner).not.to.equal(ethers.constants.AddressZero)
  })

  it("Should return a list of colors", async function () {
    const gotBases = JSON.parse(await palettes.getColors(basesId))
    const gotAccents = JSON.parse(await palettes.getColors(accentsId))
    for(let i = 0; i < 8; i++) {
      expect(gotBases[i]).to.equal(solarizedBases[i])
      expect(gotAccents[i]).to.equal(solarizedAccents[i])
    }
  })
})
