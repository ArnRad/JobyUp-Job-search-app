import React from 'react'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';


function Support() {

    return (
        <div className="Support">
            <h1 className="info-title">Support</h1>
            <p className="support-title">
                How can we help?
            </p>
            <div className="supportCols">
                <div className="col">
                    <PhoneInTalkIcon fontSize="large" style={{ fontSize: 100 }}/>
                    <div className="col-title">+370 651 12354</div>
                </div>
                <div className="col">
                    <EmailIcon fontSize="large" style={{ fontSize: 100 }}/>
                    <div className="col-title">info@jobyup.com</div>
                </div>
                <div className="col">
                    <FacebookIcon fontSize="large" style={{ fontSize: 100 }}/>
                    <div className="col-title">facebook.com/jobyup</div>
                </div>
            </div>
            <div className="support-text-field">
                At JobyUp, we value exceptional communication above all else! 
                Every single one of our Customer Success agents has a sole goal of Making You Successful! 
                That is why our dedicated support team works 24/7/365 to help you.
            </div>
        </div>
    )
}

export default Support
