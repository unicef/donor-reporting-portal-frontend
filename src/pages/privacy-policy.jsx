import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import { usePrivacyPolicyStyles } from 'styles/privacy-policy-styles';

export default function PrivacyPolicy() {
  const classes = usePrivacyPolicyStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.iconBadge}>
          <PrivacyTipOutlinedIcon />
        </Box>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Legal
          </Typography>
          <Typography variant="h4" component="h1" className={classes.title}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" color="text.secondary" className={classes.subtitle}>
            How UNICEF collects, uses and protects the information you share on the Donor
            Reporting Portal.
          </Typography>
        </Box>
      </Box>

      <Paper component="article" elevation={0} className={classes.card}>

        <p>This privacy statement describes UNICEF’s policy concerning the gathering and sharing of visitors’ information through the UNICEF Donor Portal. It applies to all “UNICEF sites” – that is, all sites within the “unicef.org” domain name. You should note that through this site you may reach or be directed to other sites that relate to UNICEF. By visiting the UNICEF Donor Portal you are accepting the practices described in this policy.</p>

        <p>&nbsp;</p>

        <h2>What information does UNICEF collect?</h2>

        <p><strong>Normal website usage</strong></p>

        <p>In general, you can browse the Donor Portal without telling us who you are or revealing any personal information about yourself. The only information we gather during general browsing is from standard server logs. These include your IP (Internet Protocol) address, domain name, browser type, operating system, and information such as the web site that referred you to us, the files you downloaded, the pages you visit, and the dates/times of those visits.</p>

        <p><strong>Collection of personally identifiable information</strong></p>

        <p>If you register and log on to the UNICEF Donor Portal, you will be asked to provide personal information such as your name and e-mail address. This information is collected only with your knowledge and permission, and is kept in various UNICEF databases.</p>

        <p>UNICEF Donor Portal uses cookies to provide statistics that help us to give you the best experience of our sites. You can switch them off if you prefer. However, by continuing to use our sites without changing settings, you are agreeing to our use of cookies.</p>

        <p>&nbsp;</p>

        <h2>What does UNICEF do with the information it collects?</h2>

        <p><strong>Normal web usage</strong></p>

        <p>The information gathered during general browsing of the “drp.unicef.org” domain is used to analyse trends and usage of the UNICEF Donor Portal and to improve the usefulness of the site. It is not connected with any personal information. However, if you have registered with UNICEF in connection with any activity on the UNICEF Donor Portal, the information we collect about your normal web usage will be identifiable to you.</p>

        <p><strong>Personally identifiable information</strong></p>

        <p>UNICEF may use the personal information you provide to:</p>

        <ul><li>Contact you – either in response to a query or suggestion;</li>
          <li>“Remember” your online profile and preferences;</li>
          <li>Undertake statistical analysis.</li>
        </ul><p><strong>What if I don’t want to provide personal information?</strong></p>

        <p>Providing personal information on the UNICEF web site is optional. If you choose not to provide personal information you will not be able to carry out certain actions such as viewing donor reports </p>

        <p><strong>Opting out and changing your information</strong></p>

        <p><strong>Security</strong></p>

        <p>We do not sell or share any personally identifiable information volunteered on the UNICEF site to any third party without prior consent. We do, however, share some user information with our national committees so that the whole UNICEF family can respond to your needs. Any information provided to UNICEF by users of the UNICEF Donor Portal is held with the utmost care and security, and will not be used in ways other than as set forth in this privacy policy, or in any site-specific policies, or in ways to which you have explicitly consented. UNICEF employs a range of techniques and security measures to protect the information maintained on our system from loss, misuse, unauthorised access or disclosure, alteration, or destruction.</p>

        <p>However, UNICEF assumes no responsibility for the security of information.</p>

        <p><strong>Notification of changes</strong></p>

        <p>Changes to this privacy policy will be posted here and will be available via the UNICEF Donor Portal home page at <a href="/">http://drp.unicef.org</a>.</p>

        <p>&nbsp;</p>

        <h2>UNICEF Cookies Policy</h2>

        <p>By visiting or using this website, a cookie will be created which UNICEF may use to provide statistics that help us to give you the best experience of our sites. The statement below describes our policy on cookies.</p>

        <p>If you do not agree with any of the following, you can switch off the cookies. However, by continuing to use our sites without changing settings, you are agreeing to our use of cookies.</p>

        <p><strong>What is a cookie?</strong></p>

        <p>During the course of any visit to our websites, the pages which you see, along with something called a cookie, are downloaded to your computer. Most, if not all, websites do this, and that’s because cookies allow the website publisher to do useful things like find out whether the computer (and probably its user) has visited the site before. This is done on a repeat visit by checking to see, and finding, the cookie left there on the last visit.</p>

        <p>So – what is a cookie? When you enter a site your computer will automatically be issued with a cookie. Cookies are text files which identify your computer to our server. Cookies in themselves do not identify the individual user, just the computer used. Many sites do this whenever a user visits their site, in order to track traffic flows. Cookies themselves only record which areas of the site have been visited by the computer in question, and for how long. Users have the opportunity to set their computers to accept all cookies, to notify them when a cookie is issued, or not to receive cookies at any time, although this of course means that certain personalised services cannot then be provided to that user. You should read the information that came with your browser software to see how you can do this. Even assuming you have not set your computer to reject cookies, you can browse our sites anonymously until such time as you register your information with UNICEF.</p>



        <p><strong>What do cookies tell us?</strong></p>

        <p>We use cookies to collect data for analytics, such as demographic and interest data, based on your browsing patterns. This data allows us to estimate your age range, your gender and things that might interest you.</p>



        <p><strong>What do we use cookies for?</strong></p>

        <p>We use cookies so that we can give you a better experience when you return to our websites. In particular, we use cookies to:</p>

        <ul><li>better understand our audience and supporters, for example by estimating our audience size and patterns and tracking the level of interest in our campaigns;</li>
          <li>track your preferences and personalise the sites to your requirements and interests. For example: if on a previous visit you went to, say, the [Imagine Campaign] pages, then we might find this out from your cookie and highlight particular information – which you may find interesting, on a second visit;</li>
          <li>avoid lengthy registration/personalisation on each visit;</li>
          <li>display relevant promotion, communications and appeals on other websites you visit;</li>
          <li>improve and update our websites.</li>
        </ul>

        <p><strong>How do we collect and analyze cookies?</strong></p>

        <p>UNICEF does collect and analyze the data to create cookies directly; we use a specialist platform hosted in the UNICEF cloud which both collects information on your preferences from your visits to our websites and analyzes your preferences from cookies already stored in your browser.</p>

        <p>We obtain this information by enabling Matomo to analyze the traffic on our websites.</p>

        <p>We may change our analytics platform at any time without notice to you and will update this Policy as necessary at that time.</p>

        <p><strong>What can you do if you do not want us to use your cookies?</strong></p>

        <p>You can use your browsers’ private browsing mode. Common browsers like Google Chrome, Safari and Internet Explorer have this functionality.</p>

        <p><strong>How do I opt-out of the collection and use of information for promotional purposes generally?</strong></p>

        <p>There are many websites that provide guidance on how to opt out of the collection and use of your information for promotional purposes that are not limited to UNICEF web properties. For example:</p>

        <ul><li><a href="http://www.google.com/settings/ads">Google Ads settings</a></li>
          <li><a href="http://www.networkadvertising.org/managing/opt_out.asp">Network Advertising Initiative opt-out page</a></li>
          <li><a href="http://optout.aboutads.info/#!/">Digital Advertising Alliance’s Consumer Choice Tool</a></li>
        </ul>

        <p><strong>Do you share data from cookies with other organizations?</strong></p>

        <p>We may share your data from your cookies with partners, agents or service providers to understand our supporters more effectively and to further UNICEF’s mission.</p>
      </Paper>

      <Box className={classes.footer}>
        <Button component={RouterLink} to="/" variant="outlined" size="small">
          Back to reports
        </Button>
      </Box>
    </div>
  )
}
