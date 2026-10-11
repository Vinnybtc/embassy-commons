# Databeleid van Embassy Commons

Embassy Commons publiceert alleen gegevens die bewust voor hergebruik zijn geselecteerd. Open broncode maakt de bestaande privédata van Dutch Bitcoin Embassy niet automatisch openbaar. Een openbare website als bron maakt het recht op het opnieuw publiceren of herlicentiëren van de inhoud evenmin automatisch duidelijk.

Dit beleid geldt voor de gezamenlijke repository, releasebundels en een toekomstige directory. Ieder lokaal team past dezelfde publicatiecontrole toe op eigen bestanden. Het beleid is een operationele afspraak; lokale organisaties beoordelen hun eigen verantwoordelijkheden en eventuele aanvullende vereisten.

## Scheid drie soorten materiaal

| Soort | Voorbeelden | Publicatie |
| --- | --- | --- |
| Open kennis | Eigen lessen, draaiboeken, uitleg en vertalingen | Alleen met herleidbare rechten en de toepasselijke kennislicentie |
| Open data | Eigen generieke templates, expliciet vrijgegeven organisatiegegevens, publiceerbare programmabeschrijvingen | Alleen na controle van ieder record en de datalicentie |
| Privéadministratie | Leden, deelnemers, donateurs, personeelszaken, contracten en interne berichten | Buiten publieke repositories, exports, issues en releasebundels |

Sleutels, seed phrases, herstelcodes, inloggegevens, API tokens, privécontactgegevens en financiële persoonsinformatie horen nooit in de open publicatie. Walletadressen kunnen herleidbaar zijn en zijn geen standaardveld van de basisdataset. Een toekomstig lokaal donatiesysteem krijgt een afzonderlijk ontwerp en gecontroleerde publicatieprocedure.

## Licenties op recordniveau

Eigen generieke template-data kan onder CC0 1.0 worden vrijgegeven wanneer de uitgever de benodigde rechten heeft. Eigen kennis staat onder CC BY 4.0. Voor materiaal van derden blijft de oorspronkelijke licentie gelden. De data-export moet die verschillen zichtbaar houden. Een algemene licentie op de repository overschrijft geen rechten van een derde.

Een record met openbare bronverwijzingen naar Dutch Bitcoin Embassy is een bronvermelding of beschrijving. De gekoppelde website-inhoud wordt daarmee niet onder CC0 vrijgegeven. Kopiëren van logo's, foto's, volledige teksten, presentaties of samengestelde datasets vraagt een afzonderlijke rechtencontrole. Waar de rechten niet duidelijk zijn, publiceert de catalogus alleen een zorgvuldig gekozen verwijzing of sluit het materiaal uit.

