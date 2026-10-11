# Embassy Commons voorstel voor Dutch Bitcoin Embassy

Embassy Commons maakt de werkwijze, kennis en software van Dutch Bitcoin Embassy herbruikbaar voor lokale Bitcoin gemeenschappen. Een team in ieder land kan een eigen repository, website en programma starten, het materiaal vertalen en zelfstandig beheren. Dutch Bitcoin Embassy wordt de eerste uitgever van de gezamenlijke basis, zonder een centrale eigenaar te worden van buitenlandse organisaties.

Het voorstel is om te beginnen met een kleine, zelfstandig te hosten starterrelease en een pilot van 90 dagen. Die release bevat een openbare kennisbasis, voorbeelddata, een landenstarter en afspraken voor bijdragen en publicatie. De huidige oplevering is een gebouwde starter en demonstratie met eigen voorbeeldmateriaal, acht nieuwe originele NL/EN playbooks en één Nederlands openbaar bronrecord. Een aparte herbruikbare DBE-bronreferentie bevat de drie circles en twee historische bijeenkomsten uit de openbare website, met herkomst en rechten. De playbooks zijn conceptmateriaal voor inhoudelijke beoordeling, geen migratie van bestaande officiële lesinhoud. De bestaande interne data van Dutch Bitcoin Embassy is nog geen onderdeel van deze publicatie. Een inventarisatie, rechtencontrole en inhoudelijke beoordeling gaan vooraf aan de eerste echte Nederlandse datarelease.

## Het product en de gebruikers

Een lokale organisator moet zonder toestemming voor het gebruik van de gelicentieerde software en kennis kunnen beginnen. Het team kiest een eigen naam, taal, domein, rechtsvorm en werkwijze. Het mag een afgeleide versie gebruiken zonder zich aan te sluiten bij een netwerk of verbeteringen terug te sturen. Het oorspronkelijke materiaal behoudt de vermeldingen die de toepasselijke licentie vraagt.

De kennisbasis dient drie gebruikersgroepen. Organisatoren krijgen praktische draaiboeken voor een eerste bijeenkomst, vrijwilligers, educatie en het bijhouden van openbare informatie. Bezoekers krijgen uitlegbaar lesmateriaal en een zichtbare route naar lokale activiteiten. Bijdragers krijgen eenvoudige bestanden, herleidbare bronnen en een reviewproces om een vertaling of verbetering voor te stellen.

De naam Bitcoin Embassy duidt hier op een onafhankelijk gemeenschapsinitiatief. De website en lokale afgeleiden moeten dat zichtbaar uitleggen. Het product verleent geen diplomatieke status, overheidsmandaat of officiële vertegenwoordiging. Lokale partijen mogen geen aansluiting, certificering of steun van Dutch Bitcoin Embassy suggereren die niet afzonderlijk is afgesproken.

## Wat de eerste release levert

| Onderdeel | Starterrelease | Uitbreiding na de pilot |
| --- | --- | --- |
| Publieke website | Zes views: overzicht, landregister, bibliotheek, landenstarter, open data en voorstel | Meer talen, toegankelijkheidsaudit en uitgebreidere lokale content |
| Landenstarter | Generator met drie stappen naar een volledige zelfstandig te hosten ZIP; CLI voor config en uitvoermap | Import van bestaande lokale repositories en begeleide migratie |
| Kennis | Acht originele NL/EN conceptplaybooks met lezen en Markdown downloaden | Gecontroleerde echte Dutch Bitcoin Embassy kennis en nieuwe lokale bijdragen |
| Open data | Manifest, JSON, schema's, versie en downloads; eigen templates en één apart Nederlands bronrecord | Goedgekeurde echte datasets, correcties en versies |
| Publicatiecontrole | Validatie van releasebestanden en expliciete afspraken over rechten en gevoelige informatie | Automatische publicatiecontrole met een traceerbare reviewgeschiedenis |
| Samenwerking | Gedocumenteerde pull request workflow en optionele terugkoppeling | Een vrijwillige openbare directory en een federatieprotocol |
| Beheer | Bestanden en Git als bron; geen centrale accountverplichting | Een optionele redactieomgeving voor teams die dat nodig hebben |

