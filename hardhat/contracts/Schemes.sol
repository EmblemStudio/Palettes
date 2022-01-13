//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Palettes.sol";

library SchemesLib {
    using PalettesLib for uint256;

    struct Scheme {
        address creator;
        string[][8] classes; // classes[label][property]
        // TODO some configuration for varying properties
        // like opacity, hue, saturation, brightness
        // anything that the filter css prop can do?
    }

    function _cssBlock(string calldata color,
                       string calldata label,
                       string[] calldata properties,
    ) internal pure returns (string memory) {
        /* For each property
          .scheme-<label>-color {
            {property}: <color>
          }
         */
    }

    function css(Scheme memory scheme, uint256 palette) public pure returns (string memory) {
        string block0 = _cssBlock(pallette.getColor(0), scheme.classes[0][0], scheme.classes[0][1:]);
        string block0 = _cssBlock(pallette.getColor(1), scheme.classes[1][0], scheme.classes[1][1:]);
        string block0 = _cssBlock(pallette.getColor(2), scheme.classes[2][0], scheme.classes[2][1:]);
        string block0 = _cssBlock(pallette.getColor(3), scheme.classes[3][0], scheme.classes[3][1:]);
        string block0 = _cssBlock(pallette.getColor(4), scheme.classes[4][0], scheme.classes[4][1:]);
        string block0 = _cssBlock(pallette.getColor(5), scheme.classes[5][0], scheme.classes[5][1:]);
        string block0 = _cssBlock(pallette.getColor(6), scheme.classes[6][0], scheme.classes[6][1:]);
        string block0 = _cssBlock(pallette.getColor(7), scheme.classes[7][0], scheme.classes[7][1:]);

        return string(abi.encodePacked(block0,
                                       block1,
                                       block2,
                                       block3,
                                       block4,
                                       block5,
                                       block6,
                                       block7
                                       ));
    }
}

contract Schemes is ERC721Enumerable, ReentrancyGuard {
    using SchemesLib for SchemesLib.Scheme;
    using Counters for Counters.Counter;

    Counters.Counter public totalSchemes;

    constructor () ERC721("Schemes", "SCHM") {}

    mapping(string => SchemesLib.Scheme) public schemes;
    mapping(uint256 => SchemesLib.Scheme) public nfts;
    Counters.Counter public totalNFTs;

    event SchemeAdded(string[] a,
                      string[] b,
                      string[] c,
                      string[] d,
                      string[] e,
                      string[] f,
                      string[] g,
                      string[] h);

    function getSchemeId(string[] calldata a,
                         string[] calldata b,
                         string[] calldata c,
                         string[] calldata d,
                         string[] calldata e,
                         string[] calldata f,
                         string[] calldata g,
                         string[] calldata h
    ) public pure returns (string memory) {
        bytes32 id = keccak256(abi.encodePacked(a, b, c, d, e, f, g, h));
        return string(abi.encodePacked(id));
    }

    function css(string calldata schemeId, uint256 palette) public view returns (string memory) {
        SchemesLib.Scheme memory scheme = schemes[schemeId];
        return scheme.css(palette);
    }

    // newScheme creates a scheme [<label>, <packed variations>, <css prop>...]
    function newScheme(string[] calldata a,
                       string[] calldata b,
                       string[] calldata c,
                       string[] calldata d,
                       string[] calldata e,
                       string[] calldata f,
                       string[] calldata g,
                       string[] calldata h
    ) public {
        string memory id = getSchemeId(a, b, c, d, e, f, g, h);
        schemes[id] = SchemesLib.Scheme({
            classes: [a, b, c, d, e, f, g, h],
            creator: msg.sender
        });
        emit SchemeAdded(a, b, c, d, e, f, g, h);
    }

    function mint(address to, string calldata schemeId) public nonReentrant {
        require(to != address(0), "Zero `to` address");
        uint256 id = totalNFTs.current();
        _safeMint(to, id);
        totalNFTs.increment();
    }
}