CC0 verleent geen toestemming voor het gebruik van merken en heft privacyrechten niet op. CC BY vraagt onder meer bronvermelding, een licentielink en aanduiding van wijzigingen. [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Publicatiepoort voor ieder echt record

Een schrijver controleert onderstaande criteria; een tweede persoon beoordeelt de vrijgave van nieuwe echte data. Een ontbrekend of negatief antwoord houdt het record uit de openbare bundel.

1. Het record heeft een nuttig openbaar doel en bevat alleen velden die dat doel nodig heeft.
2. Auteur, bron, beoogde licentie en reden voor publiceerbaarheid zijn herleidbaar.
3. De rechten op tekst, beelden en eventuele bijlagen zijn gecontroleerd. Het record impliceert geen rechten die de uitgever niet bezit.
4. Het bevat geen privécontactgegevens, accountgegevens, geheimen, ledenlijsten of verborgen persoonsgegevens in vrije tekst, metadata of bestanden.
5. Informatie is controleerbaar en voldoende actueel; tijdgevoelige inhoud krijgt een datum en reviewmoment.
6. Een voorbeeld is expliciet als voorbeeld gemarkeerd. Een ingediend record suggereert geen review die niet plaatsvond.
7. Afbeeldingen, URL's, downloads en vrije tekst worden als onbetrouwbare invoer behandeld en technisch gecontroleerd.
8. Het record voldoet aan het schema en kan met de bijbehorende versie worden geëxporteerd en teruggelezen.
9. Een verantwoordelijke beheerder en correctieroute zijn bekend.

De technische validator controleert structurele eisen en bekende verboden patronen. Hij kan niet vaststellen dat rechten, bronwaarheid, toestemming of alle persoonsgegevens in vrije tekst correct zijn. Een geslaagde validatie vervangt de inhoudelijke publicatiepoort niet.

## Herkomst en actualiteit

Een gegevensset beschrijft versie, datum, licenties en de gebruikte bronnen. Voor records met gecontroleerde feiten hoort een herkomstregistratie met minimaal bron-URL of intern bronbewijs, controledatum, reviewstatus en verantwoordelijke rol. Privébewijs wordt apart bewaard; het hoort niet in de openbare JSON.

De starter gebruikt schema's om de structuur te bewaken. Een toekomstig schema kan uitgebreidere per-recordmetadata toevoegen. De publicatiepoort geldt vanaf de eerste echte datarelease, ook als een deel van de beoordeling voorlopig in een reviewregister staat.

Bij zelf aangemelde lokale organisaties wordt zichtbaar wie de informatie heeft aangeleverd en welke scope daadwerkelijk is beoordeeld. Geen automatische verrijking met persoonlijke sociale profielen of contactgegevens. Een kopieerbare zakelijke rolmail wordt alleen opgenomen wanneer het lokale team die bewust openbaar wil maken en de betreffende publicatie beoordeeld is.

## Exports en een toekomstige federatie

De release-export bevat alleen publiceerbare bestanden. Intern reviewbewijs, toegangssleutels en private administratie staan in een afzonderlijke omgeving en worden niet meegenomen. Downloads vermelden de versie en de licenties. Een downstreamteam dat data toevoegt, herhaalt de publicatiecontrole en wordt de uitgever van zijn eigen aanvullingen.

Een toekomstige federatie haalt alleen manifesten en datasets op die het lokale team expliciet aanbiedt. De ingestuurde inhoud wordt behandeld als onbetrouwbare invoer en vóór publicatie beoordeeld. Opt-in voor de directory is geen toestemming voor het ophalen van alle pagina's, privédata of sociale profielen van dat team.

## Correcties, verwijdering en incidenten

Normale feitelijke fouten krijgen een issue zonder gevoelige bijlagen. De beheerder corrigeert het bronbestand en brengt een nieuwe versie uit; de releasebeschrijving benoemt wat is aangepast. Tijdgevoelige onjuistheden krijgen direct 'review nodig' of worden uit de actuele publicatie gehaald.

Een melding over persoonsgegevens, geheimen of schadelijke ongewenste publicatie gebruikt het private kanaal in [SECURITY.md](../SECURITY.md). Het team stopt verdere verspreiding, verwijdert het record uit de actuele export en bepaalt of ook Git geschiedenis of releasebestanden moeten worden opgeschoond. Gelekte credentials worden ingetrokken of vervangen; alleen verwijderen uit de repository is onvoldoende.

Reeds openbare kopieën kunnen blijven bestaan. De beheerder vermeldt bij een relevante correctie welke versies zijn getroffen en vraagt bekende downstreamteams hun kopieën bij te werken. Er wordt geen garantie gegeven dat alle externe kopieën kunnen worden verwijderd.

## Voorbereiding van de Nederlandse datarelease

De databeheerder maakt een inventaris van eigen teksten, lessen, processen, afbeeldingen, organisatiegegevens en eventuele openbare activiteiten. Iedere bron krijgt een eigenaar, licentie, publicatiedoel en uitkomst: vrijgeven, beperkt vrijgeven, alleen linken of privé houden.

De eerste release kiest een kleine gecontroleerde set. Daarna volgen aanvullende versies. Interne repositorytoegang of een eerdere publieke website is voldoende om materiaal te onderzoeken, maar geen zelfstandig bewijs dat alle inhoud onder een nieuwe open licentie mag worden verspreid.

## Verantwoordelijke rollen

De schrijver is verantwoordelijk voor bron en gewenste wijziging. De databeheerder beheert de rechten- en publicatiecontrole. De releasebeheerder zorgt dat de beoordeelde versie de enige versie in de nieuwe bundel is. De lokale beheerder is verantwoordelijk voor eigen aanvullingen. De eerste uitgever bepaalt vóór publieke ingebruikname het bereikbare private meldkanaal.
