import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import ShowCard from "./ShowCard";
import PropTypes from "prop-types";
import useSort from "./useSort";

const SortedByTier = (
  theme,
  tierData,
  tiersDefined,
  tierExpanded,
  handleAccordionChange
) => {
  const sortedData = useSort("tier", tierData);
  return (
    <Box sx={{ p: 1 }}>
      {tiersDefined
        .sort((a, b) => a.order - b.order)
        .map((tier) => (
          <Accordion
            key={tier.key}
            expanded={tierExpanded[tier.key] || false}
            onChange={handleAccordionChange(tier.key)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls={`panel-${tier.key}-content`}
              id={`panel-${tier.key}-header`}
              variant="h4"
              component="h2"
              sx={{
                justifyContent: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: "center",
                },
              }}
            >
              <strong>{tier.tLabel}</strong>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {
                //prevents uncaught reference errors from map function
                sortedData[tier.key]?.length > 0 ? (
                  sortedData[tier.key].map((show) => (
                    <ShowCard key={show.Title} show={show} mode={theme} />
                  ))
                ) : (
                  <Typography>No shows in this tier</Typography>
                )
              }
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

SortedByTier.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default SortedByTier;
