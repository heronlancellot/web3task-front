import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "@/components/LogoSign";
import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";
import HeaderSearch from "./Search";
import HeaderUserConnect from "./UserConnect";
import { useConnect, useDisconnect } from 'wagmi';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header({ data }) {
  const theme = useTheme();
  const logoImage = "/static/images/logo/logo-" + theme.palette.mode + ".svg";

  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.7),
              0.15
            )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.2
            )}, 0px 5px 22px -4px ${alpha(
              theme.colors.alpha.black[100],
              0.1
            )}`,
      }}
    >
      <>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
          spacing={2}
        >
          <Logo logoImage={logoImage} />

        </Stack>

        {data ? (
          <>
            <HeaderSearch />
            <Box display="flex" alignItems="center">
              <HeaderUserbox disconnect={disconnect} account={data} />
            </Box>
          </>
        ) : (
          <>
            <HeaderSearch />
            <Box display="flex" alignItems="center">
              <HeaderUserConnect
                connectors={connectors}
                activeConnector={activeConnector}
                connect={connect}
                isConnecting={isConnecting}
                pendingConnector={pendingConnector} />
            </Box>
          </>
        )}
      </>
    </HeaderWrapper>
  );
}

export default Header;
