import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export interface RailSection {
  heading: string;
  body: string;
}

/** Quiet explanatory column, in the spirit of a settings page's side notes. */
export default function HelpRail({
  title,
  intro,
  sections,
  footnote,
}: {
  title: string;
  intro: string;
  sections: RailSection[];
  footnote?: string;
}) {
  return (
    <Box
      component="aside"
      sx={{
        width: { xs: "100%", lg: 300 },
        flexShrink: 0,
        pt: { xs: 0, lg: 1 },
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1.5 }}>
        {title}
      </Typography>
      <Typography
        sx={{ fontSize: 14, lineHeight: 1.65, color: "text.secondary", mb: 2.5 }}
      >
        {intro}
      </Typography>

      <Stack spacing={2.5}>
        {sections.map((s) => (
          <Box key={s.heading}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, mb: 0.5, color: "text.primary" }}
            >
              {s.heading}
            </Typography>
            <Typography
              sx={{ fontSize: 14, lineHeight: 1.65, color: "text.secondary" }}
            >
              {s.body}
            </Typography>
          </Box>
        ))}
      </Stack>

      {footnote && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography sx={{ fontSize: 13.5, color: "text.tertiary" }}>
            {footnote}
          </Typography>
        </>
      )}
    </Box>
  );
}
