import styled from "@emotion/styled";
import { makeStyles, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ITheme } from "../theme";

export const LinkStyled = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

export const Logo = styled("div")({
  backgroundImage:
    "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjEwMCUiCiAgIGhlaWdodD0iMTAwJSIKICAgdmlld0JveD0iMCAwIDY0IDIyIgogICB2ZXJzaW9uPSIxLjEiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IgogICBpZD0ic3ZnNTUiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImRvd25sb2FkLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcwogICAgIGlkPSJkZWZzNTkiIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc1NyIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIyNi42NzE4NzUiCiAgICAgaW5rc2NhcGU6Y3g9IjMyIgogICAgIGlua3NjYXBlOmN5PSIxMS4wMDQxMDEiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9Imc1MyIgLz48ZwogICAgIGlkPSJnNTMiPjxwYXRoCiAgICAgICBkPSJNNS4yMTQsMy44NjljMC4yMzksLTAuMjIxIDAuNTQsLTAuMzMzIDAuODQsLTAuMzQ4YzAuMzgxLC0wLjAxNiAwLjc2NSwwLjEyNyAxLjA0MSwwLjQzYzAuNDk3LDAuNTQxIDAuNDYxLDEuMzgzIC0wLjA4MiwxLjg4bC0wLjk4NiwwLjg5N2wtMC44OTUsLTAuOTc4Yy0wLjQ5NCwtMC41NCAtMC40NiwtMS4zODUgMC4wODIsLTEuODgxbTkuMTY0LDkuNzc5Yy0wLjY1NiwtMC43MTkgLTEuNzY5LC0wLjc2NiAtMi40ODYsLTAuMTA5bC0zLjgwMywzLjQ4MmMtMC41MzcsMC40OTYgLTEuMjM0LDAuNzUgLTEuOTYzLDAuNzE1Yy0wLjcyNywtMC4wMzEgLTEuNDAxLC0wLjM0NSAtMS44OTEsLTAuODgyYy0xLjAxNiwtMS4xMDggLTAuOTQyLC0yLjg0IDAuMTY4LC0zLjg1NWwxLjQxMiwtMS4yOTVsMS4xNzksMS4yODhjMC42NTYsMC43MTcgMS43NjksMC43NjUgMi40ODYsMC4xMDljMC43MTcsLTAuNjU1IDAuNzY2LC0xLjc3IDAuMTEsLTIuNDg4bC0xLjE3OCwtMS4yODNsMC45NzgsLTAuOTAzYzEuOTc0LC0xLjgwNiAyLjEwOSwtNC44OCAwLjMsLTYuODU2Yy0xLjgwNSwtMS45NzEgLTQuODgxLC0yLjEwNiAtNi44NTUsLTAuMjk3Yy0xLjk3MSwxLjgwOSAtMi4xMDYsNC44ODEgLTAuMjk4LDYuODU3bDAuOSwwLjk3OWwtMS40MTMsMS4yOTNjLTIuNTQsMi4zMjggLTIuNzE0LDYuMjg4IC0wLjM4NCw4LjgyOWMxLjEyOCwxLjIzIDIuNjY1LDEuOTUgNC4zMzMsMi4wMjJjMC4xODgsMC4wMDcgMC4zNywwLjAwNyAwLjU1NSwwYzEuNDY1LC0wLjA2NiAyLjg0NSwtMC42MzQgMy45NCwtMS42MzVsMy44MDIsLTMuNDg1YzAuNzE4LC0wLjY1OCAwLjc2NSwtMS43NzEgMC4xMDgsLTIuNDg2IgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLXJ1bGU6bm9uemVybyIKICAgICAgIGlkPSJwYXRoMzUiIC8+PHBhdGgKICAgICAgIGQ9Im0gMjMuNDg3LDExLjcwNSBjIDAsMC4yNzQgLTAuMTk1LDAuNDQzIC0wLjQyOSwwLjQ0MyBIIDE5LjUwMSBWIDEyLjUgYyAwLDEuMDI5IDAuNDU2LDEuNzA2IDEuNDk4LDEuNzA2IDAuNTYsMCAwLjkxMiwtMC4wOTEgMS4xNTksLTAuMTgyIDAuMywtMC4xMDUgMC40NTYsLTAuMjM1IDAuNjY1LC0wLjIzNSAwLjI2MSwwIDAuNDMsMC4xOTYgMC40MywwLjQ3IDAsMC4yNjEgLTAuMjc0LDAuNDgxIC0wLjY2NSwwLjYzOCAtMC40NTUsMC4xODMgLTEuMDgxLDAuMjc0IC0xLjY1NCwwLjI3NCAtMS44NzYsMCAtMi41NjYsLTEuMjc3IC0yLjU2NiwtMi43NjIgdiAtMS4yMTIgYyAwLC0xLjQ3MiAwLjc0MiwtMi43NjIgMi41NjYsLTIuNzYyIDEuODg5LDAgMi41NTMsMS4yMjQgMi41NTMsMi43NjIgeiBtIC0yLjU0LC0yLjM0NCBjIC0xLjAxNSwwIC0xLjQ0NiwwLjY2MyAtMS40NDYsMS42NjcgdiAwLjIyMSBoIDIuODc5IHYgLTAuMjM0IGMgMCwtMS4wMDMgLTAuMzY1LC0xLjY1NCAtMS40MzMsLTEuNjU0IgogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLXJ1bGU6bm9uemVybyIKICAgICAgIGlkPSJwYXRoMzciIC8+PHBhdGgKICAgICAgIGQ9Ik0gMjcuODcxLDE1LjA5MSBIIDI3LjQ4IGMgLTEuNzk3LDAgLTIuMjY2LC0xLjExOSAtMi4yNjYsLTIuODI2IFYgOS40OSBoIC0wLjM3OCBjIC0wLjI3NCwwIC0wLjQ5NSwtMC4yMjIgLTAuNDk1LC0wLjQ4MiAwLC0wLjI3NCAwLjIyMSwtMC40OTUgMC40OTUsLTAuNDk1IGggMC4zNzggViA3LjE3MSBjIDAsLTAuMzEyIDAuMjQ3LC0wLjU3MyAwLjU3MywtMC41NzMgMC4zMTMsMCAwLjU2LDAuMjYxIDAuNTYsMC41NzMgdiAxLjM0MiBoIDEuMjExIGMgMC4yNzQsMCAwLjQ5NiwwLjIyMSAwLjQ5NiwwLjQ5NSAwLDAuMjYgLTAuMjIyLDAuNDgyIC0wLjQ5NiwwLjQ4MiBoIC0xLjIxMSBsIDAuMDE0LDIuNzYyIGMgMCwxLjMwMiAwLjIwOCwxLjc5OCAxLjIzNywxLjc5OCBoIDAuMjczIGMgMC4yODcsMCAwLjUwOSwwLjIzNCAwLjUwOSwwLjUxOSAwLDAuMjg4IC0wLjIyMiwwLjUyMiAtMC41MDksMC41MjIiCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgaWQ9InBhdGgzOSIgLz48cGF0aAogICAgICAgZD0ibSAzNC4wODcsMTUuMTcgYyAtMC4zMTMsMCAtMC41NzQsLTAuMjQ3IC0wLjU3NCwtMC41NzQgdiAtMy42NzMgYyAwLC0wLjgyMSAtMC4yMiwtMS40MDYgLTEuMjI0LC0xLjQwNiAtMC43NDMsMCAtMS4yNzcsMC4zMjUgLTEuNTksMC44MiB2IDQuMjU5IGMgMCwwLjMyNyAtMC4yNDcsMC41NzQgLTAuNTYsMC41NzQgLTAuMzEzLDAgLTAuNTczLC0wLjI0NyAtMC41NzMsLTAuNTc0IHYgLTQuMzkgYyAwLC0wLjUyMSAtMC4xNTcsLTAuNjc3IC0wLjQwNCwtMC44MjEgLTAuMTQzLC0wLjA3OCAtMC4yMjEsLTAuMjA4IC0wLjIyMSwtMC4zNzcgMCwtMC4zMzkgMC4yMzQsLTAuNDk2IDAuNTYsLTAuNDk2IDAuMjA4LDAgMC40OTUsMC4xMDUgMC43MDMsMC4yNzQgMC4xMzEsMC4xMzEgMC4yMzQsMC4yNzQgMC4yODcsMC40MyAwLjQ1NiwtMC40OTUgMS4xMiwtMC43ODIgMi4wNDcsLTAuNzgyIDEuNjQxLDAgMi4xMjIsMS4wMTcgMi4xMjIsMi4zODUgbCAwLjAxNCwzLjc3NyBjIDAsMC4zMjcgLTAuMjYxLDAuNTc0IC0wLjU4NywwLjU3NCIKICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICBpZD0icGF0aDQxIiAvPjxwYXRoCiAgICAgICBkPSJtIDQxLjMwOSwxMS43MDUgYyAwLDAuMjc0IC0wLjE5NSwwLjQ0MyAtMC40MjksMC40NDMgSCAzNy4zMjMgViAxMi41IGMgMCwxLjAyOSAwLjQ1NiwxLjcwNiAxLjQ5OSwxLjcwNiAwLjU1OSwwIDAuOTExLC0wLjA5MSAxLjE1OSwtMC4xODIgMC4zLC0wLjEwNSAwLjQ1NSwtMC4yMzUgMC42NjUsLTAuMjM1IDAuMjU5LDAgMC40MjksMC4xOTYgMC40MjksMC40NyAwLDAuMjYxIC0wLjI3NCwwLjQ4MSAtMC42NjQsMC42MzggLTAuNDU3LDAuMTgzIC0xLjA4MiwwLjI3NCAtMS42NTUsMC4yNzQgLTEuODc1LDAgLTIuNTY3LC0xLjI3NyAtMi41NjcsLTIuNzYyIHYgLTEuMjEyIGMgMCwtMS40NzIgMC43NDMsLTIuNzYyIDIuNTY3LC0yLjc2MiAxLjg5LDAgMi41NTMsMS4yMjQgMi41NTMsMi43NjIgeiBtIC0yLjU0LC0yLjM0NCBjIC0xLjAxNSwwIC0xLjQ0NiwwLjY2MyAtMS40NDYsMS42NjcgdiAwLjIyMSBoIDIuODc5IHYgLTAuMjM0IGMgMCwtMS4wMDMgLTAuMzY1LC0xLjY1NCAtMS40MzMsLTEuNjU0IgogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLXJ1bGU6bm9uemVybyIKICAgICAgIGlkPSJwYXRoNDMiIC8+PHBhdGgKICAgICAgIGQ9Im0gNDUuNjkzLDE1LjA5MSBoIC0wLjM5IGMgLTEuNzk3LDAgLTIuMjY2LC0xLjExOSAtMi4yNjYsLTIuODI2IFYgOS40OSBoIC0wLjM3OCBjIC0wLjI3NCwwIC0wLjQ5NSwtMC4yMjIgLTAuNDk1LC0wLjQ4MiAwLC0wLjI3NCAwLjIyMSwtMC40OTUgMC40OTUsLTAuNDk1IGggMC4zNzggViA3LjE3MSBjIDAsLTAuMzEyIDAuMjQ3LC0wLjU3MyAwLjU3MywtMC41NzMgMC4zMTIsMCAwLjU2MSwwLjI2MSAwLjU2MSwwLjU3MyB2IDEuMzQyIGggMS4yMTEgYyAwLjI3MiwwIDAuNDk1LDAuMjIxIDAuNDk1LDAuNDk1IDAsMC4yNiAtMC4yMjMsMC40ODIgLTAuNDk1LDAuNDgyIGggLTEuMjExIGwgMC4wMTMsMi43NjIgYyAwLDEuMzAyIDAuMjA4LDEuNzk4IDEuMjM2LDEuNzk4IGggMC4yNzQgYyAwLjI4NiwwIDAuNTA5LDAuMjM0IDAuNTA5LDAuNTE5IC0wLjAwMSwwLjI4OCAtMC4yMjQsMC41MjIgLTAuNTEsMC41MjIiCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgaWQ9InBhdGg0NSIgLz48cGF0aAogICAgICAgZD0ibSA1MS45MjIsMTEuNzA1IGMgMCwwLjI3NCAtMC4xOTYsMC40NDMgLTAuNDMsMC40NDMgSCA0Ny45MzUgViAxMi41IGMgMCwxLjAyOSAwLjQ1NywxLjcwNiAxLjQ5OSwxLjcwNiAwLjU1OSwwIDAuOTExLC0wLjA5MSAxLjE2LC0wLjE4MiAwLjI5OCwtMC4xMDUgMC40NTUsLTAuMjM1IDAuNjY0LC0wLjIzNSAwLjI2MSwwIDAuNDMsMC4xOTYgMC40MywwLjQ3IDAsMC4yNjEgLTAuMjc0LDAuNDgxIC0wLjY2NSwwLjYzOCAtMC40NTUsMC4xODMgLTEuMDgxLDAuMjc0IC0xLjY1NCwwLjI3NCAtMS44NzYsMCAtMi41NjYsLTEuMjc3IC0yLjU2NiwtMi43NjIgdiAtMS4yMTIgYyAwLC0xLjQ3MiAwLjc0MiwtMi43NjIgMi41NjYsLTIuNzYyIDEuODg5LDAgMi41NTMsMS4yMjQgMi41NTMsMi43NjIgeiBtIC0yLjU0LC0yLjM0NCBjIC0xLjAxNiwwIC0xLjQ0OCwwLjY2MyAtMS40NDgsMS42NjcgdiAwLjIyMSBoIDIuODggdiAtMC4yMzQgYyAwLC0xLjAwMyAtMC4zNjQsLTEuNjU0IC0xLjQzMiwtMS42NTQiCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgaWQ9InBhdGg0NyIgLz48cGF0aAogICAgICAgZD0ibSA1Ni45MjIsOS42MzQgYyAtMC4yMjIsMCAtMC4zMzksLTAuMDkyIC0wLjc5NSwtMC4wOTIgLTAuNTQ3LDAgLTEuMjM3LDAuMTcgLTEuNDU4LDEuMTczIHYgMy44ODEgYyAwLDAuMzI3IC0wLjI0OCwwLjU3NCAtMC41NiwwLjU3NCAtMC4zMTMsMCAtMC41NzQsLTAuMjQ3IC0wLjU3NCwtMC41NzQgdiAtNC4zODkgYyAwLC0wLjUyMSAtMC4xNTcsLTAuNjc4IC0wLjQwNSwtMC44MjEgLTAuMTQxLC0wLjA3OSAtMC4yMjEsLTAuMjA4IC0wLjIyMSwtMC4zNzcgMCwtMC4zMTQgMC4yMDgsLTAuNDk2IDAuNTc1LC0wLjQ5NiAwLjQ5MywwIDAuODg1LDAuNDA0IDEuMDQxLDAuODA4IDAuNTYsLTAuNzgyIDEuMzI5LC0wLjg3MyAxLjc5NywtMC44NzMgMC41MzUsMCAxLjE0NywwLjE2OSAxLjE0NywwLjYxMyAwLDAuMzEyIC0wLjE5NiwwLjU3MyAtMC41NDcsMC41NzMiCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtcnVsZTpub256ZXJvIgogICAgICAgaWQ9InBhdGg0OSIgLz48cGF0aAogICAgICAgZD0ibSA2Mi42NjgsMTUuMTcgYyAtMC4yMDgsMCAtMC40MTYsLTAuMDY1IC0wLjU4NiwtMC4xOTYgLTAuMTQxLC0wLjExNyAtMC4yNzMsLTAuMjg2IC0wLjMzOCwtMC40NjkgLTAuNDgyLDAuNTM1IC0xLjI1MSwwLjY2NSAtMS44MjQsMC42NjUgLTEuNjAzLDAgLTIuMjgxLC0wLjg0NyAtMi4yODEsLTEuOTI4IFYgMTMuMTUgYyAwLC0xLjA4IDAuNzQ0LC0xLjg4OCAyLjQxMiwtMS44ODggaCAxLjQ3MiB2IC0wLjMyNiBjIDAsLTEuMDI5IC0wLjI0OCwtMS41NSAtMS4zNDIsLTEuNTUgLTAuNDU3LDAgLTAuNzU2LDAuMDY1IC0xLjAwMywwLjE3IC0wLjI4OCwwLjExNyAtMC40MzEsMC4yMjEgLTAuNjEyLDAuMjIxIC0wLjI3NCwwIC0wLjQ2OSwtMC4yMDkgLTAuNDY5LC0wLjQ1NiAwLC0wLjI3MyAwLjI2MSwtMC40ODIgMC42MjUsLTAuNjI2IDAuNDY5LC0wLjE5NSAxLjA0MiwtMC4yNiAxLjUzNywtMC4yNiAxLjg1LDAgMi4zOTgsMC44OTkgMi4zOTgsMi42MDUgdiAyLjQzNiBjIDAsMC41MjEgMC4xMTcsMC42NzcgMC4zNjMsMC44MDggMC4xNDMsMC4wOTEgMC4yMjMsMC4yMjEgMC4yMjMsMC4zOTEgLTAuMDAxLDAuMzM4IC0wLjIzNSwwLjQ5NSAtMC41NzUsMC40OTUgbSAtMS4xNDUsLTMuMDIyIGggLTEuMzY4IGMgLTEuMDk0LDAgLTEuMzgyLDAuNDgxIC0xLjM4MiwxLjAxNiB2IDAuMDkxIGMgMCwwLjU2MSAwLjMxNCwxLjAyOSAxLjM0MiwxLjAyOSAwLjg3MywwIDEuNDA4LC0wLjQ0MyAxLjQwOCwtMS4zNjggeiIKICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1ydWxlOm5vbnplcm8iCiAgICAgICBpZD0icGF0aDUxIiAvPjwvZz48L3N2Zz4K)",
  backgroundRepeat: "no-repeat",
  height: 40,
  width: 140,
});

export const UserName = styled("span")({
  marginRight: 10,
});

export const useStyles = makeStyles((theme: Theme & ITheme) => ({
  appBar: {
    backgroundColor: theme.colors.primary,
  },
  iconActive: {
    "& svg": {
      fill: "#fff",
    },
  },
  logout: {
    backgroundColor: "#fff",
  },
  menuActive: {
    backgroundColor: theme.colors.primary,

    "& .MuiTypography-root": {
      color: "#fff",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
