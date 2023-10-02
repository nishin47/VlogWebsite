import React from 'react';
import { Accordion, Image, ImageGroup, Segment } from 'semantic-ui-react';
import DocumentViewer from '../../app/common/media/DocumentViewer';

const level1Panels = [
  { key: 'panel-1a', content: <DocumentViewer filename='Sample_DVisa_Form' /> }
];

const Level1Content = (
  <div>

    <Accordion.Accordion exclusive={false} panels={level1Panels} />
  </div>
);

const level2Panels = [
  { key: 'panel-2a', content: 'Your passport should be valid for at least six months beyond the intended duration of your stay. It should also have at least two blank pages for visa stamps.' }
];

const Level2Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level2Panels} />
  </div>
);


const level3Panels = [
  {
    key: 'panel-3a', content: <div> Provide recent passport-sized photographs that meet the specifications of the specific country.
      Usually, two to three photographs are required.
      <Segment basic>
        <p style={{fontWeight:800}}> General rules :</p>
        <li> must be taken within last 6 months</li>
        <li> must have a light background </li>
        <li> no software corrections allowed</li>
        <li> face 70-80% of the height of the photo</li>
      </Segment>
    </div>
  }
];

const Level3Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level3Panels} />
  </div>
);

const level4Panels = [
  { key: 'panel-4a', title: '6 Month Bank statement', content: 'A bank statement of six months is required, although in some cases they may accept a three-month statement. However, for safety purposes, it is advisable to bring a sealed bank statement covering a period of six months.' }
];

const Level4Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level4Panels} />
  </div>
);



const level5Panels = [
  {
    key: 'panel-5a', content: <>
      <Segment basic>
        Ensure you consult your country's embassy regarding the list of authorized insurance providers offering coverage ranging from 30,000 to 50,000 euros.
        <br />During my own search, I discovered that Reliance General Insurance was the most affordable and trustworthy choice.
        <br /> I paid 2.7K INR for a four-month insurance plan.
      </Segment>
      <Image src='/assets/documents/reliance_general.png' />
      <Image src='/assets/documents/reliance_general_1.png' />

    </>
  }
];

const Level5Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level5Panels} />
  </div>
);


const level6Panels = [
  {
    key: 'panel-6a', content:
      <Segment >
        The fees differ depending on the country you are applying for. It is recommended to inquire with your embassy for the specific charges.
        <div>
          <br />
          Kindly request your bank to enable international payment functionality,
          ensuring that you can make payments in euros at the embassy. Please verify and confirm this with your bank.
        </div>
      </Segment>
  }



];

const Level6Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level6Panels} />
  </div>
);


const level7Panels = [
  {
    key: 'panel-7a', title: 'Apostle documents (Marriage Certificate / Birth Certificates / Educational documents )', content: <div>
      <Segment basic>
        <div>
          Document apostille is the process of certifying the authenticity of a document for international use. It involves attaching an apostille certificate to the document, which verifies its legitimacy and allows it to be recognized in countries that are members of the Hague Apostille Convention. <br/>
          <br />
          To obtain an apostille in India, follow these steps:

          <ol>
            <li>Determine the issuing authority: Identify the appropriate authority responsible for issuing apostilles in your region. In India, the Ministry of External Affairs (MEA) is the designated authority for apostille services.</li>

            <li>Prepare your documents: Ensure that the documents you wish to apostille are valid and have been issued by a recognized authority. These documents can include educational certificates, birth/marriage certificates, power of attorney, and other legal documents.</li>

            <li>Get notarization: Before applying for an apostille, you may need to get your documents notarized by a notary public or a designated authority.</li>

            <li>Submit the documents: Take your original documents, along with photocopies, to the authorized agency or outsourced service provider authorized by the MEA for apostille services. These include selected Branch Secretariats, MEA Offices, or outsourced service providers.</li>

            <li>Pay the fees: Pay the requisite fees for apostille services. The fee amount and payment method will vary based on the issuing authority.</li>

            <li>Collect the apostilled documents: Once the apostille process is complete, collect your documents. They will now bear the apostille sticker or certificate, which confirms their authenticity for use in countries that accept apostilles.</li>


          </ol>

          <p style={{ fontWeight: 800 }}> Contact any travel agency, We paid almost 2.5 - 3k INR for getting a document apostled .</p>
          <p style={{ fontWeight: 800 }}>Remember that the process and requirements may vary, so it is advisable to contact the issuing authority or the outsourced service provider for detailed information and guidance on apostilling documents in India.</p>
          <p style={{ fontWeight: 800 }}> The original document sent for apostille will bear an official seal, as illustrated below.</p>
        </div>

      </Segment>
      <Image src='/assets/documents/marriage_cert_apostle.png' />
    </div>
  }
];

const Level7Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level7Panels} />
  </div>
);
const level8Panels = [
  {
    key: 'panel-7b',
    content: 'Receiving a positive notification from the Immigration Service or embassy, or obtaining a confirmation from your employer, signifies the successful registration of your short-term employment.'
  }

];

const Level8Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level8Panels} />
  </div>
);


const level9Panels = [
  {
    key: 'panel-7b',
    content: 'Receiving a positive notification from the Immigration Service or embassy, or obtaining a confirmation from your employer, signifies the successful registration of your short-term employment.'
  }

];

const Level9Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level9Panels} />
  </div>
);

const level10Panels = [
  {
    key: 'panel-10b',
    content: 'A brief intro, explain the purpose of journey and duration of your stay (details of Work or Study), Proof of fund and its mode (card or cash) and details of accomodation (if prepaid)'
  }

];

const Level10Content = (
  <div>
    <Accordion.Accordion exclusive={false} panels={level10Panels} />
  </div>
);


const rootPanels = [
  { key: 'panel-1', title: 'Long Stay Visa Form | D Visa form | MVV visa', content: { content: Level1Content } },
  { key: 'panel-2', title: 'Valid Passport', content: { content: Level2Content } },
  { key: 'panel-3', title: 'Passport-Sized Photographs', content: { content: Level3Content } },
  { key: 'panel-4', title: 'Proof of Fund', content: { content: Level4Content } },
  { key: 'panel-5', title: 'Health Insurance', content: { content: Level5Content } },
  { key: 'panel-6', title: 'Pay costs of application or State Fee', content: { content: Level6Content } },
  { key: 'panel-8', title: 'Documents indicating the purpose of journey (Work)', content: { content: Level8Content } },
  { key: 'panel-7', title: 'Original Marriage Certificates (in case of applying as a spouse) and Birth Certificates (in case of applying as a child) must be apostilled ', content: { content: Level7Content } },
  { key: 'panel-9', title: 'Documents indicating the purpose of journey (Study)', content: { content: Level8Content } },
  { key: 'panel-10', title: 'Cover letter', content: { content: Level10Content } },
];

const Dvisa = () => (
  <div style={{ width: '100%' }}>
    <Accordion exclusive={false} panels={rootPanels} styled style={{ width: '100%', padding: '2%' }} />

  </div>
);

export default Dvisa;
