import {
  Link,
  Tooltip,
  Zoom,
  styled,
  tooltipClasses,
  Box,
} from "@mui/material";
import React from "react";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    cursor: "pointer",
    fontSize: 14,
  },
}));

const SocialIcon = ({ title, icon, href }) => {
  return (
    <Link href={href} target="_blank">
      <BootstrapTooltip
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 300 }}
        title={title}
      >
        <Box
          component={"img"}
          src={icon}
          alt="socail-icon"
          width={24}
          priority={false}
        />
      </BootstrapTooltip>
    </Link>
  );
};

export default SocialIcon;
