import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  disabled?: boolean;
  run: () => void;
}

/**
 * ⌘K launcher. Every action in the app is reachable here, so a regular can
 * import, draw teams and export without touching the mouse.
 */
export default function CommandPalette({
  open,
  onClose,
  commands,
}: {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const usable = commands.filter((c) => !c.disabled);
    if (!q) return usable;
    return usable.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(matches.length - 1, 0)));
  }, [matches.length]);

  const runAt = (i: number) => {
    const cmd = matches[i];
    if (!cmd) return;
    onClose();
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(matches.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + matches.length) % Math.max(matches.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(cursor);
    }
  };

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let lastGroup = "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        // Joy's Modal root is display:block, so opt into flex to centre.
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        "& .MuiModal-backdrop": { backdropFilter: "blur(2px)" },
      }}
    >
      <Box
        className="popIn"
        onKeyDown={onKeyDown}
        sx={{
          outline: "none",
          mt: { xs: "12vh", sm: "14vh" },
          width: "min(560px, calc(100vw - 24px))",
          bgcolor: "background.surface",
          borderRadius: "lg",
          border: "1px solid",
          borderColor: "neutral.200",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}
        >
          <SearchRoundedIcon sx={{ fontSize: 19, color: "text.tertiary" }} />
          <Box
            component="input"
            autoFocus
            placeholder="Search actions…"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            sx={{
              flex: 1,
              border: "none",
              outline: "none",
              bgcolor: "transparent",
              fontFamily: "inherit",
              fontSize: 15.5,
              color: "text.primary",
              "&::placeholder": { color: "text.tertiary" },
            }}
          />
          <Box
            sx={{
              fontFamily: "var(--joy-fontFamily-code)",
              fontSize: 11,
              color: "text.tertiary",
              border: "1px solid",
              borderColor: "neutral.200",
              borderRadius: "xs",
              px: 0.75,
              py: 0.25,
            }}
          >
            esc
          </Box>
        </Stack>

        <Box ref={listRef} sx={{ maxHeight: 340, overflowY: "auto", py: 1 }}>
          {matches.length === 0 && (
            <Typography
              sx={{ px: 2, py: 3, fontSize: 14, color: "text.tertiary", textAlign: "center" }}
            >
              Nothing matches “{query}”.
            </Typography>
          )}

          {matches.map((cmd, i) => {
            const newGroup = cmd.group !== lastGroup;
            lastGroup = cmd.group;

            return (
              <Box key={cmd.id}>
                {newGroup && (
                  <Typography
                    sx={{
                      px: 2,
                      pt: i === 0 ? 0.5 : 1.5,
                      pb: 0.5,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "text.tertiary",
                    }}
                  >
                    {cmd.group}
                  </Typography>
                )}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  data-active={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => runAt(i)}
                  sx={{
                    mx: 1,
                    px: 1.5,
                    py: 1,
                    borderRadius: "sm",
                    cursor: "pointer",
                    bgcolor: i === cursor ? "primary.50" : "transparent",
                    color: i === cursor ? "primary.700" : "text.primary",
                  }}
                >
                  <Typography sx={{ fontSize: 14.5, fontWeight: 500, color: "inherit" }}>
                    {cmd.label}
                  </Typography>
                  {cmd.hint && (
                    <Typography
                      sx={{
                        fontFamily: "var(--joy-fontFamily-code)",
                        fontSize: 11.5,
                        color: "text.tertiary",
                      }}
                    >
                      {cmd.hint}
                    </Typography>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
}
