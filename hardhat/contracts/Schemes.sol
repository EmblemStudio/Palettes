//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Palettes.sol";

library SchemesLib {
    using PalettesLib for uint256;

    struct Scheme {
        string labels[8];
        // TODO some configuration for varying properties
        // like opacity, hue, saturation, brightness
        // anything that the filter css prop can do?
    };

    function css(Scheme scheme, uint256 palette) public pure returns (string) {
        /* Example CSS output
.scheme-{label}-background-color: {color}
.scheme-{label}-border-bottom-color: {color}
.scheme-{label}-border-color: {color}
.scheme-{label}-border-left-color: {color}
.scheme-{label}-border-right-color: {color}
.scheme-{label}-border-top-color: {color}
.scheme-{label}-box-shadow: {color}
.scheme-{label}-caret-color: {color}
.scheme-{label}-color: {color}
.scheme-{label}-column-rule-color: {color}
.scheme-{label}-outline-color: {color}
.scheme-{label}-text-decoration-color: {color}
         */
        parts = [
                 abi.encodePacked(".scheme-", scheme.label[0], "-color-", palette.hexRGBA(0)),
                 abi.encodePacked(".scheme-", scheme.label[1], "-color-", palette.hexRGBA(1)),
                 abi.encodePacked(".scheme-", scheme.label[2], "-color-", palette.hexRGBA(2)),
                 abi.encodePacked(".scheme-", scheme.label[3], "-color-", palette.hexRGBA(3)),
                 abi.encodePacked(".scheme-", scheme.label[4], "-color-", palette.hexRGBA(4)),
                 abi.encodePacked(".scheme-", scheme.label[5], "-color-", palette.hexRGBA(5)),
                 abi.encodePacked(".scheme-", scheme.label[6], "-color-", palette.hexRGBA(6)),
                 abi.encodePacked(".scheme-", scheme.label[7], "-color-", palette.hexRGBA(7)),
                 abi.encodePacked(".scheme-", scheme.label[0], "-background-color-", palette.hexRGBA(0)),
                 abi.encodePacked(".scheme-", scheme.label[1], "-background-color-", palette.hexRGBA(1)),
                 abi.encodePacked(".scheme-", scheme.label[2], "-background-color-", palette.hexRGBA(2)),
                 abi.encodePacked(".scheme-", scheme.label[3], "-background-color-", palette.hexRGBA(3)),
                 abi.encodePacked(".scheme-", scheme.label[4], "-background-color-", palette.hexRGBA(4)),
                 abi.encodePacked(".scheme-", scheme.label[5], "-background-color-", palette.hexRGBA(5)),
                 abi.encodePacked(".scheme-", scheme.label[6], "-background-color-", palette.hexRGBA(6)),
                 abi.encodePacked(".scheme-", scheme.label[7], "-background-color-", palette.hexRGBA(7)),
                 abi.encodePacked(".scheme-", scheme.label[0], "-fill-", palette.hexRGBA(0)),
                 abi.encodePacked(".scheme-", scheme.label[1], "-fill-", palette.hexRGBA(1)),
                 abi.encodePacked(".scheme-", scheme.label[2], "-fill-", palette.hexRGBA(2)),
                 abi.encodePacked(".scheme-", scheme.label[3], "-fill-", palette.hexRGBA(3)),
                 abi.encodePacked(".scheme-", scheme.label[4], "-fill-", palette.hexRGBA(4)),
                 abi.encodePacked(".scheme-", scheme.label[5], "-fill-", palette.hexRGBA(5)),
                 abi.encodePacked(".scheme-", scheme.label[6], "-fill-", palette.hexRGBA(6)),
                 abi.encodePacked(".scheme-", scheme.label[7], "-fill-", palette.hexRGBA(7)),
                 abi.encodePacked(".scheme-", scheme.label[0], "-stroke-", palette.hexRGBA(0)),
                 abi.encodePacked(".scheme-", scheme.label[1], "-stroke-", palette.hexRGBA(1)),
                 abi.encodePacked(".scheme-", scheme.label[2], "-stroke-", palette.hexRGBA(2)),
                 abi.encodePacked(".scheme-", scheme.label[3], "-stroke-", palette.hexRGBA(3)),
                 abi.encodePacked(".scheme-", scheme.label[4], "-stroke-", palette.hexRGBA(4)),
                 abi.encodePacked(".scheme-", scheme.label[5], "-stroke-", palette.hexRGBA(5)),
                 abi.encodePacked(".scheme-", scheme.label[6], "-stroke-", palette.hexRGBA(6)),
                 abi.encodePacked(".scheme-", scheme.label[7], "-stroke-", palette.hexRGBA(7)),
                 ];
        return string(abi.encodePacked(
                                       parts[0],
                                       parts[1],
                                       parts[2],
                                       parts[3],
                                       parts[4],
                                       parts[5],
                                       parts[6],
                                       parts[7],
                                       parts[8],
                                       parts[9],
                                       parts[10],
                                       parts[11],
                                       parts[12],
                                       parts[13],
                                       parts[14],
                                       parts[15],
                                       parts[16],
                                       parts[17],
                                       parts[18],
                                       parts[19],
                                       parts[20],
                                       parts[21],
                                       parts[22],
                                       parts[23],
                                       parts[24],
                                       parts[25],
                                       parts[26],
                                       parts[27],
                                       parts[28],
                                       parts[29],
                                       parts[30],
                                       parts[31],
                                       )); 
    }
}

contract Schemes is ERC721Enumerable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SchemesLib for SchemesLib.Scheme;

    Counters.Counter public totalSchemes;

    constructor () ERC721("Schemes", "SCHM") {}

    mapping(uint256 => SchemesLib.Scheme) public schemes;

    event SchemeAdded(a, b, c, d, e, f, g, h string);
    function addScheme(a, b, c, d, e, f, g, h string) public {
        uint256 id = totalSchemes.current();
        schemes[id] = SchemesLib.Scheme({
            labels: [a, b, c, d, e, f, g]
            });
    }
}
