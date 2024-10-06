"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallCloseIcon = exports.CloseIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _createIcon = require("../createIcon");

var _nbSvg = require("../nbSvg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CloseIcon = (0, _createIcon.createIcon)({
  viewBox: '0 0 20 20',
  d: 'M10 7.77778L2.22222 0L0 2.22222L7.77778 10L0 17.7778L2.22222 20L10 12.2222L17.7778 20L20 17.7778L12.2222 10L20 2.22222L17.7778 0L10 7.77778Z'
});
exports.CloseIcon = CloseIcon;
const SmallCloseIcon = (0, _createIcon.createIcon)({
  viewBox: '0 0 16 16',
  path: /*#__PURE__*/_react.default.createElement(_nbSvg.Path, {
    d: "M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z",
    fillRule: "evenodd",
    fill: "currentColor"
  })
});
exports.SmallCloseIcon = SmallCloseIcon;
//# sourceMappingURL=Close.js.map