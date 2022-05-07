import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { borderLeft } from '@mui/system';
import { makeStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from "./styles.module.css";
import EditButton from '../../../components/EditButton';


export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <html>
    <div className={styles.login_container}>
    <div className={styles.login_form_container}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontSize: 18 }}>
                        Profile Info
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{justifyContent: "center", alignItems: "center"}} >
                    <Typography >
                        The users Name, Email, and Phon# will be displayed here. They will be able to edit the info as well using a button next to each text field.
                    </Typography>
                    <EditButton/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontSize: 18 }}>Billing Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        The user will be able to see there available balance and what cards they have on file. They will also be able to update them as well.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontSize: 18 }}>
                        Advanced Settings
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Don't know what will go here yet.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontSize: 18 }}>Possible Use</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Might not use just a holder.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
        </html>
    );
}