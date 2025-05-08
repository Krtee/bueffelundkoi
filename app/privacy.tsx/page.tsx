import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";

const Privacy: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <Head>
        <title>BÜFFEL & KOI</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavigationBar />

        <div className="p-10 privacy">
          <h1>
            Datenschutz
            <wbr />
            erklärung
          </h1>
          <h2>§ 1 Informationen über die Erhebung personenbezogener Daten</h2>
          <p>
            Im Folgenden informieren wir im Rahmen unserer Informationspflichten
            nach Art. 13 ff. EU-Datenschutzgrundverordnung (nachfolgend
            &quot;DSGVO&quot;) über die Erhebung personenbezogener Daten,
            insbesondere auch in Bezug auf die Nutzung unserer Website{" "}
            <a href="http://www.bueffelundkoi.de">www.bueffelundkoi.de</a>
            (nachfolgend &quot;Website&quot;).
          </p>
          <p>
            Personenbezogene Daten sind alle Daten, die auf Sie persönlich
            beziehbar sind, zum Beispiel Name, Adresse, E-Mail-Adresse.
          </p>
          <p>
            <strong>Verantwortliche Stelle</strong>
            <br />
            Verantwortliche im Sinne des Art. 4 Abs. 7 DSGVO für die
            personenbezogenen Daten der Website-Besucher (nachfolgend
            &quot;Sie&quot;) ist:
          </p>
          <p>
            <b>BÜFFEL &amp; KOI</b>
            <br />
            Katzenbachstraße. 45 <br />
            70563 Stuttgart
            <br />
            E-Mail:{" "}
            <a href="mailto:bueffelundkoi@gmail.com">bueffelundkoi@gmail.com</a>
          </p>
          <h2>
            <strong>
              § 2 Erhebung personenbezogener Daten bei Besuch unserer Website
            </strong>
          </h2>
          <h3>1. Informatorische Nutzung unserer Website</h3>
          <p>
            Wenn Sie unsere Website aufrufen, um sie lediglich zu besuchen,
            erheben wir nur die personenbezogenen Daten, die Ihr Browser
            automatisch an unseren Server übermittelt, um einen
            Verbindungsaufbau zu ermöglichen. Folgende Daten werden dadurch
            erhoben:
          </p>
          <ul>
            <li>Datum und Uhrzeit des Abrufs unserer Website</li>
            <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
            <li>Inhalt der Anforderung (konkrete Seite)</li>
            <li>jeweils übertragene Datenmenge</li>
            <li>verwendeter Browsertyp und dessen Version</li>
            <li>Sprache des verwendeten Browsertyps</li>
            <li>Betriebssystem, dessen Version und dessen Oberfläche</li>
            <li>
              die Websites, die vom System des Besuchers über unsere Website
              aufgerufen werden (sog. Referrer)
            </li>
            <li>der Zugriff auf die Internetseite</li>
            <li>Ihre IP-Adresse</li>
            <li>Internet Service-Provider des zugreifenden Systems</li>
          </ul>
          <p>
            Die oben genannten Daten sind für uns technisch erforderlich, um
            Ihnen unsere Website anzuzeigen sowie die Stabilität und Sicherheit
            zu gewährleisten. Die Verarbeitung erfolgt auf der Rechtsgrundlage
            des Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.
            f&nbsp;DSGVO.
          </p>
          <h3>
            2. <strong>Kontaktaufnahme per E-Mail oder Telefon</strong>
          </h3>
          <p>
            Sie haben die Möglichkeit, uns per E-Mail oder Telefon zu
            kontaktieren. Ihre auf diesem Weg übermittelten personenbezogenen
            Daten werden bei uns gespeichert. Eine Weitergabe dieser Daten an
            Dritte erfolgt nicht. Diese Daten werden ausschließlich gespeichert,
            um Ihre Kontaktanfrage bearbeiten zu können.
          </p>
          <p>
            Soweit sich Ihre Anfrage auf ein bestehendes Vertragsverhältnis mit
            Ihnen bezieht oder Sie an einem Vertragsabschluss interessiert sind,
            erfolgt die Datenverarbeitung auf der Rechtsgrundlage des
            Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.b DSGVO. In
            solchen Fällen speichern wir Ihre Daten solange diese zur
            Durchführung des Vertrages erforderlich sind. Darüberhinausgehend
            speichern wir Ihre Daten nur, um vertraglichen oder gesetzlichen
            Verpflichtungen (z. B. steuerlichen Pflichten) nachzukommen
            (Art.&nbsp;6 Abs.&nbsp;1&nbsp;S.&nbsp;1 lit.c DSGVO).
          </p>
          <p>
            Andernfalls erfolgt die Datenverarbeitung auf der Rechtsgrundlage
            des
            Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.f&nbsp;DSGVO
            und in unserem Interesse, um Ihre Anfrage mit den für Sie relevanten
            Informationen beantworten zu können. In diesem Fall werden die Daten
            nur so lange gespeichert, bis der Grund Ihre Anfrage sich erledigt
            hat.
          </p>
          <h3>
            3. <strong>Nutzung des Kontaktformulars</strong>
          </h3>
          <p>
            Wenn Sie mit uns über das auf unserer Website zur Verfügung
            gestellte Kontaktformular in Verbindung treten möchten, erheben wir
            von Ihnen folgende Daten:
          </p>
          <ul>
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Ihre Nachricht an uns</li>
          </ul>
          <p>
            Wir verwenden diese Daten, um auf Ihre Anfrage antworten zu können.
          </p>
          <p>
            Soweit sich Ihre Anfrage auf ein bestehendes Vertragsverhältnis mit
            Ihnen bezieht oder Sie an einem Vertragsabschluss interessiert sind,
            erfolgt die Datenverarbeitung auf der Rechtsgrundlage des
            Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.b&nbsp;DSGVO.
            In solchen Fällen speichern wir Ihre Daten solange diese zur
            Durchführung des Vertrages erforderlich sind. Darüberhinausgehend
            speichern wir Ihre Daten nur, um vertraglichen oder gesetzlichen
            Verpflichtungen (z. B. steuerlichen Pflichten) nachzukommen
            (Art.&nbsp;6 Abs.&nbsp;1&nbsp;S.&nbsp;1 lit.c DSGVO).
          </p>
          <p>
            Andernfalls erfolgt die Datenverarbeitung auf der Rechtsgrundlage
            des Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.f DSGVO und
            in unserem Interesse, um Ihre Anfrage mit den für Sie relevanten
            Informationen beantworten zu können. In diesem Fall werden die Daten
            nur so lange gespeichert bis der Grund Ihrer Anfrage sich erledigt
            hat.
          </p>
          <h3>
            4. <strong>Einsatz von Cookies</strong>
          </h3>
          <p>
            Zusätzlich zu den zuvor genannten Daten werden bei Ihrer Nutzung
            unserer Website Cookies auf Ihrem Rechner gespeichert.
          </p>
          <p>
            Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer
            Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert
            werden und durch welche der Stelle, die den Cookie setzt (hier durch
            uns) bestimmte Informationen zufließen. Cookies können keine
            Programme ausführen oder Viren auf Ihren Computer übertragen. Sie
            dienen dazu, das Internet insgesamt nutzerfreundlicher und
            effektiver zu machen.
          </p>
          <p>
            Wir nutzen hierbei eigene Cookies, um die Funktionalität unserer
            Website zu gewährleisten. Dazu zählen insbesondere die
            Session-Cookies. Diese speichern eine sogenannte Session-ID, mit
            welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen
            Sitzung zuordnen lassen. Die Session-Cookies verfallen nach
            Verlassen unserer Website.
          </p>
          <p>
            Für die Verarbeitung der durch die Cookies erhobenen und genutzten
            personenbezogenen Daten zu den genannten Zwecken ist die
            Rechtsgrundlage
            Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.f&nbsp;DSGVO.
          </p>
          <p>
            <strong>Hinweis:</strong>
            <br />
            Sie können durch Ihre Browsereinstellung selbst bestimmen, ob
            Cookies gesetzt und abgerufen werden. Sie können hierbei sich gegen
            den Einsatz von Cookies entscheiden oder die Speicherung nur von
            bestimmten Cookies zulassen. Dort können Sie auch die bereits
            gespeicherten Cookies einsehen und löschen.
          </p>
          <p>
            Allerdings kann die Ablehnung von Cookies dazu führen, dass nicht
            alle Funktionen unserer Website zur Verfügung stehen.
          </p>
          <h2>
            § 3 <strong>Einsatz von Google Invisible reCaptcha</strong>
          </h2>
          <p>
            Wir verwenden auf unsere Website den Service Invisible reCaptcha von
            Google Ireland Ltd (nachfolgend &quot;Google reCaptcha&quot;),
            Gordon House, 4 Barrow St, Dublin, D04 E5W5, Irland.
          </p>
          <p>
            Google reCaptcha verwendet hierbei ein sog. reCaptcha-Cookie, um zu
            prüfen, ob die Dateneingabe z. B. in dem Kontaktformular auf der
            Website durch einen Menschen oder durch ein automatisiertes Programm
            (Spam Bot) erfolgt. Hierbei wird das Verhalten des Websitebesuchers
            anhand verschiedener Merkmale untersucht. Diese Analyse beginnt
            automatisch, sobald Sie unserer Website betreten. Zur Analyse werden
            verschiedene Informationen durch Google reCap-tcha (wie z. B.
            IP-Adresse, Cookies, die Google in den letzten Monaten gesetzt hat,
            Plug-Ins des Browsers, Mausbewegungen) erfasst und zusammen mit der
            Cookie-ID an Google weitergeleitet. Es kann nicht ausgeschlossen
            werden, dass Google es dadurch ermöglicht wird, Ihr Verhalten
            webseitenübergreifend zu verfolgen.
          </p>
          <p>
            Für diesen Vorgang sind wir im Sinne der DSGVO mitverantwortlich, da
            wir diesen Service für unsere Website nutzen und Google durch Ihren
            Besuch unserer Website personenbezogene Informationen erhebt und
            verarbeitet. Rechtsgrund-lage hierfür ist Art. 6 Abs. 1 S. 1 lit.f
            DSGVO. Wir haben ein berechtigtes Interes-se daran, unsere Website
            vor missbräuchlicher automatisierter Ausspähung und vor Spam zu
            schützen.
          </p>
          <p>
            Im Rahmen der Nutzung von Google reCAPTCHA kann es auch zu einer
            Übermitt-lung von personenbezogenen Daten an die Server der Google
            LLC. in den USA kommen. Für den Fall der Übermittlung von
            personenbezogenen Daten an die Google LLC. mit Sitz in den USA, hat
            sich Google LLC. für das us-europäische Datenschutzübereinkommen
            „Privacy Shield“ zertifiziert, welches die Einhaltung des in der EU
            geltenden Datenschutzniveaus gewährleistet. Ein aktuelles Zertifikat
            kann hier eingesehen werden:
          </p>
          <p>
            <a href="https://www.privacyshield.gov/list">
              https://www.privacyshield.gov/list
            </a>
          </p>
          <p>
            Weitere Informationen zu Google reCaptcha sowie die
            Datenschutzerklärung von Google entnehmen Sie aus folgenden Links:
          </p>
          <ul>
            <li>
              <a href="https://policies.google.com/privacy">
                https://policies.google.com/privacy
              </a>
            </li>
            <li>
              <a href="https://www.google.com/recaptcha/intro/v3.html#the-recaptcha-advantage">
                https://www.google.com/recaptcha/intro/v3.html#the-recaptcha-advantage
              </a>
            </li>
          </ul>
          <p>
            Sie haben das Recht aus Gründen, die sich aus Ihrer besonderen
            Situation ergeben, jederzeit dieser auf Art. 6 Abs. 1 lit. f DSGVO
            beruhenden Verarbeitungen Sie betreffender personenbezogener Daten
            zu widersprechen.
          </p>
          <h2>
            § 4{" "}
            <strong>
              Einsatz von Social Media Icons
              <br />
            </strong>
          </h2>
          <p>
            Auf unserer Website werden sog. Social-Media-Icons von sozialen
            Netzwerken verwendet. Diese erkennen Sie an dem sozialen
            Netzwerk-Button.
          </p>
          <p>
            Wir setzen derzeit die Social-Media-Icons von LinkedIn Corporation,
            2029 Stier-lin Court, Mountain View, CA 94043, USA (Verantwortlich
            für die Datenverarbei-tung außerhalb der Vereinigten Staaten
            lebenden Personen ist die LinkedIn Ire-land Unlimited Company Wilton
            Place, Dublin 2, Irland) und Twitter Inc., 1355 Market Street, Suite
            900, San Francisco, CA 94103 U.S.A (Verantwortlich für die
            Datenverarbeitung von außerhalb der Vereinigten Staaten lebenden
            Personen ist die Twitter Internatio-nal Company, One Cumberland
            Place, Fenian Street, Dublin 2 D02 AX07, Irland) ein.
          </p>
          <p>
            Es handelt sich dabei um Hyperlinks des jeweiligen Dienstanbieters.
            Wenn Sie den Social-Media-Button des betroffenen sozialen Netzwerks
            aktiv anklicken, öffnet sich ein neues Fenster Ihres Browsers und
            ruft unseren Internetauftritt bei dem jeweiligen Dienstanbieter auf
            (sog. Zwei-Klick-Lösung).
          </p>
          <p>
            Für Sie bedeutet das, dass allein durch den Aufruf unserer Website
            zunächst keine Verbindung zu dem jeweiligen sozialen Netzwerk
            hergestellt wird. Hier erfolgt noch keine Datenübermittlung an den
            sozialen Netzwerk-Dienstanbieter. Klicken Sie auf einen der Buttons
            und öffnet sich ein neues Fenster Ihres Brow-sers, dann werden Ihre
            personenbezogenen Daten an den sozialen Netzwerk-Dienstanbieter
            weitergeleitet. Hierdurch wird die Information weitergeleitet, dass
            Sie unsere Website besucht haben und von dort aus auf das soziale
            Netz-werk weitergeleitet wurden (sog. Referrer). Zudem werden die
            unter § 2 Ziff. 1 dieser Erklärung genannten Daten übermittelt. Für
            diesen Vorgang sind wir nach der DSGVO mitverantwortlich.
            Anspruchsgrundlage hierfür ist Art. 6 Abs. 1 S. 1 lit. f&#41; DSGVO.
            Unser Interesse besteht darin, unseren Internetauftritt auf den
            jeweiligen sozialen Netzwerken zu stärken und präsenter auf dem
            Markt mitzu-wirken. Ihnen steht es frei, den Button anzuklicken oder
            nicht anzuklicken. Wenn Sie eine solche Datenübermittlung nicht
            wünschen, raten wir vom Anklicken der Social-Media-Buttons ab.
          </p>
          <p>
            Inwiefern die Information, dass Sie von unserer Website kommen und
            welche sonstigen Daten der Dienstanbieter erhebt und auswertet, kann
            von uns nicht beeinflusst werden. Wir haben auch keine Kenntnis
            darüber. Weitere Informati-onen über Zweck und Umfang der
            Datenerhebung und die weitere Verarbeitung und Nutzung der Daten
            durch den Dienstanbieter sowie Informationen zum Datenschutz finden
            Sie auf den Seiten der Dienstanbieter.
          </p>
          <p>
            Sie können die Datenschutzerklärung von LinkedIn unter folgendem
            Link einsehen:
          </p>
          <p>
            <a href="https://www.linkedin.com/legal/privacy-policy?trk=d_org_guest_company_overview_footer-privacy-policy">
              https://www.linkedin.com/legal/privacy-policy?trk=d_org_guest_company_overview_footer-privacy-policy
            </a>
          </p>
          <p>
            Und Sie können die Datenschutzerklärung von Twitter unter folgendem
            Link einsehen:
          </p>
          <p>
            <a href="https://twitter.com/de/privacy">
              https://twitter.com/de/privacy
            </a>
            .
          </p>
          <h2>§ 5 Ihre Rechte</h2>
          <p>
            Wenn wir Ihre Daten verarbeiten, sind Sie Betroffener im Sinne der
            DSGVO (Art. 4 Nr. 1 DSGVO). Ihnen stehen folgende Rechte zu:
          </p>
          <ul>
            <li>Auskunftsrecht,</li>
            <li>Recht auf Berichtigung,</li>
            <li>Recht auf Einschränkung der Verarbeitung,</li>
            <li>Recht auf Löschung,</li>
            <li>Recht auf Unterrichtung,</li>
            <li>Recht auf Datenübertragbarkeit,</li>
            <li>Widerspruchsrecht,</li>
            <li>Widerrufsrecht,</li>
            <li>das Recht, sich bei der Aufsichtsbehörde zu beschweren.</li>
          </ul>
          <p>
            <strong>Im Einzelnen:</strong>
          </p>
          <h3>
            1. <strong>Auskunftsrecht</strong>
          </h3>
          <p>
            Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen,
            ob wir Ihre personenbezogenen Daten verarbeiten; ist dies der Fall,
            so haben Sie das Recht auf Auskunft über die betreffenden
            personenbezogenen Daten und über folgende Informationen:
          </p>
          <ul>
            <li>Verarbeitungszweck,</li>
            <li>Kategorie der verarbeiteten personenbezogenen Daten,</li>
            <li>
              die Empfänger oder Kategorien der Empfänger, gegenüber denen die
              personenbezogenen Daten offengelegt werden,
            </li>
            <li>
              falls möglich die geplante Dauer, für die die personenbezogenen
              Daten gespeichert werden,
            </li>
            <li>
              das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie
              betreffenden personenbezogenen Daten oder Einschränkung der
              Verarbeitung durch uns oder eines Widerspruchsrechts gegen diese
              Verarbeitung,
            </li>
            <li>
              das Bestehen eins Beschwerderechts bei einer Aufsichtsbehörde.
            </li>
          </ul>
          <h3>
            2.{" "}
            <strong>
              Recht auf Berichtigung
              <br />
            </strong>
          </h3>
          <p>
            Sie haben das Recht, von uns unverzüglich die Berichtigung und/oder
            die Vervollständigung, der sie betreffenden
            unrichtigen/unvollständigen personenbezogenen Daten zu verlangen.
          </p>
          <h3>
            3. <strong>Recht auf Löschung</strong>
          </h3>
          <p>
            Sie haben das Recht, von uns zu verlangen, dass wir Ihre
            personenbezogenen Daten unverzüglich löschen, wenn einer der in Art.
            17 DSGVO genannten Gründe vorliegt, wie z. B. wenn Ihre Daten für
            die Zwecke nicht mehr notwendig sind; wenn die Einwilligung
            widerrufen wurde und keine anderweitige Rechtsgrundlage besteht;
            oder bei unrechtmäßiger Datenverarbeitung.
          </p>
          <h3>
            4. <strong>Recht auf Einschränkung der Verarbeitung</strong>
          </h3>
          <p>
            Sie haben das Recht, von uns die Einschränkung der Verarbeitung zu
            verlangen, wenn eine der in Art. 18 DSGVO aufgeführten
            Voraussetzungen gegeben ist, zum Beispiel wenn Sie Widerspruch gegen
            die Verarbeitung eingelegt haben, für die Dauer der Prüfung durch
            uns.
          </p>
          <h3>
            5. <strong>Recht auf Unterrichtung</strong>
          </h3>
          <p>
            Wenn Sie Ihr Berichtigungs-, Löschungs- oder Einschränkungsrecht
            gegenüber uns geltend gemacht haben, müssen wir allen Empfängern,
            denen wir Ihre personenbezogenen Daten offengelegt haben, die
            Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer
            Daten mitteilen, es sei denn, dies erweist sich als unmöglich oder
            ist mit einem unverhältnismäßigen Aufwand verbunden.
          </p>
          <h3>
            6. <strong>Recht auf Datenübertragbarkeit</strong>
          </h3>
          <p>
            In Fällen, in denen eine Verarbeitung aufgrund einer Einwilligung
            gemäß Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;lit.&nbsp;a oder
            Art.&nbsp;9&nbsp;Abs.&nbsp;2&nbsp;lit.&nbsp;a&#41; DSGVO oder eines
            Vertrages gemäß Art.&nbsp;6&nbsp;Abs.&nbsp;1&nbsp;lit.&nbsp;b&#41;
            DSGVO und mit Hilfe automatisierter Verfahren erfolgte, haben Sie
            das Recht, Ihre personenbezogenen Daten, die Sie uns bereitgestellt
            haben, in einem strukturierten, gängigen und maschinenlesbaren
            Format von uns zu erhalten. Sie können diese Daten auch an andere
            Stellen übermitteln oder durch uns übermitteln lassen.
          </p>
          <h3>
            7. <strong>Widerspruchsrecht</strong>
          </h3>
          <p>
            Wenn wir aufgrund der Anspruchsgrundlage Art.
            6&nbsp;Abs.&nbsp;1&nbsp;S.&nbsp;1&nbsp;lit.&nbsp;e&#41;&nbsp;oder&nbsp;f&#41;
            DSGVO Ihre personenbezogenen Daten verarbeiten, können Sie aus
            Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
            Widerspruch gegen die Verarbeitung einlegen.
          </p>
          <p>
            Das Widerspruchsrecht haben Sie auch im Falle der Verarbeitung Ihrer
            personenbezogenen Daten zum Zweck der Direktwerbung. Sie können
            jederzeit und ohne Angabe von Gründen diesen widersprechen.
          </p>
          <h3>
            8. <strong>Widerrufsrecht</strong>
          </h3>
          <p>
            Falls Sie eine Einwilligung zur Verarbeitung Ihrer Daten erteilt
            haben, können Sie diese jederzeit mit Wirkung für die Zukunft
            widerrufen.&nbsp;
          </p>
          <h3>
            9.{" "}
            <strong>
              Recht auf Beschwerde bei einer Aufsichtsbehörde
              <br />
            </strong>
          </h3>
          <p>
            Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen
            oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
            Aufsichtsbehörde, wenn Sie der Ansicht sind, dass die Verarbeitung
            Ihrer personenbezogenen Daten gegen die DSGVO verstößt.
          </p>
          <p>
            Eine Liste der deutschen Aufsichtsbehörden für den Datenschutz und
            deren Kontaktadressen finden Sie unter:
          </p>
          <p>
            <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">
              https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
            </a>
          </p>
          <h2>§ 6 Aktualität dieser Datenschutzerklärung</h2>
          <p>Stand: Juli 2021</p>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default Privacy;
