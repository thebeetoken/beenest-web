import * as React from 'react';

import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';

import HelpContainer from './Help.container';

const Help = () => (
  <HelpContainer>
    <h1>Help Center</h1>
    <div className="grey-divider"></div>
    <section>
      <h2>For Guests</h2>
      <article>
        <h3>Canceling a reservation</h3>
        <h4>How do I cancel a booking?</h4>
        <p>
          Go to "Trips", then click "Cancel Trip".
        </p>
        <h4>What happens if my host needs to cancel after the booking is confirmed?</h4>
        <p>
          If the host cancels after accepting your booking, Beenest will be informed and the event will result in lowered reputation score on the Host on the platform.
        </p>
        <h4>What is  Cancellation Fee?</h4>
        <p>
          Cancellation Fee will be 10% of the total cost. Guests will be charged the Cancellation Fee if they cancel on a confirmed booking.
        </p>
        <h4>Do I get a full refund if I cancel?</h4>
        <p>
          Guests will get a 100% refund (including the Security Deposit) minus the Cancellation Fee if they cancel 7 or more days in advance. The Cancellation Fee will be distributed to Hosts at time of cancellation.
          <br/>
          <br/>
          If guest cancels in less than 7 days, they will not get any refund nor the Cancellation Fee.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Dispute Resolution</h3>
        <h4>I have a dispute with my host, what should I do?</h4>
        <p>
          Please attempt to resolve the dispute by going to the listing page and clicking "Contact Host". If you are not able to resolve your dispute with the host, please notify Beenest of the dispute by visiting <BeeLink target="_blank" href="https://support.beenest.com/">support.beenest.com/</BeeLink>.
        </p>
        <h4>I read about the Arbitration Protocol in the Whitepaper. How does it work with Beenest?</h4>
        <p>
          Currently, disputes that are escalated to Beenest are resolved by the Beenest Community Operations team. As we develop the Beenest platform and Bee protocols, we will integrate the Arbitration protocols as outline in the <BeeLink  href="https://s3-us-west-2.amazonaws.com/beenest-public/whitepaper/bee_whitepaper_v3.pdf" target="_blank">Whitepaper</BeeLink>.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Payment</h3>
        <h4>I'm confused by the payment process.</h4>
        <p>
          <BeeLink href="https://www.youtube.com/watch?time_continue=4&v=tfETpi-9ORs" target="_blank">Tutorial - https://www.youtube.com/watch?time_continue=4&v=tfETpi-9ORs</BeeLink>
          <br/>
          <br/>
          Beenest utilizes Metamask* for payment processing. When a guest makes a payment via Metamask, they authorize Beenest to hold the payment in escrow. When the booking is confirmed, the host is committed to letting the guest(s) stay at their home during the specified nights.
          <br/>
          <br/>
          *Metamask is a third party platform that is currently in a beta state and is used on the Ethereum blockchain. Beenest is not affiliated with Metamask nor is responsible for any misuse, bugs or any possible errors that would otherwise be caused on the Metamask platform. Please review Metamask Terms at <BeeLink  href="https://metamask.io/terms.html" target="_blank">https://metamask.io/terms</BeeLink>.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Booking Confirmation</h3>
        <h4>Is my booking confirmed once I successfully submit the payment?</h4>
        <p>
          No. The host will have 24 hours to approve or deny each booking request upon time of payment submission. If no action is taken within 24 hours, the trip will be automatically denied. At this time, on the "Trips" page, the booking status will be shown as "Pending Host Approval". When the trip is confirmed, the status will change to "Confirmed".
        </p>
      </article>
      <div className="grey-line"></div>
      <h2>For Hosts</h2>
      <article>
        <h3>Cancellation Policy</h3>
        <h4>What happens if I need to cancel on my Guest?</h4>
        <p>
          You will not be charged if you need to cancel a booking from a Guest. However, please note that cancellation will result in lowered reputation score. The score will dictate the rate of discovery of listings.
        </p>
        <h4>The cancellation period is 100% refund as long as a guest cancels 7 days out. Do I have other options for cancellation policy?</h4>
        <p>
          No. We only support a single cancellation policy at the moment. If it is important to you to have an alternative cancellation policy, please visit <BeeLink href="https://support.beenest.com/" target="_blank" >support.beenest.com/</BeeLink>.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Per night cost / additional fees</h3>
        <h4>How do I decide how much Bee to charge per night?</h4>
        <p>
          It is entirely up to Hosts how much they would like to charge. The price of one BEE at time of Token Sale was $0.249 USD.
        </p>
        <h4>How do I charge a cleaning fee?</h4>
        <p>
          At the moment, the cleaning fee will be included in the per night cost instead of being broken out separately. It will be shown to guests as a single amount without the exact breakdown and it is advised that Hosts include the cleaning fee cost in the per night cost. We are planning to separate the charge in the near future.
        </p>
        <h4>How do I charge extra guest fee?</h4>
        <p>
          At the moment, we advise Hosts to calculate possibility of extra guest fee into the per night cost. We are planning to separate the charge in the near future.
        </p>
        <h4>How do I charge a Security Deposit?</h4>
        <p>
          Security Deposit will be determined by Hosts for each listing. Guests will be required to pay the Security Deposit in full upon time of making the booking request. The deposit will be returned to the Guest 3 business days after check-out, provided that no disputes on are filed on either side.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Payment</h3>
        <h4>When do I get paid?</h4>
        <p>
          Hosts will be paid out 3 business days after check-out, provided that no disputes are filed on either side.
        </p>
        <h4>What wallet addresses should I put to accept payment?</h4>
        <p>
          A couple wallet examples include Metamask or MyEtherWallet.
        </p>
        <h4>Can I set my own House Rules?</h4>
        <p>
          Host will be able to set own house rules in regards to check-in and check-out time as well as party, pet, and smoking policies. These terms will be shown to Guests during payment. Guest will also have access to this information after trip confirmation.
        </p>
        <h4>Do you support TOT tax? Or should I be adding the tax on top of the per night fee?</h4>
        <p>
          We don't currently have support for remitting TOT taxes, so you would have to pay it directly to the city.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Guarantee</h3>
        <h4>What is Beenest's insurance policy?</h4>
        <p>
          In events where the damage incurred by the Guests exceeds the Security Deposit, Beenest will cover up to $50,000. Specific amounts will be discussed case by case.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Dispute resolution</h3>
        <h4>I have an issue with my Guest. What should I do?</h4>
        <p>
          In the event where damages are incurred by Guests during the course of the stay (for example: the guest breaks a table or leaves the home in a terrible condition), and the Host wishes to claim a portion or all of the Security Deposit, the Host will have to notify Beenest of the dispute within 24 hours of check-out (or before the next Guest checks in, whichever is earlier) to which Beenest will determine the credibility of the charges and if the Host can keep the Security Deposit.
        </p>
      </article>
      <div className="grey-line"></div>
      <h2>General</h2>
      <article>
        <h3>Bee Token</h3>
        <h4>What is the difference Bee Token and Beenest?</h4>
        <p>
          Inspired by the idea of working bees working together collectively in a decentralized network, we built our brand around "Bee", with "Beenest" as the name of our main decentralized home sharing platform. During our token sale, we branded ourselves as "Bee Token" to emphasize tokenization while establishing a presence. Post token sale, we are focused on delivering our Beenest platform to users, which transacts in token BEE.
        </p>
        <h4>What is the value of transacting in Bee? (BEE)?</h4>
        <p>
          Creating an in-house Bee Token that interacts with the Beenest platform allows the network to have aligned goals and incentives, prepares a platform to be agnostic to a singular cryptocurrency or digital token, and allows better management of the side chain. <BeeLink href="/" target="_blank">Read more</BeeLink>
        </p>
        <h4>Does Beenest accept ETH, BTC, other fiat currencies or USD?</h4>
        <p>
          At the moment no. But in the near future we will look to accept ETH, then eventually USD.
        </p>
        <h4>How do I get BEE? And how do I spend it?</h4>
        <p>
          Our token sale was closed on Feb 2, 2018 and our platform is currently only open to participants in our token sale. We plan to open our platform to the general public in the near future. If you would like to be notified of when you will be able to sign up, please fill out our guest waitlist by <BeeLink href="https://docs.google.com/forms/d/e/1FAIpQLSeAVbnxzMT1f5j8IzyFumiFcA_5WrwsURv9iDCaJp3c8Y-LMA/viewform" target="_blank">clicking here</BeeLink>.
          <br/>
          For instructions on how to send BEE via Metamask, please see our <BeeLink href="https://medium.com/@thebeetoken/how-to-view-bee-token-on-mew-and-metamask-6ba25d327862 " target="_blank">tutorial on Medium</BeeLink>.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <h3>Bee Protocols</h3>
        <h4>How does Beenest work with P-A-R (Payment, Arbitration, Reputation) protocols?</h4>
        <p>
          While the Beenest platform is in alpha, the arbitration and reputation protocols will not be integrated into the platform. We plan to have the Bee Protocols live on main net by Q4 2018.
        </p>
      </article>
      <div className="grey-line"></div>
      <article>
        <div>
          <p>Still need help?</p>
          <BeeLink href="https://support.beenest.com/" target="_blank">
            <Button clear={true} border={'core'} color={'core'}>Contact Beenest</Button>
          </BeeLink>
        </div>
      </article>
    </section>
  </HelpContainer>
);

export default Help;
