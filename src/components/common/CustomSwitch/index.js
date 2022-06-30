import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
const CustomSwitch = withStyles({
  root: {
    width: 40,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: "#ffffff",
    "&$checked": {
      transform: "translateX(20px)",
      color: "#FFFFFF",
    },
    "&$checked + $track": {
      backgroundColor: "#058711",
      borderColor: "#058711",
      opacity: 1,
    },
  },
  checked: {},
  thumb: {
    width: 16,
    height: 16,
    boxShadow: "none",
    color: "#ffffff",
  },
  track: {
    border: `1px solid #ffffff`,
    backgroundColor: "#cecece",
    borderRadius: "50px",
    opacity: 1,
  },
})(Switch);

export default CustomSwitch;
