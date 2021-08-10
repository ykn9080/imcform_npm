"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _lodash = _interopRequireDefault(require("lodash"));

var _TreeAnt = require("components/Common/TreeAnt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  SHOW_PARENT
} = _antd.TreeSelect;

const TreeSelectAnt = props => {
  const [treeNode, setTreeNode] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    setTreeNode((0, _TreeAnt.loop)(props.flatData));
  }, []);

  const onChange = value => {
    const flatData = (0, _TreeAnt.makeFlatFromTree)(props.flatData);

    if (props.onChange) {
      const nodeval = _lodash.default.find(flatData, o => {
        return o.key === value;
      });

      props.onChange(nodeval, value);
    }
  };

  let tProps = {
    treeData: props.flatData,
    // value: value,
    treeIcon: true,
    onChange: onChange,
    // treeCheckable: true,
    treeDefaultExpandAll: true,
    dropdownStyle: {
      maxHeight: 400,
      overflow: "auto"
    },
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%"
    }
  };
  if (props.defaultValue) tProps = _objectSpread(_objectSpread({}, tProps), {}, {
    defaultValue: props.defaultValue,
    value: props.defaultValue
  });
  if (props.treeDefaultExpandAll === true | props.treeDefaultExpandAll === false) tProps = _objectSpread(_objectSpread({}, tProps), {}, {
    treeDefaultExpandAll: props.treeDefaultExpandAll
  });
  return /*#__PURE__*/_react.default.createElement(_antd.TreeSelect, tProps, treeNode);
};

var _default = TreeSelectAnt;
exports.default = _default;