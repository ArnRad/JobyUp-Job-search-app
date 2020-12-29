import React from 'react'
import DetailsIcon from '@material-ui/icons/Details';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ForumIcon from '@material-ui/icons/Forum';

function TrustAndSafety() {

    return (
        <div className="TrustAndSafety">
            <h1 className="info-title">Trust & Safety</h1>
            <p className="text-field">
                Your password isn't sent to our server - we can't decrypt your text even if we wanted to. Only encrypted text is sent over the Internet.
                No cookies, no sessions, no registration, no users tracking. We can't identify you at all. We can't know when the same user visits two different sites.
                No logging in or out, just close the browser tab and you're safe.
                No ads - we hate ads because they can track you, and they're distracting.
                You don't have to trust anyone or agree on anything - check the code yourself. 
                All our code is well written and full of comments so that you can understand it in details - start by looking 
                at main.js, and check communication with our servers.
                If someone wants your text, he'll need your password, but he'll have to find your site first.
            </p>
            <div className="safetyCols">
                <div className="col">
                    <DetailsIcon fontSize="large" style={{ fontSize: 100 }}/>
                    <div className="col-title">Personal details</div>
                    <div className="col-text">
                        JobyUp values your privacy. 
                        Your data is secure at all times and we'll 
                        never share your personal information with third parties.
                    </div>
                </div>
                <div className="col">
                    <OpenInBrowserIcon style={{ fontSize: 100 }}/>
                    <div className="col-title">Safe Browsing</div>
                    <div className="col-text">
                        Safe Browsing also notifies webmasters when their websites are 
                        compromised by malicious actors and helps them diagnose and resolve 
                        the problem so that their visitors stay safer. Safe Browsing protections 
                        work across Google products and power safer browsing experiences across the Internet.
                    </div>
                </div>
                <div className="col">
                    <ForumIcon style={{ fontSize: 100 }}/>
                    <div className="col-title">Secure Communications</div>
                    <div className="col-text">
                        You can safely communicate and exchange 
                        files with any Seller on JobyUp through 
                        our secure messaging system.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrustAndSafety
