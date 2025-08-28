import { Box, Divider, Typography } from "@mui/material";


const Footer = () => {
  return (
    
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Divider />

      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontSize: { xs: "0.65rem", sm: "0.75rem" },
        }}
      >
      
        Built with ❤️ by{" "}
        <Box
          component="a"
          href="https://gist.github.com/Julius-git-coder/1a09471ead69aa4c8f7f281839fc8a85"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Julius
        </Box>
      </Typography>
    </Box>
  );
};

export default Footer;