Een download of voorbeeldland is geen bestaande lokale partner. Landvoorbeelden illustreren hoe een afgeleide versie werkt. De site behandelt ze niet als erkende ambassades, pilotdeelnemers of aangesloten organisaties.

Het landregister bevat Nederland als openbaar bronrecord en Duitsland, Kenia en Brazilië als demonstratietemplates. De basis werkt met Node.js 22 of hoger en zonder externe runtimeafhankelijkheden. De openbare interface is een statische website. De zelfstandige landen-ZIP en de volledige bronrelease maken de werking zonder centrale dienst overdraagbaar. De preview is privé en voor beoordeling. De nieuwe, zelfstandig geschreven broncode staat openbaar op [Vinnybtc/embassy-commons](https://github.com/Vinnybtc/embassy-commons).

De starterrelease int geen geld, beheert geen wallets, bewaart geen privésleutels, verwerkt geen ledenregistratie en verzorgt geen evenementbetalingen. Een lokale organisatie kan later eigen diensten toevoegen en is dan verantwoordelijk voor de bijbehorende operationele en lokale vereisten. Voor de basis is een statische website genoeg; er is geen database, centrale aanmelding of commerciële API nodig.

## De dagelijkse gebruiksroute

1. Een lokaal team bekijkt de kennis en kiest een eigen land, taal en projectnaam.
2. Het downloadt het starterpakket en maakt een eigen kopie of fork van de repository.
3. Het stelt de lokale configuratie in, vervangt voorbeelden en zet zijn eigen onafhankelijke identiteit zichtbaar op de website.
4. Het controleert rechten, herkomst, kwaliteit en publiceerbaarheid van ieder eigen record.
5. Het valideert de bestanden, publiceert de website en organiseert een eerste activiteit met het draaiboek.
6. Het kan een vertaling, foutcorrectie of verbeterd draaiboek als pull request aan de gezamenlijke basis aanbieden. Deelname daaraan is vrijwillig.

Volledige toegang betekent toegang tot alle publiek vrijgegeven broncode, bronbestanden en kennis, met het recht om deze binnen hun licentie te gebruiken en te wijzigen. Het betekent geen toegang tot bestaande privéaccounts, wachtwoorden, interne correspondentie, ledenlijsten of gegevens van anderen.

## Architectuur voor onafhankelijke landen

De gezamenlijke basis, ook upstream genoemd, bevat de software, gedeelde kennis, gegevensschema's, governance en releases. Iedere lokale afgeleide, ook downstream genoemd, bevat een eigen configuratie, eigen lokale content en de gekozen versie van de basis. Een lokaal team kan wijzigingen teruggeven zonder zijn hele repository of interne administratie te delen.

Bestanden blijven de bron. Openbare data wordt als leesbare JSON opgeslagen; kennis en werkwijzen als Markdown. Een website gebruikt deze bestanden om ze te presenteren. Exports moeten zonder de oorspronkelijke website bruikbaar blijven. Git geschiedenis maakt zichtbaar wie wat veranderde. Releasebestanden bundelen de exacte versie van code, schema, content en licenties.

De MVP gebruikt lokale bestanden en downloads. Er is nog geen automatische synchronisatie tussen landen, geen live register met geverifieerde organisaties en geen centraal beheer van lokale websites. Het federatiemodel hieronder beschrijft hoe dat later kan groeien zonder landen afhankelijk te maken van de Nederlandse website.

De nieuwe openbare bronrepository is `Vinnybtc/embassy-commons`, met starterversie 0.1.0. Vincent kan die later overdragen aan een door hem gekozen Dutch Bitcoin Embassy organisatie. Er is geen nieuwe GitHub-organisatie aangemaakt. De starter is onafhankelijk geschreven; privétoegang tot bestaande DBE repositories is geen besluit om die repositories openbaar te maken.

Een latere vrijwillige federatie laat een lokale organisatie een openbare manifest-URL registreren. Zo'n manifest bevat alleen de projectidentiteit, landcode, website, versie, licenties en de verwijzing naar eigen publiceerbare datasets. De directory haalt uitsluitend die expliciet vrijgegeven informatie op. Wijzigingen worden eerst zichtbaar als te beoordelen voorstellen. Geen enkel land krijgt automatisch schrijfrechten op andermans data. Uittreden verwijdert de vermelding uit de directory; de lokale repository en website blijven bruikbaar.

## Compatibiliteit en updates

Softwareversie, datasetschema en contentversie krijgen afzonderlijke versies. Een patch verhelpt fouten; een minor versie voegt compatibele mogelijkheden toe; een major versie kan een migratie vragen. Bij iedere major versie hoort een leesbaar migratiepad, een voorbeeld en een controle die incompatibele bestanden afwijst.

Een lokale organisatie houdt de gekozen upstreamversie vast en houdt lokale content gescheiden van gedeelde bestanden. Updates gaan via een lokale branch en review, nooit via een verplichte centrale push. De beheerder vergelijkt de wijziging, valideert zijn eigen configuratie en publiceert pas daarna. Binnen de pilot is er één ondersteunde starterlijn. De capaciteit voor onderhoud van oudere versies wordt besloten voordat meerdere lijnen worden aangeboden.

Vertalingen noemen hun brontaal en de versie of hash van het vertaalde origineel. Bij wijziging van dat origineel krijgt de vertaling de status 'review nodig'. Een verouderde vertaling verdwijnt niet stilzwijgend; lezers kunnen zien welke versie ze lezen.

## Licenties en eigen merk

| Materiaal | Keuze | Praktische toepassing |
| --- | --- | --- |
| Eigen software | MIT | Gebruiken, aanpassen en verspreiden met behoud van de vereiste licentie- en auteursvermelding |
| Eigen kennis en draaiboeken | CC BY 4.0 | Hergebruiken en vertalen met bron, licentielink en vermelding van wijzigingen |
| Eigen gecontroleerde open datasets | CC0 1.0 | Alleen voor expliciet vrijgegeven records waarvan de uitgever de benodigde rechten heeft gecontroleerd |
| Materiaal van derden | De oorspronkelijke licentie | Alleen bundelen als de voorwaarden hergebruik toestaan en de bronvermelding is opgenomen |
| Naam, logo en erkenningslabels | Afzonderlijk merkbeleid | De softwarelicentie is geen toestemming om verbondenheid of erkenning te claimen |

MIT staat ruim softwarehergebruik toe en vraagt behoud van de licentie- en copyrighttekst. Het verplicht afgeleide software niet tot dezelfde licentie. Als Vincent wil dat alle gepubliceerde codewijzigingen ook open blijven, hoort een andere licentiekeuze vóór de openbare eerste release op tafel. [MIT licentie](https://opensource.org/license/mit).

CC BY 4.0 ondersteunt hergebruik en bewerking van de eigen kennis met naamsvermelding, een licentielink en vermelding van wijzigingen. CC0 is uitsluitend voor bewust vrijgegeven data; het verleent geen merkrechten en heft eventuele privacyrechten niet op. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

Alle gegenereerde voorbeeldrecords worden als voorbeeld gemarkeerd. Data op een openbare website van een ander wordt niet automatisch onze data. Het team controleert per bron of het informatie mag kopiëren en onder welke licentie. Waar rechten onduidelijk zijn, kan de catalogus naar de bron linken zonder het materiaal opnieuw te publiceren.

## Kwaliteit en vertrouwen

Voor de pilot zijn inhoudelijke labels voorgesteld met een duidelijke betekenis: 'voorbeeld', 'ingediend', 'inhoudelijk gecontroleerd' en 'review nodig'. Een label noemt waar relevant de reviewdatum, scope en reviewerrol. 'Inhoudelijk gecontroleerd' betekent dat een concrete inhoudelijke controle plaatsvond. Het is geen vergunning, organisatiecertificaat, veiligheidsbelofte of overheidsstatus. De eerste interface onderscheidt het bronrecord van demonstratietemplates; het volledige reviewproces groeit tijdens de pilot.

Voor organisatievermeldingen geldt apart 'zelf aangemeld' of, wanneer daar een werkelijk proces en besluit voor bestaan, 'door het netwerk bevestigd'. In de starter zijn geen organisaties door het netwerk bevestigd. De landelijke voorbeelden blijven voorbeelden. Een lokaal team dat de gedeelde code gebruikt, wordt daarmee niet automatisch opgenomen in de directory.

## Aansluiting op het bestaande Nederlandse platform

Een read-only verkenning van de bestaande website en community-app ondersteunt een gefaseerde aansluiting. De site kan later een exportadapter krijgen voor geselecteerde kennis en openbare records. De community-app kan de overdraagbare kennis en lokale configuratie gebruiken, terwijl gebruikers, chat en registraties in de eigen operationele omgeving blijven.

Er is nog geen bestaande code gekopieerd, geen private operationele data opgenomen en geen bestaande livefunctie als Commons-integratie bewezen. De adapter is een vervolgfase: selecteer materiaal, controleer rechten, exporteer naar het Commons-schema en test de output in een onafhankelijke landfork. De concrete bronverkenning en beperkingen staan in [EXISTING-SOURCES.md](EXISTING-SOURCES.md).

## Organisatie en verantwoordelijkheden

Vincent besluit over de Nederlandse publicatie, de eerste rechthebbende en merkhouder, de pilotcapaciteit en welke eigen bronbestanden vrijgegeven mogen worden. Een releasebeheerder controleert tests, bundels, versies en licenties. Een inhoudsbeheerder beoordeelt lesmateriaal, bronnen en vertalingen. Een databeheerder bewaakt herkomst, publiceerbaarheid en correcties. Lokale teams zijn verantwoordelijk voor hun eigen organisatie en lokale publicaties.

In de eerste pilot kan één persoon meerdere rollen vervullen, maar een publicatie met nieuwe data krijgt een tweede inhoudelijke controle. Open discussie vindt plaats in issues en pull requests. Kwetsbaarheden en gevoelige informatie gaan via het private meldproces. De Nederlandse beheerder kan een lokale kopie niet terugnemen; hij kan wel verkeerde informatie in de gezamenlijke basis corrigeren of een directoryvermelding verwijderen.

De governance krijgt pas een netwerkraad wanneer er daadwerkelijk onafhankelijke deelnemers zijn. De pilot nodigt mogelijke teams uit zonder deelname te veronderstellen. Meer landen op een scherm is geen bewijs van adoptie.

## Pilot van 90 dagen

De pilot start wanneer Vincent het publicatiepakket en de eigenaren van de rollen vaststelt. Dagen zijn kalenderdagen vanaf die start; er zijn nog geen deelnemers of startdatum bevestigd.

| Periode | Werk | Resultaat om te beoordelen |
| --- | --- | --- |
| Dag 1 tot 14 | Inventariseer Nederlandse bronnen; beslis rechten, naam en rollen; controleer starter en publicatieproces | Rechtenmatrix, releasekandidaat, eigen dataselectie en heldere aansprakelijke beheerders |
| Dag 15 tot 30 | Zoek twee onafhankelijke pilotteams; laat ze de starter gebruiken en het eerste lokale draaiboek invullen | Twee werkende lokale proefkopieën als er twee teams deelnemen; knelpunten en benodigde ondersteuning |
| Dag 31 tot 60 | Laat ieder deelnemend team materiaal vertalen of aanpassen en één echte activiteit voorbereiden | Lokale content, minimaal één beoordeelde upstreambijdrage per actief team en gedocumenteerde verbeteringen |
| Dag 61 tot 90 | Test een update, herstel en publicatie; evalueer gebruik en onderhoud | Releasebesluit, aangepaste handleidingen en een besluit over een vrijwillige directory |

Pilotdoelen zijn vooraf te meten: een team kan vanaf een schone download zonder Nederlandse accounts een eigen site starten; een relevante bijdrage kan worden teruggegeven; een upstreamupdate beschadigt lokale content niet; een fout kan worden gecorrigeerd met een nieuwe release. De inhoudelijke doelen zijn een bruikbaar lokaal introductieprogramma en duidelijke uitleg van de onafhankelijke status.

De metingen zijn eenvoudige projectregistraties: doorlooptijd van eerste download tot lokale publicatie, gevonden blokkades, geaccepteerde bijdragen, geslaagde updatetests en actieve beheerders per team. Er is geen individuele bezoekerstracking nodig. Na 90 dagen wordt besloten door te gaan, de scope te verkleinen of ondersteuning te pauzeren. Bestaande vrijgegeven materialen blijven volgens hun licentie bruikbaar.

## Kosten en duurzaamheid

De basis vermijdt vaste softwareabonnementen. De grootste inzet is tijd voor inhoud, vertaling, review en onderhoud. Lokale teams bepalen zelf hun hosting en domein. Betaalde ondersteuning is optioneel; toegang tot de gelicentieerde basis blijft vrij.

Voor de pilot maakt Vincent een capaciteitsoverzicht met uren voor releasebeheer, inhoud, datacontrole, begeleiding en evaluatie. Zonder dat overzicht is er geen betrouwbare begroting. Domeinen, hosting, opslag, bijeenkomsten en eventuele onafhankelijke controles worden als aparte posten met actuele offertes opgenomen. Dit voorstel bevat geen harde leveranciersprijzen of toegezegde inkomsten.

Sponsoring, vrijwillige donaties of betaalde workshops kunnen later bijdragen aan onderhoud. Een sponsor krijgt daarmee geen controle over lesinhoud, erkenning of data. Inkomsten en uitgaven van de gezamenlijke organisatie kunnen als eigen samenvattingen worden gepubliceerd, terwijl individuele donorgegevens privé blijven. Het MVP bevat geen betalingsverwerking.

## Belangrijkste beslissingen voor Vincent

1. Bevestig Embassy Commons als werknaam en de gewenste relatie met Dutch Bitcoin Embassy. Stel merkgebruik en de zichtbare onafhankelijke status vast.
2. Bepaal welke partij de eerste materialen uitgeeft, welke eigenaren en bijdragen de rechten dekken en of MIT de gewenste vrijheid biedt.
3. Kies de eerste werkelijk vrij te geven Nederlandse kennis en datasets. Laat interne persoonsgegevens en geheime informatie buiten het pakket.
4. Wijs de release-, inhouds- en datarollen toe en reserveer pilotcapaciteit.
5. Kies na die voorbereiding maximaal twee eerste pilotteams; leg hun deelname afzonderlijk vast.
6. Besluit na de pilot over een directory, meertalige ondersteuning en aanvullende beheerfuncties.

Een concrete eerste publieke starterrelease bestaat uit het gevalideerde starterpakket, het voorstel, de governance, de toepasselijke licenties, de expliciet gelicentieerde eigen templates en kennis, het afzonderlijke bronrecord en een werkende onafhankelijke voorbeeldsite. Het huidige pakket maakt die software en werkwijze beoordeelbaar. De eerste echte Nederlandse datarelease kan daarna afzonderlijk volgen en voldoet aan de publicatiecriteria in [het databeleid](DATA-POLICY.md).

## Bijbehorende documenten

- [Governance](GOVERNANCE.md) legt rollen, besluiten, federatie en kwaliteitslabels vast.
- [Databeleid](DATA-POLICY.md) beschrijft welke records openbaar mogen en hoe fouten worden gecorrigeerd.
- [Launch playbook](LAUNCH-PLAYBOOK.md) voert een lokaal team van download naar de eerste activiteit.
- [Bijdragen](../CONTRIBUTING.md), [gedragscode](../CODE_OF_CONDUCT.md) en [veiligheidsmeldingen](../SECURITY.md) ondersteunen dagelijks onderhoud.
