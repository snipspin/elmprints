import React, {useEffect, useState} from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Grid } from '@material-ui/core'
import { makeStyles }from '@material-ui/core/styles'
import styles from './styles';

interface FaqItem {
    title: string;
    content: string;
}

const useStyles =  makeStyles(theme => (styles(theme)));
function FAQPageCom() {
    const [faqArray, setfaqArray] = useState<Array<FaqItem>>([])
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const classes = useStyles();
    
    
    useEffect(() => {
        let faqs: Array<FaqItem> = []
        for (let index = 0; index < 10; index++) {
            faqs.push({title: `FAQ ${index+1}`, content: `Answer ${index+1}`});
        }
        console.log(faqs)
        setfaqArray(faqs);  
        console.log(faqArray);
    },[])
    return(
        <Grid
            container 
    		direction="row"
    		justify="space-evenly"
            alignItems="center"
            className="faqContainer"
        >
            {
                faqArray.map((faq,i) => (
                    <Grid item xs={8} key={i}>
                        <ExpansionPanel style={{backgroundColor: "#f1e2d6"}} className="faqItem" expanded={expanded === `faq${i}`} onChange={handleChange(`faq${i}`)}>
                            <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`faq${i}-content`}
                            id={`faq${i}-header`}
                            >
                                <Typography className={classes.heading}>{faq.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                  {faq.content}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                ))
            }
        </Grid>
    )
}
export default FAQPageCom